/**
 * @jest-environment node
 */
import handler from "@/pages/api/data/deleteGraph";
import { createMocks } from "node-mocks-http";
import { dbAdmin } from "@/config/firebaseAdmin";
import type { NextApiRequest, NextApiResponse } from "next";
import { getStorage, ref, deleteObject } from "firebase/storage";

// Mock Firebase Storage
jest.mock("firebase/storage", () => ({
    getStorage: jest.fn(),
    ref: jest.fn(),
    deleteObject: jest.fn(),
  }));

jest.mock("@/config/firebaseAdmin");


describe("DELETE /api/data/deleteGraph", () => {
	const mockID = "mockID"
    const mockFilePath = "mockID/graph.json"

    let deleteMock: jest.Mock;

	beforeEach(() => {
        deleteMock = jest.fn();

		// Set up dbAdmin.collection().doc().update()
		(dbAdmin.collection as jest.Mock).mockReturnValue({
			doc: jest.fn().mockReturnValue({
				delete: deleteMock
			})
		});
        
        (getStorage as jest.Mock).mockReturnValue({ someStorage: true});
        (ref as jest.Mock).mockReturnValue({someRef: true});
        (deleteObject as jest.Mock).mockResolvedValue(null);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it("should return status code: 405 if the method is not DELETE", async () => {
		const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
			method: "POST"
		});

		await handler(req, res);

		expect(res._getStatusCode()).toBe(405);
		expect(JSON.parse(res._getData())).toEqual({
			message: "Method not allowed"
		});
	});

	it("should return status code: 400 if UID is missing or invalid", async () => {
        const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
			method: "DELETE",
			body: { graphID: "", graphFilePath: mockFilePath  }
		});

		await handler(req, res);

		expect(res._getStatusCode()).toBe(400);
		expect(JSON.parse(res._getData())).toEqual({
			message: "Invalid graph ID"
		});
	});

    it("should return status code: 400 if graphFilePath is missing or invalid", async () => {
        const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
			method: "DELETE",
			body: { graphID: mockID, graphFilePath: ""  }
		});

		await handler(req, res);

		expect(res._getStatusCode()).toBe(400);
		expect(JSON.parse(res._getData())).toEqual({
			message: "Invalid graph URL"
		});
	});

	it("should delete graphs and storage file returning code: 200", async () => {
        const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
			method: "DELETE",
			body: { graphID: mockID, graphFilePath: mockFilePath}
		});

		await handler(req, res);

        // Verify storage calls
        expect(getStorage).toHaveBeenCalledTimes(1);
        expect(ref).toHaveBeenCalledWith({ someStorage: true}, mockFilePath);
        expect(deleteObject).toHaveBeenCalledWith({someRef: true});

        // Graph Metadata gets deleted
            // Verify Firestore interactions
        expect(dbAdmin.collection).toHaveBeenCalledWith(
            process.env.NEXT_FIREBASE_GRAPH_COLLECTION || ""
        );
        expect(dbAdmin.collection(process.env.NEXT_FIREBASE_GRAPH_COLLECTION || "").doc).toHaveBeenCalledWith(mockID);
        expect(deleteMock).toHaveBeenCalled();
		expect(res._getStatusCode()).toEqual(200);
		expect(JSON.parse(res._getData())).toEqual({ message: "Graph Deleted Successfully" });
	});

	it("should return status code: 500 if there is an error deleting graphs", async () => {
		deleteMock.mockRejectedValue(new Error("Firestore error"));

        const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
			method: "DELETE",
			body: { graphID: mockID, graphFilePath: mockFilePath}
		});

		await handler(req, res);

		expect(res._getStatusCode()).toEqual(500);
		expect(JSON.parse(res._getData())).toEqual({
			message: "Error fetching graphs"
		});
	});
});
