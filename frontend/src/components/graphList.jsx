/**
 * Graph list component
 */
import { Box, Heading, Text } from "@chakra-ui/react";

import MyGraphObject from "./MyGraphObject";

export function GraphList({ graphs, page }) {
	return (
		<div className="mt-8">
			<Heading size="md" mb={4}>
				{page}
			</Heading>
			<div className="flex flex-col gap-4">
				{graphs.map((graph, i) => (
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
