"use client";
import React from "react";
import Sidebar from "../../app/(DashboardLayout)/layout/vertical/sidebar/Sidebar";
import Header from "../(DashboardLayout)/layout/horizontal/header/Header";
import Table from "../(DashboardLayout)/tables/search/page";
import { useEffect } from "react";
import { useFrappePostCall, useFrappeAuth } from "frappe-react-sdk";
import {
	setEmail,
	setFullname,
	setImage,
	setTimezone,
} from "@/store/apps/userProfile/UserProfileSlice";
import { useDispatch } from "@/store/hooks";
import { Toaster, toast } from "sonner";

const Home: React.FC = () => {
	const dispatch = useDispatch();

	const { call } = useFrappePostCall(
		"e2t_backend.api.user_details.get_user_details"
	);
	useEffect(() => {
		call({})
			.then((res) => {
				console.log(res);

				dispatch(setFullname(res.message.fullname));
				dispatch(setEmail(res.message.email));
				dispatch(setImage(res.message.image));
				dispatch(setTimezone(res.message.time_zone));
			})
			.catch((err) => toast.error("Unable to fetch user details!"));
	}, [dispatch]);

	return (
		<div style={{ display: "flex", height: "100vh" }}>
			<Toaster richColors></Toaster>

			<Sidebar />
			<div style={{ flex: 1, overflowY: "auto" }}>
				<Header />
				<Table />
			</div>
		</div>
	);
};

export default Home;
