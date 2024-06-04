"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "../../app/(DashboardLayout)/layout/vertical/sidebar/Sidebar";
import Header from "../(DashboardLayout)/layout/horizontal/header/Header";
import { useSearchParams } from "next/navigation";
import { useFrappePostCall } from "frappe-react-sdk";
import { Toaster, toast } from "sonner";
import { Box } from "@mui/material";
import Editsite from "../(DashboardLayout)/tables/Editsite/page";
import { EditForm } from "../components/forms/form-layouts";



interface itemListProps {
	name: string;
}


const editSite: React.FC = () => {
	const searchParams = useSearchParams();
	const site = searchParams.get('site');

	return (
		<div style={{ display: "flex", height: "100vh" }}>
			<Sidebar />
			<Box sx={{ flex: 1, overflowY: "auto",
				'&::-webkit-scrollbar': {
					width: 0,
				  },
				  '&::-webkit-scrollbar-track': {
					background: 'transparent',
				  },
				  '&::-webkit-scrollbar-thumb': {
					backgroundColor: 'rgba(0, 0, 0, 0.2)',
					borderRadius: 4,
					border: '0px solid transparent',
				  },
			 }}>
				<Header />
				<EditForm Site={site}/>
			</Box>
		</div>
	);
};

export default editSite;
