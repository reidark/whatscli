import { Text, useFocus, useInput } from "ink";
import { useEffect } from "react";
import { colors } from "../styles/tokens";

type ActorProps = {
	autoFocus?: boolean;
	backgroundColor?: Parameters<typeof Text>[number]["backgroundColor"];
	children: React.ReactNode;
	id?: string;
	onFocus?: () => void;
	onSubmit?: () => void;
};

function Actor({
	autoFocus,
	backgroundColor,
	children,
	id,
	onFocus,
	onSubmit,
}: ActorProps) {
	const { isFocused } = useFocus({ autoFocus, id });

	useInput((_, key) => {
		if (isFocused && key.return) {
			onSubmit?.();
		}
	});

	useEffect(() => {
		onFocus?.();
	}, [onFocus]);

	return (
		<Text
			backgroundColor={
				backgroundColor ?? (isFocused ? colors.neutral[600] : "")
			}
		>
			{children}
		</Text>
	);
}

export { Actor };
