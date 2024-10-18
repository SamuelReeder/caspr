/**
 * Search Page
 */

import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Searchbar from '../components/Searchbar';
import { SearchProvider, useSearch } from '../context/SearchResultsContext';
import { Box } from '@chakra-ui/react';
import GraphObject from '../components/GraphObject';
import fetchGraphMetadata from "../utils/GraphMetadata";

interface GraphMetadata {
  id: string;
  title: string;
  description: string;
}

const SearchPage: React.FC = () => {
  const [graphMetadata, setGraphMetadata] = useState<GraphMetadata[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch metadata on component mount
  useEffect(() => {
    const getGraphMetaData = async () => {
      try {
        const metadata = await fetchGraphMetadata(); // Wait for the data
        setGraphMetadata(metadata); // Set the fetched data to state
      } catch (error) {
        console.error("Failed to fetch graph metadata:", error);
      } finally {
        setLoading(false); // End loading state
      }
    };

    getGraphMetaData(); // Call the async function inside useEffect
  }, []); // Empty dependency array ensures it only runs once on mount

  return (
    <SearchProvider>
      <Box className="flex h-screen">
        <Sidebar />

        <Box className="flex-1 p-6 ml-72 overflow-y-auto" height="100vh">
          <Searchbar />
          {loading ? (
            <div></div>
          ) : (
            <SearchResults searchResults={graphMetadata} />
          )}
        </Box>
      </Box>
    </SearchProvider>
  );
};

interface SearchResultsProps {
  searchResults: GraphMetadata[];
}

const SearchResults: React.FC<SearchResultsProps> = ({ searchResults }) => {
  const { setSearchResults } = useSearch();

  useEffect(() => {
    setSearchResults(searchResults); // Set results in context
  }, [searchResults, setSearchResults]); // Run when searchResults change

  return (
    <div className="mt-4">
      {searchResults.map((result, index) => (
        <GraphObject
          key={index}
          title={result.title}
          description={result.description || 'No description available'}
        />
      ))}
    </div>
  );
};

export default SearchPage;
