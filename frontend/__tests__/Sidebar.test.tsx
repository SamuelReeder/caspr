import React from 'react';
import { render, screen } from '@testing-library/react';
import Sidebar from '../src/components/Sidebar';
import '@testing-library/jest-dom';
import { PageProvider } from '@/context/PageContext';

describe('Sidebar renders correctly', () => {
    test('renders Sidebar links correctly', () => {
        render(
            <PageProvider>
                <Sidebar />
            </PageProvider>
        );
        const sidebarTexts = ['Caspr', 'My Graphs', 'Shared With Me', 'Explore'];

        sidebarTexts.forEach(text => {
            expect(screen.getByText(new RegExp(text, 'i'))).toBeInTheDocument();
        });
    });
});