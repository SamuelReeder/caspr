import {
	Box,
	Button,
	Card,
	CardBody,
	CardHeader,
	Heading,
	Text
} from "@chakra-ui/react";
import { Graph } from "@/types/graph";
import React from "react";
import ShareButton from "./ShareButton";
import { User, MyGraphObjectProps } from "@/types";


const MyGraphObject: React.FC<MyGraphObjectProps> = ({ graph, owner }) => {
	return (
		<Card>
			<CardHeader className="flex justify-between">
				<Heading size="md">{graph.graphName}</Heading>
				<div className="flex flex-col">
					<Text>{`by ${owner?.name || "unknown"}`}</Text>
					<Text fontSize="sm" color="gray.500">
						Created: {graph.createdAt.toDate().toLocaleDateString()}
					</Text>
				</div>
			</CardHeader>

			<CardBody className="flex justify-between">
				<Box>
					<Heading size="xs" textTransform="uppercase">
						Description:
					</Heading>
					<Text pt="1" pr="1" fontSize="sm">
						{graph.graphDescription}
					</Text>
				</Box>

				<div className="flex flex-row gap-2">
					<ShareButton
						url={graph.graphFileURL}
						title={graph.graphName}
						graph={graph}
						onMakePublic={function (isPublic: boolean): Promise<void> {
							return Promise.resolve();
						} }/>
					<Button colorScheme="blue">Open</Button>
				</div>
			</CardBody>
		</Card>
	);
};

export default MyGraphObject;