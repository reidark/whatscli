import { Box, useFocus } from "ink";
import TextInput from "ink-text-input";
import { useEffectOnce } from "../hooks/use-effect-once";

type InputProps = {
	autoFocus?: boolean;
	id?: string;
	onChange: (value: string) => void;
	onSubmit?: (value: string) => void;
	placeholder?: string;
	value: string;
};

function Input({
	autoFocus,
	id,
	onChange,
	onSubmit,
	placeholder,
	value,
}: InputProps) {
	const { focus, isFocused } = useFocus({ autoFocus, id });

	useEffectOnce(() => {
		if (id) {
			focus(id);
		}
	});

	return (
		<Box borderStyle="single" paddingX={1} width="100%">
			<TextInput
				focus={isFocused}
				onChange={onChange}
				onSubmit={onSubmit}
				placeholder={placeholder}
				value={value}
			/>
		</Box>
	);
}

export { Input };
