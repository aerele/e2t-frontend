"use client";
import Logo from "@/app/(DashboardLayout)/layout/shared/logo/Logo";
import AuthLogin from "@/app/authForms/AuthLogin";
import PageContainer from "@/app/components/container/PageContainer";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Grid, IconButton, Stack, Typography } from "@mui/material";
import { useFrappeAuth, useFrappePostCall } from "frappe-react-sdk";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as React from "react";
import { useState } from "react";
import { Toaster, toast } from "sonner";
import { useDispatch } from "@/store/hooks";
import {
	setFullname,
	setEmail,
	setImage,
	setTimezone,
} from "@/store/apps/userProfile/UserProfileSlice";

export default function Login() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const router = useRouter();
	const dispatch = useDispatch();

	const { login } = useFrappeAuth();
	const { call } = useFrappePostCall(
		"e2t_backend.api.user_details.get_user_details"
	);

	function onSubmit(): void {
		login({
			username: username,
			password: password,
		})
			.then((res) => {
				toast.success("Successfully Logged In");
				// dispatch(fetchUserDetails());
				call({})
					.then((res) => {
						dispatch(setFullname(res.message.fullname))
						dispatch(setEmail(res.message.email))
						dispatch(setImage(res.message.image))
						dispatch(setTimezone(res.message.time_zone))
					})
					.catch((err) => toast.error("Something went wrong!"));
				router.push("/home");
			})
			.catch((err) => {
				toast.error("Incorrect Username or Password");
				console.log(err);
			});
	}

	const action = (
		<React.Fragment>
			<IconButton size="small" aria-label="close" color="inherit">
				<CloseIcon fontSize="small" />
			</IconButton>
		</React.Fragment>
	);
	const logdial = (
		<React.Fragment>
			<IconButton size="small" aria-label="close" color="inherit">
				<CloseIcon fontSize="small" />
			</IconButton>
		</React.Fragment>
	);

	return (
		<PageContainer title="Login Page" description="">
			<Toaster richColors></Toaster>
			<Grid
				container
				spacing={0}
				justifyContent="center"
				sx={{ height: "100vh" }}
			>
				<Grid
					item
					xs={12}
					sm={12}
					lg={7}
					xl={8}
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
					lg={5}
					xl={4}
					display="flex"
					justifyContent="center"
					alignItems="center"
				>
					<Box p={4}>
						<AuthLogin
							title="Welcome to E2T"
							subtext={
								<Typography variant="subtitle1" color="textSecondary" mb={1}>
									Your Admin Dashboard
								</Typography>
							}
							subtitle={
								<Stack direction="row" spacing={1} mt={3}>
									<Typography
										color="textSecondary"
										variant="h6"
										fontWeight="500"
									>
										New to E2T?
									</Typography>
									<Typography
										component={Link}
										href="/register"
										fontWeight="500"
										sx={{
											textDecoration: "none",
											color: "primary.main",
										}}
									>
										Create an account
									</Typography>
								</Stack>
							}
							username={username}
							password={password}
							setUsername={setUsername}
							setPassword={setPassword}
							submit={onSubmit}
						/>
					</Box>
				</Grid>
			</Grid>
		</PageContainer>
	);
}
