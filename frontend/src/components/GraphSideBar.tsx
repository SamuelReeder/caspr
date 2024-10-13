import React from 'react';
import { Box, Input, Flex } from '@chakra-ui/react';

const GraphSideBar: React.FC = () => {
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Function to handle search input change
  };

  return (
    <Box width="350px" p={4} backgroundColor="gray.100" height="calc(100vh - 50px)">
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