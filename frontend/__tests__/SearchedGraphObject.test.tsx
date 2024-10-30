import React from 'react';
import { render, screen } from '@testing-library/react';
import SearchedGraphObject from '../src/components/SearchedGraphObject';
import '@testing-library/jest-dom';
import { ChakraProvider } from '@chakra-ui/react';

describe('GraphObject renders correctly', () => {
    test('renders GraphObject component', () => {
        render(
            <ChakraProvider>
                <SearchedGraphObject title="Test Title" description="Test Description" author='Kevin@gmail.com'/>
            </ChakraProvider>
        );

        const titleElement = screen.getByText(/Test Title/i);
        const descriptionElement = screen.getByText(/Test Description/i);
        const authorElement = screen.getByText(/Kevin@gmail.com/i);

        expect(titleElement).toBeInTheDocument();
        expect(descriptionElement).toBeInTheDocument();
        expect(authorElement).toBeInTheDocument();
    });
});