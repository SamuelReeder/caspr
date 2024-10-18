import "@testing-library/jest-dom";

import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import UploadFile from "@/pages/uploadFile";
import { uploadGraph } from "@/api/storage";
import { useAuth } from "@/app/authContext";
import { useRouter } from "next/router";

jest.mock("@/api/storage");
jest.mock("@/app/authContext");
const mockRouterPush = jest.fn();
jest.mock("next/router", () => ({
	useRouter: jest.fn(() => ({
		push: mockRouterPush
	}))
}));
const mockToast = jest.fn();
jest.mock("@chakra-ui/react", () => ({
	...jest.requireActual("@chakra-ui/react"),
	useToast: () => mockToast
}));

const mockFile = new File(['{"nodes": [], "links": []}'], "test-graph.json", {
	type: "application/json"
});

describe("UploadFile Component", () => {
	beforeEach(() => {
		(useAuth as jest.Mock).mockReturnValue({
			firebaseUser: { uid: "test-user-id" }
		});
	});

	it("renders the upload file page", () => {
		render(<UploadFile />);
		expect(screen.getByText(/File Upload/i)).toBeInTheDocument();
		expect(
			screen.getByText(/Browse your computer or drag and drop here/i)
		).toBeInTheDocument();
	});

	it("updates the selected file when a JSON file is chosen", () => {
		render(<UploadFile />);
		const fileInput = screen.getByLabelText(
			/Browse your computer or drag and drop here/i
		);
		fireEvent.change(fileInput, { target: { files: [mockFile] } });
		expect(
			screen.getByText(/Selected file: test-graph.json/i)
		).toBeInTheDocument();
	});

	it("removes the selected file when the remove button is clicked", () => {
		render(<UploadFile />);
		const fileInput = screen.getByLabelText(
			/Browse your computer or drag and drop here/i
		);
		fireEvent.change(fileInput, { target: { files: [mockFile] } });
		const removeButton = screen.getByRole("button", { name: /delete file/i });
		fireEvent.click(removeButton);
		expect(
			screen.queryByText(/Selected file: test-graph.json/i)
		).not.toBeInTheDocument();
	});

	it("uploads the graph and redirects to /home when the save button is clicked", async () => {
		(uploadGraph as jest.Mock).mockResolvedValueOnce({
			graphName: "test-graph"
		});
		const router = useRouter();

		render(<UploadFile />);
		const fileInput = screen.getByLabelText(
			/Browse your computer or drag and drop here/i
		);
		fireEvent.change(fileInput, { target: { files: [mockFile] } });

		const graphNameInput = screen.getByPlaceholderText(
			/Enter a name for your graph/i
		);
		fireEvent.change(graphNameInput, { target: { value: "Test Graph" } });

		const graphDescriptionInput = screen.getByPlaceholderText(
			/Enter a description for your graph/i
		);
		fireEvent.change(graphDescriptionInput, {
			target: { value: "Test Description" }
		});

		const saveButton = screen.getByRole("button", {
			name: /Save graph to your account/i
		});
		fireEvent.click(saveButton);

		await waitFor(() => {
			expect(uploadGraph).toHaveBeenCalledWith(
				{ uid: "test-user-id" },
				mockFile,
				"Test Graph",
				"Test Description"
			);
			expect(mockRouterPush).toHaveBeenCalledWith("/home");
		});

		expect(mockToast).toHaveBeenCalledWith(
			expect.objectContaining({
				title: "Graph saved",
				status: "success",
				description:
					"The following graph has been saved to your account: test-graph"
			})
		);
	});

	it("shows an error toast when upload fails", async () => {
		(uploadGraph as jest.Mock).mockRejectedValueOnce(
			new Error("Upload failed")
		);

		render(<UploadFile />);
		const fileInput = screen.getByLabelText(
			/Browse your computer or drag and drop here/i
		);
		fireEvent.change(fileInput, { target: { files: [mockFile] } });

		const graphNameInput = screen.getByPlaceholderText(
			/Enter a name for your graph/i
		);
		fireEvent.change(graphNameInput, { target: { value: "Test Graph" } });

		const graphDescriptionInput = screen.getByPlaceholderText(
			/Enter a description for your graph/i
		);
		fireEvent.change(graphDescriptionInput, {
			target: { value: "Test Description" }
		});

		const saveButton = screen.getByRole("button", {
			name: /Save graph to your account/i
		});
		fireEvent.click(saveButton);

		await waitFor(() => {
			expect(mockToast).toHaveBeenCalledWith(
				expect.objectContaining({
					title: "Error while saving graph",
					status: "error",
					description: expect.stringContaining("Error: Error: Upload failed")
				})
			);
		});
	});
});
