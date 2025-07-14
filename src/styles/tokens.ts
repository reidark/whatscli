// Ref: https://github.com/cha-theme/tokens/blob/main/sh/cha_colors.sh
type ColorFamily = keyof typeof colors;

const colors = {
	neutral: {
		600: "#525252",
	},
	brownRed: {
		200: "#BB7744",
		500: "#B36D43",
	},
	brown: {
		200: "#9B7E62",
		500: "#AE9164",
	},
	green: {
		300: "#8DA26C",
		600: "#5F875F",
	},
	yellow: {
		200: "#D7C483",
		400: "#D5B56B",
		600: "#C9A554",
		800: "#A38A45",
	},
} as const;

export { colors, type ColorFamily };
