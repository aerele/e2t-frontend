"use client";

import { Grid, Box, Typography } from "@mui/material";
import Logo from "@/app/(DashboardLayout)/layout/shared/logo/Logo";
import PageContainer from "@/app/components/container/PageContainer";
import AuthResetPassword from "@/app/authForms/AuthResetPassword";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useFrappePostCall } from "frappe-react-sdk";
import { Toaster, toast } from "sonner";
import { useRouter } from "next/navigation";

export default function ResetPassword() {
	const router = useRouter();
	const [new_password, setNewPassword] = useState("");
	const [confirm_password, setConfirmPassword] = useState("");
	const [isButtonClick, setButtonClick] = useState(false);
	const [key, setKey] = useState("");

	const { call } = useFrappePostCall(
		"frappe.core.doctype.user.user.update_password"
	);

	useEffect(() => {
		{
			if (isButtonClick) {
				call({
					key: key,
					old_password: "",
					new_password: new_password,
					confirm_password: confirm_password,
					logout_all_sessions: 1,
				})
					.then((r) => {
						setButtonClick(!isButtonClick);
						if (r._server_messages) {
							let result = JSON.parse(r._server_messages);
							toast.success(JSON.parse(result).message);
							setTimeout(() => {
								router.push("/login");
							}, 2000);
						}
						if (r.message) {
							toast.success(r.message);
							setTimeout(() => {
								router.push("/login");
							}, 2000);
						}
					})
					.catch((r) => {
						setButtonClick(!isButtonClick);
						if (r._server_messages) {
							let result = JSON.parse(r._server_messages);
							toast.error(JSON.parse(result).message);
						}
						if (r.message) {
							toast.error(r.message);
						}
					});
			}
		}
	}, [isButtonClick]);

	function onSubmit() {
		let key = window.location.href.split("?key=");
		if (key && key.length === 2) {
			setKey(key[1]);
		} else {
			toast.error("Invalid URL");
		}
		setButtonClick(!isButtonClick);
	}

	return (
		<PageContainer
			title="Forgot Password Page"
			description="this is Sample page"
		>
			<Toaster richColors></Toaster>
			<Grid
				container
				justifyContent="center"
				spacing={0}
				sx={{ overflowX: "hidden" }}
			>
				<Grid
					item
					xs={12}
					sm={12}
					lg={8}
					xl={9}
					sx={{
						position: "relative",
						"&:before": {
							content: '""',
							background: "radial-gradient(#d2f1df, #d3d7fa, #bad8f4)",
							backgroundSize: "400% 400%",
							animation: "gradient 15s ease infinite",
							position: "absolute",
							height: "100%",
							width: "100%",
							opacity: "0.3",
						},
					}}
				>
					<Box position="relative">
						<Box px={3}>
							<Logo />
						</Box>
						<Box
							alignItems="center"
							justifyContent="center"
							height={"calc(100vh - 75px)"}
							sx={{
								display: {
									xs: "none",
									lg: "flex",
								},
							}}
						>
							<Image
								src={"/images/backgrounds/login-bg.svg"}
								alt="bg"
								width={500}
								height={500}
								style={{
									width: "100%",
									maxWidth: "500px",
									maxHeight: "500px",
								}}
							/>
						</Box>
					</Box>
				</Grid>
				<Grid
					item
					xs={12}
					sm={12}
					lg={4}
					xl={3}
					display="flex"
					justifyContent="center"
					alignItems="center"
				>
					<Box p={4}>
						<Typography variant="h4" fontWeight="700">
							Reset your password
						</Typography>
						<AuthResetPassword
							new_password={new_password}
							confirm_password={confirm_password}
							setNewPassword={setNewPassword}
							setConfirmPassword={setConfirmPassword}
							submit={onSubmit}
						/>
					</Box>
				</Grid>
			</Grid>
		</PageContainer>
	);
}
