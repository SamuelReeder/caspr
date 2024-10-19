import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ChakraProvider } from '@chakra-ui/react';
import MyGraphObject from '../src/components/MyGraphObject';

describe('GraphObject renders correctly', () => {
    test('renders GraphObject component', () => {
        render(
            <ChakraProvider>
                <MyGraphObject title="Test Title" description="Test Description" author="Kevin@gmail.com" />
            </ChakraProvider>
        );

        const titleElement = screen.getByText(/Test Title/i);
        const descriptionElement = screen.getByText(/Test Description/i);
        const authorElement = screen.getByText(/Kevin@gmail.com/i);

        expect(titleElement).toBeInTheDocument();
        expect(descriptionElement).toBeInTheDocument();
        expect(authorElement).toBeInTheDocument();
    });

    test('renders GraphObject button', () => {
        render(
            <ChakraProvider>
                <MyGraphObject title="Test Title" description="Test Description" author="Kevin@gmail.com" />
            </ChakraProvider>
        );

        const buttonElement = screen.getByText(/Share/i);
        expect(buttonElement).toBeInTheDocument();
    });
});