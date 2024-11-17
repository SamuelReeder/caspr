/**
 * Share Button component
 * @param {Graph} graph - The graph to share
 * @returns {ReactElement} ShareButton component
 */
import React, {useState } from "react";
import {
	Box,
	Button,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalCloseButton,
	useDisclosure,
	useToast,
} from "@chakra-ui/react";
import { Graph } from "@/types";
import { deleteGraph } from "@/api";
import { DeleteIcon } from "@chakra-ui/icons";

interface ShareButtonProps {
	graph: Graph;
}

const DeleteButton: React.FC<ShareButtonProps> = ({ graph }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const toast = useToast();

    const handleDeleteGraph = async () => {
        try{

            const response = await deleteGraph(graph)
            console.log(response)
            onClose()

            toast({
                title: "Graph Deleted",
                colorScheme: 'green',
                description: `Sucessfully Removed Graph: ${graph.graphName}`,
                duration: 2500,
                isClosable: true
            })

        }catch (error) {
			toast({
				title: "Error while deleting graph",
				description: `Error: ${error}`,
                colorScheme: 'red',
				status: "error",
				duration: null,
				isClosable: true
			});
		}
    }

	return (
		<Box className="flex items-end justify-center">
			<Button onClick={onOpen} colorScheme="blue" leftIcon={<DeleteIcon />}>
				Delete
			</Button>

			<Modal isOpen={isOpen} onClose={onClose} size={"sm"}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Confirm Graph Deletion</ModalHeader>
					<ModalCloseButton />
					<ModalFooter  >
                       <Button mr={3} colorScheme="blue" onClick={handleDeleteGraph}>  Confirm </Button>
                       <Button onClick={onClose}> Cancel </Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</Box>
	);
};

export default DeleteButton;
