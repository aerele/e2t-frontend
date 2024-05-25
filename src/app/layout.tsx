import type { Metadata } from "next";

import { Providers } from "@/store/providers";
import React from "react";
import MyApp from "./app";
// import "react-quill/dist/quill.snow.css";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "./globals.css";

export const metadata: Metadata = {
	title: "E2T",
	description: "ERPNext to Tally Migrator",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body>
				<Providers>
						<MyApp>{children}</MyApp>
				</Providers>
			</body>
		</html>
	);
}
