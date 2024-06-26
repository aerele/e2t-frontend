"use client";
import React from "react";
import Sidebar from "../../app/(DashboardLayout)/layout/vertical/sidebar/Sidebar";
import Header from "../(DashboardLayout)/layout/horizontal/header/Header";
import Table from "../(DashboardLayout)/tables/search/page";

const Home: React.FC = () => {
	return (
		<div style={{ display: "flex", height: "100vh" }}>
			<Sidebar />
			<div style={{ flex: 1, overflowY: "auto" }}>
				<Header />
				<Table />
			</div>
		</div>
	);
};

export default Home;
