---
title: 'How to use Litestream with SQLite & Prisma'
publishedOn: '2022-05-31'
---

As a fun experiment, I've wanted to add a live visitor count to my blog. I've seen this done in a few different ways, most commonly in a server-full way, but I wanted to try implementing as a serverless function. Unlike other serverless solutions, Cloudflare Workers support WebSockets & provide a neat interface for consistent storage via Durable Objects, so I decided to give it a shot.

## The Basics

### Wrangler

Cloudflare provides a CLI tool called `wrangler` to control/deploy to any of their serverless offerings (Workers, D1, etc). Wranger can be installed using npm.

```sh
npm i -g wrangler
```

### Scaffolding a Worker

To scaffold a new Worker, run `wrangler generate` and follow the prompts.

```sh
wrangler init my-worker
```

Wrangler will prompt you to create a package.json file, as well as whether you want to use TypeScript or not and if you want it to setup Jest/Vitest for testing. I recommend saying yes to all of these, as it will make your life easier later.

Wrangler will create the following files:

- `package.json` - Self explanatory.
- `wrangler.toml` - Configuration file for the Wrangler
- `src/index.ts` - The main entrypoint for the Worker
- `src/index.test.ts` - Vitest test file for the Worker

## Building the live visitor counter

So here's the rundown of how it works:

- Each client connects to the Worker via a WebSocket
- When the connection is established, we'll increment the count in our DurableObject by 1.
- When the connection is closed, we'll decrement the count in our DurableObject by 1.
- Whenever the count changes, the new count will be broadcast to all connected clients.

## Connecting to the Worker WebSocket

In the worker, you have to create a WebSocketPair and return one of the sockets to the client. The other socket is used to communicate with the Worker.

```ts
async handleRequest(request: Request, env: Env) {
  const [client, server] = new WebSocketPair();

  server.addEventListener('message', (event) => {
    // Handle messages from the client
  });

  server.addEventListener('close', () => {
    // Handle the client disconnecting
  });

  server.accept()

  return new Response(null, {
    status: 101,
    webSocket: client,
  });
}
```

On the client side, you can connect to the Worker using the `WebSocket` constructor.

```ts
const socket = new WebSocket('wss://my-worker.example.com');

socket.addEventListener('open', () => {
	console.log('Connected to the Worker');
});

socket.addEventListener('message', () => {
	console.log('Connected to the Worker');
});

socket.addEventListener('close', () => {
	console.log('Disconnected from the Worker');
});
```

## Keeping track of sessions using a Durable Object

At surface level, a Durable Object is just a class. But an instance of this class is never created manually, as we need it to be created once & have a unique id, so it can be shared across WebSocket connections/requests.

```ts
interface Env {
	presence: DurableObjectNamespace;
}

export class Presence {
	constructor(private state: DurableObjectState, private env: Env) {}

	async decrement() {
		const count = (await this.state.storage.get('count')) ?? 0;
		await this.state.storage.put('count', count - 1);
	}

	async increment() {
		const count = (await this.state.storage.get('count')) ?? 0;
		await this.state.storage.put('count', count + 1);
	}
}
```

You might wonder where `presence` in came from in the `Env` interface. That's because the Durable Object is registered in the Worker's `wrangler.toml` file. The Workers runtime will then make it available in the `env` object, which can be accessed in the request handler or the DurableObject itself.

```toml wrangler.toml
[durable_objects]
bindings = [{ name = "presence", class_name = "Presence" }]

[[migrations]]
tag = "v1" # Should be unique for each entry
new_classes = ["Presence"]
```

## Bringing it all together

Now that we have a way to keep track of sessions, we can increment/decrement the count whenever a client connects/disconnects.

```ts
interface Env {
	presence: DurableObjectNamespace;
}

export class Presence {
	constructor(private state: DurableObjectState, private env: Env) {}

	async decrement() {
		const count = (await this.state.storage.get('count')) ?? 0;
		await this.state.storage.put('count', count - 1);
	}

	async increment() {
		const count = (await this.state.storage.get('count')) ?? 0;
		await this.state.storage.put('count', count + 1);
	}
}

async handleRequest(request: Request, env: Env) {
  const [client, server] = new WebSocketPair();

  server.addEventListener('open', () => {
    env.presence.increment();
  });

  server.addEventListener('close', () => {
    env.presence.decrement();
  });

  server.accept()

  return new Response(null, {
    status: 101,
    webSocket: client,
  });
}
```
