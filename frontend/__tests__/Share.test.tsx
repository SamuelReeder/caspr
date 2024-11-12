import "@testing-library/jest-dom";
import { screen, fireEvent, waitFor, within } from "@testing-library/react";
import ShareButton from "@/components/ShareButton";
import {
	loginWithEmail,
	shareGraphWithUser,
	getSharedGraphs,
	fetchCurrUserGraphs
} from "@/api";
import { Timestamp } from "firebase/firestore";
import { Graph, User } from "@/types";
import customRender from "@/test-utils/render";

const mockUser: User = {
	uid: "123",
	name: "Test User",
	email: "test@gmail.com",
	photoURL: "TestURL.com",
	createdAt: Timestamp.now(),
	roles: []
};

const mockGraph: Graph = {
	id: "test-graph-id",
	owner: mockUser.uid,
	graphName: "Test Graph",
	graphDescription: "Test Description",
	graphVisibility: true,
	graphFileURL: "http://example.com/graph.png",
	graphURL: "http://example.com/graph",
	createdAt: Timestamp.now(),
	sharing: [],
	sharedEmails: ["test@example.com"],
	presets: [
		{
			name: "Preset 1",
			updated: Timestamp.now(),
			filters: ["filter1"],
			pathways: ["pathway1"],
			view: null
		},
		{
			name: "Preset 2",
			updated: Timestamp.now(),
			filters: ["filter2"],
			pathways: ["pathway2"],
			view: null
		}
	]
};

Object.assign(navigator, {
	clipboard: {
		writeText: jest.fn()
	}
});

const mockToast = jest.fn();
jest.mock("@chakra-ui/react", () => ({
	...jest.requireActual("@chakra-ui/react"),
	useToast: () => mockToast
}));

jest.mock("@/api", () => ({
	loginWithEmail: jest.fn(() => Promise.resolve({
		firebaseUser: mockUser,
		firestoreUser: mockUser,
		loading: false
	})),
	shareGraphWithUser: jest.fn(() => Promise.resolve(true)),
	getSharedGraphs: jest.fn(() => Promise.resolve([mockGraph])),
	fetchCurrUserGraphs: jest.fn(() => Promise.resolve([mockGraph]))
}));

