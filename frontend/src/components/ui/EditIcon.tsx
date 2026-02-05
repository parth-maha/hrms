import { BorderColorOutlined } from "@mui/icons-material";
import IconButton from "./IconButton";
import { Tooltip } from "@mui/material";

interface EditIconProps {
	title: string;
	onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
	iconProps?: React.ComponentProps<typeof BorderColorOutlined>;
	iconButtonProps?: React.ComponentProps<typeof IconButton>;
	[key: string]: any;
	withTooltip?: boolean;
	withIconButton?: boolean;
}

const EditIcon: React.FC<EditIconProps> = ({
	onClick,
	iconProps,
	title,
	iconButtonProps,
	...rest
}) => {
	return (
		<Tooltip title={title}>
			<IconButton
				color={iconButtonProps?.color || "primary"}
				onClick={onClick}
				{...iconButtonProps}
				{...rest}
			>
				<BorderColorOutlined
					fontSize={iconProps?.fontSize ? `${iconProps?.fontSize}` : "small"}
					{...iconProps}
				/>
			</IconButton>
		</Tooltip>
	);
};

export default EditIcon;