import { Box, Typography, Button, Divider } from "@mui/material";
import Link from "next/link";
import CustomTextField from "@/app/components/forms/theme-elements/CustomTextField";
import CustomFormLabel from "@/app/components/forms/theme-elements/CustomFormLabel";
import { Stack } from "@mui/system";
import { registerType } from "@/app/(DashboardLayout)/types/auth/auth";
import AuthSocialButtons from "./AuthSocialButtons";

const AuthRegister = ({
    title,
    subtitle,
    subtext,
    name,
    email,
    password,
    setName,
    setEmail,
    setPassword,
    submit
  }: registerType) => (
  <>
    {title ? (
      <Typography fontWeight="700" variant="h3" mb={1}>
        {title}
      </Typography>
    ) : null}

    {subtext}
    <AuthSocialButtons title="Sign up with" />

    <Box mt={3}>
      <Divider>
        <Typography
          component="span"
          color="textSecondary"
          variant="h6"
          fontWeight="400"
          position="relative"
          px={2}
        >
          or sign up with
        </Typography>
      </Divider>
    </Box>

    <Box>
      <Stack mb={3}>
        <CustomFormLabel htmlFor="name">Name</CustomFormLabel>
        <CustomTextField id="name" variant="outlined" fullWidth  value={name} onChange={(e:any)=>{setName(e.target.value)}}/>
        <CustomFormLabel htmlFor="email">Email Adddress</CustomFormLabel>
        <CustomTextField id="email" variant="outlined" fullWidth  value={email} onChange={(e:any)=>{setEmail(e.target.value)}}/>
        <CustomFormLabel htmlFor="password">Password</CustomFormLabel>
        <CustomTextField id="password" type="password" variant="outlined" fullWidth value={password} onChange={(e:any)=>setPassword(e.target.value)}
				/>
      </Stack>
      <Button
        color="primary"
        variant="contained"
        size="large"
        fullWidth
        type="submit"
        onClick={submit}
      >
        Sign Up
      </Button>
    </Box>
    {subtitle}
  </>
);

export default AuthRegister;
