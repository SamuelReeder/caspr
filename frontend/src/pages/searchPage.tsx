/**
 * Search Page
 */

import React from 'react';
import Sidebar from '../components/Sidebar';
import Searchbar from '../components/Searchbar';
import { SearchProvider, useSearch } from '../context/SearchResultsContext';

const SearchPage = () => {
  return (
    <SearchProvider>
      <div className="flex h-screen">
        <Sidebar />
        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Search Bar */}
          <Searchbar />

          {/* Display Search Results */}
          <SearchResults />
        </div>
      </div>
    </SearchProvider>
  );
};

const SearchResults = () => {
  const { searchResults } = useSearch();

  return (
    <div className="mt-4">
      {searchResults.map((result, index) => (
        <div key={index} className="bg-gray-100 p-4 rounded-lg my-4">
          <div className="w-full h-64 bg-gray-300 mb-4"></div>
          <span className="text-sm font-semibold">{result.name}</span>
        </div>
      ))}
    </div>
  );
};

export default SearchPage;