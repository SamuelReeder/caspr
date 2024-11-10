import type { NextApiRequest, NextApiResponse } from "next";
import { dbAdmin } from "@/config/firebaseAdmin";
import { Graph } from "@/types";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== "GET") {
		return res.status(405).json({ message: "Method not allowed" });
	}

	const { uid } = req.query;

	if (!uid || typeof uid !== "string") {
		return res.status(400).json({ message: "Invalid UID" });
	}

	try {
		// Query Firestore for graphs with matching owner UID
		const graphsRef = dbAdmin.collection("graphs");
		const querySnapshot = await graphsRef.where("owner", "==", uid).get();

		// Transform results into an array of Graph objects
		const graphs: Graph[] = [];
		querySnapshot.forEach((doc) => {
			const data = doc.data();
			graphs.push({
				owner: data.owner,
				graphName: data.graphName,
				graphDescription: data.graphDescription,
				graphFileURL: data.graphFileURL,
				createdAt: data.createdAt,
				presets: data.presets || []
			});
		});

		res.status(200).json(graphs);
	} catch (error) {
		console.error("Error fetching graphs:", error);
		res.status(500).json({ message: "Error fetching graphs" });
	}
}
