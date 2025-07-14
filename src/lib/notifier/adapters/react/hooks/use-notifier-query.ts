import { useEffect, useState } from "react";
import {
	createNotifierQueryCache,
	type NotifierQueryCacheProps,
	queryStringify,
} from "../../../query";

const globalNotifierQueryCache = createNotifierQueryCache();

function useNotifierQuery<T>(
	props: NotifierQueryCacheProps<T>,
	cache: ReturnType<typeof createNotifierQueryCache> = globalNotifierQueryCache,
) {
	const notifier = cache.add(props);
	const [prevProps, setPrevProps] = useState<typeof props | null>(null);
	const [value, setValue] = useState<
		ReturnType<typeof notifier.getValue>["computed"]
	>(notifier.getValue().computed);
	const [error, setError] = useState<{ error: unknown; isError: boolean }>({
		error: null,
		isError: false,
	});
	const [isFetching, setIsFetching] = useState(true);

	useEffect(() => {
		function subscription(newValue: ReturnType<typeof notifier.getValue>) {
			setValue(newValue.computed);
		}

		const subscriptionId = notifier.subscribe(subscription);

		return () => {
			notifier.deleteSubscription(subscriptionId);
		};
	}, [notifier]);

	useEffect(() => {
		if (
			!prevProps ||
			queryStringify(prevProps.query) !== queryStringify(props.query)
		) {
			setValue(notifier.getValue().computed);

			setPrevProps(props);

			async function _load() {
				setIsFetching(true);

				try {
					const data = await props.queryFn();

					notifier.setValue((value) => ({
						...value,
						computed: {
							data,
						},
					}));

					setError({ error: null, isError: false });
				} catch (error) {
					notifier.setValue((value) => ({
						...value,
						computed: {
							data: null,
						},
					}));

					setError({ error, isError: true });
				}

				setIsFetching(false);
			}

			_load();
		}
	}, [notifier, props, prevProps]);

	if (value.data) {
		return {
			data: value.data,
			isSuccess: true as const,
			error: null,
			isError: false as const,
			isLoading: false as const,
			isFetching,
		};
	}

	if (error.isError) {
		return {
			data: null,
			isSuccess: false as const,
			error: error.error,
			isError: true as const,
			isLoading: false as const,
			isFetching,
		};
	}

	return {
		data: value.data,
		isSuccess: false as const,
		error: null,
		isError: false as const,
		isLoading: true as const,
		isFetching,
	};
}

export { useNotifierQuery, globalNotifierQueryCache };
