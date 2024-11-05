import React from 'react';
import { render, screen } from '@testing-library/react';
import Sidebar from '../src/components/Sidebar';
import '@testing-library/jest-dom';
import customRender from '@/test-utils/render';
import { useRouter } from 'next/router';

// Mocking useRouter
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('Sidebar renders correctly', () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      pathname: '/home',
      push: jest.fn(),
    });
  });

  test('renders Sidebar links correctly', () => {
    customRender(<Sidebar />);
    const sidebarTexts = ['Caspr', 'My Graphs', 'Shared With Me', 'Explore'];

    sidebarTexts.forEach(text => {
      expect(screen.getByText(new RegExp(text, 'i'))).toBeInTheDocument();
    });
  });
});