"use client";
import RTL from "@/app/(DashboardLayout)/layout/shared/customizer/RTL";
import { AppState } from "@/store/store";
import "@/utils/i18n";
import { ThemeSettings } from "@/utils/theme/Theme";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { FrappeProvider } from "frappe-react-sdk";
import React from "react";
import { useSelector } from "react-redux";
const MyApp = ({ children }: { children: React.ReactNode }) => {
	const theme = ThemeSettings();
	const customizer = useSelector((state: AppState) => state.customizer);

	return (
		<>
			<FrappeProvider url='http://localhost:8023' socketPort="9023">
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
