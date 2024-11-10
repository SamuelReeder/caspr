import type { NextApiRequest, NextApiResponse } from "next";
import { auth } from "@/config/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getUser } from "@/api";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== "POST") {
		res.setHeader("Allow", ["POST"]);
		res.status(405).end("Method not allowed");
	}

	const { email, password } = req.body;

	if (!email || !password) {
		res
			.status(400)
			.json({ error: "Email and password weren't passed, but is required" });
	}

	try {
		const userCredential = await signInWithEmailAndPassword(
			auth,
			email,
			password
		);
		const firebaseUser = userCredential.user;

		const uid = firebaseUser.uid;

		const getUserResponse = await fetch(
			`http://localhost:3000/api/users/${uid}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json"
				}
			}
		);

		const firestoreUser = await getUserResponse.json();
		if (!firestoreUser) {
			throw new Error("No user document found");
		}

		res.status(200).json({ firebaseUser, firestoreUser, loading: false });
	} catch (error) {
		console.error(error);
		throw error;
	}
}
