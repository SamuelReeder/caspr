/**
 * Share Button component
 * @param {Graph} graph - The graph to share
 * @returns {ReactElement} ShareButton component
 */
import React, { useState } from "react";
import {
	Box,
	Button,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	FormControl,
	FormLabel,
	Input,
	Switch,
	useDisclosure,
	useToast,
	InputGroup,
	InputRightElement,
	Tag,
	TagLabel,
	TagCloseButton,
	Wrap,
	WrapItem,
	Stack,
	Checkbox,
	CheckboxGroup,
	Text
} from "@chakra-ui/react";
import { Graph, Preset } from "@/types";
import { Timestamp } from "firebase/firestore";
import {
	shareGraphWithUser,
	unshareGraphFromUser,
	updateGraphData
} from "@/api";
import { ExternalLinkIcon } from "@chakra-ui/icons";

interface ShareButtonProps {
	graph: Graph;
}

const ShareButton: React.FC<ShareButtonProps> = ({ graph }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [email, setEmail] = useState("");
	const [emailList, setEmailList] = useState<string[]>([]);
	const [selectedPresets, setSelectedPresets] = useState<string[]>([]);
	const [isPublic, setIsPublic] = useState(graph.graphVisibility);
	const [sharedEmails, setSharedEmails] = useState<string[]>(
		graph.sharedEmails || []
	);
	const [isLoading, setIsLoading] = useState(false);
	const toast = useToast();

	const handleShare = async () => {
		if (emailList.length === 0) {
			toast({
				title: "No recipients",
				description: "Please add at least one email address",
				status: "warning",
				duration: 3000,
				isClosable: true
			});
			return;
		}

		setIsLoading(true);
		try {
			const results = await Promise.all(
				emailList.map(async (email) => {
					const result = graph.id
						? await shareGraphWithUser(graph.id, email, selectedPresets)
						: false;
					if (result) {
						setSharedEmails((prev) => [...prev, email]);
					}
					return result;
				})
			);

			const successCount = results.filter(Boolean).length;
			const failureCount = results.length - successCount;

			if (successCount > 0) {
				setEmailList([]);
				toast({
					title: "Graph shared",
					description: `Successfully shared with ${successCount} recipient(s)${
						failureCount > 0
							? `. Failed to share with ${failureCount} recipient(s).`
							: ""
					}`,
					status: "success",
					duration: 5000,
					isClosable: true
				});
				onClose();
			} else {
				toast({
					title: "Share failed",
					description: "Failed to share with any recipients",
					status: "error",
					duration: 5000,
					isClosable: true
				});
			}
		} catch (error) {
			toast({
				title: "Error",
				description: "Failed to share graph",
				status: "error",
				duration: 5000,
				isClosable: true
			});
		} finally {
			setIsLoading(false);
		}
	};

	const handleUnshare = async (email: string) => {
		try {
			const result = graph.id
				? await unshareGraphFromUser(graph.id, email)
				: false;
			if (result) {
				setSharedEmails((prev) => prev.filter((e) => e !== email));
				toast({
					title: "Access removed",
					description: `Removed sharing access for ${email}`,
					status: "success",
					duration: 3000,
					isClosable: true
				});
			}
		} catch (error) {
			toast({
				title: "Error",
				description: `Failed to remove access for ${email}`,
				status: "error",
				duration: 3000,
				isClosable: true
			});
		}
	};

	const handleMakePublic = async () => {
		try {
			const newVisibility = !isPublic;

			const result = await updateGraphData(graph.id, {
				graphVisibility: newVisibility
			});

			if (result) {
				setIsPublic(newVisibility);
				toast({
					title: `Graph is now ${newVisibility ? "public" : "private"}`,
					status: "success",
					duration: 2000
				});
			}
		} catch (error) {
			toast({
				title: "Error",
				description: "Failed to update graph visibility",
				status: "error",
				duration: 5000,
				isClosable: true
			});
			setIsPublic(!isPublic);
		}
	};

	const copyToClipboard = () => {
		navigator.clipboard.writeText(graph.graphURL);
		toast({
			title: "Link copied",
			status: "success",
			duration: 2000
		});
	};

	const handleEmailKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter" && email) {
			e.preventDefault();
			if (!email.includes("@")) {
				toast({
					title: "Invalid email",
					description: "Please enter a valid email address",
					status: "error",
					duration: 3000,
					isClosable: true
				});
				return;
			}
			if (!emailList.includes(email)) {
				setEmailList([...emailList, email]);
				setEmail("");
			}
		}
	};

	const removeEmail = (emailToRemove: string) => {
		setEmailList(emailList.filter((e) => e !== emailToRemove));
	};

	return (
		<Box className="flex items-end justify-center">
			<Button onClick={onOpen} leftIcon={<ExternalLinkIcon />}>
				Share
			</Button>

			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Share Graph</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<FormControl mb={4}>
							<FormLabel>Already shared with</FormLabel>
							<Wrap spacing={2} mb={4}>
								{sharedEmails.map((email) => (
									<WrapItem key={email}>
										<Tag
											size="md"
											borderRadius="full"
											variant="solid"
											colorScheme="green"
										>
											<TagLabel>{email}</TagLabel>
											<TagCloseButton onClick={() => handleUnshare(email)} />
										</Tag>
									</WrapItem>
								))}
							</Wrap>

							<FormLabel>Share with new people</FormLabel>
							<Input
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								onKeyDown={handleEmailKeyDown}
								placeholder="Enter email address and press Enter"
							/>
							<Wrap spacing={2} mt={2}>
								{emailList.map((email) => (
									<WrapItem key={email}>
										<Tag
											size="md"
											borderRadius="full"
											variant="solid"
											colorScheme="blue"
										>
											<TagLabel>{email}</TagLabel>
											<TagCloseButton
												aria-label="close"
												onClick={() => removeEmail(email)}
											/>
										</Tag>
									</WrapItem>
								))}
							</Wrap>
						</FormControl>
						{graph.presets && graph.presets.length > 0 && (
							<FormControl mb={4}>
								<FormLabel>
									Select Presets ({selectedPresets.length} selected)
								</FormLabel>
								<Box
									maxHeight="200px"
									overflowY="auto"
									border="1px"
									borderColor="gray.200"
									borderRadius="md"
									p={2}
								>
									<CheckboxGroup
										value={selectedPresets}
										onChange={(values) =>
											setSelectedPresets(values as string[])
										}
									>
										<Stack spacing={2}>
											{graph.presets.map((preset: Preset) => (
												<Box
													key={preset.name}
													p={2}
													_hover={{ bg: "gray.50" }}
													borderRadius="md"
												>
													<Checkbox value={preset.name}>
														<Box>
															<Text fontWeight="medium">{preset.name}</Text>
															{preset.updated &&
																preset.updated instanceof Timestamp && (
																	<Text fontSize="sm" color="gray.600">
																		Updated:{" "}
																		{preset.updated
																			.toDate()
																			.toLocaleDateString()}
																	</Text>
																)}
															{preset.filters && (
																<Wrap mt={1}>
																	{preset.filters.map((filter) => (
																		<WrapItem key={filter}>
																			<Tag size="sm" colorScheme="purple">
																				{filter}
																			</Tag>
																		</WrapItem>
																	))}
																</Wrap>
															)}
															{preset.pathways && (
																<Wrap mt={1}>
																	{preset.pathways.map((pathway) => (
																		<WrapItem key={pathway}>
																			<Tag size="sm" colorScheme="green">
																				{pathway}
																			</Tag>
																		</WrapItem>
																	))}
																</Wrap>
															)}
														</Box>
													</Checkbox>
												</Box>
											))}
										</Stack>
									</CheckboxGroup>
								</Box>
							</FormControl>
						)}

						<FormControl display="flex" alignItems="center" mb={4}>
							<FormLabel mb="0">Make graph public</FormLabel>
							<Switch
								aria-label="Make graph public"
								isChecked={isPublic}
								onChange={() => handleMakePublic()}
							/>
						</FormControl>

						{isPublic && (
							<FormControl>
								<FormLabel>Public Link</FormLabel>
								<InputGroup>
									<Input value={graph.graphURL} color="gray.500" isReadOnly />
									<InputRightElement width="4.5rem">
										<Button h="1.75rem" size="sm" onClick={copyToClipboard}>
											Copy
										</Button>
									</InputRightElement>
								</InputGroup>
							</FormControl>
						)}
					</ModalBody>

					<ModalFooter>
						<Button
							colorScheme="blue"
							mr={3}
							onClick={handleShare}
							isLoading={isLoading}
							loadingText="Sharing..."
							disabled={emailList.length === 0}
						>
							Share
						</Button>
						<Button variant="ghost" onClick={onClose}>
							Cancel
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</Box>
	);
};

export default ShareButton;
