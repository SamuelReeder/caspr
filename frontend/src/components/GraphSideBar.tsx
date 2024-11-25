/**
 * GraphSideBar.tsx
 * @param {GraphSideBarProps} props
 * @returns {ReactElement} GraphSideBar component
 */
import React, { useState } from "react";
import {
	Box, Input, Flex, List, ListItem, Text,
	Tabs, TabList, TabPanels, TabPanel, Tab,
	Button, VStack, useDisclosure,
	Modal, ModalOverlay, ModalContent, ModalHeader,
	ModalBody, ModalFooter, ModalCloseButton,
	useToast, SimpleGrid, Heading,
	FormControl,
	FormLabel
} from "@chakra-ui/react";
import { NodeType, EdgeType, Preset } from "@/types";
import { ViewPosition } from "@/types/camera";
import { useView } from "@/context/ViewContext";
import { addPreset } from "@/api";
import { Timestamp } from "firebase/firestore";
import formatDate from "@/utils/formatDate";

interface GraphSideBarProps {
	nodes: NodeType[];
	edges: EdgeType[];
	onNodeSelect: (node: NodeType | null) => void;
}

const formatNumber = (num: number) => num.toFixed(2);

const ViewPositionDisplay: React.FC<{ view: ViewPosition }> = ({ view }) => (
	<Box bg="gray.50" p={4} borderRadius="md" mt={4}>
		<SimpleGrid columns={2} spacing={4}>
			<Box>
				<Heading size="sm" mb={2}>Position</Heading>
				<Text><strong>X:</strong> {formatNumber(view.x)}</Text>
				<Text><strong>Y:</strong> {formatNumber(view.y)}</Text>
				<Text><strong>Z:</strong> {formatNumber(view.z)}</Text>
			</Box>
			{view.orientation && (
				<Box>
					<Heading size="sm" mb={2}>Orientation</Heading>
					<Text><strong>Pitch:</strong> {formatNumber(view.orientation.pitch)}°</Text>
					<Text><strong>Yaw:</strong> {formatNumber(view.orientation.yaw)}°</Text>
					<Text><strong>Roll:</strong> {formatNumber(view.orientation.roll)}°</Text>
				</Box>
			)}
		</SimpleGrid>
	</Box>
);

