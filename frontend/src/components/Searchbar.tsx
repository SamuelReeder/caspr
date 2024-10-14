'use client'

import React from 'react';
import { Box, VStack, Text, Link, Input } from '@chakra-ui/react';
import { useSearch } from '../context/SearchResultsContext';

export default function Searchbar() {
    const [search, setSearch] = React.useState("");
    const {searchResults, setSearchResults} = useSearch();

    const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        console.log(e.target.value);

        if (e.target.value.length > 0) {
            const res = await fetch(``);
            const data = await res.json();
            console.log("Search data", data);
            setSearchResults(data);
        }
    }

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