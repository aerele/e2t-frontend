import React from 'react';
import { Box, Typography, Button, Divider } from "@mui/material";
import CustomTextField from "@/app/components/forms/theme-elements/CustomTextField";
import CustomFormLabel from "@/app/components/forms/theme-elements/CustomFormLabel";
import { Stack } from "@mui/system";
import { registerType } from "@/app/(DashboardLayout)/types/auth/auth";
import AuthSocialButtons from "./AuthSocialButtons";
import PasswordStrengthBar from 'react-password-strength-bar';

const AuthRegister: React.FC<registerType> = ({
  title,
  subtitle,
  subtext,
  name,
  email,
  password,
  confirmPassword,
  setName,
  setEmail,
  setPassword,
  setConfirmPassword,
  submit
}) => {
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  return (
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
          <CustomTextField id="name" variant="outlined" fullWidth value={name} onChange={(e) => setName(e.target.value)} />
          <CustomFormLabel htmlFor="email">Email Adddress</CustomFormLabel>
          <CustomTextField id="email" variant="outlined" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} />
          <CustomFormLabel htmlFor="password">Password</CustomFormLabel>
          <CustomTextField id="password" type="password" variant="outlined" fullWidth value={password} onChange={handlePasswordChange} />
          <PasswordStrengthBar password={password} />
          <CustomFormLabel htmlFor="confirmPassword">Confirm Password</CustomFormLabel>
          <CustomTextField id="confirmPassword" type="password" variant="outlined" fullWidth value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
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
};

export default AuthRegister;
