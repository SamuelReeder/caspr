/**
 * Searchbar component
 * @param {Graph[]} graphs - Array of graph data
 * @param {React.Dispatch<React.SetStateAction<Graph[] | undefined>>} setGraphs - Function to set the graph data
 * @returns {ReactElement} Searchbar component
 */
import React, { useState, useEffect, useRef } from "react";
import { Box, Input, Tooltip } from "@chakra-ui/react";
import { Graph } from "@/types";
import { fetchOwnerData, handleSearch } from "@/utils/searchFilter";

interface SearchbarProps {
	search: string;
	setSearch: React.Dispatch<React.SetStateAction<string>>;
	graphs: Graph[] | undefined;
	setGraphs: React.Dispatch<React.SetStateAction<Graph[] | undefined>>;
	sortType: string;
	filterType: string;
}

const Searchbar = ({
	search,
	setSearch,
	graphs,
	setGraphs,
	sortType,
	filterType
}: SearchbarProps) => {
	const [originalGraphs, setOriginalGraphs] = useState<[Graph, string][]>([]);

	useEffect(() => {
		if (originalGraphs.length === 0) {
			const fetchData = async () => {
				const graphsWithUsers = await fetchOwnerData(graphs || []);
				setOriginalGraphs(graphsWithUsers);
			};
			fetchData();
		}
	}, [graphs, sortType, filterType]);

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value);
		const filteredGraphs = handleSearch(
			e.target.value,
			originalGraphs,
			sortType,
			filterType
		);
		setGraphs(filteredGraphs);
	};

	return (
		<Box className="mb-6">
			<Tooltip
				label="Search cannot be applied while a sort or filter is applied"
				aria-label="A tooltip"
				isDisabled={sortType === "none" && filterType === "none"}
			>
				<Input
					isDisabled={sortType !== "none" || filterType !== "none"}
					type="text"
					placeholder="Search for a graph"
					value={search}
					onChange={handleSearchChange}
					className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
				/>
			</Tooltip>
		</Box>
	);
};

export default Searchbar;
