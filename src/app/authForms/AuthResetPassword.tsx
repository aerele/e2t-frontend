import { Button, Stack } from "@mui/material";
import Link from "next/link";

import CustomTextField from "@/app/components/forms/theme-elements/CustomTextField";
import CustomFormLabel from "@/app/components/forms/theme-elements/CustomFormLabel";
import { resetPassword } from "@/app/(DashboardLayout)/types/auth/auth";


const AuthResetPassword = ({
    new_password,
    confirm_password,
    setNewPassword,
    setConfirmPassword,
    submit
    
}: resetPassword ) => (
    <>
      <Stack mt={4} spacing={2}>
        <CustomFormLabel htmlFor="new-password">New Password</CustomFormLabel>
        <CustomTextField id="new-password" variant="outlined" fullWidth value={new_password} onChange={(e:any)=>{setNewPassword(e.target.value)}}/>
        <CustomFormLabel htmlFor="confirm-password">Confirm Password</CustomFormLabel>
        <CustomTextField id="confirm-password" variant="outlined" fullWidth value={confirm_password} onChange={(e:any)=>{setConfirmPassword(e.target.value)}}/>

        <Button
          color="primary"
          variant="contained"
          size="large"
          fullWidth
          type="submit"
          onClick={submit}
        >
          Reset
        </Button>
        
      </Stack>
    </>
);

export default AuthResetPassword;
