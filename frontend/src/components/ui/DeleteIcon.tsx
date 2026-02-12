import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import IconButton from "./IconButton";
import { Tooltip } from "@mui/material";

interface DeleteIconProps {
	title: string;
	onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
	iconProps?: React.ComponentProps<typeof DeleteOutlineOutlinedIcon>;
	iconButtonProps?: React.ComponentProps<typeof IconButton>;
	[key: string]: any;
}

const DeleteIcon: React.FC<DeleteIconProps> = ({
	onClick,
	title,
	iconProps,
	iconButtonProps,
	...rest
}) => {
	return (
		<Tooltip title={title}>
			<IconButton
				color={iconButtonProps?.color || "error"}
				onClick={onClick}
				{...iconButtonProps}
				{...rest}
			>
				<DeleteOutlineOutlinedIcon
					fontSize={iconProps?.fontSize ? `${iconProps?.fontSize}` : "small"}
					{...iconProps}
				/>
			</IconButton>
		</Tooltip>
	);
};

export default DeleteIcon;