import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/config/firebaseAdmin";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== "POST") {
		res.setHeader("Allow", "POST");
		return res.status(405).end("Method Not Allowed");
	}

	const { user } = req.body;

	try {
		// Store user in Firestore
		console.log("test", user);
		const userDocumentRef = db.collection("users").doc(user.uid);
		await userDocumentRef.set({ user });

		res.status(200).json({ message: "Successfully created user " });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Error creating user" });
	}
}
