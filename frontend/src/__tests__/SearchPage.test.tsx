import React from 'react';
import { render, screen } from '@testing-library/react';
import SearchPage from '../pages/searchPage';
import '@testing-library/jest-dom';

test('renders Searchpage component', () => {
    render(<SearchPage />);
    const searchPageElement = screen.getByText(/Explore/i);
    expect(searchPageElement).toBeInTheDocument();
});