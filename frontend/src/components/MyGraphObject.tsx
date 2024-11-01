import {
	Box,
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
	author: string;
}

const MyGraphObject = ({
	graphName,
	graphDescription,
	author
}: GraphObjectProps) => {
	return (
		<Card my="5">
			<CardHeader className="flex justify-between">
				<Heading size="md">{graphName}</Heading>
				<Text>{author}</Text>
			</CardHeader>

			<CardBody className="flex justify-between">
				<Box>
					<Heading size="xs" textTransform="uppercase">
						graphDescription:
					</Heading>
					<Text pt="1" pr="1" fontSize="sm">
						{graphDescription}
					</Text>
				</Box>
				{/* <ShareButton url={""} graphName={graphName}></ShareButton> */}
			</CardBody>
		</Card>
	);
};

export default MyGraphObject;
