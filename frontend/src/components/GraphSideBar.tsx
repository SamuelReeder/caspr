import React, { useState } from 'react';
import { Box, Input, Flex, List, ListItem, Text } from '@chakra-ui/react';
import { NodeType } from '../types/node';
import { EdgeType } from '../types/edge';
import data from '../data/100nodes_example.json'; // Import the JSON data

interface GraphSideBarProps {
  nodes: NodeType[];
  edges: EdgeType[];
  onNodeSelect: (node: NodeType | null) => void;
}

const GraphSideBar: React.FC<GraphSideBarProps> = ({ onNodeSelect }) => {
  const sortedNodes = data.nodes.sort((a, b) => a.label.localeCompare(b.label));

  const [nodes] = useState<NodeType[]>(sortedNodes);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

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

  const filteredNodes = nodes.filter((node) =>
    node.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    node.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
    node.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box width="100%" minWidth="295px" p={4} backgroundColor="gray.100" height="100%">
      <Flex mb={4}>
        <Input
          placeholder="Search by label, id, or category..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </Flex>
      <Box height="880px" overflowY="auto">
        {searchQuery ? (
          <List spacing={2}>
            {filteredNodes.map((node) => (
              <ListItem
                key={node.id}
                p={2}
                backgroundColor={selectedNodeId === node.id ? 'gray.300' : 'white'}
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