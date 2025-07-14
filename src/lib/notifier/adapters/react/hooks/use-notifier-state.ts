import { useCallback, useEffect, useState } from "react";
import type { Notifier } from "../../../index";

function useNotifierState<T>(notifier: Notifier<T>) {
	const [value, setValue] = useState(notifier.getValue());

	const setNotifierValue = useCallback(
		(newValue: Parameters<typeof notifier.setValue>[number]) => {
			notifier.setValue(newValue);
		},
		[notifier],
	);

	useEffect(() => {
		function subscription(newValue: typeof value) {
			setValue(newValue);
		}

		const subscriptionId = notifier.subscribe(subscription);

		return () => {
			notifier.deleteSubscription(subscriptionId);
		};
	}, [notifier]);

	return [value, setNotifierValue] as const;
}

export { useNotifierState };
