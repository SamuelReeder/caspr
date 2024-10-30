'use client'

import React, { useEffect } from 'react';
import { Box, Input } from '@chakra-ui/react';
import { useData } from '../context/DataContext';
import { GraphMetadata } from '@/mocks/fetchGraphMetadata';
import { Data } from '../context/DataContext';

const mockMetadata: Data[] = [
  { id: '1', title: 'User Growth Trends', description: 'A graph showing monthly user growth over the past year.', author:'' },
  { id: '2', title: 'Revenue Breakdown', description: 'Detailed view of revenue sources by product category.', author:'' },
  { id: '3', title: 'Website Traffic Analysis', description: 'Graph displaying traffic sources and trends.', author:'' },
  { id: '4', title: 'Customer Satisfaction', description: 'Survey results representing customer satisfaction over time.', author:'' },
  { id: '5', title: 'Sales Performance', description: 'Monthly sales performance comparison across regions.', author:'' },
  { id: '6', title: 'Employee Turnover', description: 'Employee turnover rate over the last five years.', author:'' },
  { id: '7', title: 'Marketing Campaign Impact', description: 'Impact of recent marketing campaigns on brand awareness.', author:'' },
  { id: '8', title: 'Product Popularity', description: 'Popularity of products based on customer reviews and ratings.', author:'' },
  { id: '9', title: 'Supply Chain Efficiency', description: 'Graph measuring supply chain lead time and efficiency.', author:'' },
  { id: '10', title: 'Climate Data Overview', description: 'Graph showing changes in temperature and precipitation over time.', author:'' },
];

export default function Searchbar() {
    const [search, setSearch] = React.useState("");
    const {data, setData} = useData();

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearch(value);
    
        if (value.length > 0) {  // Might have to change the filter to filter by words not letters
          const filteredResults = mockMetadata.filter(item =>
            item.title.toLowerCase().includes(value.toLowerCase())
          );
          setData(filteredResults);
        } else {
          setData(data);
        }
      };

    useEffect(() => {
        setData(mockMetadata);
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