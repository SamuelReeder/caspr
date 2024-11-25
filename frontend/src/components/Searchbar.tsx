/**
 * Searchbar component
 * @param {Graph[]} graphs - Array of graph data
 * @param {React.Dispatch<React.SetStateAction<Graph[] | undefined>>} setGraphs - Function to set the graph data
 * @returns {ReactElement} Searchbar component
 */
import React, { useState, useEffect, useRef } from "react";
import { Box, Input } from "@chakra-ui/react";
import { Graph } from "@/types";
import { getUser } from "@/api/firestore"

interface SearchbarProps {
	graphs: Graph[] | undefined;
	setGraphs: React.Dispatch<React.SetStateAction<Graph[] | undefined>>;
}

const Searchbar = ({ graphs, setGraphs }: SearchbarProps) => {
	const [search, setSearch] = useState("");
	const originalGraphsRef = useRef<[Graph | undefined, string][]>([]);

	useEffect(() => {
		const fetchOwnerData = async () => {
			if (
				graphs &&
				graphs.length > 0 &&
				originalGraphsRef.current.length === 0
			) {
				originalGraphsRef.current = await Promise.all(
					graphs.map(async (graph) => {
						const user = await getUser(graph.owner);
						return [graph, user.name];
					})
				);
			}
		};
		fetchOwnerData();
	}, [graphs]);

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value);
		const value = e.target.value.toLowerCase();

		if (value.length > 0) {
			const filteredResults = originalGraphsRef.current?.filter(
				(item) =>
					item[0]?.graphName.toLowerCase().includes(value) ||
					item[0]?.graphDescription.toLowerCase().includes(value) ||
					item[1]?.toLowerCase().includes(value)
			);

			// Prioritize results by name, then description, then author
			const prioritizedResults = filteredResults?.sort((a, b) => {
				const aNameMatch = a[0]?.graphName.toLowerCase().includes(value) ? 1 : 0;
				const bNameMatch = b[0]?.graphName.toLowerCase().includes(value) ? 1 : 0;
				const aDescriptionMatch = a[0]?.graphDescription
					.toLowerCase()
					.includes(value)
					? 1
					: 0;
				const bDescriptionMatch = b[0]?.graphDescription
					.toLowerCase()
					.includes(value)
					? 1
					: 0;
				const aAuthorMatch = a[1]?.toLowerCase().includes(value) ? 1 : 0;
				const bAuthorMatch = b[1]?.toLowerCase().includes(value) ? 1 : 0;

				return (
					bNameMatch - aNameMatch || bDescriptionMatch - aDescriptionMatch || bAuthorMatch - aAuthorMatch
				);
			});

			setGraphs(prioritizedResults.map(item => item[0]).filter(graph => graph !== undefined));
		} else {
			setGraphs(originalGraphsRef.current.map(item => item[0]).filter(graph => graph !== undefined));
		}
	};

	return (
		<Box className="mb-6">
			<Input
				type="text"
				placeholder="Search for a graph"
				value={search}
				onChange={handleSearch}
				className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
			/>
		</Box>
	);
};

export default Searchbar;