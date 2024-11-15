import "@testing-library/jest-dom";
import { screen, fireEvent, waitFor, within } from "@testing-library/react";
import ShareButton from "@/components/ShareButton";
import {
	loginWithEmail,
	shareGraphWithUser,
	getSharedGraphs,
	fetchCurrUserGraphs,
	unshareGraphFromUser
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

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

const mockGraph: Graph = {
	id: "test-graph-id",
	owner: mockUser.uid,
	graphName: "Test Graph",
	graphDescription: "Test Description",
	graphVisibility: true,
	graphFileURL: "http://example.com/graph.png",
	graphURL: "graph",
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
	loginWithEmail: jest.fn(() =>
		Promise.resolve({
			firebaseUser: mockUser,
			firestoreUser: mockUser,
			loading: false
		})
	),
	shareGraphWithUser: jest.fn(() => Promise.resolve(true)),
	unshareGraphFromUser: jest.fn(() => Promise.resolve(true)),
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

	const renderComponent = () => {
		return customRender(<ShareButton graph={mockGraph} />);
	};

	test("renders share button and opens modal", () => {
		renderComponent();

		const shareButton = screen.getByText("Share");
		fireEvent.click(shareButton);

		expect(screen.getByText("Share Graph")).toBeInTheDocument();
		expect(
			screen.getByPlaceholderText("Enter email address and press Enter")
		).toBeInTheDocument();
	});

	test("prevents adding invalid email addresses", () => {
		renderComponent();

		fireEvent.click(screen.getByRole("button", { name: /Share/i }));

		const emailInput = screen.getByPlaceholderText(
			"Enter email address and press Enter"
		);
		fireEvent.change(emailInput, { target: { value: "invalid-email" } });
		fireEvent.keyDown(emailInput, { key: "Enter" });

		expect(screen.queryByText("invalid-email")).not.toBeInTheDocument();
	});

	test("shares graph with selected recipients and presets", async () => {
		(shareGraphWithUser as jest.Mock).mockResolvedValueOnce(true);

		renderComponent();

		fireEvent.click(screen.getByText("Share"));

		const modal = screen.getByRole("dialog");

		const emailInput = screen.getByPlaceholderText(
			"Enter email address and press Enter"
		);
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

	test("handles sharing with presets", async () => {
		(shareGraphWithUser as jest.Mock).mockResolvedValueOnce(true);
		renderComponent();

		fireEvent.click(screen.getByText("Share"));

		const modal = screen.getByRole("dialog");

		const input = screen.getByPlaceholderText(
			"Enter email address and press Enter"
		);
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
		(shareGraphWithUser as jest.Mock).mockRejectedValueOnce(
			new Error("Share failed")
		);
		renderComponent();

		fireEvent.click(screen.getByText("Share"));

		const modal = screen.getByRole("dialog");

		const input = within(modal).getByPlaceholderText(
			"Enter email address and press Enter"
		);
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
	test("shared graph appears in recipient's shared graphs list", async () => {
		const recipientEmail = "recipient@example.com";

		(shareGraphWithUser as jest.Mock).mockResolvedValueOnce(true);

		(getSharedGraphs as jest.Mock).mockImplementation(async (email: string) => {
			if (
				email === recipientEmail &&
				(shareGraphWithUser as jest.Mock).mock.calls.length > 0
			) {
				return [
					{
						...mockGraph,
						sharedEmails: [recipientEmail]
					}
				];
			}
			return [];
		});

		renderComponent();

		fireEvent.click(screen.getByText("Share"));

		const modal = screen.getByRole("dialog");
		const emailInput = within(modal).getByPlaceholderText(
			"Enter email address and press Enter"
		);
		fireEvent.change(emailInput, { target: { value: recipientEmail } });
		fireEvent.keyDown(emailInput, { key: "Enter" });

		fireEvent.click(screen.getByText("Preset 1"));
		fireEvent.click(within(modal).getByText("Share"));

		await waitFor(
			async () => {
				expect(shareGraphWithUser).toHaveBeenCalledWith(
					"test-graph-id",
					recipientEmail,
					["Preset 1"]
				);

				const sharedGraphs = await getSharedGraphs(recipientEmail);
				expect(sharedGraphs).toHaveLength(1);
				expect(sharedGraphs[0]).toMatchObject({
					id: mockGraph.id,
					graphName: mockGraph.graphName,
					sharedEmails: [recipientEmail]
				});
			},
			{
				timeout: 3000
			}
		);

		expect(getSharedGraphs).toHaveBeenCalledWith(recipientEmail);
	});

	test("handles email input", () => {
		renderComponent();
		fireEvent.click(screen.getByText("Share"));

		const input = screen.getByPlaceholderText(
			"Enter email address and press Enter"
		);
		fireEvent.change(input, { target: { value: "new@example.com" } });
		fireEvent.keyDown(input, { key: "Enter" });

		const newEmailsSection = screen.getByText(
			"Share with new people"
		).parentElement!;
		expect(
			within(newEmailsSection).getByText("new@example.com")
		).toBeInTheDocument();
	});

	test("copies URL to clipboard", async () => {
		renderComponent();
		fireEvent.click(screen.getByText("Share"));

		const copyButton = screen.getByRole("button", { name: /copy/i });
		fireEvent.click(copyButton);

		await waitFor(() => {
			expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
				`${baseURL}/graph/${mockGraph.graphURL}`
			);
		});

		await waitFor(() => {
			expect(mockToast).toHaveBeenCalledWith(
				expect.objectContaining({
					title: "Link copied",
					status: "success",
					duration: 2000
				})
			);
		});
	});

	test("removes email from list", async () => {
		renderComponent();
		fireEvent.click(screen.getByText("Share"));

		const closeButton = screen.getByLabelText("close");
		fireEvent.click(closeButton);

		await waitFor(() => {
			expect(screen.queryByText("new@example.com")).not.toBeInTheDocument();
		});
	});

	test("shows/hides public link when toggling switch", async () => {
		renderComponent();

		fireEvent.click(screen.getByText("Share"));

		expect(screen.queryByDisplayValue(`${baseURL}/graph/${mockGraph.graphURL}`)).toBeInTheDocument();

		const visibilitySwitch = screen.getByLabelText("Make graph public");
		fireEvent.click(visibilitySwitch);

		await waitFor(() => {
			expect(
				screen.queryByDisplayValue(mockGraph.graphURL)
			).not.toBeInTheDocument();
		});

		fireEvent.click(visibilitySwitch);

		await waitFor(() => {
			expect(
				screen.queryByDisplayValue(`${baseURL}/graph/${mockGraph.graphURL}`)
			).toBeInTheDocument();
		});
	});
	test("unshares graph from existing user", async () => {
		renderComponent();
		fireEvent.click(screen.getByText("Share"));

		const unshareButton = screen.getByLabelText("close");
		fireEvent.click(unshareButton);

		await waitFor(() => {
			expect(unshareGraphFromUser).toHaveBeenCalledWith(
				mockGraph.id,
				"test@example.com"
			);
		});

		await waitFor(() => {
			expect(screen.queryByText("test@example.com")).not.toBeInTheDocument();
		});

		expect(mockToast).toHaveBeenCalledWith(
			expect.objectContaining({
				title: "Access removed",
				description: "Removed sharing access for test@example.com",
				status: "success"
			})
		);
	});
});
