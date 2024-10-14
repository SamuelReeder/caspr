import React from 'react';
import { render, screen } from '@testing-library/react';
<<<<<<<< HEAD:frontend/__tests__/Sidebar.test.tsx
import Sidebar from '../src/components/Sidebar';
========
import Sidebar from '../components/Sidebar';
>>>>>>>> ddecf6e (Modify Folder Structure for Production Builds):frontend/src/__tests__/Sidebar.test.tsx
import '@testing-library/jest-dom';

test('renders Sidebar component', () => {
    render(<Sidebar />);
    const sidebarTexts = ['Caspr', 'My Graphs', 'Shared With Me', 'Explore'];

    sidebarTexts.forEach(text => {
        expect(screen.getByText(new RegExp(text, 'i'))).toBeInTheDocument();
    });
});