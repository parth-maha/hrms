import Sidebar from "./Sidebar";
import TopBar from "./Topbar";
import { Outlet } from "react-router-dom";
import Breadcrumbs from "../ui/BreadCrumbs";

export default function DashboardLayout() {
	const user = {
        name : "Parth",
        email : "parth.maha@roimaint.com"
    };

	return (
		<div className="min-h-screen bg-white">
			<Sidebar
				user={user}
				company="Roima Intelligence"
				// onLogout={onLogout}
                />
			<TopBar
				user={user}
				company="Roima Intelligence"
				// onLogout={onLogout}
			/>

			{/* Main content area */}
			<main className="ml-14 pt-10 p-6">
				<div className="max-w-full mx-auto">
					<Breadcrumbs />
					<Outlet/>
				</div>
			</main>
		</div>
	);
}