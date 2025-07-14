import { createNotifier } from "./index";

function createFiber() {
	const abortNotifier = createNotifier(false);

	function execute<T>(fn: () => Promise<T>) {
		return new Promise((resolve, reject) => {
			const subscriptionId = abortNotifier.subscribe((value) => {
				abortNotifier.deleteSubscription(subscriptionId);

				if (value) {
					reject("aborted");
				}
			});

			fn().then(resolve).catch(reject);
		});
	}

	function abort() {
		abortNotifier.setValue(true);
	}

	return {
		execute,
		abort,
	};
}

export { createFiber };
