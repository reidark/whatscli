import { Box } from "ink";

type PanelProps = {
	children: React.ReactNode;
	flexDirection?: Parameters<typeof Box>[number]["flexDirection"];
};

function Panel(props: PanelProps) {
	return (
		<Box
			borderStyle="single"
			flexDirection="column"
			height="100%"
			paddingX={1}
			width="100%"
			{...props}
		/>
	);
}

export { Panel };
