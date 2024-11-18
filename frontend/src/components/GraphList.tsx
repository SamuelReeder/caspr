/**
 * Graph list component
 * @param {Array} graphs - List of graphs
 * @param {String} page - Page title
 * @returns {ReactElement} Graph list component
 */
import { Heading } from "@chakra-ui/react";
import { GraphListProps } from "@/types/graph";

import ExploreGraphCard from "./ExploreGraphCard";
import MyGraphCard from "./MyGraphCard";

const GraphList = ({ graphs, page }: GraphListProps) => {

	return (
		<div className="mt-8">
			<Heading size="md" mb={4}>
				{page}
			</Heading>
			{page === "Explore" ? (
				<div className="flex flex-col sm:w-[50vw] md:w-[70vw] lg:w-[80vw] gap-4">
					{graphs?.map((graph, i) => (
						<ExploreGraphCard key={graph.id || i} graph={graph}/>
					))}
				</div>
			) : (
				<div className="flex flex-col sm:w-[50vw] md:w-[65vw] lg:w-[70vw] xl:w-[80] gap-4">
					{graphs?.map((graph, i) => {
						return (
							<MyGraphCard key={graph.id || i} graph={graph} />
						);
					})}
				</div>
			)}
		</div>
	);
};

export default GraphList;
