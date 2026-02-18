import { forwardRef } from "react";
import { Button as ButtonMui, type ButtonProps } from "@mui/material";

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	(props, ref) => {
		const { variant, size, ...otherProps } = props;
		return (
			<ButtonMui
				ref={ref}
				size={size ?? "small"}
				variant={variant ?? "contained"}
        sx={{
        textTransform: "none",
        borderRadius: "0.5rem",
        fontWeight: 500,
        ...(variant === "contained" && {
          backgroundColor: "#3E9f34",
          color: "#fff",
        }),
        ...(variant === "outlined" && {
          borderColor: "#3E9f34",
          color: "#000",
        }),
      }}
				{...otherProps}
			/>
		);
	}
);

export default Button;