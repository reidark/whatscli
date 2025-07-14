import { isInstanceOfResult, type Result } from ".";

function throwableResult<T>(result: Result<T>) {
	if (isInstanceOfResult(result)) {
		if (result.error) {
			Promise.reject(result.error);
		}

		return result.data;
	}

	throw new Error("Parameter `result` is not an instance of Result");
}

export { throwableResult };
