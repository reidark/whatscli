import { createNotifier } from "../..";
import { useNotifierState } from "./hooks/use-notifier-state";

function createNotifierStore<T>(value: T) {
	const notifier = createNotifier(value);

	return () => useNotifierState(notifier);
}

export { createNotifierStore };
