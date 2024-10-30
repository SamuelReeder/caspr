/**
 * Graph list component
 */
import { Box, Heading, Text } from "@chakra-ui/react";

export function GraphList({ graphs }) {
	return (
		<div className="mt-8">
			<Heading size="md" mb={4}>
				Your Graphs
			</Heading>
			<div className="flex flex-col gap-4">
				{graphs.map((graph) => (
					<Box
						key={graph.graphName}
						borderWidth="1px"
						borderRadius="lg"
						padding={4}
					>
						<Text fontWeight="bold">{graph.graphName}</Text>
						<Text fontSize="sm" color="gray.500">
							Created: {graph.createdAt.toLocaleDateString()}
						</Text>
						<Text>{graph.graphDescription}</Text>
					</Box>
				))}
			</div>
		</div>
	);
}
