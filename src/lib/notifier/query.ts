import { createNotifier, type Notifier } from ".";

type NotifierQueryCacheProps<T> = {
	query: unknown[];
	queryFn: () => T | Promise<T>;
};

type NotifierQueryCache<T> = {
	props: NotifierQueryCacheProps<T>;
	computed: {
		data: T | null;
	};
};

function queryStringify(query: unknown[]) {
	return JSON.stringify(query);
}

function createNotifierQueryCache() {
	const cache = new Map<string, Notifier<NotifierQueryCache<unknown>>>();

	function add<T>(newCacheItem: NotifierQueryCacheProps<T>) {
		const stringfiedQuery = queryStringify(newCacheItem.query);

		if (cache.has(stringfiedQuery)) {
			return cache.get(stringfiedQuery) as Notifier<NotifierQueryCache<T>>;
		}

		const notifier = createNotifier({
			props: newCacheItem,
			computed: { data: null },
		});

		cache.set(
			stringfiedQuery,
			notifier as Notifier<NotifierQueryCache<unknown>>,
		);

		return notifier as Notifier<NotifierQueryCache<T>>;
	}

	return { add };
}

export {
	createNotifierQueryCache,
	queryStringify,
	type NotifierQueryCacheProps,
};
