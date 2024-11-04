/**
 * Graph Object Component
 * @param {string} graphName - Name of the graph
 * @param {string} graphDescription - Description of the graph
 * @param {Date} createdAt - Date the graph was created
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

import React from "react";
import ShareButton from "./ShareButton";

interface GraphObjectProps {
	graphName: string;
	graphDescription: string;
	createdAt: Date;
	author: string;
}

const MyGraphObject = ({
	graphName,
	graphDescription,
	createdAt,
	author
}: GraphObjectProps) => {
	return (
		<Card>
			<CardHeader className="flex justify-between">
				<Heading size="md">{graphName}</Heading>
				<div className="flex flex-col">
					{author && <Text>{`by ${author}`}</Text>}

					<Text fontSize="sm" color="gray.500">
						Created: {createdAt.toLocaleDateString()}
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
