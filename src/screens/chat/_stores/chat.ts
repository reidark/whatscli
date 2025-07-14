import { createNotifierStore } from "../../../lib/notifier/adapters/react/store";

type ChatStore = {
	activeChatId: string | null;
};

const useChatStore = createNotifierStore<ChatStore>({
	activeChatId: null,
});

export { useChatStore };
