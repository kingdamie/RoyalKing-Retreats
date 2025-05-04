import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import ClientWrapper from "./components/ClientWrapper";

// Roboto configuration
const roboto = Roboto({
	variable: "--font-roboto",
	subsets: ["latin"],
	weight: ["400", "500", "700"], // Optional: choose the weights you need
});

export const metadata: Metadata = {
	title: "Royalking Retreat",
	description: "Stay like Royality",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${roboto.variable} antialiased`}
				cz-shortcut-listen="true"
			>
				<Header />
				<ClientWrapper>{children}</ClientWrapper>
			</body>
		</html>
	);
}
