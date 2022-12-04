export interface Env {
	presence: DurableObjectNamespace;
}

export class PresenceDurableObject {
	state: DurableObjectState;
	sessions: { ip: string; socket: WebSocket; sym: symbol }[];

	constructor(state: DurableObjectState, env: Env) {
		this.state = state;
		this.sessions = [];
		this.state.blockConcurrencyWhile(async () => {
			await this.state.storage.put('counter', 0);
		});
	}

	broadcast(message: string) {
		this.sessions = this.sessions.filter(session => {
			try {
				session.socket.send(message);
				return true;
			} catch {
				return false;
			}
		});
	}

	async incrementCounter() {
		const counter = await this.state.storage.get<number>('counter');
		const newCounter = counter ? counter + 1 : 1;

		const storagePromise = this.state.storage.put('counter', newCounter);
		await storagePromise;

		this.broadcast(
			JSON.stringify({
				type: 'update/count',
				payload: newCounter
			})
		);

		return newCounter;
	}

	async decrementCounter() {
		const counter = await this.state.storage.get<number>('counter');
		const newCounter = counter ? counter - 1 : 1;

		const storagePromise = this.state.storage.put('counter', newCounter);
		await storagePromise;

		this.broadcast(
			JSON.stringify({
				type: 'update/count',
				payload: newCounter
			})
		);

		return newCounter;
	}

	async handleSessionClose(sym: symbol) {
		this.sessions = this.sessions.filter(session => session.sym !== sym);
		if (this.sessions.length === 0) {
			await this.state.storage.deleteAll();
		} else {
			await this.decrementCounter();
		}
	}

	async handleSessionOpen(ip: string, socket: WebSocket) {
		const sym = Symbol(ip);

		socket.addEventListener('error', e => {
			console.log('websocket error', e);
		});

		socket.addEventListener('close', async e => {
			await this.handleSessionClose(sym);
			console.log('closed', { ip });
		});

		socket.accept();
		this.sessions.push({ ip, socket, sym });

		await this.incrementCounter();
	}

	async fetch(request: Request) {
		const ip = request.headers.get('CF-Connecting-IP') as string;
		const webSocketPair = new WebSocketPair();
		const [client, server] = Object.values(webSocketPair);

		await this.handleSessionOpen(ip, server);

		return new Response(null, {
			status: 101,
			webSocket: client
		});
	}
}

async function handleWebsocketRequest(request: Request, env: Env): Promise<Response> {
	const upgradeHeader = request.headers.get('Upgrade');

	if (!upgradeHeader || upgradeHeader !== 'websocket') {
		return new Response('Expected Upgrade: websocket', { status: 426 });
	}

	const id = env.presence.idFromName('arnavgosain.com');
	const presence = env.presence.get(id);

	return presence.fetch(request);
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
	fetch: handleWebsocketRequest
};
