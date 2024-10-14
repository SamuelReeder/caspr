/**
 * Search Page
 */

import React from 'react';
import Sidebar from '../components/Sidebar';
import Searchbar from '../components/Searchbar';
import { SearchProvider, useSearch } from '../context/SearchResultsContext';
import { Box } from '@chakra-ui/react';
import GraphObject from '../components/GraphObject';

const SearchPage = () => {
  return (
    <SearchProvider>
      <Box className="flex h-screen">
        <Sidebar />

        {/* Main Content */}
		<Box className="flex-1 p-6 ml-72 overflow-y-auto" height="100vh">
          <Searchbar />
          <SearchResults />
        </Box>

      </Box>
    </SearchProvider>
  );
};

const SearchResults = () => {  // Make Search Results file?
  const { searchResults } = useSearch();

  return (
    <div className="mt-4">
      {searchResults.map((result, index) => (
		<GraphObject title={result.title} description={result.description || 'No description available'}/>
      ))}
    </div>
  );
};

export default SearchPage;