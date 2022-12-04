import * as React from 'react';

interface PresenceContextValue {
	count?: number;
	isConnected: boolean;
}

const presenceCtx = React.createContext<PresenceContextValue>(null);

interface PresenceProviderProps {
	children: React.ReactNode;
}

export function PresenceProvider(props: PresenceProviderProps) {
	const [isConnected, setIsConnected] = React.useState(false);
	const [state, setState] = React.useState(0);
	const openSocket = React.useRef<WebSocket | null>(null);

	React.useEffect(() => {
		const ws = new WebSocket(process.env.NEXT_PUBLIC_WEBSOCKET_URL);
		ws.addEventListener('open', () => {
			openSocket.current = ws;
			setIsConnected(true);

			ws.addEventListener('message', event => {
				const message = JSON.parse(event.data as string);

				if (message.type === 'update/count') {
					setState(message.payload);
				}
			});
		});

		ws.addEventListener('close', () => {
			openSocket.current = null;
			setIsConnected(false);
		});

		return () => {
			ws.close();
		};
	}, []);

	return (
		<presenceCtx.Provider value={{ count: state, isConnected }}>
			{props.children}
		</presenceCtx.Provider>
	);
}

export const usePresence = () => React.useContext(presenceCtx);
