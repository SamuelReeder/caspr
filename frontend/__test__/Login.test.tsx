import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Index from '@/pages';
import { useRouter } from 'next/router';
import { loginWithEmail, loginWithGoogle } from '@/api';

const email = 'test@123.com';

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({ push: jest.fn() }),
}));

jest.mock('@/api', () => ({
  loginWithEmail: jest.fn(),
  loginWithGoogle: jest.fn(),
}));

jest.mock('@chakra-ui/react', () => ({
  ...jest.requireActual('@chakra-ui/react'),
  toast: jest.fn(),
}));

describe('Index (Landing Page)', () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  });

  test('renders Login component', () => {
    render(<Index />);
    const headingElement = screen.getByText(/Welcome to Caspr/i);
    expect(headingElement).toBeInTheDocument();
  });

  test('allows user to input email', () => {
    render(<Index />);
    const emailInput = screen.getByPlaceholderText(/Enter email/i);
    fireEvent.change(emailInput, { target: { value: email } });
    expect(emailInput).toHaveValue(email);
  });

  test('allows user to input password', () => {
    render(<Index />);
    const passwordInput = screen.getByPlaceholderText(/Enter password/i);
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    expect(passwordInput).toHaveValue('password');
  });

  test('redirects to home on form submit', async () => {
    (loginWithEmail as jest.Mock).mockResolvedValueOnce({});
    render(<Index />);
    const emailInput = screen.getByPlaceholderText(/Enter email/i);
    const passwordInput = screen.getByPlaceholderText(/Enter password/i);
    const loginButton = screen.getByRole('button', { name: /Log In/i });

    fireEvent.change(emailInput, { target: { value: email } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/home');
    });
  });

  test('Sign Up Instead button has correct href', () => {
    render(<Index />);
    const signUpLink = screen.getByRole('link', { name: /Sign Up Instead/i });
    expect(signUpLink).toHaveAttribute('href', '/createAccount');
  });

  test('Forgot password link has correct href', () => {
    render(<Index />);
    const forgotPasswordLink = screen.getByText(/Forgot password/i);
    expect(forgotPasswordLink.closest('a')).toHaveAttribute('href', '/forgotPassword');
  });

  test('does not log in with invalid credentials', async () => {
    (loginWithEmail as jest.Mock).mockRejectedValueOnce(new Error('Invalid credentials'));
    render(<Index />);
    const emailInput = screen.getByPlaceholderText(/Enter email/i);
    const passwordInput = screen.getByPlaceholderText(/Enter password/i);
    const loginButton = screen.getByRole('button', { name: /Log In/i });

    fireEvent.change(emailInput, { target: { value: 'invalid_email' } });
    fireEvent.change(passwordInput, { target: { value: 'wrong_password' } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(mockPush).not.toHaveBeenCalledWith('/home');
    });
  });

  test('triggers Google login redirect', async () => {
    render(<Index />);
    const googleLoginButton = screen.getByRole('button', { name: /Sign in with Google/i });

    fireEvent.click(googleLoginButton);
    
    await waitFor(() => {
      expect(loginWithGoogle).toHaveBeenCalled();
    });
  });
});