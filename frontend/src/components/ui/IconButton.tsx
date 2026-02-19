import {
  IconButton as IconButtonMui,
  Tooltip,
  type IconButtonProps,
} from "@mui/material";
import type { JSX } from "react";

const IconButton = (props: IconButtonProps): JSX.Element => {
  const { id,title, ...otherProps } = props;
  return (
    <Tooltip title={title}>
      <IconButtonMui
        id={id}
        {...otherProps}
        sx={{
          borderRadius: 1,
        }}
      />
    </Tooltip>
  );
};
export default IconButton;
