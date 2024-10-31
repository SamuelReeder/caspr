import React from 'react';
import { render, screen } from '@testing-library/react';
import Main from '../src/pages/main';
import '@testing-library/jest-dom';
import { DataProvider } from '@/context/DataContext';
import { PageProvider } from '@/context/PageContext';
import customRender from '@/test-utils/render';

describe('Main page renders correctly', () => {
  beforeEach(() => {
    customRender(
      <Main />
    );
  });

  test('Main Component Loads with My Graphs page', () => {
    expect(screen.getAllByText(/My Graphs/i)).toHaveLength(2);
  });
});

describe('Main component', () => {
  beforeEach(() => {
    customRender(
      <Main />
    );
  });

  test('renders Sidebar and Searchbar components', () => {
    expect(screen.getByText(/Caspr/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Search for a graph/i)).toBeInTheDocument();
  });
});