/**
 * Share a graph with a user
 * @param req The incoming request object
 * @param res The outgoing response object
 * @returns A message indicating the success of the operation
 * @Samuel
 */
import type { NextApiRequest, NextApiResponse } from "next";
import { dbAdmin } from "@/config/firebaseAdmin";
import { FieldValue } from "firebase-admin/firestore";
import { Preset, SharedUser } from "@/types";
import { Timestamp } from "firebase-admin/firestore";
import validateEmail from "@/utils/validateEmail";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== "POST") {
		return res.status(405).json({ message: "Method not allowed" });
	}

	const { graphId, email, presetNames, role = 0 } = req.body;

	if (!graphId || !email) {
		return res.status(400).json({ error: "Graph ID and email are required" });
	}

	if (!validateEmail(email)) {
		return res.status(400).json({ error: "Invalid email address" });
	}

	try {
		const graphRef = dbAdmin.collection("graphs").doc(graphId);
		const graphSnap = await graphRef.get();

		if (!graphSnap.exists) {
			return res.status(404).json({ error: "Graph not found" });
		}

		const graph = graphSnap.data();
		const sharedEmails = graph?.sharedEmails || [];

		if (sharedEmails.includes(email)) {
			return res.status(200).json({ message: "Already shared" });
		}

		const validPresets =
			presetNames?.filter((name: string) =>
				graph?.presets?.some((p: Preset) => p.name === name)
			) || [];

		const newShare: SharedUser = {
			email,
			status: "pending",
			role,
			presetAccess: validPresets,
			addedAt: Timestamp.now(),
			addedBy: req.headers["x-user-email"]?.toString() || ""
		};

		await graphRef.update({
			sharing: FieldValue.arrayUnion(newShare),
			sharedEmails: FieldValue.arrayUnion(email)
		});

		res.status(200).json({ message: "Graph shared successfully" });
	} catch (error) {
		console.error("Error sharing graph:", error);
		res.status(500).json({ error: "Error sharing graph" });
	}
}
