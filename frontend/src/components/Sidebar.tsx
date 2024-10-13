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
                    Sidebar
                </Text>
                <Link href="#" className="hover:text-gray-400">
                    Home
                </Link>
                <Link href="#" className="hover:text-gray-400">
                    About
                </Link>
                <Link href="#" className="hover:text-gray-400">
                    Services
                </Link>
                <Link href="#" className="hover:text-gray-400">
                    Contact
                </Link>
            </VStack>
        </Box>
    );
}