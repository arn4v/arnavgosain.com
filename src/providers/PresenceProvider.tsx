import * as React from 'react';

interface PresenceContextValue {
	count?: number;
	isConnected: boolean;
}

const presenceCtx = React.createContext<PresenceContextValue>(null);

interface PresenceProviderProps {
	children: React.ReactNode;
}

function connect({
	onOpen,
	onClose,
	onMessage
}: {
	onOpen: (ws: WebSocket) => void;
	onClose: () => void;
	onMessage: (data: any) => void;
}) {
	const ws = new WebSocket(process.env.NEXT_PUBLIC_WEBSOCKET_URL);

	ws.addEventListener('open', () => {
		onOpen(ws);

		ws.addEventListener('message', event => {
			const message = JSON.parse(event.data as string);
			onMessage(message);
		});
	});

	ws.addEventListener('close', () => {
		onClose();
	});

	return ws;
}

export function PresenceProvider(props: PresenceProviderProps) {
	const [isConnected, setIsConnected] = React.useState(false);
	const [state, setState] = React.useState(0);
	const openSocket = React.useRef<WebSocket | null>(null);

	React.useEffect(() => {
		const onOpen = (ws: WebSocket) => {
			setIsConnected(true);
			openSocket.current = ws;
		};

		const onClose = () => {
			setIsConnected(false);
		};

		const onMessage = message => {
			if (message.type === 'update/count') {
				setState(message.payload);
			}
		};

		let ws = connect({
			onOpen,
			onClose,
			onMessage
		});

		let disconnectTimeout: NodeJS.Timeout | null = null;
		let blurredAt: number | null = null;

		window.onfocus = () => {
			if (!openSocket.current) {
				ws = connect({
					onOpen,
					onClose,
					onMessage
				});
			} else if (openSocket.current && blurredAt && Date.now() - blurredAt < 1000 * 60 * 5) {
				clearTimeout(disconnectTimeout);
				disconnectTimeout = null;
				blurredAt = null;
			}
		};

		window.onblur = () => {
			disconnectTimeout = setTimeout(() => {
				blurredAt = Date.now();
				ws.close();
			}, 5 * 60 * 1000);
		};

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
