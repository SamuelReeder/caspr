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
import { Timestamp } from "firebase/firestore";
import { User, MyGraphObjectProps } from "@/types";

const MyGraphObject: React.FC<MyGraphObjectProps> = ({ graph, owner }) => {
	const formatDate = (date: Timestamp): string => {
		const NS_TO_MS_MULTIPLIER = 1 / 1000000;
		const SEC_TO_MS_MULTIPLIER = 1000;

		const timestampInMilliseconds =
			date.seconds * SEC_TO_MS_MULTIPLIER +
			date.nanoseconds * NS_TO_MS_MULTIPLIER;

		// Date takes the amount in milliseconds and build a Date object
		const formatted_date = new Date(
			timestampInMilliseconds
		).toLocaleDateString();
		return formatted_date;
	};

	return (
		<Card>
			<CardHeader className="flex justify-between">
				<Heading size="md">{graph.graphName}</Heading>
				<div className="flex flex-col">
					<Text>{`by ${owner?.name || "unknown"}`}</Text>
					<Text fontSize="sm" color="gray.500">
						Created: {formatDate(graph.createdAt)}
					</Text>
				</div>
			</CardHeader>

			<CardBody className="flex justify-between">
				<Box>
					<Heading size="xs" textTransform="uppercase">
						Description:
					</Heading>
					<Text pt="1" pr="2" fontSize="sm">
						{graph.graphDescription}
					</Text>
				</Box>

				<Box className="flex flex-row gap-2" alignItems="center">
					<ShareButton
						url={graph.graphFileURL}
						title={graph.graphName}
						graph={graph}
						onMakePublic={function (isPublic: boolean): Promise<void> {
							return Promise.resolve();
						}}
					/>
					<Button colorScheme="blue">Open</Button>
				</Box>
			</CardBody>
		</Card>
	);
};

export default MyGraphObject;
