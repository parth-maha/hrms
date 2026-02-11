import { Breadcrumbs as MUIBreadcrumbs, Typography, Link } from "@mui/material";
import { useLocation, Link as RouterLink } from "react-router-dom";
import {
	ArrowForwardIos,
	DashboardOutlined,
	Home,
} from "@mui/icons-material";
import ModeOfTravelIcon from '@mui/icons-material/ModeOfTravel';
import type { NavItem } from "../../types/ui.types";


// === NAVIGATION STRUCTURE ===
const navigation: NavItem[] = [
	{ name: "Dashboard", icon: DashboardOutlined, path: "/" },
	{ name: "Travel", icon: ModeOfTravelIcon, path: "/travel" },

];

// === HELPER ===
const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

// === FIND MATCHED ITEM FOR ICON ===
const findNavItemByPath = (path: string) => {
	for (const item of navigation) {
		if (item.path === path) return item;
		if (item.subItems) {
			for (const sub of item.subItems) {
				if (item.path + sub.path === path) return sub;
			}
		}
	}
	return null;
};

export default function Breadcrumbs() {
	const location = useLocation();
	const pathnames = location.pathname.split("/").filter((x) => x);

	const iconSX = {
		width: "1rem",
		height: "1rem",
		color : ""
	};

	return (
		pathnames.length == 1 &&
		pathnames[0] !== "dashboard" && (
			<div className="my-6">
				<MUIBreadcrumbs
					aria-label="breadcrumb"
					separator={
						<ArrowForwardIos
							style={{ width: ".85rem", height: ".85rem", marginTop: "0.125rem" }}
							color="action"
							fontSize="small"
						/>
					}
				>
					<Link component={RouterLink} underline="hover" color="inherit" to="/">
						<Home color="action" fontSize="small" />
					</Link>

					{pathnames.map((value, index) => {
						const to = `/${pathnames.slice(0, index + 1).join("/")}`;
						const isLast = index === pathnames.length - 1;
						const navItem = findNavItemByPath(to);

						return isLast ? (
							<div className="flex items-center gap-2 mt-0.5" key={to}>
								<div className="mt-0.5">
									<Typography key={to} fontWeight={600}>
										{capitalize(decodeURIComponent(value.replace(/-/g, " ")))}
									</Typography>
								</div>
							</div>
						) : (
							<Link
								component={RouterLink}
								className="flex items-center gap-2 mt-1"
								underline="hover"
								color="inherit"
								to={to}
								key={to}
							>
								<div className="mt-0.5">
									<Typography
										color="info"
										key={to}
										className="flex items-center"
									>
										{capitalize(decodeURIComponent(value.replace(/-/g, " ")))}
									</Typography>
								</div>
							</Link>
						);
					})}
				</MUIBreadcrumbs>
			</div>
		)
	);
}