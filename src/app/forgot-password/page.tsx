"use client"


import { Grid, Box, Typography } from '@mui/material';
import Logo from '@/app/(DashboardLayout)/layout/shared/logo/Logo';
import PageContainer from '@/app/components/container/PageContainer';
import AuthForgotPassword from "@/app/authForms/AuthForgotPassword";
import Image from 'next/image';
import { useState, useEffect } from "react";
import { useFrappePostCall } from "frappe-react-sdk";
import { Toaster, toast } from "sonner"


export default function ForgotPassword() {
	const [email, setEmail] = useState('')
	const [isButtonClick, setButtonClick] = useState(false)

	const { call } = useFrappePostCall('frappe.core.doctype.user.user.reset_password')

	useEffect(() => {{
		if (isButtonClick){
			call({
				user: email 
			}).then((r) => {
				setButtonClick(!isButtonClick)
				if(r._server_messages){
					let result = JSON.parse(r._server_messages)
					toast.success(JSON.parse(result).message)
				}
				if(r.message){
					toast.success(r.message)
				}
			}).catch((r) => {
				setButtonClick(!isButtonClick)
				if(r._server_messages){
					let result = JSON.parse(r._server_messages)
					toast.error(JSON.parse(result).message)
				}
				if(r.message){
					toast.error(r.message)
				}
			})
		}
	  }
	}, [isButtonClick])

	function onSubmit() {
		setButtonClick(!isButtonClick)
	}
	
	return(
		<PageContainer title="Forgot Password Page" description="this is Sample page">
			<Toaster richColors></Toaster>
			<Grid container justifyContent="center" spacing={0} sx={{ overflowX: 'hidden' }}>
				<Grid
					item
					xs={12}
					sm={12}	
					lg={8}
					xl={9}
					sx={{
						position: 'relative',
						'&:before': {
							content: '""',
							background: 'radial-gradient(#d2f1df, #d3d7fa, #bad8f4)',
							backgroundSize: '400% 400%',
							animation: 'gradient 15s ease infinite',
							position: 'absolute',
							height: '100%',
							width: '100%',
							opacity: '0.3',
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
							height={'calc(100vh - 75px)'}
							sx={{
								display: {
									xs: 'none',
									lg: 'flex',
								},
							}}
						>
							<Image
								src={"/images/backgrounds/login-bg.svg"}
								alt="bg" width={500} height={500}
								style={{
									width: '100%',
									maxWidth: '500px', maxHeight: '500px',
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
							Forgot your password?
						</Typography>

						<Typography color="textSecondary" variant="subtitle2" fontWeight="400" mt={2}>
							Please enter the email address associated with your account and We will email you a link
							to reset your password.
						</Typography>
						<AuthForgotPassword 
						email={email}
						setEmail={setEmail}
						submit={onSubmit}
						/>
					</Box>
				</Grid>
			</Grid>
		</PageContainer>
	)
};


