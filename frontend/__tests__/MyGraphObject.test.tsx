import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ChakraProvider } from '@chakra-ui/react';
import MyGraphObject from '../src/components/MyGraphObject';
import customRender from '@/test-utils/render';

describe('GraphObject renders correctly', () => {
    test('renders GraphObject component', () => {
        customRender(
                <MyGraphObject graphName="Test Title" graphDescription="Test Description" author="Kevin@gmail.com" createdAt={new Date('2023-09-01')} />
        );

        const titleElement = screen.getByText(/Test Title/i);
        const descriptionElement = screen.getByText(/Test Description/i);
        const authorElement = screen.getByText(/Kevin@gmail.com/i);

        expect(titleElement).toBeInTheDocument();
        expect(descriptionElement).toBeInTheDocument();
        expect(authorElement).toBeInTheDocument();
    });

    // test('renders GraphObject button', () => {
    //     customRender(
    //             <MyGraphObject graphName="Test Title" graphDescription="Test Description" author="Kevin@gmail.com" />
    //     );

    //     const buttonElement = screen.getByText(/Share/i);
    //     expect(buttonElement).toBeInTheDocument();
    // });
});