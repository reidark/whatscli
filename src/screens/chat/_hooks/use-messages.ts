import { getMessages } from "../../../actions/chat/messages";
import { useNotifierQuery } from "../../../lib/notifier/adapters/react/hooks/use-notifier-query";
import { throwableResult } from "../../../lib/result/throwable-result";

function useMessages(chatId: string) {
	const query = useNotifierQuery({
		query: ["messages", chatId],
		queryFn: async () => {
			const result = await getMessages({ id: chatId });

			return throwableResult(result);
		},
	});

	return query;
}

export { useMessages };
