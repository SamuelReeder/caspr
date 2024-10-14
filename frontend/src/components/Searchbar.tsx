'use client'

import React from 'react';
import { Box, Input } from '@chakra-ui/react';
import { useSearch } from '../context/SearchResultsContext';

const dummyData = [
    { id: 1, title: "Graph 1", description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Libero commodi doloremque at dolor natus labore, molestiae voluptatem id quidem, quo quia unde tenetur voluptatibus! Accusamus suscipit unde magnam labore necessitatibus." },
    { id: 2, title: "Graph 2", description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Libero commodi doloremque at dolor natus labore, molestiae voluptatem id quidem, quo quia unde tenetur voluptatibus! Accusamus suscipit unde magnam labore necessitatibus." },
    { id: 3, title: "Graph 3", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet." },
    { id: 4, title: "Graph 4", description: "Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla." },
    { id: 5, title: "Graph 5", description: "Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero. Sed dignissim lacinia nunc." },
    { id: 6, title: "Graph 6", description: "Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor." },
    { id: 7, title: "Graph 7", description: "Morbi lectus risus, iaculis vel, suscipit quis, luctus non urna. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque." },
    { id: 8, title: "Graph 8", description: "Quisque volutpat condimentum velit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam nec ante." }
  ];

export default function Searchbar() {
    const [search, setSearch] = React.useState("");
    const {searchResults, setSearchResults} = useSearch();

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearch(value);
    
        if (value.length > 0) {  // Might have to change the filter to filter by words not letters
          const filteredResults = dummyData.filter(item =>
            item.title.toLowerCase().includes(value.toLowerCase())
          );
          setSearchResults(filteredResults);
        } else {
          setSearchResults(dummyData);
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