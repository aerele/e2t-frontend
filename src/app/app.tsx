"use client";
import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import RTL from "@/app/(DashboardLayout)/layout/shared/customizer/RTL";
import { ThemeSettings } from "@/utils/theme/Theme";
import { useSelector } from "react-redux";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { AppState } from "@/store/store";
import "@/utils/i18n";
import { FrappeProvider } from "frappe-react-sdk";

const MyApp = ({ children }: { children: React.ReactNode }) => {
	const theme = ThemeSettings();
	const customizer = useSelector((state: AppState) => state.customizer);
	console.log(process.env);
	

	return (
		<>
			<FrappeProvider url='http://e2t.site:8000/app/home' socketPort="9000">
				<AppRouterCacheProvider options={{ enableCssLayer: true }}>
					<ThemeProvider theme={theme}>
						<RTL direction={customizer.activeDir}>
						<CssBaseline />
						{children}
						</RTL>
					</ThemeProvider>
				</AppRouterCacheProvider>
			</FrappeProvider>
		</>
	);
};

export default MyApp;
