import React from 'react';
import { render, screen, act } from '@testing-library/react';
import Main from '../src/pages/main';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

describe('Search functionality working correctly with dummy data', () => {
    beforeEach(() => {
        render(<Main />);
    });

    test('Shows all graphs', async () => {

        const user = userEvent.setup();
        const searchBarInput = screen.getByPlaceholderText(/Search/i);
        await act(async () => {
            await user.type(searchBarInput, 'Graph');
        });
        expect(searchBarInput).toHaveValue('Graph');

        expect(screen.getAllByText(/Graph /i)).toHaveLength(8);
    });

    test('Shows one graph', async () => {
        const user = userEvent.setup();
        const searchBarInput = screen.getByPlaceholderText(/Search/i);

        await act(async () => {
            await user.clear(searchBarInput);
            await user.type(searchBarInput, 'Graph 1');
        });
        expect(searchBarInput).toHaveValue('Graph 1');

        expect(screen.getAllByText(/Graph /i)).toHaveLength(1);
        expect(screen.getByText(/Graph 1/i)).toBeInTheDocument();
    });
});


// describe('Search functionality working correctly with firebase data', () => {
//     beforeEach(() => {
//         render(<SearchPage />);
//     });

//     test('Shows all graphs', async () => {

//         const user = userEvent.setup();
//         const searchBarInput = screen.getByPlaceholderText(/Search/i);
//         await act(async () => {
//             await user.type(searchBarInput, 'Graph');
//         });
//         expect(searchBarInput).toHaveValue('Graph');

//         expect(screen.getAllByText(/Graph /i)).toHaveLength(8);
//     });

//     test('Shows one graph', async () => {
//         const user = userEvent.setup();
//         const searchBarInput = screen.getByPlaceholderText(/Search/i);

//         await act(async () => {
//             await user.clear(searchBarInput);
//             await user.type(searchBarInput, 'Graph 1');
//         });
//         expect(searchBarInput).toHaveValue('Graph 1');

//         expect(screen.getAllByText(/Graph /i)).toHaveLength(1);
//         expect(screen.getByText(/Graph 1/i)).toBeInTheDocument();
//     });
// });