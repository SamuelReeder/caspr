'use client'

import React from 'react';
import { Box, VStack, Text, Link } from '@chakra-ui/react';

export default function Sidebar() {
    return (
        <Box
            as="nav"
            bg="gray.800"
            color="white"
            w="250px"
            h="100vh"
            p="4"
            className="shadow-lg"
        >
            <VStack spacing="4" align="stretch">
                <Text fontSize="2xl" fontWeight="bold">
                    Caspr
                </Text>
                <Link href="/" className="hover:text-gray-400">
                    My Graphs
                </Link>
                <Link href="#" className="hover:text-gray-400">
                    Shared With Me
                </Link>
                <Link href="/SearchPage" className="hover:text-gray-400">
                    Explore
                </Link>
            </VStack>
        </Box>
    );
}