import "@testing-library/jest-dom";
import { act, fireEvent, screen, waitFor } from "@testing-library/react";
import React from "react";
import Home from "@/pages"; // Ensure correct import
import customRender from "@/test-utils/render";
import { fetchCurrUserGraphs } from "@/api/storage";
import { AuthContext } from "@/context/AuthContext"; // Ensure correct import
import { Timestamp } from "firebase/firestore";
import { User } from "firebase/auth";

const mockRouterPush = jest.fn();
jest.mock("next/router", () => ({
	useRouter: jest.fn(() => ({
		push: mockRouterPush
	}))
}));

jest.mock("@/api/storage", () => ({
	fetchCurrUserGraphs: jest.fn()
}));

const mockUser: Partial<User> = {
	uid: "123",
	displayName: "Test User",
	email: "test@gmail.com",
	photoURL: "TestURL.com",
	metadata: {
		creationTime: Timestamp.now().toDate().toString(),
		lastSignInTime: Timestamp.now().toDate().toString()
	} as User["metadata"]
};

const mockGraphs = [
	{
		id: "1",
		graphName: "Graph 1",
		graphDescription: "Description 1",
		owner: mockUser.uid,
		graphVisibility: true,
		graphURL: "http://test.com/1",
		graphFileURL: "http://test.com/file1",
		createdAt: Timestamp.now(),
		sharing: [],
		sharedEmails: [],
		presets: []
	},
	{
		id: "2",
		graphName: "Graph 2",
		graphDescription: "Description 2",
		owner: mockUser.uid,
		graphVisibility: false,
		graphURL: "http://test.com/2",
		graphFileURL: "http://test.com/file2",
		createdAt: Timestamp.now(),
		sharing: [],
		sharedEmails: [],
		presets: []
	}
];

describe("Home page Component", () => {
	beforeEach(() => {
		jest.clearAllMocks();

		(fetchCurrUserGraphs as jest.Mock).mockResolvedValue(mockGraphs);
	});

	const renderWithAuthContext = (firebaseUser: User | null) => {
		return customRender(
			<AuthContext.Provider
				value={{ firebaseUser, firestoreUser: null, loading: false }}
			>
				<Home />
			</AuthContext.Provider>
		);
	};

	it("renders the home page when authenticated", async () => {
		renderWithAuthContext(mockUser as User);
		expect(await screen.findAllByText(/My Graphs/i)).toHaveLength(2);
		expect(await screen.findByText(/Welcome, Test User/i)).toBeInTheDocument();
		expect(
			await screen.findByText(/Email: test@gmail.com/i)
		).toBeInTheDocument();
	});

	it("renders the mock graph data in the home page", async () => {
		renderWithAuthContext(mockUser as User);
		expect(await screen.findByText(/Graph 1/i)).toBeInTheDocument();
		expect(await screen.findByText(/Description 1/i)).toBeInTheDocument();
		expect(await screen.findByText(/Graph 2/i)).toBeInTheDocument();
		expect(await screen.findByText(/Description 2/i)).toBeInTheDocument();

		expect(
			await screen.findAllByRole("button", { name: /Share/i })
		).toHaveLength(2);
		expect(
			await screen.findAllByRole("button", { name: /Open/i })
		).toHaveLength(2);
	});

	it("opens the share modal when the Share button is clicked", async () => {
		renderWithAuthContext(mockUser as User);
		const shareButtons = await screen.findAllByRole("button", {
			name: /Share/i
		});
		await act(async () => {
			fireEvent.click(shareButtons[0]);
		});
		expect(await screen.findByText(/Share graph/i)).toBeInTheDocument();
		expect(
			await screen.findByPlaceholderText(/Enter email address and press Enter/i)
		).toBeInTheDocument();
		expect(await screen.findByText(/Make graph public/i)).toBeInTheDocument();
		expect(
			await screen.findByRole("button", { name: /Share/i })
		).toBeInTheDocument();
		expect(
			await screen.findByRole("button", { name: /Cancel/i })
		).toBeInTheDocument();
	});

	it("closes the share modal when the cancel button is clicked", async () => {
		renderWithAuthContext(mockUser as User);
		const shareButtons = await screen.findAllByRole("button", {
			name: /Share/i
		});
		await act(async () => {
			fireEvent.click(shareButtons[0]);
		});
		const cancelButton = await screen.findByRole("button", { name: /Cancel/i });
		await act(async () => {
			fireEvent.click(cancelButton);
		});
		await waitFor(() => {
			expect(
				screen.queryByText(/Enter email address and press Enter/i)
			).not.toBeInTheDocument();
			expect(screen.queryByText(/Make graph public/i)).not.toBeInTheDocument();
		});
	});
});

describe("Error Handling", () => {
	beforeEach(() => {
		jest.clearAllMocks();

		(fetchCurrUserGraphs as jest.Mock).mockResolvedValue(mockGraphs);
	});

	const renderWithAuthContext = (firebaseUser: User | null) => {
		return customRender(
			<AuthContext.Provider
				value={{ firebaseUser, firestoreUser: null, loading: false }}
			>
				<Home />
			</AuthContext.Provider>
		);
	};

	it("it doesn't load graphs when not authenticated", () => {
		renderWithAuthContext(null);
		expect(mockRouterPush).toHaveBeenCalledWith("/");
		expect(screen.queryByText(/My Graphs/i)).not.toBeInTheDocument();
		expect(screen.queryByText(/Graph 1/i)).not.toBeInTheDocument();
		expect(screen.queryByText(/Description 1/i)).not.toBeInTheDocument();
		expect(screen.queryByText(/Graph 2/i)).not.toBeInTheDocument();
		expect(screen.queryByText(/Description 2/i)).not.toBeInTheDocument();
	});

	it("handles errors when fetching graphs", async () => {
		const consoleErrorSpy = jest
			.spyOn(console, "error")
			.mockImplementation(() => {});
		(fetchCurrUserGraphs as jest.Mock).mockRejectedValue(
			new Error("Error fetching graphs")
		);

		renderWithAuthContext(mockUser as User);
		await waitFor(() => {
			expect(consoleErrorSpy).toHaveBeenCalledWith(
				"Error fetching graphs:",
				expect.any(Error)
			);
			expect(screen.queryByText(/Graph 1/i)).not.toBeInTheDocument();
			expect(screen.queryByText(/Graph 2/i)).not.toBeInTheDocument();
		});

		consoleErrorSpy.mockRestore();
	});
});

describe("Loading Screen Component", () => {
	beforeEach(() => {
		jest.clearAllMocks();

		(fetchCurrUserGraphs as jest.Mock).mockResolvedValue(mockGraphs);
	});

	const renderWithAuthContext = (firebaseUser: User | null) => {
		return customRender(
			<AuthContext.Provider
				value={{ firebaseUser, firestoreUser: null, loading: true }}
			>
				<Home />
			</AuthContext.Provider>
		);
	};

	it("it shows loading screen", () => {
		renderWithAuthContext(null);
		expect(screen.queryByText(/loading/i)).toBeInTheDocument();
	});
});
