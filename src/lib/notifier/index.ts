type Notifier<T> = ReturnType<typeof createNotifier<T>>;

function createNotifier<T>(initialValue: T) {
	let _value = initialValue;
	const _subscriptions: (((value: T) => void) | null)[] = [];

	function getValue() {
		return Object.freeze(_value);
	}

	function setValue(value: T | ((currentValue: T) => T)) {
		if (value instanceof Function) {
			_value = value(_value);
		} else {
			_value = value;
		}

		for (const subscription of _subscriptions) {
			if (subscription) {
				subscription(_value);
			}
		}
	}

	function subscribe(subscription: (value: T) => void) {
		_subscriptions.push(subscription);

		return _subscriptions.length - 1;
	}

	function deleteSubscription(id: number) {
		if (_subscriptions[id]) {
			_subscriptions[id] = null;
		}
	}

	return {
		getValue,
		setValue,
		subscribe,
		deleteSubscription,
	};
}

export { createNotifier, type Notifier };
