import React, { use, useEffect, useState } from 'react';
import { Box, Input } from '@chakra-ui/react';
import { GraphMetadata } from '@/mocks/fetchGraphMetadata';
import { GraphData } from '@/types';

interface SearchbarProps {
    graphs: GraphData[] | undefined;
    setGraphs: React.Dispatch<React.SetStateAction<GraphData[] | undefined>>;
}

export default function Searchbar({graphs, setGraphs}: SearchbarProps) {
    const [search, setSearch] = useState("");
    const [originalGraphs, setOriginalGraphs] = useState<GraphData[]>(graphs ? [...graphs] : []);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value);
      const value = e.target.value.toLowerCase();
  
      if (value.length > 0) {
        const filteredResults = originalGraphs.filter(item =>
          item.graphName.toLowerCase().includes(value) ||
          item.graphDescription.toLowerCase().includes(value)
          // item.author.toLowerCase().includes(value)
        );
  
        // Prioritize results by name, then description, then author
        const prioritizedResults = filteredResults.sort((a, b) => {
          const aNameMatch = a.graphName.toLowerCase().includes(value) ? 1 : 0;
          const bNameMatch = b.graphName.toLowerCase().includes(value) ? 1 : 0;
          const aDescriptionMatch = a.graphDescription.toLowerCase().includes(value) ? 1 : 0;
          const bDescriptionMatch = b.graphDescription.toLowerCase().includes(value) ? 1 : 0;
          // const aAuthorMatch = a.author.toLowerCase().includes(value) ? 1 : 0;
          // const bAuthorMatch = b.author.toLowerCase().includes(value) ? 1 : 0;
  
          return (
            bNameMatch - aNameMatch ||
            bDescriptionMatch - aDescriptionMatch
            // bAuthorMatch - aAuthorMatch
          );
        });
  
        setGraphs(prioritizedResults);
      } else {
        setGraphs(originalGraphs);
      }
    };

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