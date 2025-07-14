import { Box, Text } from "ink";
import { useState } from "react";
import { useFocusId } from "../../../hooks/use-focus-id";
import { colors } from "../../../styles/tokens";
import { Input } from "../../../ui/input";
import { useMessages } from "../_hooks/use-messages";

type MessengerProps = {
	chatId: string;
};

function Messenger({ chatId }: MessengerProps) {
	const { data, isError, isLoading } = useMessages(chatId);
	const [message, setMessage] = useState("");
	const { CHAT_INPUT } = useFocusId();

	if (isLoading) {
		return <Text>Loading...</Text>;
	}

	if (isError) {
		return <Text>An error ocurred.</Text>;
	}

	return (
		<Box
			flexDirection="column"
			flexGrow={1}
			justifyContent="flex-end"
			paddingX={1}
			width="100%"
		>
			<Box flexDirection="column" overflowY="hidden">
				{data.map((item, index) => (
					<Box columnGap={1} key={item.id}>
						<Box minWidth={3}>
							<Text>{data.length - index}</Text>
						</Box>

						<Box
							justifyContent={
								item.author === "_self" ? "flex-end" : "flex-start"
							}
							width="100%"
						>
							<Text
								color={
									item.author === "_self"
										? colors.brownRed[500]
										: colors.green[600]
								}
							>
								{item.content}
							</Text>
						</Box>
					</Box>
				))}
			</Box>

			<Input
				autoFocus={true}
				id={CHAT_INPUT}
				onChange={setMessage}
				onSubmit={() => {
					setMessage("");
				}}
				placeholder="Message"
				value={message}
			/>
		</Box>
	);
}

export { Messenger };
