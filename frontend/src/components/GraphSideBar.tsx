/**
 * GraphSideBar.tsx
 * @param {GraphSideBarProps} props
 * @returns {ReactElement} GraphSideBar component
 */
import React, { useState, useEffect } from "react";
import { Box, Input, Flex, List, ListItem, Text } from "@chakra-ui/react";
import { NodeType, EdgeType } from "@/types";

interface GraphSideBarProps {
	nodes: NodeType[];
	edges: EdgeType[];
	onNodeSelect: (node: NodeType | null) => void;
}

const GraphSideBar: React.FC<GraphSideBarProps> = ({ nodes, onNodeSelect }) => {
	const [sortedNodes, setSortedNodes] = useState<NodeType[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

	useEffect(() => {
    const sorted = [...nodes].sort((a, b) => a.label.localeCompare(b.label));
    setSortedNodes(sorted);
  }, [nodes]);

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

	const filteredNodes = searchQuery
	? sortedNodes.filter(
			(node) =>
				node.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
				node.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
				node.category.toLowerCase().includes(searchQuery.toLowerCase())
		)
	: [];

	return (
		<Box p={4} backgroundColor="gray.100" height="100%">
			<Flex mb={4}>
				<Input
					placeholder="Search by label, id, or category..."
					value={searchQuery}
					onChange={handleSearchChange}
				/>
			</Flex>
			<Box height="880px" overflowY="auto">
				{filteredNodes.length > 0 ? (
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
		</Box>
	);
};

export default GraphSideBar;
