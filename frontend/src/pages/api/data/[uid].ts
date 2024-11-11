import type { NextApiRequest, NextApiResponse } from "next";
import { dbAdmin } from "@/config/firebaseAdmin"; // Import the Firestore Admin instance from firebaseAdmin.ts
import { User } from "@/types";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== "GET") {
		res.setHeader("Allow", ["GET"]);
		res.status(405).end("Method not allowed");
	}

	const { query } = req;
	const uid = query.uid;

	if (!uid) {
		res.status(400).json({ error: "UID wasn't passed, but is required" });
	}

	if (typeof uid !== "string") {
		res.status(400).json({ error: "invalid UID" });
	}

	try {
		const userDocRef = dbAdmin.collection("users").doc(uid as string);
		const userDoc = await userDocRef.get();

		if (userDoc) {
			const userData = userDoc.data();
			if (!userData) {
				res.status(500).json({ error: "Failed to cast user data" });
			}
		} else {
			res.status(404).json({ error: "Document not found" });
		}

		const userData = userDoc.data();

		res.status(200).json(userData as User);
	} catch (error) {
		console.error("Error while fetching user: ", error);
		res.status(500).json({ error: "Error fetching user" });
	}
}
