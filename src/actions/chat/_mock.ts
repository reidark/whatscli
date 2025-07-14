const chatMock = [
	{
		id: crypto.randomUUID(),
		label: "Boss",
		messages: [
			{
				id: crypto.randomUUID(),
				date: Date.now(),
				content: "Come to my office 5PM today, it's important",
				author: "Boss",
			},
		],
	},
	{
		id: crypto.randomUUID(),
		label: "Repair Shop",
		messages: [
			{
				id: crypto.randomUUID(),
				date: Date.now(),
				content: "I've checked your Peugeot 208",
				author: "Repair Shop",
			},
			{
				id: crypto.randomUUID(),
				date: Date.now(),
				content: "Your engine is fucked",
				author: "Repair Shop",
			},
		],
	},
	{
		id: crypto.randomUUID(),
		label: "Love ❤️",
		messages: [
			{
				id: crypto.randomUUID(),
				date: Date.now(),
				content: "Hello babe, good morning!! Did you sleep well?",
				author: "_self",
			},
			{
				id: crypto.randomUUID(),
				date: Date.now(),
				content: "Hi",
				author: "Love ❤️",
			},
			{
				id: crypto.randomUUID(),
				date: Date.now(),
				content: "Can we talk?",
				author: "Love ❤️",
			},
		],
	},
];

export { chatMock };
