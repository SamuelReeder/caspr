import React from 'react';
import { render, screen } from '@testing-library/react';
import GraphObject from '../src/components/SearchedGraphObject';
import '@testing-library/jest-dom';
import { ChakraProvider } from '@chakra-ui/react';

describe('GraphObject renders correctly', () => {
    test('renders GraphObject component', () => {
        render(
            <ChakraProvider>
                <GraphObject title="Test Title" description="Test Description" owner=''/>
            </ChakraProvider>
        );

        const titleElement = screen.getByText(/Test Title/i);
        const descriptionElement = screen.getByText(/Test Description/i);

        expect(titleElement).toBeInTheDocument();
        expect(descriptionElement).toBeInTheDocument();
    });
});