import { Drawer } from "@mui/material";
import IconFilter from "@mui/icons-material/FilterList";
import IconButton from "./IconButton";
import { Close } from "@mui/icons-material";
import { Typography } from "@mui/material";
import type { ReactNode } from "react";

interface FilterProps {
	opened: boolean;
	onClose: () => void;
	zIndex?: number;
	children: ReactNode;
	offset?: number;
	zIndexOfModal?: number;
}

const Filter: React.FunctionComponent<FilterProps> = ({
	opened,
	onClose,
	// DEFAULT_Z_INDEX_FOR_MODAL_AND_FILTER
	// by defult is 200 for both filter over the modal
	// to use filter in modal we have set filter to 200 and modal to 100
	zIndex = 200,
	children,
	offset = 8,
	zIndexOfModal = 1200,
}) => {

	return (
		<Drawer
			open={opened}
			anchor={"right"}
			onClose={onClose}
			sx={{
				"& .MuiDrawer-paper": { backgroundImage: "none" },
			}}
			style={{ zIndex: zIndexOfModal }}
			PaperProps={{
				sx: {
					width: 450,
					borderRadius: "4px",
					padding: 2,
                    zIndex: zIndex,
					position: "absolute",
					right: `${offset}px`,
					height: `calc(100% - ${offset * 2}px)`,
					top: `${offset}px`,
				},
			}}
		>
			<div className="h-full">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">

					<Typography variant="h4">Filter</Typography>
					<IconFilter className="ml-2" />
                    </div>
					<IconButton
						id="filter-close"
						onClick={onClose}
						sx={{
							position: "absolute",
							right: 8,
							top: 8,
							color: (theme) => theme.palette.grey[900],
						}}
					>
						<Close />
					</IconButton>
				</div>
				{children}
			</div>
		</Drawer>
	);
};

export default Filter;