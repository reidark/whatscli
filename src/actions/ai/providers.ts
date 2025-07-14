import { z } from "zod";
import { ok } from "../../lib/result";
import { delay } from "../../utils/delay";
import { aiMock } from "./_mock";

type Provider = z.infer<typeof ProviderSchema>;

type GetProvidersOutput = z.infer<typeof ProvidersOutputSchema>;

const ProviderSchema = z.object({
	label: z.string(),
	value: z.string(),
	models: z.array(
		z.object({
			label: z.string(),
			value: z.string(),
		}),
	),
});

const ProvidersOutputSchema = z.array(ProviderSchema);

async function getProviders() {
	await delay(1500);

	return ok(aiMock);
}

export {
	getProviders,
	ProviderSchema,
	ProvidersOutputSchema,
	type Provider,
	type GetProvidersOutput,
};
