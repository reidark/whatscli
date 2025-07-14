import { Box, Text } from "ink";
import SelectInput from "ink-select-input";
import { useMemo, useState } from "react";
import type { GetProvidersOutput } from "../../actions/ai/providers";
import Layout from "../../layouts/default";
import type { Result } from "../../lib/result";
import { useNavigatorLoaderData } from "../../navigator";
import { Actor } from "../../ui/actor";
import { Input } from "../../ui/input";

function Settings() {
	const providersResult = useNavigatorLoaderData<Result<GetProvidersOutput>>();
	const [provider, setProvider] = useState<string | null>(null);
	const [model, setModel] = useState<string | null>(null);
	const [key, setKey] = useState("");
	const models = useMemo(
		() => providersResult.data?.find((item) => item.value === provider)?.models,
		[providersResult, provider],
	);

	console.log(provider);

	if (providersResult.error) {
		return <Text>An error ocurred.</Text>;
	}

	return (
		<Layout>
			<Box flexDirection="column" width="100%">
				<Box borderStyle="single" flexDirection="column" paddingX={1}>
					<Text>Select AI provider:</Text>

					<SelectInput
						items={providersResult.data}
						isFocused={!provider}
						onSelect={({ value }) => setProvider(value)}
					/>
				</Box>

				{provider && (
					<Box borderStyle="single" flexDirection="column" paddingX={1}>
						<Text>Select model:</Text>

						<SelectInput
							items={models}
							isFocused={!model}
							onSelect={({ value }) => setModel(value)}
						/>
					</Box>
				)}

				{provider && model && (
					<Box borderStyle="single" flexDirection="column" paddingX={1}>
						<Text>API key:</Text>

						<Input
							autoFocus={true}
							onChange={setKey}
							placeholder="API key"
							value={key}
						/>

						<Actor
							onSubmit={() => {
								setProvider(null);

								setModel(null);

								setKey("");
							}}
						>
							Reset
						</Actor>
					</Box>
				)}
			</Box>
		</Layout>
	);
}

export default Settings;
