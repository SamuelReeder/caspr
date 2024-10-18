/**
 * Main Page
 */

import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Searchbar from '../components/Searchbar';
import { SearchProvider, useSearch } from '../context/SearchResultsContext';
import { Box, Heading } from '@chakra-ui/react';
import GraphObject from '../components/SearchedGraphObject';

const Main = () => {
  return (
    <SearchProvider>
      <Box className="flex h-screen">
        <Sidebar />

        {/* Main Content */}
        <Box className="flex-1 p-6 ml-72 overflow-y-auto" height="100vh">
          <Searchbar />
          <Data />
        </Box>

      </Box>
    </SearchProvider>
  );
};

const Data = () => {  // Make Search Results file?
  const { searchResults } = useSearch();
  const [sharedGraphs, setSharedGraphs] = useState();

  return (
      <Box>
        <Heading>{}</Heading>

        {searchResults.map((graph, index) => (
          <GraphObject title={graph.title} description={graph.description} owner=''></GraphObject>
        ))}
      </Box>
  );
};

export default Main;