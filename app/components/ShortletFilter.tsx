"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { shortlets } from "../data/ShortletsDemo";
import { IoLocationSharp } from "react-icons/io5";
import { HiUsers } from "react-icons/hi2";
import { GrFormNextLink, GrFormPreviousLink } from "react-icons/gr";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type Shortlet = (typeof shortlets)[0];

const ShortletFilter: React.FC = () => {
	const containerRef = useRef<HTMLDivElement>(null);
	const [form, setForm] = useState({
		location: "All",
		type: "All",
		minPrice: "",
		maxPrice: "",
		bedrooms: "",
		dateNeeded: "",
	});
	const [filters, setFilters] = useState({
		location: "All",
		type: "All",
		minPrice: null as number | null,
		maxPrice: null as number | null,
		bedrooms: null as number | null,
		dateNeeded: "",
	});

	// Filter logic
	const handleFilter = () => {
		setFilters({
			location: form.location,
			type: form.type,
			minPrice: form.minPrice ? parseInt(form.minPrice) : null,
			maxPrice: form.maxPrice ? parseInt(form.maxPrice) : null,
			bedrooms: form.bedrooms ? parseInt(form.bedrooms) : null,
			dateNeeded: form.dateNeeded,
		});
	};

	// Filter the shortlets based on form values
	const filteredShortlets = shortlets.filter((shortlet) => {
		const matchesLocation =
			filters.location === "All" ||
			shortlet.location.includes(filters.location);
		const matchesType =
			filters.type === "All" || shortlet.type === filters.type;
		const matchesMinPrice =
			filters.minPrice === null || shortlet.pricePerNight >= filters.minPrice;
		const matchesMaxPrice =
			filters.maxPrice === null || shortlet.pricePerNight <= filters.maxPrice;
		const matchesBedrooms =
			filters.bedrooms === null || shortlet.bedrooms >= filters.bedrooms;
		const matchesDate =
			!filters.dateNeeded ||
			(new Date(filters.dateNeeded) >= new Date(shortlet.availableFrom) &&
				new Date(filters.dateNeeded) <= new Date(shortlet.availableTo));

		return (
			matchesLocation &&
			matchesType &&
			matchesMinPrice &&
			matchesMaxPrice &&
			matchesBedrooms &&
			matchesDate
		);
	});


    const visibleItems = filteredShortlets; 

	// Handle horizontal scroll functionality
	const scrollBy = (offset: number) => {
		if (containerRef.current) {
			containerRef.current.scrollBy({
				left: offset,
				behavior: "smooth",
			});
		}
	};

	// Generate the options for locations and types
	const uniqueLocations = ["All", ...new Set(shortlets.map((s) => s.location))];
	const uniqueTypes = ["All", ...new Set(shortlets.map((s) => s.type))];

	return (
		<div className="max-w-6xl mx-auto p-4">
			<h2 className="text-2xl font-bold mb-4">Filter Shortlets</h2>
			<div className="mb-3 w-full">
				<div className="flex flex-wrap gap-4 mb-6">
					{/* Filter Inputs */}
					<select
						value={form.location}
						onChange={(e) => setForm({ ...form, location: e.target.value })}
						className="flex-1 p-2 bg-gray-100  rounded-lg dark:bg-gray-800 dark:text-white"
					>
						{uniqueLocations.map((loc) => (
							<option key={loc} value={loc}>
								{loc}
							</option>
						))}
					</select>

					<select
						value={form.type}
						onChange={(e) => setForm({ ...form, type: e.target.value })}
						className="flex-1 p-2 bg-gray-100 rounded-lg dark:bg-gray-800 dark:text-white"
					>
						{uniqueTypes.map((t) => (
							<option key={t} value={t}>
								{t}
							</option>
						))}
					</select>

					<input
						type="number"
						placeholder="Min Price"
						value={form.minPrice}
						onChange={(e) => setForm({ ...form, minPrice: e.target.value })}
						className="flex-1 p-2 bg-gray-100  rounded-lg dark:bg-gray-800 dark:text-white"
						style={{
							WebkitAppearance: "none", // For Safari
							MozAppearance: "textfield", // For Firefox
						}}
					/>

					<input
						type="number"
						placeholder="Max Price"
						value={form.maxPrice}
						onChange={(e) => setForm({ ...form, maxPrice: e.target.value })}
						className="flex-1 p-2  rounded-lg bg-gray-100 dark:bg-gray-800 dark:text-white"
						style={{
							WebkitAppearance: "none", // For Safari
							MozAppearance: "textfield", // For Firefox
						}}
					/>

					<input
						type="number"
						placeholder="Min Bedrooms"
						value={form.bedrooms}
						onChange={(e) => setForm({ ...form, bedrooms: e.target.value })}
						className="flex-1 p-2  rounded-lg bg-gray-100 dark:bg-gray-800 dark:text-white"
						style={{
							WebkitAppearance: "none", // For Safari
							MozAppearance: "textfield", // For Firefox
						}}
					/>

					<input
						type="date"
						value={form.dateNeeded}
						onChange={(e) => setForm({ ...form, dateNeeded: e.target.value })}
						className="flex-1 p-2  rounded-lg bg-gray-100 dark:bg-gray-800 dark:text-white"
					/>
				</div>

				<button
					onClick={handleFilter}
					className="flex items-center justify-center m-auto w-[50%] p-2 bg-blue-500 text-white rounded-lg dark:bg-blue-700"
				>
					Filter
				</button>
			</div>

			{/* Display Filtered Shortlets */}
			{filteredShortlets.length === 0 ? (
				<p className="font-bold text-center">No shortlet available</p>
			) : (
				<div className="relative overflow-hidden">
					{/* Horizontal Scroll for Cards */}
					<div
						ref={containerRef}
						className="flex  gap-4 overflow-x-scroll scroll-smooth pb-4"
						style={{
							scrollbarWidth: "none", // For Firefox
							msOverflowStyle: "none", // For IE and Edge
						}}
					>
						{visibleItems.map((s) => (
							<div
								key={s.id}
								className="flex flex-col justify-between h-auto flex-shrink-0 w-[280px] bg-gray-50 dark:bg-gray-800 rounded-lg  p-3"
							>
								<Image
									src={s.image}
									alt={s.name}
									width={250}
									height={150}
									className="w-full h-[200px] object-cover rounded"
								/>
								<p className="flex gap-1.5 items-center text-sm mt-2 text-orange-400">
									<IoLocationSharp /> {s.location}
								</p>
								<h3 className="font-semibold my-2 text-[var(--foreground)]">
									{s.name}
								</h3>

								<p className="flex gap-1.5 items-center text-sm mt-2 text-gray-500 dark:text-gray-300">
									<HiUsers /> <span>{s.guests} guests</span> -
									<span>{s.bedrooms} Bedroom(s)</span> -{" "}
									<span>{s.bathrooms} Baths</span>
								</p>

								<p className="truncate w-full mt-2">
									{" "}
									{s.amenities.join(", ")}
								</p>

								<div className="flex justify-between items-center mt-2">
									<p> Rating: {s.rating}</p>
									<p className="font-bold my-2 text-[var(--color-accent)]">
										₦{s.pricePerNight.toLocaleString()}{" "}
										<span className="text-sm font-light text-[var(--foreground)]">
											per night
										</span>
									</p>
								</div>
							</div>
						))}
					</div>

					{/* Scroll Buttons */}
					<div className="flex justify-center gap-4 mt-4">
						<button
							onClick={() => scrollBy(-300)}
							className="p-2 bg-gray-200 rounded-lg dark:bg-gray-700 hover:bg-orange-400 transition-all duration-300 cursor-pointer"
						>
							<GrFormPreviousLink />
						</button>
						<button
							onClick={() => scrollBy(300)}
							className="p-2 bg-gray-200 rounded-lg dark:bg-gray-700 hover:bg-orange-400 transition-all duration-300 cursor-pointer"
						>
							<GrFormNextLink />
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default ShortletFilter;
