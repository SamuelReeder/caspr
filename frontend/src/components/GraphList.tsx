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
				<div className="flex flex-col sm:w-[50vw] md:w-[70vw] lg:w-[80vw] gap-4">
					{graphsWithOwners.map(({ graph, owner }, i) => (
							<ExploreGraphCard
								key={graph.id || i}
								graph={graph}
								owner={owner}
							/>
					))}
				</div>
			) : (
				<div className="flex flex-col sm:w-[50vw] md:w-[70vw] lg:w-[80vw] gap-4">
					{graphsWithOwners.map(({ graph, owner }, i) => {
						console.log(`Rendering MyGraphCard for graph ID: ${graph.graphURL}, owner: ${owner ? owner.name : 'Unknown'}`);
						return <MyGraphCard key={graph.id || i} graph={graph} owner={owner} />;
					})}
				</div>
			)}
		</div>
	);
};

export default GraphList;
