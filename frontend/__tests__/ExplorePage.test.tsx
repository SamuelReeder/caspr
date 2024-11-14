import "@testing-library/jest-dom";

import { screen, waitFor } from "@testing-library/react";

import { AuthContext } from "@/context/AuthContext";
import Explore from "@/pages/explore";
import React from "react";
import { Timestamp } from "firebase/firestore";
import { User } from "firebase/auth";
import customRender from "@/test-utils/render";
import { fetchAllPublicGraphs } from "@/api/storage";

const mockRouterPush = jest.fn();
jest.mock("next/router", () => ({
	useRouter: jest.fn(() => ({
		push: mockRouterPush
	}))
}));

jest.mock("@/api/storage", () => ({
	fetchAllPublicGraphs: jest.fn()
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
		createdAt: Timestamp.now()
	},
	{
		id: "2",
		graphName: "Graph 2",
		graphDescription: "Description 2",
		owner: mockUser.uid,
		graphVisibility: false,
		graphURL: "http://test.com/2",
		graphFileURL: "http://test.com/file2",
		createdAt: Timestamp.now()
	}
];

describe("Explore page Component", () => {
	beforeEach(() => {
		jest.clearAllMocks();

		(fetchAllPublicGraphs as jest.Mock).mockResolvedValue(mockGraphs);
	});

	const renderWithAuthContext = (firebaseUser: User | null) => {
		return customRender(
			<AuthContext.Provider
				value={{ firebaseUser, firestoreUser: null, loading: false }}
			>
				<Explore />
			</AuthContext.Provider>
		);
	};

	it("renders the explore page with welcome text", async () => {
		renderWithAuthContext(mockUser as User);
		expect(await screen.findByText(/Welcome, Test User/i)).toBeInTheDocument;
		expect(await screen.findByText(/Email: test@gmail.com/i)).toBeInTheDocument;
	});

	it("redirects to login page when user is not logged in", () => {
		renderWithAuthContext(null);
		expect(mockRouterPush).toHaveBeenCalledWith("/");
		expect(screen.findByText(/Welcome, Test User/i)).not.toBeInTheDocument;
		expect(screen.findByText(/Email: test@gmail.com/i)).not.toBeInTheDocument;
	});

	it("renders the mock graph data in the explore page", async () => {
		renderWithAuthContext(mockUser as User);
		for (const graph of mockGraphs) {
			expect(await screen.findByText(graph.graphName)).toBeInTheDocument();
		}
	});

	it("renders the seaerch bar corectly", () => {
		renderWithAuthContext(mockUser as User);
		expect(
			screen.getByPlaceholderText(/search for a graph/i)
		).toBeInTheDocument();
	});

	it("handles errors when fetching graphs", async () => {
		const consoleErrorSpy = jest
			.spyOn(console, "error")
			.mockImplementation(() => {});
		(fetchAllPublicGraphs as jest.Mock).mockRejectedValue(
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
