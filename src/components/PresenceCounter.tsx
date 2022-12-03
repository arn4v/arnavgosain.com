import * as React from "react";

function usePresenceState() {
  const [isConnected, setIsConnected] = React.useState(false);
  const [state, setState] = React.useState(0);
  const openSocket = React.useRef<WebSocket | null>(null);

  React.useEffect(() => {
    const ws = new WebSocket(process.env.NEXT_PUBLIC_WEBSOCKET_URL);
    ws.addEventListener("open", () => {
      openSocket.current = ws;
      setIsConnected(true);

      ws.addEventListener("message", (event) => {
        const message = JSON.parse(event.data as string);

        if (message.type === "update/count") {
          setState(message.payload);
        }
      });
    });

    ws.addEventListener("close", () => {
      openSocket.current = null;
      setIsConnected(false);
    });

    return () => {
      ws.close();
    };
  }, []);

  return {
    count: state,
    isConnected,
  };
}

export function PresenceCounter() {
  const { count, isConnected } = usePresenceState();

  if (!isConnected) {
    return null;
  }

  return <div>You're 1 of {count} people currently on this page.</div>;
}
