import { forwardRef } from "react";
import { Add } from "@mui/icons-material";
import { Button as ButtonMui, type ButtonProps } from "@mui/material";

const Button = forwardRef<HTMLButtonElement, ButtonProps & {withPlusIcon?: boolean}>(
	(props, ref) => {
		const {  variant, size, ...otherProps } = props;
		return (
			<ButtonMui
				ref={ref}
				size={size ?? "small"}
				variant={variant ?? "contained"}
                startIcon={props.withPlusIcon && <Add sx={{ fontSize: "1.2rem !important" }} />}
				{...otherProps}
			/>
		);
	}
);

export default Button;