import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import NavMenu from '../components/NavMenu';
import { ChakraProvider } from '@chakra-ui/react';

const mockOnSelect = jest.fn();

beforeEach(() => {
    jest.clearAllMocks();
});

const renderSetup = () => {
    const mockNames = ['Item 1', 'Item 2', 'Item 3'];
    render(
        <ChakraProvider>
            <NavMenu Names={mockNames} onSelect={mockOnSelect} />
        </ChakraProvider>
    );
}

describe('NavMenu Component', () => {
    test('should render correctly with provided props', () => {
        renderSetup();

        expect(screen.getByTestId('hamburger-button')).toBeInTheDocument();
    });

    test('should open drawer on hamburger button click', () => {
        renderSetup();

        const hamburgerButton = screen.getByTestId('hamburger-button');
        fireEvent.click(hamburgerButton);
        expect(screen.getByTestId('drawer-header')).toBeInTheDocument();
    });

    test('should call onSelect with correct index when button is clicked', () => {
        renderSetup();

        const hamburgerButton = screen.getByTestId('hamburger-button');
        fireEvent.click(hamburgerButton);

        const itemButton = screen.getByText(/Item 2/i);
        fireEvent.click(itemButton);
        expect(mockOnSelect).toHaveBeenCalledWith(1); // 0 indexed btw
        expect(mockOnSelect).toHaveBeenCalledTimes(1);
    });

    test('should close drawer on close button click', async () => {
        renderSetup();

        const hamburgerButton = screen.getByTestId('hamburger-button');
        fireEvent.click(hamburgerButton);
        expect(screen.getByTestId('drawer-header')).toBeInTheDocument();

        const closeButton = screen.getByTestId('drawer-close-button');
        fireEvent.click(closeButton);
        await waitFor(() => {
            expect(screen.queryByTestId('drawer-close-button')).not.toBeInTheDocument();
        });
    });
});