import React, { createContext, useContext, useState } from 'react';

interface SearchResult {
  description: string;
  id: number;
  title: string;
}

interface SearchResultsContextProps {
  searchResults: SearchResult[];
  setSearchResults: React.Dispatch<React.SetStateAction<SearchResult[]>>;
}

const SearchResultsContext = createContext<SearchResultsContextProps | undefined>(undefined);

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

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