/**
 * @jest-environment node
 */

import handler from "@/pages/api/data/updateGraph"; // Update the import path as needed
import { dbAdmin } from "@/config/firebaseAdmin";
import { createMocks } from "node-mocks-http";
import type { NextApiRequest, NextApiResponse } from "next";
jest.mock("@/config/firebaseAdmin");

describe("POST /api/data/createGraph", () => {
	const mockID = "TestUpdateGraphID";

	const mockUpdateOneField = {
		graphVisibility: true
	};

	const mockUpdateMultiField = {
		graphVisibility: true,
		graphDescription: "Updated Description",
		graphName: "Updated Graph Name"
	};

	let updateMock: jest.Mock;

	beforeEach(() => {
		updateMock = jest.fn();

		// Set up dbAdmin.collection().doc().update()
		(dbAdmin.collection as jest.Mock).mockReturnValue({
			doc: jest.fn().mockReturnValue({
				update: updateMock
			})
		});
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it("Should return status code 405 if method is not PATCH", async () => {
		const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
			method: "GET"
		});

		await handler(req, res);

		expect(res._getStatusCode()).toBe(405);
		expect(JSON.parse(res._getData())).toEqual({
			error: "Method not allowed"
		});
	});

	it("Should return status code 400 if graph ID is missing", async () => {
		const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
			method: "PATCH",
			body: { updates: mockUpdateOneField }
		});

		await handler(req, res);

		expect(res._getStatusCode()).toBe(400);
		expect(JSON.parse(res._getData())).toEqual({
			error: "Invalid or Missing Graph ID"
		});
	});

	it("Should return status code 400 if update data is missing", async () => {
		const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
			method: "PATCH",
			body: { id: mockID }
		});

		await handler(req, res);

		expect(res._getStatusCode()).toBe(400);
		expect(JSON.parse(res._getData())).toEqual({
			error: "Invalid or Missing Update Data"
		});
	});

	it("Should update a single field and return a status code 200", async () => {
		updateMock.mockResolvedValue({ id: "TestUpdatedGraph" });

		const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
			method: "PATCH",
			body: { id: mockID, updates: mockUpdateOneField }
		});

		await handler(req, res);

		expect(dbAdmin.collection).toHaveBeenCalledWith(process.env.NEXT_FIREBASE_GRAPH_COLLECTION || "");
		expect(dbAdmin.collection(process.env.NEXT_FIREBASE_GRAPH_COLLECTION || "").doc).toHaveBeenCalledWith(mockID);
		expect(updateMock).toHaveBeenCalledWith(mockUpdateOneField);
		expect(res._getStatusCode()).toBe(200);
		expect(JSON.parse(res._getData())).toEqual({
			updatedGraph: mockID
		});
	});

	it("Should update a multiple fields and return a status code 200", async () => {
		updateMock.mockResolvedValue({ id: "TestUpdatedGraph" });

		const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
			method: "PATCH",
			body: { id: mockID, updates: mockUpdateMultiField }
		});

		await handler(req, res);

		expect(dbAdmin.collection).toHaveBeenCalledWith(process.env.NEXT_FIREBASE_GRAPH_COLLECTION || "");
		expect(dbAdmin.collection(process.env.NEXT_FIREBASE_GRAPH_COLLECTION || "").doc).toHaveBeenCalledWith(mockID);
		expect(updateMock).toHaveBeenCalledWith(mockUpdateMultiField);
		expect(res._getStatusCode()).toBe(200);
		expect(JSON.parse(res._getData())).toEqual({
			updatedGraph: mockID
		});
	});

	it("should return status code: 500 if there is an error updating", async () => {
		updateMock.mockRejectedValue(new Error("Firestore update error"));

		const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
			method: "PATCH",
			body: { id: mockID, updates: mockUpdateOneField }
		});

		await handler(req, res);

		expect(res._getStatusCode()).toBe(500);
		expect(JSON.parse(res._getData())).toEqual({
			message: "Error fetching graphs"
		});
	});
});
