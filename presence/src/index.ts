export interface Env {
  presence: DurableObjectNamespace;
}

interface ActiveUser {
  connectedAt: number;
  name: string | null;
}

type ActiveUsers = Record<string, ActiveUser>;

export class PresenceDurableObject {
  state: DurableObjectState;
  sessions: { ip: string; socket: WebSocket }[];

  constructor(state: DurableObjectState, env: Env) {
    this.state = state;
    this.sessions = [];
    this.state.blockConcurrencyWhile(async () => {
      await this.state.storage.put("counter", 0);
    });
  }

  broadcast(message: string) {
    this.sessions.forEach((session) => {
      session.socket.send(message);
    });
  }

  async incrementCounter() {
    const counter = await this.state.storage.get<number>("counter");
    const newCounter = counter ? counter + 1 : 1;

    const storagePromise = this.state.storage.put("counter", newCounter);
    await storagePromise;

    this.broadcast(
      JSON.stringify({
        type: "update/count",
        payload: newCounter,
      })
    );

    return newCounter;
  }

  async decrementCounter() {
    const counter = await this.state.storage.get<number>("counter");
    const newCounter = counter ? counter - 1 : 1;

    const storagePromise = this.state.storage.put("counter", newCounter);
    await storagePromise;

    this.broadcast(
      JSON.stringify({
        type: "update/count",
        payload: newCounter,
      })
    );

    return newCounter;
  }

  async handleConnection(ip: string, socket: WebSocket) {
    this.sessions.push({
      ip,
      socket,
    });

    await this.incrementCounter();
  }

  async closeSession(ip: string) {
    this.sessions = this.sessions.filter((session) => session.ip !== ip);
    await this.decrementCounter();
  }

  async fetch(request: Request) {
    const ip = request.headers.get("CF-Connecting-IP") as string;
    const webSocketPair = new WebSocketPair();
    const [client, server] = Object.values(webSocketPair);

    server.addEventListener("error", (e) => {
      console.log("websocket error", e);
    });

    server.addEventListener("close", async (e) => {
      await this.closeSession(ip);
      console.log("closed", { ip });
    });

    server.accept();
    console.log("opened", { ip });
    await this.handleConnection(ip, server);

    return new Response(null, {
      status: 101,
      webSocket: client,
    });
  }
}

async function handleWebsocketRequest(
  request: Request,
  env: Env
): Promise<Response> {
  const upgradeHeader = request.headers.get("Upgrade");

  if (!upgradeHeader || upgradeHeader !== "websocket") {
    return new Response("Expected Upgrade: websocket", { status: 426 });
  }

  const id = env.presence.idFromName("arnavgosain.com");
  const presence = env.presence.get(id);

  return presence.fetch(request);
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  fetch: handleWebsocketRequest,
};
