import { z } from "zod";
import { ok } from "../../lib/result";
import { delay } from "../../utils/delay";
import { chatMock } from "./_mock";

type Chat = z.infer<typeof ChatSchema>;

type ChatsOutput = z.infer<typeof ChatsOutputSchema>;

const ChatSchema = z.object({
	id: z.string().uuid(),
	label: z.string(),
});

const ChatsOutputSchema = z.array(ChatSchema);

async function getChats() {
	await delay(1500);

	return ok(chatMock.map(({ id, label }) => ({ id, label })));
}

export { getChats, ChatSchema, ChatsOutputSchema, type Chat, type ChatsOutput };
