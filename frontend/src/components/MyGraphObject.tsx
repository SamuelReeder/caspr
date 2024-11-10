/**
 * Graph Object Component
 * @param {string} graphName - Name of the graph
 * @param {string} graphDescription - Description of the graph
 * @param {Timestamp} createdAt -  Timestamp the graph was created
 * @param {string} author - Author of the graph
 * @returns {ReactElement} Graph Object Component
 */
import {
	Box,
	Button,
	Card,
	CardBody,
	CardHeader,
	Heading,
	Text
} from "@chakra-ui/react";

import { MyGraphObjectProps } from "@/types/graph";
import React from "react";
import ShareButton from "./ShareButton";
import { Timestamp } from "firebase/firestore";

const MyGraphObject = ({
	graphName,
	graphDescription,
	createdAt,
	author
}: MyGraphObjectProps) => {
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
				<Heading size="md">{graphName}</Heading>
				<div className="flex flex-col">
					{author && <Text>{`by ${author}`}</Text>}

					<Text fontSize="sm" color="gray.500">
						Created: {formatDate(createdAt)}
					</Text>
				</div>
			</CardHeader>

			<CardBody className="flex justify-between">
				<Box>
					<Heading size="xs" textTransform="uppercase">
						Description:
					</Heading>
					<Text pt="1" pr="1" fontSize="sm">
						{graphDescription}
					</Text>
				</Box>

				{/* TODO - ShareButton shouldn't be its own component */}
				{/* Make shareModal component, then replace ShareButton just with a button */}
				<div className="flex flex-row gap-2">
					<ShareButton url={""} title={graphName}></ShareButton>
					{/* TODO - Open button will open the graph */}
					<Button colorScheme={"blue"}>Open</Button>
				</div>
			</CardBody>
		</Card>
	);
};

export default MyGraphObject;
