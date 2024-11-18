/**
 * Get shared graphs by email
 * @param req The incoming request object
 * @param res The outgoing response object
 * @returns An array of shared graphs
 * @Samuel
 */
import type { NextApiRequest, NextApiResponse } from "next";
import { dbAdmin } from "@/config/firebaseAdmin";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== "GET") {
		return res.status(405).json({ message: "Method not allowed" });
	}

	const { email } = req.query;

	if (!email) {
		return res.status(400).json({ error: "Email is required" });
	}

	try {
		const graphsSnap = await dbAdmin
			.collection(process.env.NEXT_FIREBASE_GRAPH_COLLECTION || "")
			.where("sharedEmails", "array-contains", email)
			.get();

		const graphs = graphsSnap.docs.map((doc) => ({
			id: doc.id,
			...doc.data()
		}));

		res.status(200).json({ graphs });
	} catch (error) {
		console.error("Error getting shared graphs:", error);
		res.status(500).json({ error: "Error getting shared graphs" });
	}
}
