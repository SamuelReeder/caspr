'use client'

import React, { useEffect } from 'react';
import { Box, Input } from '@chakra-ui/react';
import { useData } from '../context/DataContext';

export default function Searchbar() {
    const [search, setSearch] = React.useState("");
    const {data, setData} = useData();

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearch(value);
    
        if (value.length > 0) {  // Might have to change the filter to filter by words not letters
          const filteredResults = data.filter(item =>
            item.title.toLowerCase().includes(value.toLowerCase())
          );
          setData(filteredResults);
        } else {
          setData(data);
        }
      };

    useEffect(() => {
        setData(data);
    }, []);

    return (
        <Box className="mb-6">
            <Input
                type="text"
                placeholder="Search for a graph"
                value={search}
                onChange={handleSearch}
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
        </Box>
    );
}