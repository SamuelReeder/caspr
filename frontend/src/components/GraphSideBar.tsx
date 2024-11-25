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
	useToast, SimpleGrid, Heading
} from "@chakra-ui/react";
import { NodeType, EdgeType, Preset } from "@/types";
import { ViewPosition } from "@/types/camera";
import { useView } from "@/context/ViewContext";
import { addPreset } from "@/api";

interface GraphSideBarProps {
	nodes: NodeType[];
	edges: EdgeType[];
	onNodeSelect: (node: NodeType | null) => void;
	presets?: Preset[];
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
				filters: [],
				pathways: null,
				view: currentView
			};

			if (graph?.id) {
				await (graph.id, newPreset);

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
							<Box height="750px" overflowY="auto">
								<List spacing={2}>
									{(graph?.presets ?? []).map((preset) => (
										<ListItem
											key={preset.name}
											p={3}
											backgroundColor={
												activePreset?.name === preset.name
													? "blue.100"
													: "white"
											}
											borderRadius="md"
											boxShadow="md"
											cursor="pointer"
											onClick={() => handlePresetClick(preset)}
											_hover={{ bg: "gray.100" }}
										>
											<Text fontWeight="bold">{preset.name}</Text>
											{preset.view && (
												<Text fontSize="sm" color="gray.600">
													Position: ({formatNumber(preset.view.x)},
													{formatNumber(preset.view.y)},
													{formatNumber(preset.view.z)})
												</Text>
											)}
										</ListItem>
									))}
								</List>
							</Box>
						</VStack>
					</TabPanel>
				</TabPanels>
			</Tabs>

			<Modal isOpen={isOpen} onClose={onClose} size="lg">
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Save Current View</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<VStack spacing={4}>
							<Input
								placeholder="Enter preset name"
								value={presetName}
								onChange={(e) => setPresetName(e.target.value)}
							/>
							{currentView && (
								<ViewPositionDisplay view={currentView} />
							)}
						</VStack>
					</ModalBody>
					<ModalFooter>
						<Button colorScheme="blue" mr={3} onClick={handleSavePreset}>
							Save
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

export default GraphSideBar;