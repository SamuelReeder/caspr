import React from 'react';
import { render, screen } from '@testing-library/react';
import Sidebar from '../components/Sidebar';
import '@testing-library/jest-dom';

test('renders Sidebar component', () => {
    render(<Sidebar />);
    const sidebarTexts = ['Caspr', 'My Graphs', 'Shared With Me', 'Explore'];

    sidebarTexts.forEach(text => {
        expect(screen.getByText(new RegExp(text, 'i'))).toBeInTheDocument();
    });
});