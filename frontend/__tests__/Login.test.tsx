import "@testing-library/jest-dom";

import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { loginWithEmail, loginWithGoogle } from "@/api";
import { Providers } from "@/app/providers";
import customRender from "@/test-utils/render";

import Index from "@/pages/login";
import React from "react";
import { useRouter } from "next/router";

const email = "test@123.com";

jest.mock("next/router", () => ({
	useRouter: jest.fn().mockReturnValue({ push: jest.fn() })
}));

jest.mock("@/api", () => ({
	loginWithEmail: jest.fn(),
	loginWithGoogle: jest.fn()
}));

jest.mock("@chakra-ui/react", () => ({
	...jest.requireActual("@chakra-ui/react"),
	toast: jest.fn()
}));

describe("Index (Landing Page)", () => {
	const mockPush = jest.fn();

	beforeEach(() => {
		jest.clearAllMocks();
		(useRouter as jest.Mock).mockReturnValue({ push: mockPush });
	});

	test("renders Login component", () => {
		customRender(<Index />);
		const headingElement = screen.getByText(/Welcome to Caspr/i);
		expect(headingElement).toBeInTheDocument();
	});

	test("allows user to input email", () => {
		customRender(<Index />);
		const emailInput = screen.getByPlaceholderText(/Enter email/i);
		fireEvent.change(emailInput, { target: { value: email } });
		expect(emailInput).toHaveValue(email);
	});

	test("allows user to input password", () => {
		customRender(<Index />);
		const passwordInput = screen.getByPlaceholderText(/Enter password/i);
		fireEvent.change(passwordInput, { target: { value: "password" } });
		expect(passwordInput).toHaveValue("password");
	});

	test("redirects to home on form submit", async () => {
		(loginWithEmail as jest.Mock).mockResolvedValueOnce({});
		customRender(<Index />);
		const emailInput = screen.getByPlaceholderText(/Enter email/i);
		const passwordInput = screen.getByPlaceholderText(/Enter password/i);
		const loginButton = screen.getByRole("button", { name: /Log In/i });

		fireEvent.change(emailInput, { target: { value: email } });
		fireEvent.change(passwordInput, { target: { value: "password" } });
		fireEvent.click(loginButton);

		await waitFor(() => {
			expect(mockPush).toHaveBeenCalledWith("/home");
		});
	});

	test("Create a new account button navigates to /create-account", () => {
		customRender(<Index />);

		const signUpButton = screen.getByRole("button", {
			name: /Create a new account/i
		});

		fireEvent.click(signUpButton);

		const router = useRouter();
		expect(router.push).toHaveBeenCalledWith("/create-account");
	});

	test("Forgot password link has correct href", () => {
		customRender(<Index />);
		const forgotPasswordLink = screen.getByText(/Forgot password/i);
		expect(forgotPasswordLink.closest("a")).toHaveAttribute(
			"href",
			"/forgot-password"
		);
	});

	test("does not log in with invalid credentials", async () => {
		(loginWithEmail as jest.Mock).mockRejectedValueOnce(
			new Error("Invalid credentials")
		);
		customRender(<Index />);
		const emailInput = screen.getByPlaceholderText(/Enter email/i);
		const passwordInput = screen.getByPlaceholderText(/Enter password/i);
		const loginButton = screen.getByRole("button", { name: /Log In/i });

		fireEvent.change(emailInput, { target: { value: "invalid_email" } });
		fireEvent.change(passwordInput, { target: { value: "wrong_password" } });
		fireEvent.click(loginButton);

		await waitFor(() => {
			expect(mockPush).not.toHaveBeenCalledWith("/home");
		});
	});

	test("triggers Google login redirect", async () => {
		customRender(<Index />);
		const googleLoginButton = screen.getByRole("button", {
			name: /Sign in with Google/i
		});

		fireEvent.click(googleLoginButton);

		await waitFor(() => {
			expect(loginWithGoogle).toHaveBeenCalled();
		});
	});
});
