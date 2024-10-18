import React, { useState, useEffect } from 'react';
import { Box, Input, Flex, List, ListItem, Text } from '@chakra-ui/react';
import { NodeType } from '../types/node';
import { EdgeType } from '../types/edge';
import data from '../data/100nodes_example.json'; // Import the JSON data

interface GraphSideBarProps {
  nodes: NodeType[];
  edges: EdgeType[];
}

const GraphSideBar: React.FC<GraphSideBarProps> = () => {
  const sortedNodes = data.nodes.sort((a, b) => a.label.localeCompare(b.label));

  const [nodes] = useState<NodeType[]>(sortedNodes);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredNodes = nodes.filter((node) =>
    node.id.toLowerCase() === searchQuery.toLocaleLowerCase() ||
    node.label.toLowerCase().includes(searchQuery.toLowerCase()) 
    
  );

  return (
    <Box width="100%" minWidth="295px" p={4} backgroundColor="gray.100" height="100%">
      <Flex mb={4}>
        <Input
          placeholder="Search by label or id..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </Flex>
      {searchQuery ? (
        <List spacing={2}>
          {filteredNodes.map((node) => (
            <ListItem key={node.id} p={2} backgroundColor="white" borderRadius="md" boxShadow="md">
              {node.label}
            </ListItem>
          ))}
        </List>
      ) : (
        <Text>No nodes to display. Please enter a search query.</Text>
      )}
    </Box>
  );
};

export default GraphSideBar;