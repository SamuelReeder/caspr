import React, { createContext, useContext, useState } from 'react';

interface SearchResultsContextProps {
  searchResults: any[];
  setSearchResults: React.Dispatch<React.SetStateAction<any[]>>;
}

const SearchResultsContext = createContext<SearchResultsContextProps | undefined>(undefined);

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [searchResults, setSearchResults] = useState<any[]>([]);

  return (
    <SearchResultsContext.Provider value={{ searchResults, setSearchResults }}>
      {children}
    </SearchResultsContext.Provider>
  );
};

export const useSearch = (p0?: { name: string; }[]) => {
  const context = useContext(SearchResultsContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};