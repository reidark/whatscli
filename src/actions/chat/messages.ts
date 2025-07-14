import { z } from "zod";
import { ok } from "../../lib/result";
import { delay } from "../../utils/delay";
import { chatMock } from "./_mock";

type Message = z.infer<typeof MessageSchema>;

type GetMessagesInput = z.infer<typeof MessageInputSchema>;

type GetMessagesOutput = z.infer<typeof MessagesOutputSchema>;

const MessageSchema = z.object({
	id: z.string(),
	date: z.number(),
	content: z.string(),
	author: z.string(),
});

const MessageInputSchema = z.object({
	id: z.string(),
});

const MessagesOutputSchema = z.array(MessageSchema);

async function getMessages(input: GetMessagesInput) {
	await delay(1500);

	return ok(chatMock.find((item) => item.id === input.id)?.messages ?? []);
}

export {
	getMessages,
	MessageSchema,
	MessageInputSchema,
	MessagesOutputSchema,
	type Message,
	type GetMessagesInput,
	type GetMessagesOutput,
};
