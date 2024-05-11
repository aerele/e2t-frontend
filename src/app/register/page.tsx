"use client";
import Link from "next/link";
import { Grid, Box, Typography, Stack } from "@mui/material";
import PageContainer from "@/app/components/container/PageContainer";
import Logo from "@/app/(DashboardLayout)/layout/shared/logo/Logo";
import { useContext, useEffect, useState } from 'react'
import AuthRegister from "@/app/authForms/AuthRegister";
import Image from "next/image";
import { useFrappePostCall } from 'frappe-react-sdk'
import { Toaster, toast } from "sonner"
import { redirect } from "next/navigation"

export default function Register() {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
  const [isSubmitted, setisSubmitted] = useState(false)
  const { call: signup } = useFrappePostCall('e2t_backend.python.authentication.sign_up')
    
  useEffect(() => {{
    if (isSubmitted){
    signup({
      email: email,
      full_name: name,
      password: password
    }).then((res) => {
      if(res && res.message){
        if (res.message.status){
          toast.success(res.message.msg)
          setisSubmitted(!isSubmitted)
          redirect('/login')
        }
        else{
          toast.error(res.message.msg)
          setisSubmitted(!isSubmitted)
        }
      }
    }).catch((e) => {
      if (e.hasOwnProperty('_server_messages')){
        const serverMessages = JSON.parse(e._server_messages);
        if (serverMessages){
          const serverErrorMessage=JSON.parse(serverMessages);
          toast.error(serverErrorMessage.message)
          setisSubmitted(!isSubmitted)
        }
      }
  })
  }
  }
}, [isSubmitted])

  function onSubmit(): void{
    setisSubmitted(!isSubmitted)
  }

  return (
  <PageContainer title="Register Page" description="this is Sample page">
    <Toaster richColors></Toaster>
    <Grid
      container
      spacing={0}
      justifyContent="center"
      sx={{ overflowX: "hidden" }}
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
              alt="bg" width={500} height={500}
              style={{
                width: "100%",
                maxWidth: "500px",  maxHeight: '500px',
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
          <AuthRegister
            title="Welcome to E2T"
            subtext={
              <Typography variant="subtitle1" color="textSecondary" mb={1}>
                Your Admin Dashboard
              </Typography>
            }
            subtitle={
              <Stack direction="row" spacing={1} mt={3}>
                <Typography color="textSecondary" variant="h6" fontWeight="400">
                  Already have an Account?
                </Typography>
                <Typography
                  component={Link}
                  href="../login"
                  fontWeight="500"
                  sx={{
                    textDecoration: "none",
                    color: "primary.main",
                  }}
                >
                  Sign In
                </Typography>
              </Stack>
            }
            name={name}
            email={email}
            password={password}
            setName={setName}
            setEmail={setEmail}
            setPassword={setPassword}
            submit={onSubmit}
          />
        </Box>
      </Grid>
    </Grid>
  </PageContainer>
)};

