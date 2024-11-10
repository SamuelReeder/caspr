import { Graph, GraphListProps } from "@/types/graph";
/**
 * Graph list component
 * @param {Array} graphs - List of graphs
 * @param {String} page - Page title
 * @returns {ReactElement} Graph list component
 */
import { Heading } from "@chakra-ui/react";
import MyGraphObject from "./MyGraphObject";
import { get } from "http";
import { User } from "@/types";
import { useEffect, useState } from "react";
import { getUser } from "@/api";
import { useAuth } from "@/context";

export function GraphList({ graphs, page }: GraphListProps) {
	const { firestoreUser } = useAuth();

	const [graphsWithOwners, setGraphsWithOwners] = useState<Array<{
		graph: Graph,
		owner: User | null
	}>>([]);

	useEffect(() => {
		const fetchOwners = async () => {
			if (!graphs) return;

			const withOwners = await Promise.all(
				graphs.map(async (graph) => {
					try {
						if (graph.owner == firestoreUser?.uid) {
							return {graph, owner: firestoreUser}
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
	}, [graphs]);


	return (
		<div className="mt-8">
			<Heading size="md" mb={4}>
				{page}
			</Heading>
			<div className="flex flex-col gap-4">
				{graphsWithOwners.map(({ graph, owner }, i) => (
					<MyGraphObject
						key={graph.id || i}
						graph={graph}
						owner={owner}
					/>
				))}
			</div>
		</div>
	);
}
