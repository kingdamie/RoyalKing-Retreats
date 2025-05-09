"use client";

import { useEffect, useState } from "react";
import ShortletFilter from "./components/ShortletFilter";

const images = ["/Hero/hero1.jpg", "/Hero/hero2.jpg", "/Hero/hero3.jpg"];

export default function Home() {
	const [currentImage, setCurrentImage] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentImage((prev) => (prev + 1) % images.length);
		}, 5000); // Change image every 5 seconds

		return () => clearInterval(interval);
	}, []);

	return (
		<main>
			{/* hero-section starts  */}
			<div className="relative h-dvh">
				<div
					className="absolute top-[-20vh] inset-0 bg-cover bg-center transition duration-700 ease-in-out"
					style={{ backgroundImage: `url(${images[currentImage]})` }}
				></div>
				<div className="absolute top-[-20vh] left-0 right-0 bottom-0 bg-black opacity-50"></div>
				<div className="relative z-10 flex h-full w-full flex-col items-center justify-center text-center text-white">
					<p className="animate-fade-in">Discover your home</p>
					<h1 className="text-3xl md:text-6xl font-bold mb-4 animate-fade-in">
						Discover Your Dream Property with RoyalRetreats
					</h1>
					<p className="text-lg md:text-xl mb-6 animate-fade-in">
						Your journey to finding the perfect property begins here. Explore
						our listings to find the home that matches your dreams.
					</p>
					<button className="px-6 py-3 bg-orange-500 hover:bg-orange-600 transition rounded-md text-white font-medium">
						Get Started
					</button>
				</div>
			</div>
			{/* hero-section ends  */}

			{/* statistics section starts */}
			<div className="flex flex-col items-center justify-center py-20">
				<div className="grid grid-cols-2 md:grid-cols-4 gap-8">
					<div className="p-6 rounded-lg shadow-md text-center bg-white dark:bg-gray-800">
						<h3 className="text-xl font-semibold">100+</h3>
						<p>Properties for Clients</p>
					</div>
					<div className="p-6 rounded-lg shadow-md text-center bg-white dark:bg-gray-800">
						<h3 className="text-xl font-semibold">50+</h3>
						<p>Happy Clients</p>
					</div>
					<div className="p-6 rounded-lg shadow-md text-center bg-white dark:bg-gray-800">
						<h3 className="text-xl font-semibold">10+</h3>
						<p>Years of Experience</p>
					</div>
					<div className="p-6 rounded-lg shadow-md text-center bg-white dark:bg-gray-800">
						<h3 className="text-xl font-semibold">24/7</h3>
						<p>Customer Support</p>
					</div>
				</div>
			</div>
			{/* statistics section ends */}

			<ShortletFilter/>
		</main>
	);
}
