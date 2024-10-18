import React, { createContext, useContext, useState } from 'react';

interface GraphMetadata {
  id: string;
  title: string;
  description: string;
}

interface SearchResultsContextProps {
  searchResults: GraphMetadata[];
  setSearchResults: React.Dispatch<React.SetStateAction<GraphMetadata[]>>;
}

const SearchResultsContext = createContext<SearchResultsContextProps | undefined>(undefined);

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [searchResults, setSearchResults] = useState<GraphMetadata[]>([]);

  return (
    <SearchResultsContext.Provider value={{ searchResults, setSearchResults }}>
      {children}
    </SearchResultsContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchResultsContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};