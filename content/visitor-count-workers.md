---
title: 'Implementing Live Visitor Count with Cloudflare Workers & Durable Objects'
publishedOn: '2022-12-05'
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

## Making a Counter using Durable Objects

At surface level, a Durable Object is just a class. But an instance of this class is never created manually, as we need it to be created once & have a unique id, so it can be shared across WebSocket connections/requests.

```ts
interface Env {
	counter: DurableObjectNamespace;
}

export class Counter {
	constructor(private state: DurableObjectState, private env: Env) {}

	async decrement() {
		const count = (await this.state.storage.get('count')) ?? 0;
		const newCount = count - 1;
		await this.state.storage.put('count', newCount);
		return newCount;
	}

	async increment() {
		const count = (await this.state.storage.get('count')) ?? 0;
		const newCount = count + 1;
		await this.state.storage.put('count', newCount);
		return newCount;
	}
}
```

You might wonder where `counter` in came from in the `Env` interface. That's because the Durable Object is registered in the Worker's `wrangler.toml` file. The Workers runtime will then make it available in the `env` object, which can be accessed in the request handler or the DurableObject itself.

```toml wrangler.toml
[durable_objects]
bindings = [{ name = "counter", class_name = "Counter" }]

[[migrations]]
tag = "v1" # Should be unique for each entry
new_classes = ["Counter"]
```

## Hooking up our `Counter` Durable Object with the request handler

A Durable Object class's methods can't be called directly as we don't get access to the instance of the class itself. Instead, Workers runtime gives us to a `DurableObjectStub`, through which we can pass our request to the Durable Object by calling its `fetch` method.

So instead of calling `counter.increment()` directly, we can call `await counter.fetch(server)`. After this, our persisted Durable Object instance will then handle our WebSocket connection.

```ts
interface Env {
	counter: DurableObjectNamespace;
}

export class Counter {
	// Code from the previous section
	// ...

	async fetch(request: Request) {
		const [client, server] = new WebSocketPair();

		server.addEventListener('message', async event => {
			// Messages are received/sent as strings, so we need to parse it into JSON
			// to use it as an object
			const action = JSON.parse(event.data);

			if (action.type === 'increment') {
				const newCount = await this.increment();
				server.send(JSON.stringify({ type: 'update/count', count: newCount }));
			} else if (action.type === 'decrement') {
				const newCount = await this.decrement();

				server.send(JSON.stringify({ type: 'update/count', count: newCount }));
			}
		});

		server.addEventListener('close', async () => {
			// When the client disconnects, we can delete all the data in Durable Object
			// Deleting all data automatically discards the Durable Object instance
			await this.state.storage.deleteAll();
		});

		server.accept();

		return new Response(null, {
			status: 101,
			webSocket: client
		});
	}
}

async function handleRequest(request: Request, env: Env) {
	// Cloudflare provides the client IP in the 'CF-Connecting-IP' header
	const ip = request.headers.get('CF-Connecting-IP') as string;

	// We'll use the IP as the Durable Object's id
	const counterId = env.counter.idFromName(ip);
	// .get() will fetch the existing Durable Object instance, or create a new one if it doesn't exist
	const counter = env.counter.get(counterId);

	return await counter.fetch(request);
}

export default {
	fetch: handleRequest
};
```

## Implementing the live visitors counter

Now that we have the basics out of the way, let's implement the live visitors counter.

So here's the rundown of how it works:

- Each client connects to the Worker via a WebSocket
- When the connection is established, we'll increment the count in our DurableObject by 1.
- When the connection is closed, we'll decrement the count in our DurableObject by 1.
- Whenever the count changes, the new count will be broadcast to all connected clients.
- When all clients disconnect, the DurableObject will be discarded.

### Keeping track of conns

Since our DurableObject's `fetch` method is called for every WebSocket connection, we can store the WebSocket connection in a Set.

```ts
export class Counter {
	// Refer to the previous section for the full code
	// ...

	private conns = new Set<WebSocket>();

	async fetch(request: Request) {
		const [client, server] = new WebSocketPair();

		server.addEventListener('message', async event => {
			// ...
		});

		server.addEventListener('close', async () => {
			// Remove the session from the Set
			this.conns.delete(server);
		});

		server.accept();

		// Add the session to the Set
		this.conns.add(server);

		return new Response(null, {
			status: 101,
			webSocket: client
		});
	}
}
```

### Broadcasting a message to all connected clients

