import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
	typography: {
		htmlFontSize: 16,
		fontFamily: `'Poppins', sans-serif`,
		fontWeightLight: 300,
		fontWeightRegular: 400,
		fontWeightMedium: 500,
		fontWeightBold: 600,
		h1: {
			fontWeight: 600,
			fontSize: "2.375rem",
			lineHeight: 1.21,
		},
		h2: {
			fontWeight: 600,
			fontSize: "1.875rem",
			lineHeight: 1.27,
		},
		h3: {
			fontWeight: 600,
			fontSize: "1.5rem",
			lineHeight: 1.33,
		},
		h4: {
			fontWeight: 600,
			fontSize: "1.25rem",
			lineHeight: 1.4,
		},
		h5: {
			fontWeight: 600,
			fontSize: "1rem",
			lineHeight: 1.5,
		},
		h6: {
			fontWeight: 400,
			fontSize: "0.875rem",
			lineHeight: 1.57,
		},
		caption: {
			fontWeight: 400,
			fontSize: "0.75rem",
			lineHeight: 1.66,
		},
		body1: {
			fontSize: "0.875rem",
			lineHeight: 1.57,
		},
		body2: {
			fontSize: "0.75rem",
			lineHeight: 1.66,
		},
		subtitle1: {
			fontSize: "0.875rem",
			fontWeight: 600,
			lineHeight: 1.57,
		},
		subtitle2: {
			fontSize: "0.75rem",
			fontWeight: 500,
			lineHeight: 1.66,
		},
		overline: {
			lineHeight: 1.66,
		},
		button: {
			textTransform: "capitalize",
		},
	},
	palette: {
		primary: {
			main: "#1677FF",
			light: "#69AFFF",
			dark: "#0F5ED9",
		},
		secondary: {
			main: "#8C8C8C",
			light: "#BFBFBF",
			dark: "#595959",
		},
		error: {
			main: "rgb(255, 77, 79)",
			light: "#FF9C9D",
			dark: "#CC1F22",
		},
		success: {
			main: "#52C41A",
			light: "#73D13D",
			dark: "#389E0D",
		},
		warning: {
			main: "#FAAD14",
			light: "#FFD666",
			dark: "#D48806",
		},
		info: {
			main: "#13C2C2",
			light: "#36CFC9",
			dark: "#08979C",
		},
		background: {
			default: "#FAFAFB",
			paper: "#FFFFFF",
		},
	},
	components: {
		// Override specific components
		MuiTypography: {
			styleOverrides: {
				body1: {
					fontSize: "0.875rem", // 14px for body1
				},
				body2: {
					fontSize: "0.75rem", // 12px for body2
				},
			},
		},
		MuiTextField: {
			styleOverrides: {
				root: {
					"& .MuiInputBase-input": {
						fontSize: "0.875rem", // 14px for input fields
					},
				},
			},
		},
		MuiAutocomplete: {
			styleOverrides: {
				input: {
					fontSize: "0.875rem !important", // 14px for autocomplete
				},
				option: {
					fontSize: "0.875rem", // 14px for options
				},
			},
		},
		MuiButton: {
			styleOverrides: {
				root: {
					fontSize: "0.875rem", // 14px for buttons
				},
			},
		},
	},
});