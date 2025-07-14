import { Box, Text, useStdout } from "ink";
import { useEffect, useState } from "react";
import { useNavigatorStatus } from "../navigator";
import { colors } from "../styles/tokens";

type DefaultProps = {
	children: React.ReactNode;
};

function Default({ children }: DefaultProps) {
	const status = useNavigatorStatus();
	const { stdout } = useStdout();
	const [size, setSize] = useState({
		columns: stdout.columns,
		rows: stdout.rows,
	});

	useEffect(() => {
		function onResize() {
			setSize({
				columns: stdout.columns,
				rows: stdout.rows,
			});
		}

		stdout.on("resize", onResize);

		return () => {
			stdout.off("resize", onResize);
		};
	}, [stdout]);

	return (
		<Box flexDirection="column" width={size.columns}>
			<Box marginBottom={1} columnGap={1}>
				<Text backgroundColor={colors.neutral[600]}>[1] Chat</Text>

				<Text backgroundColor={colors.neutral[600]}>[2] Settings</Text>
			</Box>

			<Box marginBottom={1} height={size.rows - 5}>
				{children}
			</Box>

			<Box flexDirection="column" alignItems="flex-end">
				<Text backgroundColor={colors.brownRed[500]}>
					{" "}
					Navigator:
					{status.loading ? "Loading" : "Idle"}{" "}
				</Text>
			</Box>
		</Box>
	);
}

export default Default;
