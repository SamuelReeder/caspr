/**
 * Graph list component
 * @param {Array} graphs - List of graphs
 * @param {String} page - Page title
 * @returns {ReactElement} Graph list component
 */
import { Divider, Heading, Select, Text } from "@chakra-ui/react";
import { Graph, GraphListProps } from "@/types/graph";
import { useEffect, useState } from "react";

import ExploreGraphCard from "./ExploreGraphCard";
import { FullScreenLoader } from "@/components";
import MyGraphCard from "./MyGraphCard";
import { User } from "@/types";
import { getUser } from "@/api";
import { useAuth } from "@/context";

const GraphList = ({
	isLoading,
	graphs,
	page,
	sortOptions,
	filterOptions,
	sortType,
	setSortType,
	filterType,
	setFilterType
}: GraphListProps) => {
	const { firestoreUser } = useAuth();

	const [isOwnersLoading, setIsOwnersLoading] = useState(true);
	const [graphsWithOwners, setGraphsWithOwners] = useState<
		Array<{
			graph: Graph;
			owner: User | null;
		}>
	>([]);

	useEffect(() => {
		const fetchOwners = async () => {
			if (!graphs) return;

			setIsOwnersLoading(true);
			const withOwners = await Promise.all(
				graphs.map(async (graph) => {
					try {
						if (graph.owner == firestoreUser?.uid) {
							return { graph, owner: firestoreUser };
						}
						const owner = await getUser(graph.owner);
						return { graph, owner };
					} catch (error) {
						console.error(error);
						return { graph, owner: null };
					}
				})
			);

			setGraphsWithOwners(withOwners);
			setIsOwnersLoading(false);
		};

		fetchOwners();
	}, [firestoreUser, graphs]);

	if (isLoading || isOwnersLoading) {
		return <FullScreenLoader />;
	}

	return (
		<div className="mt-8">
			<div className="flex flex-row">
				<Heading size="md" mb={4}>
					{page}
				</Heading>

				<div className="ml-auto flex flex-row gap-2">
					{setSortType && sortOptions && (
						<Select
							placeholder={
								sortOptions.find((option) => option.value === sortType)
									?.label || "Apply Sort"
							}
							size="sm"
							onChange={(e) => {
								setSortType(e.target.value);
							}}
							className="!min-w-[125px] !rounded-md"
							variant="filled"
						>
							{sortOptions
								.filter((option) => option.value !== sortType)
								.map((option) => (
									<option key={option.value} value={option.value}>
										{option.label}
									</option>
								))}
						</Select>
					)}
					{setFilterType && filterOptions && (
						<Select
							placeholder={
								filterOptions.find((option) => option.value === filterType)
									?.label || "Apply filter"
							}
							size="sm"
							onChange={(e) => {
								setFilterType(e.target.value);
							}}
							className="!min-w-[125px] !rounded-md"
							variant="filled"
						>
							{filterOptions
								.filter((option) => option.value !== filterType)
								.map((option) => (
									<option key={option.value} value={option.value}>
										{option.label}
									</option>
								))}
						</Select>
					)}
				</div>
			</div>

			<Divider className="mb-4" />

			{graphsWithOwners.length === 0 ? (
				<div className="flex flex-col gap-4 items-center justify-center h-full">
					<Text fontSize="xl">No graphs to show!</Text>
				</div>
			) : page === "Explore" ? (
				<div className="flex flex-col gap-4">
					{graphsWithOwners.map(({ graph, owner }, i) => (
						<ExploreGraphCard key={graph.id || i} graph={graph} owner={owner} />
					))}
				</div>
			) : (
				<div className="flex flex-col sm:w-[50vw] md:w-[65vw] lg:w-[70vw] xl:w-[80] gap-4">
					{graphsWithOwners?.map(({ graph, owner }, i) => {
						return (
							<MyGraphCard key={graph.id || i} graph={graph} owner={owner} />
						);
					})}
				</div>
			)}
		</div>
	);
};

export default GraphList;
