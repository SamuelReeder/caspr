import type { NextApiRequest, NextApiResponse } from "next";
import { dbAdmin } from "@/config/firebaseAdmin";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== "PATCH") {
		return res.status(405).json({ message: "Method not allowed" });
	}

	const id = req.body.id;
	const updates = req.body.updates;

	if (!id || typeof id !== "string") {
		return res.status(400).json({ message: "Invalid ID" });
	}

	try {
		// Query Firestore for graphs with matching owner UID
		const graphRef = dbAdmin.collection("graphs").doc(id);

		// Update the Desired Graph
		await graphRef.update(updates);

		res.status(200).json({ updatedGraph: id });
	} catch (error) {
		console.error(`Error updating graph ${id}:`, error);
		res.status(500).json({ message: "Error fetching graphs" });
	}
}
