import { usePresence } from '~/providers/PresenceProvider';

export function PresenceCounter() {
	const { count, isConnected } = usePresence();

	if (!isConnected) {
		return null;
	}

	return <div>You're 1 of {count} people currently on this page.</div>;
}