describe("ShareButton", () => {
	beforeAll(async () => {
		jest.clearAllMocks();

		(loginWithEmail as jest.Mock).mockImplementation(() =>
			Promise.resolve({
				firebaseUser: null,
				firestoreUser: mockUser,
				loading: false
			})
		);

		(fetchCurrUserGraphs as jest.Mock).mockImplementation(() =>
			Promise.resolve([mockGraph])
		);

		(getSharedGraphs as jest.Mock).mockImplementation(() =>
			Promise.resolve([mockGraph])
		);

		await loginWithEmail("test@gmail.com", "password");
	});

	beforeEach(() => {
		jest.clearAllMocks();
	});

	const renderComponent = () => {
		return customRender(
			<ShareButton
				graph={mockGraph}
				url={mockGraph.graphURL}
				title={mockGraph.graphName}
				onMakePublic={() => Promise.resolve()}
			/>
		);
	};


	test("renders share button and opens modal", () => {
		customRender(<ShareButton graph={mockGraph} url={""} title={""} onMakePublic={function (isPublic: boolean): Promise<void> {
			throw new Error("Function not implemented.");
		}} />);

		const shareButton = screen.getByText("Share");
		fireEvent.click(shareButton);

		expect(screen.getByText("Share Graph")).toBeInTheDocument();
		expect(screen.getByPlaceholderText("Enter email address and press Enter")).toBeInTheDocument();
	});


	test("prevents adding invalid email addresses", () => {
		renderComponent();

		fireEvent.click(screen.getByRole("button", { name: /Share/i }));

		const emailInput = screen.getByPlaceholderText("Enter email address and press Enter");
		fireEvent.change(emailInput, { target: { value: "invalid-email" } });
		fireEvent.keyDown(emailInput, { key: "Enter" });

		expect(screen.queryByText("invalid-email")).not.toBeInTheDocument();
	});

	test("removes email from list when clicking close button", () => {
		renderComponent();
		fireEvent.click(screen.getByText("Share"));

		const emailInput = screen.getByPlaceholderText("Enter email address and press Enter");
		fireEvent.change(emailInput, { target: { value: "test@example.com" } });
		fireEvent.keyDown(emailInput, { key: "Enter" });

		const closeButton = screen.getByLabelText("close");
		fireEvent.click(closeButton);

		expect(screen.queryByText("test@example.com")).not.toBeInTheDocument();
	});

	test("shares graph with selected recipients and presets", async () => {
		(shareGraphWithUser as jest.Mock).mockResolvedValueOnce(true);

		renderComponent();

		fireEvent.click(screen.getByText("Share"));

		const modal = screen.getByRole("dialog");

		const emailInput = screen.getByPlaceholderText("Enter email address and press Enter");
		fireEvent.change(emailInput, { target: { value: "test@example.com" } });
		fireEvent.keyDown(emailInput, { key: "Enter" });

		fireEvent.click(screen.getByText("Preset 1"));

		fireEvent.click(within(modal).getByText("Share"));

		await waitFor(() => {
			expect(shareGraphWithUser).toHaveBeenCalledWith(
				"test-graph-id",
				"test@example.com",
				["Preset 1"]
			);
		});
	});

	test("renders share button initially", () => {
		renderComponent();

		expect(screen.getByText("Share")).toBeInTheDocument();
	});

	test("opens modal when share button clicked", () => {
		renderComponent();

		fireEvent.click(screen.getByText("Share"));
		expect(screen.getByText("Share Graph")).toBeInTheDocument();
	});

	test("opens and closes modal", async () => {
		renderComponent();
		fireEvent.click(screen.getByText("Share"));
		expect(screen.getByText("Share Graph")).toBeInTheDocument();
		fireEvent.click(screen.getByText("Cancel"));
		await waitFor(() => {
			expect(screen.queryByText("Share Graph")).not.toBeInTheDocument();
		});
	});

	test("handles email input", () => {
		renderComponent();
		fireEvent.click(screen.getByText("Share"));

		const input = screen.getByPlaceholderText("Enter email address and press Enter");
		fireEvent.change(input, { target: { value: "test@example.com" } });
		fireEvent.keyDown(input, { key: "Enter" });

		expect(screen.getByText("test@example.com")).toBeInTheDocument();
	});

	test("removes email from list", () => {
		renderComponent();
		fireEvent.click(screen.getByText("Share"));

		const input = screen.getByPlaceholderText("Enter email address and press Enter");
		fireEvent.change(input, { target: { value: "test@example.com" } });
		fireEvent.keyDown(input, { key: "Enter" });

		const closeButton = screen.getByLabelText("close");
		fireEvent.click(closeButton);

		expect(screen.queryByText("test@example.com")).not.toBeInTheDocument();
	});

	test("copies URL to clipboard", async () => {
		renderComponent();
		fireEvent.click(screen.getByText("Share"));
		fireEvent.click(screen.getByLabelText("Make graph public"));
		fireEvent.click(screen.getByText("Copy"));

		expect(navigator.clipboard.writeText).toHaveBeenCalledWith(mockGraph.graphURL);
		expect(mockToast).toHaveBeenCalled();
	});

	test("shows public link when toggling switch", () => {
		renderComponent();
		fireEvent.click(screen.getByText("Share"));
		fireEvent.click(screen.getByLabelText("Make graph public"));
		expect(screen.getByDisplayValue(mockGraph.graphURL)).toBeInTheDocument();
	});

	test("handles sharing with presets", async () => {
		(shareGraphWithUser as jest.Mock).mockResolvedValueOnce(true);
		renderComponent();

		fireEvent.click(screen.getByText("Share"));

		const modal = screen.getByRole("dialog");

		const input = screen.getByPlaceholderText("Enter email address and press Enter");
		fireEvent.change(input, { target: { value: "test@example.com" } });
		fireEvent.keyDown(input, { key: "Enter" });

		const preset = screen.getByText("Preset 1");
		fireEvent.click(preset);

		const shareButtonInModal = within(modal).getByText("Share");
		fireEvent.click(shareButtonInModal);

		await waitFor(() => {
			expect(shareGraphWithUser).toHaveBeenCalled();
		});
	});
	test("handles share failure", async () => {
		(shareGraphWithUser as jest.Mock).mockRejectedValueOnce(new Error("Share failed"));
		renderComponent();

		fireEvent.click(screen.getByText("Share"));

		const modal = screen.getByRole("dialog");

		const input = within(modal).getByPlaceholderText("Enter email address and press Enter");
		fireEvent.change(input, { target: { value: "bademail" } });
		fireEvent.keyDown(input, { key: "Enter" });

		const shareButtonInModal = within(modal).getByText("Share");
		fireEvent.click(shareButtonInModal);

		await waitFor(() => {
			expect(mockToast).toHaveBeenCalledWith(
				expect.objectContaining({
					status: "error"
				})
			);
		});
	});
});
