/**
 * Unshare a graph with a user
 * @param req The incoming request object
 * @param res The outgoing response object
 * @returns A message indicating the success of the operation
 * @Samuel
 */
import type { NextApiRequest, NextApiResponse } from "next";
import { dbAdmin } from "@/config/firebaseAdmin";
import { User } from "@/types";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== "POST") {
		return res.status(405).json({ message: "Method not allowed" });
	}

	const { graphId, email } = req.body;

	if (!graphId || !email) {
		return res.status(400).json({ error: "Graph ID and email are required" });
	}

	try {
		const graphRef = dbAdmin.collection(process.env.NEXT_FIREBASE_GRAPH_COLLECTION || "").doc(graphId);
		const graphSnap = await graphRef.get();

		if (!graphSnap.exists) {
			return res.status(404).json({ error: "Graph not found" });
		}

		const graph = graphSnap.data();
		const sharing = graph?.sharing || [];
		const sharedEmails = graph?.sharedEmails || [];

		const updatedSharing = sharing.filter((u: User) => u.email !== email);
		const updatedEmails = sharedEmails.filter((e: User) => e !== email);

		if (updatedSharing.length === sharing.length) {
			return res.status(404).json({ error: "User not found in sharing list" });
		}

		await graphRef.update({
			sharing: updatedSharing,
			sharedEmails: updatedEmails
		});

		res.status(200).json({ message: "Graph unshared successfully" });
	} catch (error) {
		console.error("Error unsharing graph:", error);
		res.status(500).json({ error: "Error unsharing graph" });
	}
}
