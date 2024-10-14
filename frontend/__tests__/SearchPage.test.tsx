import React from 'react';
import { render, screen } from '@testing-library/react';
import SearchPage from '../src/pages/SearchPage';
import '@testing-library/jest-dom';

test('renders SearchPage component', () => {
    render(<SearchPage />);
    const searchPageElement = screen.getByText(/Explore/i);
    expect(searchPageElement).toBeInTheDocument();
    expect(true).toBe(true);
});