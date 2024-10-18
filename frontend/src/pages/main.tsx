/**
 * Main Page
 */

import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Searchbar from '../components/Searchbar';
import { DataProvider, useData } from '../context/DataContext';
import { Box, Heading } from '@chakra-ui/react';
import { usePage } from '../context/PageContext';
import SearchedGraphObject from '../components/SearchedGraphObject';
import MyGraphObject from '@/components/MyGraphObject';
import { PageProvider } from '../context/PageContext';

const Main = () => {
    return (
        <PageProvider>
            <DataProvider>

                <Box className="flex h-screen">
                    <Sidebar />

                    {/* Main Content */}
                    <Box className="flex-1 p-6 ml-72 overflow-y-auto" height="100vh">
                        <Searchbar />
                        <Data />
                    </Box>

                </Box>
            </DataProvider>
        </PageProvider>
    );
};

const Data = () => {
    const { data } = useData();
    const { page } = usePage();

    // console.log("data", data)

    return (
        <Box>
            <Heading>{page}</Heading>

            {data.map((graph, index) => (
                page === 'My Graphs' || page === 'Shared With Me' ? (
                    <MyGraphObject key={index} title={graph.title} description={graph.description} author={graph.author} />
                ) : (
                    <SearchedGraphObject key={index} title={graph.title} description={graph.description} author={graph.author} />
                )
            ))}
        </Box>
    );
};

export default Main;