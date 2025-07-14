type Result<T, E = T> = ReturnType<typeof err<E>> | ReturnType<typeof ok<T>>;

const _resultSymbol = Symbol("result");

function isInstanceOfResult<T>(result: Result<T>) {
	return result._symbol === _resultSymbol;
}

function err<E>(error: E) {
	return { data: null, error, _symbol: _resultSymbol };
}

function ok<T>(data: T) {
	return { data, error: null, _symbol: _resultSymbol };
}

export { isInstanceOfResult, err, ok, _resultSymbol, type Result };
