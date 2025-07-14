import { Text, useFocusManager } from "ink";
import { useState } from "react";
import type { ChatsOutput } from "../../../actions/chat/chats";
import { useFocusId } from "../../../hooks/use-focus-id";
import type { Result } from "../../../lib/result";
import { useNavigatorLoaderData } from "../../../navigator";
import { colors } from "../../../styles/tokens";
import { Actor } from "../../../ui/actor";
import { Input } from "../../../ui/input";
import { Panel } from "../../../ui/panel";
import { useChatStore } from "../_stores/chat";

function NavbarCharger() {
	const chatsResult = useNavigatorLoaderData<Result<ChatsOutput>>();
	const [search, setSearch] = useState("");
	const [chatStore, setChatStore] = useChatStore();
	const { CHAT_INPUT } = useFocusId();
	const { focus } = useFocusManager();

	if (chatsResult.error) {
		return (
			<Panel>
				<Text>An error occured.</Text>
			</Panel>
		);
	}

	return (
		<Panel>
			<Input onChange={setSearch} placeholder="Search" value={search} />

			{chatsResult.data.map((data) => (
				<Actor
					autoFocus={true}
					backgroundColor={
						data.id === chatStore.activeChatId
							? colors.brownRed[500]
							: undefined
					}
					key={data.id}
					onSubmit={() => {
						setChatStore((state) => ({ ...state, activeChatId: data.id }));

						focus(CHAT_INPUT);
					}}
				>
					{data.label}
				</Actor>
			))}
		</Panel>
	);
}

export { NavbarCharger };
