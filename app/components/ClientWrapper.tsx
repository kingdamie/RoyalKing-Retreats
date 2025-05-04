"use client";
import { useState, useEffect } from "react";
import SplashScreen from "./SplashScreen";


export default function ClientWrapper({
	children,
}: {
	children: React.ReactNode;
}) {
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => setLoading(false), 3000); // 3 seconds
		return () => clearTimeout(timer);
	}, []);

	return loading ? <SplashScreen /> : <>{children}</>;
}
