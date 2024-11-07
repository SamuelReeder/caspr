// PrivacySettingsModal.tsx
import React, { useState } from "react";
import {
	Box,
	Button,
	Text,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	ModalFooter,
	FormControl,
	FormLabel,
	Input,
	Select,
	HStack
} from "@chakra-ui/react";

interface PrivacySettingsModalProps {
	isOpen: boolean;
	onClose: () => void;
}

const PrivacySettingsModal: React.FC<PrivacySettingsModalProps> = ({
	isOpen,
	onClose
}) => {
	const [usersWithAccess, setUsersWithAccess] = useState([]);
	const [publicAccess, setPublicAccess] = useState("Private");

	const handlePublicAccess = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setPublicAccess(e.target.value);
	};

	const handleSaveSelection = () => {
		onClose();
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Privacy Settings</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					{/* Add People Section */}
					<FormControl>
						<FormLabel>Add people, groups, or events</FormLabel>
						<Input placeholder="Enter email or group name" />
					</FormControl>
					<Box mt={4}>
						<Text fontWeight="bold" mb={2}>
							People with access
						</Text>
					</Box>

					{/* General Access Section */}
					<Box mt={4}>
						<Text fontWeight="bold">Public Access</Text>
						<HStack justifyContent="space-between" mt={2}>
							<Text>Private</Text>
							<Select
								width="150px"
								defaultValue="Private"
								onChange={handlePublicAccess}
							>
								<option value="Private">Private</option>
								<option value="Public">Public</option>
							</Select>
						</HStack>
					</Box>
				</ModalBody>
				<ModalFooter>
					<Button variant="ghost" onClick={onClose}>
						Cancel
					</Button>
					<Button colorScheme="blue" ml={3} onClick={handleSaveSelection}>
						Save
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default PrivacySettingsModal;
