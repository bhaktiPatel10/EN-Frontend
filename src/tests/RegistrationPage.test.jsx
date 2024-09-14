// src/RegistrationPage.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor,act } from '@testing-library/react';
import '@testing-library/jest-dom'; // Import jest-dom
import RegistrationPage from '../components/Registration.jsx';


// Mock WebSocket
const mockSend = jest.fn();
const mockClose = jest.fn();
const mockOnMessage = jest.fn();

global.WebSocket = jest.fn(() => ({
    send: mockSend,
    close: mockClose,
    onmessage: (callback) => {
        mockOnMessage = callback;
    },
}));
beforeEach(() => {
    jest.clearAllMocks();
});
test('should send data to WebSocket and display the response', async () => {
    render(<RegistrationPage />);

    // Fill out the form
    fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText(/Email Address/i), { target: { value: 'john.doe@example.com' } });
    // Handle potential multiple elements with the same label
    const passwordFields = screen.getAllByLabelText(/Password/i);
    expect(passwordFields).toHaveLength(2);
    fireEvent.change(passwordFields[0], { target: { value: 'password123' } });

    const confirmPasswordFields = screen.getAllByLabelText(/Confirm Password/i);
    expect(confirmPasswordFields).toHaveLength(1);
    fireEvent.change(confirmPasswordFields[0], { target: { value: 'password123' } });
    fireEvent.click(screen.getByText(/Submit/i));

    // Simulate WebSocket message being received
    act(() => {
        mockOnMessage({ data: 'Echo: Hello World!' });
    });

    // Check for the WebSocket response being displayed
    await waitFor(() => {
        expect(screen.getByTestId('ws-message')).toHaveTextContent('WebSocket Response: Echo: Hello World!');
    });
});