import React from 'react';
import { render, screen, act } from '@testing-library/react';
import Searchbar from '../src/components/Searchbar';
import '@testing-library/jest-dom';
import { ChakraProvider } from '@chakra-ui/react';
import userEvent from '@testing-library/user-event';
import { DataProvider } from '@/context/DataContext';
import customRender from '@/test-utils/render';

describe('Searchbar renders correctly', () => {
    test('renders Searchbar component', () => {
        customRender(
                    <Searchbar />
        );
    
        const searchElement = screen.getByPlaceholderText(/Search/i);
    
        expect(searchElement).toBeInTheDocument();
    });
    
    test('renders Searchbar component with search value', async () => {
        customRender(
                    <Searchbar />
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
});