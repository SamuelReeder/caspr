import React from 'react';
import { render, screen, act } from '@testing-library/react';
import Searchbar from '../components/Searchbar';
import '@testing-library/jest-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { SearchProvider } from '../context/SearchResultsContext';
import userEvent from '@testing-library/user-event';

test('renders Searchbar component', () => {
    render(
        <ChakraProvider>
            <SearchProvider>
                <Searchbar />
            </SearchProvider>
        </ChakraProvider>
    );

    const searchElement = screen.getByPlaceholderText(/Search/i);

    expect(searchElement).toBeInTheDocument();
});

test('renders Searchbar component with search value', async () => {
    render(
        <ChakraProvider>
            <SearchProvider>
                <Searchbar />
            </SearchProvider>
        </ChakraProvider>
    );

    const searchElement = screen.getByPlaceholderText(/Search/i);
    expect(searchElement).toBeInTheDocument();

    // Type in the search bar
    const user = userEvent.setup();
    const searchBarInput = screen.getByPlaceholderText(/Search/i);
    await act(async () => {
        await user.type(searchBarInput, 'Graph');
    });
    expect(searchBarInput).toHaveValue('Graph');
});