```ts
export class Counter {
	// Refer to the previous section for the full code
	// ...

	private conns = new Set<WebSocket>();

	async fetch(request: Request) {
		// ...
	}

	private broadcast(message: string) {
		for (const session of this.conns) {
			session.send(message);
		}
	}
}
```

### Now we'll modify the `increment` and `decrement` methods to broadcast the new count to all connected clients

```ts
export class Counter {
	// Refer to the previous section for the full code
	// ...

	private conns = new Set<WebSocket>();

	private broadcast(message: string) {
		for (const conn of this.conns) {
			conn.send(message);
		}
	}

	async increment() {
		const count = (await this.state.storage.get('count')) ?? 0;
		const newCount = count + 1;
		await this.state.storage.put('count', newCount);

		// Broadcast the new count to all connected clients
		this.broadcast(JSON.stringify({ type: 'update/count', count: newCount }));

		return newCount;
	}

	async decrement() {
		const count = (await this.state.storage.get('count')) ?? 0;
		const newCount = count - 1;
		await this.state.storage.put('count', newCount);

		// Broadcast the new count to all connected clients
		this.broadcast(JSON.stringify({ type: 'update/count', count: newCount }));

		return newCount;
	}

	async fetch(request: Request) {
		/* ...*/
	}
}
```

### Discarding closed connections

```ts
export class Counter {
	// Refer to the previous section for the full code
	// ...

	private conns = new Set<WebSocket>();

	private broadcast(message: string) {
		for (const conn of this.conns) {
			// Check if the connection is still alive
			try {
				conn.send(message);
			} catch {
				// If the connection is closed, remove it from the Set
				this.conns.delete(session);
			}
		}
	}

	async increment() {
		/* ... */
	}
	async decrement() {
		/* ... */
	}
	async fetch(request: Request) {
		/* ... */
	}
}
```

## Full code

```ts
interface Env {
	counter: DurableObjectNamespace;
}

export class Counter {
	private conns = new Set<WebSocket>();

	constructor(private state: DurableObjectState, private env: Env) {}

	private broadcast(message: string) {
		for (const conn of this.conns) {
			// Check if the connection is still alive
			try {
				conn.send(message);
			} catch {
				// If the connection is closed, remove it from the Set
				this.conns.delete(session);
			}
		}
	}

	async increment() {
		const count = (await this.state.storage.get('count')) ?? 0;
		const newCount = count + 1;
		await this.state.storage.put('count', newCount);

		// Broadcast the new count to all connected clients
		this.broadcast(JSON.stringify({ type: 'update/count', count: newCount }));

		return newCount;
	}

	async decrement() {
		const count = (await this.state.storage.get('count')) ?? 0;
		const newCount = count - 1;
		await this.state.storage.put('count', newCount);

		// Broadcast the new count to all connected clients
		this.broadcast(JSON.stringify({ type: 'update/count', count: newCount }));

		return newCount;
	}

	async fetch(request: Request) {
		const [client, server] = new WebSocketPair();

		server.addEventListener('message', async event => {
			// Messages are received/sent as strings, so we need to parse it into JSON
			// to use it as an object
			const action = JSON.parse(event.data);

			if (action.type === 'increment') {
				const newCount = await this.increment();
				server.send(JSON.stringify({ type: 'update/count', count: newCount }));
			} else if (action.type === 'decrement') {
				const newCount = await this.decrement();

				server.send(JSON.stringify({ type: 'update/count', count: newCount }));
			}
		});

		server.addEventListener('close', async () => {
			// Remove the session from the Set
			this.conns.delete(server);

			if (this.conns.size === 0) {
				// When the client disconnects, we can delete all the data in Durable Object
				// Deleting all data automatically discards the Durable Object instance
				await this.state.storage.deleteAll();
			}
		});

		server.accept();

		// Add the session to the Set
		this.conns.add(server);

		return new Response(null, {
			status: 101,
			webSocket: client
		});
	}
}

async function handleRequest(request: Request, env: Env) {
	// Cloudflare provides the client IP in the 'CF-Connecting-IP' header
	const ip = request.headers.get('CF-Connecting-IP') as string;

	// We'll use the IP as the Durable Object's id
	const counterId = env.counter.idFromName(ip);
	// .get() will fetch the existing Durable Object instance, or create a new one if it doesn't exist
	const counter = env.counter.get(counterId);

	return await counter.fetch(request);
}

export default {
	fetch: handleRequest
};
```
