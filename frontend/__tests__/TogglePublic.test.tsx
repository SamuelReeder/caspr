import "@testing-library/jest-dom";
import customRender from "@/test-utils/render";
import { fireEvent, screen, act, waitFor } from "@testing-library/react";
import UploadFile from "@/pages/uploadFile";
import { MyGraphCard } from "@/components";
import { MyGraphCardProps, Graph, User } from "@/types";
import { Timestamp } from "firebase/firestore"; // Import Timestamp
import { updateGraphData } from "@/api/storage";

jest.mock("next/router", () => ({
	useRouter: jest.fn()
}));

const mockToast = jest.fn();
jest.mock("@chakra-ui/react", () => ({
	...jest.requireActual("@chakra-ui/react"),
	useToast: () => mockToast
}));

jest.mock("@/api/storage", () => ({
	updateGraphData: jest.fn()
}));

const mockFile = new File(['{"nodes": [], "links": []}'], "test-graph.json", {
	type: "application/json"
});

const mockGraph: Graph = {
	id: "1",
	owner: "Test",
	graphName: "Test Title",
	graphDescription: "Test Description",
	graphTags: ["GDP"],
	graphFileURL: "https://www.example.com",
	graphURL: "https://www.example.com/1234",
	graphFilePath: "/user/filepath.json",
	graphVisibility: false,
	createdAt: Timestamp.now(),
	sharing: [],
	sharedEmails: [],
	presets: []
}

const mockUser = {
	uid: "1",
	name: "Test",
	email: "",
	photoURL: "",
	createdAt: Timestamp.now(),
	roles: []
} as User;

const mockMyGraphCardProps = {
	graph: mockGraph,
	owner: mockUser
} as MyGraphCardProps;

describe("Toggle Public Button on Upload Component", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("Renders the Toggle Public Button", () => {
		customRender(<UploadFile />);
		const fileInput = screen.getByLabelText(
			/Browse your computer or drag and drop here/i
		);

		act(() => {
			fireEvent.change(fileInput, { target: { files: [mockFile] } });
		});

		expect(screen.getByText(/Visibility/i)).toBeInTheDocument();
		expect(screen.getByText(/Publically Available/i)).toBeInTheDocument();
	});

	it("Toggle Public Button Updates Checked Value", () => {
		const { getByRole } = customRender(<UploadFile />);
		const fileInput = screen.getByLabelText(
			/Browse your computer or drag and drop here/i
		);
		fireEvent.change(fileInput, { target: { files: [mockFile] } });

		const switchElement = getByRole("checkbox", {
			name: /Enable Public Visibility/i
		});
		expect(switchElement).not.toBeChecked();

		act(() => {
			fireEvent.click(switchElement);
			expect(switchElement).toBeChecked();

			fireEvent.click(switchElement);
			expect(switchElement).not.toBeChecked();
		});
	});
});

describe("Toggle Public Button on MyGraphsCard Component", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("Renders the Toggle Public Button", () => {
		customRender(<MyGraphCard {...mockMyGraphCardProps} />);
		expect(screen.getByText(/Public Visibility/i)).toBeInTheDocument();
	});

	it("Toggle Public Button Updates Checked Value", async () => {
		const { getByRole } = customRender(
			<MyGraphCard {...mockMyGraphCardProps} />
		);

		const switchElement = getByRole("checkbox", {
			name: /Enable Public Visibility/i
		});
		expect(switchElement).not.toBeChecked();

		fireEvent.click(switchElement);
		expect(switchElement).toBeDisabled();

		await waitFor(() => {
			expect(switchElement).toBeChecked();

			expect(mockToast).toHaveBeenCalledWith({
				title: "Graph saved",
				description: expect.stringContaining(
					"Set: Test Title to public"
				),
				status: "success",
				duration: 2500,
				isClosable: true
			});
		});

	});
});
