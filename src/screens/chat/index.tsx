import { Box, Text } from "ink";
import Layout from "../../layouts/default";
import { Messenger } from "./_chargers/messenger";
import { NavbarCharger } from "./_chargers/navbar";
import { useChatStore } from "./_stores/chat";

function Chat() {
	const [chatStore] = useChatStore();

	return (
		<Layout>
			<Box flexDirection="row" rowGap={16}>
				<Box flexGrow={1} width="30%">
					<NavbarCharger />
				</Box>

				<Box borderStyle="single" flexGrow={1} width="70%">
					{chatStore.activeChatId ? (
						<Messenger chatId={chatStore.activeChatId} />
					) : (
						<Box alignItems="center" justifyContent="center" width="100%">
							<Text>Select a chat on the navbar and start messaging.</Text>
						</Box>
					)}
				</Box>
			</Box>
		</Layout>
	);
}

export default Chat;
