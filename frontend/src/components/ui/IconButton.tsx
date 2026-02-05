import {
	IconButton as IconButtonMui,
	type IconButtonProps,
} from "@mui/material";
import type { JSX } from "react";

const IconButton = (props: IconButtonProps): JSX.Element => {
	const { id, ...otherProps } = props;
	return (
		<IconButtonMui
			id={id}
			{...otherProps}
			sx={{
				borderRadius: 1,
			}}
		/>
	);
};
export default IconButton;