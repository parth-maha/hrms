import { forwardRef, type JSX } from "react";
import { TextField as TextFieldMUI, type TextFieldProps } from "@mui/material";
import type { FormComponentError } from "../../types/uiTypes";

const TextField = forwardRef<
	HTMLInputElement,
	TextFieldProps & Partial<FormComponentError>
>(
	(
		{
			errors = {},
			errorKey = "",
			error = null,
			helperText = null,
			variant = "outlined",
			fullWidth = true,
			...props
		},
		ref
	): JSX.Element => (
		<TextFieldMUI
			error={error ?? !!errors[errorKey]}
			helperText={helperText || errors[errorKey]?.message?.toString() || ""}
			variant={variant }
			fullWidth={fullWidth}
			inputRef={ref}
            size={props.size || 'small'}
			{...props}
			sx={{
				"& .MuiFormHelperText-root": {
					marginLeft: "0px",
				},
			}}
		/>
	)
);

export default TextField;