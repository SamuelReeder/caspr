import {
	Box,
	Button,
	Card,
	CardBody,
	CardHeader,
	Heading,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	Switch,
	Text,
	useToast,
	Tooltip,
	useDisclosure
} from "@chakra-ui/react";

import { MyGraphCardProps } from "@/types";
import React, {useState} from "react";
import ShareButton from "./ShareButton";
import { Timestamp } from "firebase/firestore";
import { updateGraphData } from "@/api/storage";

const MyGraphObject: React.FC<MyGraphCardProps> = ({ graph, owner }) => {

	const { isOpen, onOpen, onClose } = useDisclosure();
	const [publicGraph, setPublicGraph] = useState(graph.graphVisibility)
	const [switchDisabled, setSwitchDisabled] = useState(false)
	const toast = useToast();

	const handleSwitchToggle = () => {
		setPublicGraph(!publicGraph);
		setSwitchDisabled(true)
		updateVisibility(!publicGraph)

		setTimeout(() => {
			setSwitchDisabled(false);
		  }, 50);
	  };


	const updateVisibility = async (visibility: boolean) => {

		try {
				const updateValues = { graphVisibility: visibility}	
				await updateGraphData(graph.id, updateValues)

				toast({
					title: "Graph saved",
					description: `Graph visibility updated for: ${graph.graphName}`,
					status: "success",
					duration: 1500,
					isClosable: true
				});
			}
		catch (error) {
			toast({
				title: "Error while saving graph",
				description: `Error: ${error}`,
				status: "error",
				duration: null,
				isClosable: true
			});
		}
	};

	const truncatedDescription =
		graph.graphDescription.length > 100
			? `${graph.graphDescription.substring(0, 100)}...`
			: graph.graphDescription;

	const handleDescriptionClick = () => {
		onOpen();
	};

	const handleOpenClick = () => {
		window.location.href = graph.graphURL;
	};

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
				<div className="flex flex-col space-y-3">
					<Heading size="md">{graph.graphName}</Heading>
					<Switch fontSize="sm" isChecked={publicGraph} isDisabled={switchDisabled} onChange={handleSwitchToggle}> Public Visibility </Switch>
				</div>
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
					{truncatedDescription === graph.graphDescription ? (
						<Text pt="1" pr="1" fontSize="sm">
							{graph.graphDescription}
						</Text>
					) : (
						<Tooltip label="Click to see full description" hasArrow>
							<Text
								pt="1"
								pr="1"
								fontSize="sm"
								onClick={handleDescriptionClick}
								cursor="pointer"
							>
								{truncatedDescription}
							</Text>
						</Tooltip>
					)}
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
					<Button colorScheme="blue" onClick={handleOpenClick}>Open</Button>
				</Box>
			</CardBody>

			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Description</ModalHeader>
					<ModalCloseButton />
					<ModalBody>{graph.graphDescription}</ModalBody>
				</ModalContent>
			</Modal>
		</Card>
	);
};

export default MyGraphObject;
