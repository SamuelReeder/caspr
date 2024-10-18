'use client'

import React from 'react';
import { Box, VStack, Text, Link } from '@chakra-ui/react';

export default function Sidebar() {
    return (
        <Box
            as="nav"
            bg="gray.800"
            color="white"
            w="18rem"
            p="4"
            className="shadow-lg"
            height="100vh"
            position="fixed"
            top="0"
            left="0"
        >
            <VStack spacing="4" align="stretch">
                <Text fontSize="2xl" fontWeight="bold">
                    Caspr
                </Text>
                <Link href="/" className="hover:text-gray-400">
                    My Graphs
                </Link>
                <Link href="/sharedWithMe" className="hover:text-gray-400">
                    Shared With Me
                </Link>
                <Link href="/searchPage" className="hover:text-gray-400">
                    Explore
                </Link>
            </VStack>
        </Box>
    );
}