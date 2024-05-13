"use client";
import Link from "next/link";
import { Grid, Box, Stack, Typography, Alert, Button } from "@mui/material";
import PageContainer from "@/app/components/container/PageContainer";
import Logo from "@/app/(DashboardLayout)/layout/shared/logo/Logo";
import AuthLogin from "@/app/authForms/AuthLogin";
import Image from "next/image";
import { useState } from "react";
import { useFrappeAuth } from "frappe-react-sdk";
import {useRouter} from 'next/navigation'

export default function Login() {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [showAlert, setShowAlert] = useState(false);

	const {
		login
	  } = useFrappeAuth();

	function onSubmit(): void{
		login({
			username:username,
			password:password
		  }).then((res) => {
		    window.location.href = '/home'
		  }).catch((err) => {
			setShowAlert(true)
			console.log(err)
		  })
	}

	return (
		<PageContainer title="Login Page" description="this is Sample page">
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
						{
							showAlert ? 
							<Alert
								variant="filled"
								severity="info"
								color="error"

								action={
									<Button color="inherit" size="small" onChange={() => setShowAlert(false)}>
									X
									</Button>
								}
								>
								Username or Password may be Incorrcet
							</Alert> : <></>
						}
					</Box>
				</Grid>	
			</Grid>
		</PageContainer>
	);
}
