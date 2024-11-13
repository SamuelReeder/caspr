import "@testing-library/jest-dom";
import { act, fireEvent, screen, waitFor } from "@testing-library/react";
import React from "react";
import SharedWithMe from "@/pages/sharedWithMe"; // Ensure correct import
import customRender from "@/test-utils/render";
import { AuthContext } from "@/context/AuthContext"; // Ensure correct import
import { Timestamp } from "firebase/firestore";
import { User } from "firebase/auth"
import { getSharedGraphs, getUser } from "@/api";

const mockRouterPush = jest.fn();
jest.mock("next/router", () => ({
    useRouter: jest.fn(() => ({
        push: mockRouterPush,
    })),
}));

jest.mock("@/api/storage", () => ({
    getSharedGraphs: jest.fn(),
    getUser: jest.fn(),
}));

const mockUser: Partial<User> = {
    uid: "123",
    displayName: "Test User",
    email: "test@gmail.com",
    photoURL: "TestURL.com",
    metadata: {
        creationTime: Timestamp.now().toDate().toString(),
        lastSignInTime: Timestamp.now().toDate().toString(),
    } as User['metadata'],
};

const mockSharedGraphs = [
    {
        id: "1",
        graphName: "Shared Graph 1",
        graphDescription: "Description 1",
        owner: "owner1",
        graphVisibility: true,
        graphURL: "http://test.com/1",
        graphFileURL: "http://test.com/file1",
        createdAt: Timestamp.now(),
        sharing: [],
        sharedEmails: [],
        presets: [],
    },
    {
        id: "2",
        graphName: "Shared Graph 2",
        graphDescription: "Description 2",
        owner: "owner2",
        graphVisibility: false,
        graphURL: "http://test.com/2",
        graphFileURL: "http://test.com/file2",
        createdAt: Timestamp.now(),
        sharing: [],
        sharedEmails: [],
        presets: [],
    },
];

const mockOwners: { [key: string]: { name: string } } = {
    owner1: { name: "owner1" },
    owner2: { name: "owner2" },
};

describe("Shared With Me Page Component", () => {
    beforeEach(() => {
        jest.clearAllMocks();

        (getSharedGraphs as jest.Mock).mockResolvedValue(mockSharedGraphs);
        (getUser as jest.Mock).mockImplementation((ownerId: string) => {
            return Promise.resolve(mockOwners[ownerId] || { name: "Unknown" });
        });
    });

    const renderWithAuthContext = (firebaseUser: User | null) => {
        return customRender(
            <AuthContext.Provider value={{ firebaseUser, firestoreUser: null, loading: false }}>
                <SharedWithMe />
            </AuthContext.Provider>
        );
    };

    it("renders the home page", async () => {
        renderWithAuthContext(mockUser as User);
        expect(await screen.findAllByText(/Shared With Me/i)).toHaveLength(2);
        expect(await screen.findByText(/Welcome, Test User/i)).toBeInTheDocument;
        expect(await screen.findByText(/Email: test@gmail.com/i)).toBeInTheDocument
    });

    it("renders the mock graph data in the home page", async () => {
        renderWithAuthContext(mockUser as User);
        expect(await screen.findByText(/Shared Graph 1/i)).toBeInTheDocument();
        expect(await screen.findByText(/Description 1/i)).toBeInTheDocument();
        expect(await screen.findByText(/Shared Graph 2/i)).toBeInTheDocument();
        expect(await screen.findByText(/Description 2/i)).toBeInTheDocument();

        expect(await screen.findAllByRole("button", { name: /Share/i })).toHaveLength(2)
        expect(await screen.findAllByRole("button", { name: /Open/i })).toHaveLength(2)
    });


    it("displays the correct owner names for the shared graphs", async () => {
        (getSharedGraphs as jest.Mock).mockResolvedValue(mockSharedGraphs);
        (getUser as jest.Mock).mockImplementation((ownerId) => {
            return Promise.resolve(mockOwners[ownerId] || { name: "Unknown" });
        });

        renderWithAuthContext(mockUser as User);
        expect(await screen.findByText(/owner1/i)).toBeInTheDocument();
        expect(await screen.findByText(/owner2/i)).toBeInTheDocument();
    });

    it("opens the share modal when the Share button is clicked", async () => {
        renderWithAuthContext(mockUser as User);
        const shareButtons = await screen.findAllByRole("button", { name: /Share/i });
        await act(async () => {
            fireEvent.click(shareButtons[0]);
        });
        expect(await screen.findByText(/Share graph/i)).toBeInTheDocument();
        expect(await screen.findByPlaceholderText(/Enter email address and press Enter/i)).toBeInTheDocument
        expect(await screen.findByText(/Make graph public/i)).toBeInTheDocument
        expect(await screen.findByRole("button", { name: /Share/i })).toBeInTheDocument
        expect(await screen.findByRole("button", { name: /Cancel/i })).toBeInTheDocument
    });

    it("closes the share modal when the cancel button is clicked", async () => {
        renderWithAuthContext(mockUser as User);
        const shareButtons = await screen.findAllByRole("button", { name: /Share/i });
        await act(async () => {
            fireEvent.click(shareButtons[0]);
        });
        expect(await screen.findByPlaceholderText(/Enter email address and press Enter/i)).toBeInTheDocument
        const cancelButton = await screen.findByRole("button", { name: /Cancel/i })
        await act(async () => {
            fireEvent.click(cancelButton);
        });
        await waitFor(() => {
            expect(screen.queryByText(/Enter email address and press Enter/i)).not.toBeInTheDocument();
            expect(screen.queryByText(/Make graph public/i)).not.toBeInTheDocument();
        });
    })
});


