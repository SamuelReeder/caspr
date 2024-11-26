import { Graph, GraphListProps } from "@/types/graph";
/**
 * Graph list component
 * @param {Array} graphs - List of graphs
 * @param {String} page - Page title
 * @returns {ReactElement} Graph list component
 */
import { Heading, Select, SelectProps } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import ExploreGraphCard from "./ExploreGraphCard";
import MyGraphCard from "./MyGraphCard";
import { User } from "@/types";
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
						console.error(error);
						return { graph, owner: null };
					}
				})
			);

			setGraphsWithOwners(withOwners);
		};

		fetchOwners();
	}, [firestoreUser, graphs]);

	const handleSelectChange: SelectProps["onChange"] = (event) => {
		const selectedValue = event.target.value;
		console.log(selectedValue);
	};

	return (
		<div className="mt-8">
			<div className="flex flex-row">
				<Heading size="md" mb={4}>
					{page}
				</Heading>

				<div className="ml-auto">
					<Select placeholder="Select option" onChange={handleSelectChange}>
						<option value="option1">Option 1</option>
						<option value="option2">Option 2</option>
						<option value="option3">Option 3</option>
					</Select>
				</div>
			</div>
			{page === "Explore" ? (
				<div className="flex flex-col gap-4">
					{graphsWithOwners.map(({ graph, owner }, i) => (
						<ExploreGraphCard key={graph.id || i} graph={graph} owner={owner} />
					))}
				</div>
			) : (
				<div className="flex flex-col gap-4">
					{graphsWithOwners.map(({ graph, owner }, i) => {
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
