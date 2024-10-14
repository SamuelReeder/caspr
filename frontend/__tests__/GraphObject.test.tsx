import React from 'react';
import { render, screen } from '@testing-library/react';
import GraphObject from '../src/components/GraphObject';
import '@testing-library/jest-dom';
import { ChakraProvider } from '@chakra-ui/react';

test('renders GraphObject component', () => {
  render(
    <ChakraProvider>
      <GraphObject title="Test Title" description="Test Description" />
    </ChakraProvider>
  );
  
  const titleElement = screen.getByText(/Test Title/i);
  const descriptionElement = screen.getByText(/Test Description/i);
  
  expect(titleElement).toBeInTheDocument();
  expect(descriptionElement).toBeInTheDocument();
});