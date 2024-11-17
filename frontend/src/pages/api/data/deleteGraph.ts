/**
 * This API route fetches all graphs owned by a user with a given UID.
 * @param req The incoming request object.
 * @param res The outgoing response object.
 * @returns 200 when graph is successfully deleted
 */
import type { NextApiRequest, NextApiResponse } from "next";

import { dbAdmin } from "@/config/firebaseAdmin";
import { getStorage, ref, deleteObject } from "firebase/storage";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== "DELETE") {
		return res.status(405).json({ message: "Method not allowed" });
	}

	const graphID = req.body.graphID;
    const graphFilePath = req.body.graphFilePath

	if (!graphID || typeof graphID !== "string" ) {
		return res.status(400).json({ message: "Invalid graph ID" });
	}

    if (!graphFilePath || typeof graphFilePath !== "string" ) {
		return res.status(400).json({ message: "Invalid graph URL" });
	}

	try {

        // Remove Graph File
        const storage = getStorage();
        const fileRef = ref(storage, graphFilePath);
        await deleteObject(fileRef)

		// Remove Graph File from Firebase
		const graphsRef = dbAdmin.collection("graphs");
        await graphsRef.doc(graphID).delete()

		res.status(200);
	} catch (error) {
		console.error("Error fetching graphs:", error);
		res.status(500).json({ message: "Error fetching graphs" });
	}
}
