import React from "react";

const SplashScreen = () => {
	return (
		<div className="fixed inset-0 z-50 flex flex-col items-center justify-center">
			<h1 className="text-3xl font-bold text-[var(--foreground)] mb-6 animate-fade-in">
				Welcome to{" "}
				<span className="text-[var(--color-primary)]">RoyalRetreats</span>
			</h1>
			<div className="w-40 h-1 bg-gray-300 overflow-hidden rounded-full">
				<div className="h-full w-1/2 bg-[var(--color-secondary)] animate-moving-bar" />
			</div>
		</div>
	);
};

export default SplashScreen;
