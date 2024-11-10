import type { NextApiRequest, NextApiResponse } from "next";
import { dbAdmin } from "@/config/firebaseAdmin";
import { Graph } from "@/types";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== "POST") {
		res.status(405).json({ message: "Method not allowed" });
	}

	const graph = req.body as { graph: Graph };

	if (!graph.graph.owner || !graph.graph.graphName) {
		res
			.status(400)
			.json({ error: "Owner or graph name wasn't passed, but is required" });
	}

	try {
		// Create document in graphs collection
		const graphsCollection = dbAdmin.collection("graphs");

		await graphsCollection.add({
			owner: graph.graph.owner,
			graphName: graph.graph.graphName,
			graphDescription: graph.graph.graphDescription || "",
			graphVisibility: graph.graph.graphVisibility || false,
			graphFileURL: graph.graph.graphFileURL || "",
			createdAt: graph.graph.createdAt,
			sharing: graph.graph.sharing,
			sharedEmails: graph.graph.sharedEmails || [],
			presets: graph.graph.presets || []
		});

		res.status(200).json({ message: "Graph succesfully created" });
	} catch (error) {
		console.error("Error creating graph: ", error);
		res.status(500).json({ error: "Error creating graph" });
	}
}
