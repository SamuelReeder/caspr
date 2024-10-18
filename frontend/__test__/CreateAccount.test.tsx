import "@testing-library/jest-dom";

import { createAccountWithEmail, createAccountWithGoogle } from "@/api";
import { fireEvent, render, screen } from "@testing-library/react";

import CreateAccount from "@/pages/createAccount";
import React from "react";
import { useRouter } from "next/router";

const email = "test@123.com";

jest.mock("next/router", () => ({
	useRouter: jest.fn().mockReturnValue({ push: jest.fn() })
}));

jest.mock("@/api", () => ({
	createAccountWithEmail: jest.fn(),
	createAccountWithGoogle: jest.fn()
}));

jest.mock("@chakra-ui/react", () => ({
	...jest.requireActual("@chakra-ui/react"),
	toast: jest.fn()
}));

describe("Create Account (Landing Page)", () => {
	const mockPush = jest.fn();

	beforeEach(() => {
		jest.clearAllMocks();
		(useRouter as jest.Mock).mockReturnValue({ push: mockPush });
	});

	test("renders Create Account component", () => {
		render(<CreateAccount />);
		const headingElement = screen.getByText(/Welcome to Caspr/i);
		expect(headingElement).toBeInTheDocument();
	});

	test("renders Google sign-up button", () => {
		render(<CreateAccount />);
		const googleSignUpButton = screen.getByRole("button", {
			name: /Sign-up with Google/i
		});
		expect(googleSignUpButton).toBeInTheDocument();
	});

	test("allows user to input email", () => {
		render(<CreateAccount />);
		const emailInput = screen.getByPlaceholderText(/Enter email/i);
		fireEvent.change(emailInput, { target: { value: email } });
		expect(emailInput).toHaveValue(email);
	});

	test("allows user to input username", () => {
		render(<CreateAccount />);
		const usernameInput = screen.getByPlaceholderText(/Enter username/i);
		fireEvent.change(usernameInput, { target: { value: "username" } });
		expect(usernameInput).toHaveValue("username");
	});

	test("allows user to input password", () => {
		render(<CreateAccount />);
		const passwordInput = screen.getByLabelText(/Password/i);
		fireEvent.change(passwordInput, { target: { value: "password" } });
		expect(passwordInput).toHaveValue("password");
	});

	test("does not create account when passwords don't match", async () => {
		(createAccountWithEmail as jest.Mock).mockRejectedValueOnce(
			new Error("Passwords don't match")
		);
		render(<CreateAccount />);
		const emailInput = screen.getByPlaceholderText(/Enter email/i);
		const passwordInput = screen.getByLabelText(/Password/i);
		const signUpButton = screen.getByRole("button", {
			name: /Create Account/i
		});

		fireEvent.change(emailInput, { target: { value: "invalid_email" } });
		fireEvent.change(passwordInput, { target: { value: "wrong_password" } });
		fireEvent.click(signUpButton);
	});

	test("triggers Google sign-up when button is clicked", async () => {
		render(<CreateAccount />);
		const mockGoogleAccountCreation = createAccountWithGoogle as jest.Mock;

		const googleSignUpButton = screen.getByRole("button", {
			name: /Sign-up with Google/i
		});

		fireEvent.click(googleSignUpButton);
		expect(mockGoogleAccountCreation).toHaveBeenCalled();
	});
});