describe("Shared With Me Page Component", () => {
    beforeEach(() => {
        jest.clearAllMocks();

        (getSharedGraphs as jest.Mock).mockResolvedValue(mockSharedGraphs);
        (getUser as jest.Mock).mockImplementation((ownerId: string) => {
            return Promise.resolve(mockOwners[ownerId] || { name: "Unknown" });
        });
    });

    const renderWithAuthContext = (firebaseUser: User | null) => {
        return customRender(
            <AuthContext.Provider value={{ firebaseUser, firestoreUser: null, loading: false }}>
                <SharedWithMe />
            </AuthContext.Provider>
        );
    };
    it("it doesn't load graphs when not authenticated", () => {
        renderWithAuthContext(null);
        expect(screen.queryByText(/Shared With Me/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/Shared Graph 1/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/Description 1/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/Shared Graph 2/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/Description 2/i)).not.toBeInTheDocument();
    })

    it("handles errors when fetching shared graphs", async () => {
        const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => { });
        (getSharedGraphs as jest.Mock).mockRejectedValue(new Error("Error fetching shared graphs"));

        renderWithAuthContext(mockUser as User);
        await waitFor(() => {
            expect(consoleErrorSpy).toHaveBeenCalledWith("Error fetching shared graphs:", expect.any(Error));
            expect(screen.queryByText(/Shared Graph 1/i)).not.toBeInTheDocument();
            expect(screen.queryByText(/Shared Graph 2/i)).not.toBeInTheDocument();
        });

        consoleErrorSpy.mockRestore();
    });
});

describe("Loading Screen Component", () => {
    beforeEach(() => {
        jest.clearAllMocks();

        (getSharedGraphs as jest.Mock).mockResolvedValue(mockSharedGraphs);
        (getUser as jest.Mock).mockImplementation((ownerId: string) => {
            return Promise.resolve(mockOwners[ownerId] || { name: "Unknown" });
        });
    });

    const renderWithAuthContext = (firebaseUser: User | null) => {
        return customRender(
            <AuthContext.Provider value={{ firebaseUser, firestoreUser: null, loading: true }}>
                <SharedWithMe />
            </AuthContext.Provider>
        );
    };

    it("it shows loading screen", () => {
        renderWithAuthContext(null);
        expect(screen.queryByText(/loading/i)).toBeInTheDocument()
    })
});