import { err, ok, type Result } from "../result";

async function asyncTryCatch<T>(
	fn: () => Promise<T>,
): Promise<Result<T, unknown>> {
	try {
		const data = await fn();

		return ok(data);
	} catch (error) {
		return err(error);
	}
}

export { asyncTryCatch };
