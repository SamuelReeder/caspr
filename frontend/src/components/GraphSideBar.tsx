import React from 'react';
import { Box, Input, Flex } from '@chakra-ui/react';

const GraphSideBar: React.FC = () => {
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Function to handle search input change
  };

  return (
    <Box width="100%" minWidth="295px" p={4} backgroundColor="gray.100" height="100%">
      <Flex mb={4}>
        <Input
          placeholder="Search..."
          onChange={handleSearchChange}
        />
      </Flex>
    </Box>
  );
};

export default GraphSideBar;