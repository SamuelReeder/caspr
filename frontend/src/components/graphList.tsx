/**
 * Graph list component
 * @param {Array} graphs - List of graphs
 * @param {String} page - Page title
 * @returns {ReactElement} Graph list component
 */
import { Box, Heading, Text } from "@chakra-ui/react";
import { GraphData } from "@/types/graph";
import MyGraphObject from "./MyGraphObject";

interface Graph {
  graphName: string;
  graphDescription: string;
  createdAt: Date;
}

interface GraphListProps {
  graphs: GraphData[] | undefined;
  page: string;
}

export function GraphList({ graphs, page }: GraphListProps) {
	return (
		<div className="mt-8">
			<Heading size="md" mb={4}>
				{page}
			</Heading>
			<div className="flex flex-col gap-4">
				{graphs?.map((graph, i) => (
					<MyGraphObject
						key={i}
						graphName={graph.graphName}
						graphDescription={graph.graphDescription}
						createdAt={graph.createdAt}
						author={"John Appleseed"}
					/>
				))}
			</div>
		</div>
	);
}
