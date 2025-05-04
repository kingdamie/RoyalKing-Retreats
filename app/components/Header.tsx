"use client";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";

const Header = () => {
const [isMenuOpen, setIsMenuOpen] = useState(false);
const [isScrolled, setIsScrolled] = useState(false);

const toggleMenu = () => {
	setIsMenuOpen((prev) => !prev);
};

useEffect(() => {
	const handleScroll = () => {
		if (window.scrollY > 0) {
			setIsScrolled(true);
		} else {
			setIsScrolled(false);
		}
	};

	window.addEventListener("scroll", handleScroll);
	return () => {
		window.removeEventListener("scroll", handleScroll);
	};
}, []);

useEffect(() => {
	if (isMenuOpen) {
		document.body.style.overflow = "hidden";
	} else {
		document.body.style.overflow = "";
	}
}, [isMenuOpen]);

const closeMenu = () => setIsMenuOpen(false);

	return (
		<>
			<header
				className={`flex items-center justify-between w-full px-4 py-4 transition-all duration-300 ease-in-out z-50 sticky top-0 ${
					isScrolled ? "bg-opacity-30 backdrop-blur-md" : "bg-transparent"
				}`}
			>
				<Logo />

				{/* Navigation */}
				<nav
					className={`${
						isMenuOpen
							? "absolute top-16 left-4 right-4 bg-white dark:bg-black rounded-md shadow-md p-4 z-50"
							: "hidden"
					} md:static md:flex md:items-center md:gap-4 md:bg-transparent`}
				>
					<ul className="flex flex-col md:flex-row gap-7 text-gray-200 dark:text-gray-200">
						<li className="cursor-pointer text-[var(--color-primary)] font-bold">
							Home
						</li>
						<li className="cursor-pointer hover:text-[var(--color-secondary)] transition duration-300 ease-in-out">
							About
						</li>
						<li className="cursor-pointer hover:text-[var(--color-secondary)] transition duration-300 ease-in-out">
							Services
						</li>
						<li className="cursor-pointer hover:text-[var(--color-secondary)] transition duration-300 ease-in-out">
							Contact
						</li>
					</ul>

					{/* Mobile-only Button */}
					<div className="mt-4 md:hidden">
						<button className="w-full px-4 py-2  text-white bg-[var(--color-primary)] rounded hover:bg-orange-600 cursor-pointer transition duration-300 ease-in-out hover:scale-105">
							Login
						</button>
					</div>
				</nav>

				{/* Mobile Menu Toggle Button */}
				<div className="md:hidden z-50">
					<button
						onClick={toggleMenu}
						className="text-gray-700 p-2 focus:outline-none cursor-pointer dark:text-gray-200"
					>
						{isMenuOpen ? <X size={24} /> : <Menu size={24} />}
					</button>
				</div>

				{/* Desktop Buttons */}
				<div className="hidden md:flex items-center gap-4">
					<button className="px-4 py-2 text-[var(--color-primary)] font-bold rounded hover:bg-orange-200 transition duration-300 ease-in-out cursor-pointer">
						Login
					</button>
					<button className="px-4 py-2 text-white bg-[var(--color-primary)] rounded hover:bg-orange-600 cursor-pointer transition duration-300 ease-in-out hover:scale-105">
						Sign Up
					</button>
				</div>
			</header>

			{/* Overlay */}
			{isMenuOpen && (
				<div
					className="fixed inset-0 bg-black/50 z-40 md:hidden"
					onClick={closeMenu}
				/>
			)}
		</>
	);
};

export default Header;
