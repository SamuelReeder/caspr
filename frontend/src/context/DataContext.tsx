import React, { createContext, useContext, useState } from 'react';

export interface Data {
  description: string;
  id: string;
  title: string;
  author: string;
}

interface DataContextProps {
  data: Data[];
  setData: React.Dispatch<React.SetStateAction<Data[]>>;
}

const DataContext = createContext<DataContextProps | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<Data[]>([]);

  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};