import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import TopBar from "./Topbar";
// import { useStore } from "../store/store";
import { Outlet, useNavigate } from "react-router-dom";
import Breadcrumbs from "../ui/BreadCrumbs";
// import type { DashboardData } from "../utilities/types";
interface DashboardLayoutProps {
	children: React.ReactNode;
	onLogout: () => void;
}

export default function DashboardLayout() {
	const navigate = useNavigate();
	// const { userDetails } = useStore();
	const user = {
        name : "Parth",
        email : "parth.maha@roimaint.com"
    };

	useEffect(() => {
		localStorage.getItem("token") === null
			navigate("/login");
	}, []);

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
			<main className="ml-14 pt-14 p-6">
				<div className="max-w-full mx-auto">
					<Breadcrumbs />
					<Outlet/>
				</div>
			</main>
		</div>
	);
}