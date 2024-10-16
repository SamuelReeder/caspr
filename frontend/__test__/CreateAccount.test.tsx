import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import CreateAccount from "@/pages/createAccount";
import { useRouter } from "next/router";

const email = "test@123.com";

jest.mock("next/router", () => ({
	useRouter: jest.fn().mockReturnValue({ push: jest.fn() })
}));

jest.mock("@/api", () => ({
	createAccountWithEmail: jest.fn()
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
});
