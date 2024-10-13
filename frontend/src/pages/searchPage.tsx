/**
 * Search Page
 */

import React from 'react';
// import Sidebar from '../components/sidebar';
// import Sidebar from '@/components/Sidebar';

export default function searchPage() {
	return (
		<div className="flex h-screen">
			{/* Sidebar */}
			{/* <Sidebar /> */}
			{/* Main Content */}
			<div className="flex-1 p-6">
				{/* Search Bar */}
				<div className="mb-6">
					<input
						type="text"
						placeholder="Hinted search text"
						className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
					/>
				</div>

				{/* Graphs Grid */}
				<div className="grid grid-cols-4 gap-4 mb-6">
					<div className="flex flex-col items-center">
						<div className="w-full h-32 bg-gray-200 mb-2"></div>
						<span className="text-sm font-semibold">Text</span>
					</div>
					<div className="flex flex-col items-center">
						<div className="w-full h-32 bg-gray-200 mb-2"></div>
						<span className="text-sm font-semibold">Text</span>
					</div>
					<div className="flex flex-col items-center">
						<div className="w-full h-32 bg-gray-200 mb-2"></div>
						<span className="text-sm font-semibold">Text</span>
					</div>
					<div className="flex flex-col items-center">
						<div className="w-full h-32 bg-gray-200 mb-2"></div>
						<span className="text-sm font-semibold">Text</span>
					</div>
				</div>

				{/* Large Graph Preview */}
				<div className="bg-gray-100 p-4 rounded-lg">
					<div className="w-full h-64 bg-gray-300 mb-4"></div>
					<span className="text-sm font-semibold">Text</span>
				</div>
			</div>
		</div>
	);
}