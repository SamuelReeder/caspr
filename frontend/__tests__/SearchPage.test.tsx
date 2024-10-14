import React from 'react';
import { render, screen } from '@testing-library/react';
<<<<<<<< HEAD:frontend/__tests__/SearchPage.test.tsx
import SearchPage from '../src/pages/SearchPage';
========
import SearchPage from '../searchPage';
>>>>>>>> ddecf6e (Modify Folder Structure for Production Builds):frontend/src/__tests__/SearchPage.test.tsx
import '@testing-library/jest-dom';

test('renders SearchPage component', () => {
    render(<SearchPage />);
    const searchPageElement = screen.getByText(/Explore/i);
    expect(searchPageElement).toBeInTheDocument();
    expect(true).toBe(true);
});