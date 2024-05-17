import { Button, Stack } from "@mui/material";
import Link from "next/link";

import CustomTextField from "@/app/components/forms/theme-elements/CustomTextField";
import CustomFormLabel from "@/app/components/forms/theme-elements/CustomFormLabel";
import { forgotPassword } from "@/app/(DashboardLayout)/types/auth/auth";


const AuthForgotPassword = ({
		email,
		submit,
		setEmail
		
}: forgotPassword ) => (
		<>
			<Stack mt={4} spacing={2}>
				<CustomFormLabel htmlFor="reset-email">Email Adddress</CustomFormLabel>
				<CustomTextField id="reset-email" variant="outlined" fullWidth value={email} onChange={(e:any)=>{setEmail(e.target.value)}}/>

				<Button
					color="primary"
					variant="contained"
					size="large"
					fullWidth
					type="submit"
					onClick={submit}
				>
					Forgot Password
				</Button>
				<Button
					color="primary"
					size="large"
					fullWidth
					component={Link}
					href="/login"
				>
					Back to Login
				</Button>
			</Stack>
		</>
);

export default AuthForgotPassword;