const GraphSideBar: React.FC<GraphSideBarProps> = ({
	nodes,
	edges,
	onNodeSelect,
}) => {
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
	const [presetName, setPresetName] = useState("");
	const { isOpen, onOpen, onClose } = useDisclosure();
	const {
		graph,
		currentView,
		loadPreset,
		activePreset,
		addPresetToGraph
	} = useView();
	const toast = useToast();


	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(event.target.value);
	};

	const handleNodeClick = (node: NodeType) => {
		if (selectedNodeId === node.id) {
			setSelectedNodeId(null);
			onNodeSelect(null);
		} else {
			setSelectedNodeId(node.id);
			onNodeSelect(node);
		}
	};

	const handlePresetClick = (preset: Preset) => {
		loadPreset(preset);
		toast({
			title: "Preset Loaded",
			description: `Loaded preset: ${preset.name}`,
			status: "info",
			duration: 2000,
		});
	};

	const handleSavePreset = async () => {
		try {
			if (!presetName.trim()) {
				toast({
					title: "Error",
					description: "Please enter a preset name",
					status: "error",
					duration: 2000,
				});
				return;
			}

			const newPreset: Preset = {
				name: presetName,
				updated: Timestamp.now(),
				filters: [],
				pathways: null,
				view: currentView
			};

			if (graph?.id) {
				await addPreset(graph.id, newPreset);

				addPresetToGraph(newPreset);
				toast({
					title: "Success",
					description: "Preset saved successfully",
					status: "success",
					duration: 2000,
				});
				setPresetName("");
				onClose();
			}
		} catch (error) {
			toast({
				title: "Error",
				description: "Failed to save preset",
				status: "error",
				duration: 2000,
			});
		}
	};

	const filteredNodes = nodes.filter(
		(node) =>
			node.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
			node.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
			node.category.toLowerCase().includes(searchQuery.toLowerCase())
	);

	return (
		<Box p={4} backgroundColor="gray.100" height="100%">
			<Tabs>
				<TabList>
					<Tab>Nodes</Tab>
					<Tab>Presets</Tab>
				</TabList>

				<TabPanels>
					<TabPanel>
						<Flex mb={4}>
							<Input
								placeholder="Search by label, id, or category..."
								value={searchQuery}
								onChange={handleSearchChange}
							/>
						</Flex>
						<Box height="800px" overflowY="auto">
							{searchQuery ? (
								<List spacing={2}>
									{filteredNodes.map((node) => (
										<ListItem
											key={node.id}
											p={2}
											backgroundColor={
												selectedNodeId === node.id ? "gray.300" : "white"
											}
											borderRadius="md"
											boxShadow="md"
											onClick={() => handleNodeClick(node)}
											cursor="pointer"
											_hover={{ bg: "gray.200" }}
										>
											<Text fontWeight="bold">{node.label}</Text>
											<Text>ID: {node.id}</Text>
											<Text>Value: {node.value}</Text>
											<Text>Category: {node.category}</Text>
										</ListItem>
									))}
								</List>
							) : (
								<Text>No nodes to display. Please enter a search query.</Text>
							)}
						</Box>
					</TabPanel>

					<TabPanel>
						<VStack spacing={4} align="stretch">
							<Button colorScheme="blue" onClick={onOpen}>
								Save Current View
							</Button>
							<Box overflowY="auto">
								<List spacing={3}>
									{(graph?.presets ?? []).map((preset) => (
										<ListItem
											key={preset.name}
											p={4}
											backgroundColor={
												activePreset?.name === preset.name
													? "blue.50"
													: "white"
											}
											borderRadius="lg"
											boxShadow="sm"
											cursor="pointer"
											onClick={() => handlePresetClick(preset)}
											_hover={{ bg: "gray.50", transform: "translateY(-2px)" }}
											transition="all 0.2s"
											border="1px"
											borderColor="gray.200"
										>
											<VStack align="stretch" spacing={2}>
												<Flex justify="space-between" align="center">
													<Text
														fontWeight="bold"
														fontSize="lg"
														color={activePreset?.name === preset.name ? "blue.600" : "gray.700"}
													>
														{preset.name}
													</Text>
													{preset.updated && (
														<Text
															fontSize="sm"
															color="gray.500"
															fontStyle="italic"
														>
															Updated {formatDate(preset.updated)}
														</Text>
													)}
												</Flex>

												{preset.view && (
													<Box
														bg="gray.50"
														p={2}
														borderRadius="md"
														fontSize="sm"
													>
														<SimpleGrid columns={2} spacing={3}>
															<Box>
																<Text color="gray.600" fontWeight="medium">Position</Text>
																<Text>
																	X: {formatNumber(preset.view.x)}
																</Text>
																<Text>
																	Y: {formatNumber(preset.view.y)}
																</Text>
																<Text>
																	Z: {formatNumber(preset.view.z)}
																</Text>
															</Box>
															{preset.view.orientation && (
																<Box>
																	<Text color="gray.600" fontWeight="medium">Orientation</Text>
																	<Text>
																		Pitch: {formatNumber(preset.view.orientation.pitch)}°
																	</Text>
																	<Text>
																		Yaw: {formatNumber(preset.view.orientation.yaw)}°
																	</Text>
																	<Text>
																		Roll: {formatNumber(preset.view.orientation.roll)}°
																	</Text>
																</Box>
															)}
														</SimpleGrid>
													</Box>
												)}
											</VStack>
										</ListItem>
									))}
								</List>
							</Box>
						</VStack>
					</TabPanel>
				</TabPanels>
			</Tabs>

			<Modal isOpen={isOpen} onClose={onClose} size="lg">
				<ModalOverlay backdropFilter="blur(2px)" bg="blackAlpha.300" />
				<ModalContent bg="white" shadow="2xl" borderRadius="xl">
					<ModalHeader
						borderBottom="1px"
						borderColor="gray.100"
						py={6}
						bg="gray.50"
						borderTopRadius="xl"
					>
						<Flex align="center" gap={3}>
							<VStack align="flex-start" spacing={1}>
								<Text fontSize="xl" fontWeight="bold">
									Save Current View
								</Text>
								<Text fontSize="sm" color="gray.600">
									Save your current camera position and orientation as a preset
								</Text>
							</VStack>
						</Flex>
					</ModalHeader>
					<ModalCloseButton
						top={6}
						right={6}
						_hover={{ bg: "gray.100" }}
					/>

					<ModalBody py={6}>
						<VStack spacing={6} align="stretch">
							<FormControl>
								<FormLabel fontWeight="medium">Preset Name</FormLabel>
								<Input
									placeholder="Enter a descriptive name for this view"
									value={presetName}
									onChange={(e) => setPresetName(e.target.value)}
									bg="gray.50"
									border="1px"
									borderColor="gray.200"
									_hover={{
										borderColor: "gray.300",
										bg: "gray.100"
									}}
									_focus={{
										borderColor: "blue.500",
										boxShadow: "0 0 0 1px var(--chakra-colors-blue-500)",
										bg: "white"
									}}
								/>
							</FormControl>

							{currentView && (
								<Box>
									<Text
										fontWeight="medium"
										mb={3}
										color="gray.700"
									>
										Current View Details
									</Text>
									<Box
										bg="gray.50"
										border="1px"
										borderColor="gray.200"
										borderRadius="lg"
										overflow="hidden"
									>
										<SimpleGrid
											columns={2}
											spacing={4}
											p={4}
											bg="white"
										>
											<Box>
												<Text
													fontSize="sm"
													fontWeight="semibold"
													color="gray.600"
													mb={2}
												>
													Position
												</Text>
												<VStack align="stretch" spacing={2}>
													<Flex justify="space-between">
														<Text color="gray.600">X</Text>
														<Text fontWeight="medium">
															{formatNumber(currentView.x)}
														</Text>
													</Flex>
													<Flex justify="space-between">
														<Text color="gray.600">Y</Text>
														<Text fontWeight="medium">
															{formatNumber(currentView.y)}
														</Text>
													</Flex>
													<Flex justify="space-between">
														<Text color="gray.600">Z</Text>
														<Text fontWeight="medium">
															{formatNumber(currentView.z)}
														</Text>
													</Flex>
												</VStack>
											</Box>

											{currentView.orientation && (
												<Box>
													<Text
														fontSize="sm"
														fontWeight="semibold"
														color="gray.600"
														mb={2}
													>
														Orientation
													</Text>
													<VStack align="stretch" spacing={2}>
														<Flex justify="space-between">
															<Text color="gray.600">Pitch</Text>
															<Text fontWeight="medium">
																{formatNumber(currentView.orientation.pitch)}°
															</Text>
														</Flex>
														<Flex justify="space-between">
															<Text color="gray.600">Yaw</Text>
															<Text fontWeight="medium">
																{formatNumber(currentView.orientation.yaw)}°
															</Text>
														</Flex>
														<Flex justify="space-between">
															<Text color="gray.600">Roll</Text>
															<Text fontWeight="medium">
																{formatNumber(currentView.orientation.roll)}°
															</Text>
														</Flex>
													</VStack>
												</Box>
											)}
										</SimpleGrid>
									</Box>
								</Box>
							)}
						</VStack>
					</ModalBody>

					<ModalFooter
						borderTop="1px"
						borderColor="gray.100"
						gap={3}
						py={6}
					>
						<Button
							variant="ghost"
							onClick={onClose}
							_hover={{ bg: "gray.100" }}
						>
							Cancel
						</Button>
						<Button
							colorScheme="blue"
							onClick={handleSavePreset}
							isDisabled={!presetName.trim()}
						>
							Save Preset
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</Box>
	);
};

export default GraphSideBar;