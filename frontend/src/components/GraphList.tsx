/**
 * Graph list component
 * @param {Array} graphs - List of graphs
 * @param {String} page - Page title
 * @returns {ReactElement} Graph list component
 */
import { Box, Heading } from "@chakra-ui/react";
import { Graph, GraphListProps } from "@/types/graph";
import { useEffect, useState } from "react";

import ExploreGraphCard from "./ExploreGraphCard";
import MyGraphCard from "./MyGraphCard";
import { User } from "@/types";
import { Timestamp } from "firebase/firestore";
import { getUser } from "@/api";
import { useAuth } from "@/context";

const GraphList = ({ graphs, page }: GraphListProps) => {
	const { firestoreUser } = useAuth();

	const [graphsWithOwners, setGraphsWithOwners] = useState<
		Array<{
			graph: Graph;
			owner: User | null;
		}>
	>([]);

	useEffect(() => {
		const fetchOwners = async () => {
			if (!graphs) return;

			const withOwners = await Promise.all(
				graphs.map(async (graph) => {
					try {
						if (graph.owner == firestoreUser?.uid) {
							return { graph, owner: firestoreUser };
						}
						const owner = await getUser(graph.owner);
						return { graph, owner };
					} catch (error) {
						return { graph, owner: null };
					}
				})
			);

			setGraphsWithOwners(withOwners);
		};

		fetchOwners();
	}, [firestoreUser, graphs]);

	return (
		<div className="mt-8">
			<Heading size="md" mb={4}>
				{page}
			</Heading>
			{page === "Explore" ? (
				<div className="flex flex-wrap flex-row gap-2">
					{graphsWithOwners.map(({ graph, owner }, i) => (
						<Box key={graph.id || i} className="w-[32.5%] pt-2">
							<ExploreGraphCard
								key={graph.id || i}
								graph={graph}
								owner={owner}
							/>
						</Box>
					))}
				</div>
			) : (
				<div className="flex flex-col gap-4">
					{/* {graphsWithOwners.map(({ graph, owner }, i) => (
						<MyGraphCard key={graph.id || i} graph={graph} owner={owner} />
					))} */}
					{/* Dummy data for now to test */}
					<MyGraphCard 
						key={graphsWithOwners[0]?.graph.id || 1}

						owner={graphsWithOwners[0]?.owner}
						graph={{
							id: "dummy-id",
							owner: "dummy-owner",
							graphName: "dummy-name",
							graphDescription: "dummy-description",
							graphVisibility: true,
							graphFileURL: "http://dummy-url.com",
							graphURL: "http://localhost:3000/graph",
							createdAt: new Timestamp(Math.floor(Date.now() / 1000), 0)
						}}
					/>
				</div>
			)}
		</div>
	);
};

export default GraphList;
