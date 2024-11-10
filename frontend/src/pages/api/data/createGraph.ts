import type { NextApiRequest, NextApiResponse } from "next";
import { dbAdmin } from "@/config/firebaseAdmin";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== "POST") {
		res.status(405).json({ message: "Method not allowed" });
	}

	const graph = req.body;
	console.log(graph);

	try {
		// Create document in graphs collection
		const graphsCollection = dbAdmin.collection("graphs");
		await graphsCollection.add({
			owner: graph.owner,
			graphName: graph.graphName,
			graphDescription: graph.graphDescription,
			graphFileURL: graph.graphFileURL,
			createdAt: graph.createdAt,
			presets: graph.presets
		});

		res.status(200).json({ message: "Graph succesfully created" });
	} catch (error) {
		console.error("Error creating graph: ", error);
		res.status(500).json({ error: "Error creating graph" });
	}
}
