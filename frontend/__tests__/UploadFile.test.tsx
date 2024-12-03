import "@testing-library/jest-dom";

import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import React from "react";
import UploadFile from "@/pages/uploadFile";
import customRender from "@/test-utils/render";
import { uploadGraph } from "@/api/storage";
import { useAuth } from "@/context";
import { useRouter } from "next/router";
import { parseGraphData } from "../src/utils/extractGraphData"
import { validateJSON } from "../src//utils/validateJSON";
import { parse } from "path";

jest.mock("@/api/storage");
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

jest.mock('../src/utils/validateJSON', () => ({
	validateJSON: jest.fn(),
}))

jest.mock('../src/utils/extractGraphData', () => ({
	parseGraphData: jest.fn(),
  }));

const mockFileData = {
	"nodes": [ 
		{
			"id": "1",
			"label": "GDP",
			"value": 2.5,
			"category": "economic"
		},
	],
	"edges": []
}

const mockFile = new File([JSON.stringify(mockFileData)], "test.json", {
	type: "application/json"
})

describe("Test Upload Component Render", () => {
	it("renders the upload file page", () => {
		customRender(<UploadFile />);
		expect(screen.getByText(/File Upload/i)).toBeInTheDocument();
		expect(
			screen.getByText(/Browse your computer or drag and drop here/i)
		).toBeInTheDocument();
	});
});

describe("Valid Upload Component Functionality", () => {

	beforeEach(() => {
		jest.resetAllMocks(); 
		customRender(<UploadFile />);
		mockFile.text = jest.fn().mockResolvedValueOnce(JSON.stringify(mockFileData))
	})

	const setupUpload = (file: File) => {
		const fileInput = screen.getByLabelText(
			/Browse your computer or drag and drop here/i
		);
		fireEvent.change(fileInput, { target: { files: [file] } });

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

	}

	it("updates the selected file when a JSON file is chosen", () => {
		customRender(<UploadFile />);
		const fileInput = screen.getByLabelText(
			/Browse your computer or drag and drop here/i
		);
		fireEvent.change(fileInput, { target: { files: [mockFile] } });
		expect(
			screen.getByText(/Selected file: test.json/i)
		).toBeInTheDocument();
	});

	it("removes the selected file when the remove button is clicked", () => {
	
		const fileInput = screen.getByLabelText(
			/Browse your computer or drag and drop here/i
		);
		fireEvent.change(fileInput, { target: { files: [mockFile] } });
		const removeButton = screen.getByRole("button", { name: /delete file/i });
		fireEvent.click(removeButton);
		expect(
			screen.queryByText(/Selected file: test.json/i)
		).not.toBeInTheDocument();
	});

	it("test graph json validation", async () => {
		(uploadGraph as jest.Mock).mockResolvedValueOnce({
			graphName: "test"
		});
		(validateJSON as jest.Mock).mockReturnValueOnce(
			{
				isValid: true,
				errorMessage: null
			}
		);
		setupUpload(mockFile)

		await waitFor(() => {
			expect(validateJSON).toHaveBeenCalledWith(JSON.stringify(mockFileData))
		});
	});

	it("test graph json validation failure", async () => {
		(uploadGraph as jest.Mock).mockResolvedValueOnce({
			graphName: "test"
		});
		(validateJSON as jest.Mock).mockReturnValueOnce(
			{
				isValid: false,
				errorMessage: "Invalid graph format, for timestamp format use keys:'timestamps' and 'time_unit', for non-timestamp format use 'nodes' and 'edges'"
			}
		);
		setupUpload(mockFile)

		await waitFor(() => {
			expect(validateJSON).toHaveBeenCalledWith(JSON.stringify(mockFileData))
			expect(mockToast).toHaveBeenCalledWith(
				expect.objectContaining({
					title: "Invalid graph data",
					description: "Invalid graph format, for timestamp format use keys:'timestamps' and 'time_unit', for non-timestamp format use 'nodes' and 'edges'",
					status: "error",
					duration: 5000,
					isClosable: true
				})
			);
		});
	});

	it("test graph json parsing", async () => {
		(uploadGraph as jest.Mock).mockResolvedValueOnce({
			graphName: "test"
		});
		(validateJSON as jest.Mock).mockReturnValueOnce(
			{
				isValid: true,
				errorMessage: null
			}
		);
		(parseGraphData as jest.Mock).mockReturnValueOnce(["GDP"]);
		setupUpload(mockFile)

		await waitFor(() => {
			expect(parseGraphData).toHaveBeenCalledWith(JSON.stringify(mockFileData))
		});
	});

	it("test graph json parsing", async () => {
		(uploadGraph as jest.Mock).mockResolvedValueOnce({
			graphName: "test"
		});
		(validateJSON as jest.Mock).mockReturnValueOnce(
			{
				isValid: true,
				errorMessage: null
			}
		);
		(parseGraphData as jest.Mock).mockReturnValueOnce(["GDP"]);
		setupUpload(mockFile)

		await waitFor(() => {
			expect(parseGraphData).toHaveBeenCalledWith(JSON.stringify(mockFileData))
		});
	});

	it("test upload fails", async () => {
		(uploadGraph as jest.Mock).mockRejectedValueOnce(
			new Error("Upload failed")
		);
		(validateJSON as jest.Mock).mockReturnValueOnce(
			{
				isValid: true,
				errorMessage: null
			}
		);
		(parseGraphData as jest.Mock).mockReturnValueOnce(["GDP"])

		customRender(<UploadFile />);
		setupUpload(mockFile)

		await waitFor(() => {
			
			expect(validateJSON).toHaveBeenCalled()
			expect(parseGraphData).toHaveBeenCalled()
			expect(mockToast).toHaveBeenCalledWith(
				expect.objectContaining({
					title: "Error while saving graph",
					status: "error",
					description: expect.stringContaining("Error: Upload failed")
				})
			);
		});
	});
})