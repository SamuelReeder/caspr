/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */

/**
 * Firestore API
 */

import {
	DocumentData,
	addDoc,
	collection,
	doc,
	getDoc,
	getFirestore,
	setDoc
} from "firebase/firestore";
import { app, db } from "@/config/firebaseConfig";

import { Graph } from "@/types/graph";

import { User } from "@/types";

/**
 * Get a user document from Firestore.
 * @param uid - The user's UID.
 * @returns A promise that resolves to the user document.
 * @Samuel
 */
export const getUser = async (uid: string): Promise<User> => {
	try {
		// assuming we use "users" collection
		const userDocRef = doc(db, "users", uid);
		const userDoc = await getDoc(userDocRef);

		if (userDoc.exists()) {
			const userData = userDoc.data();
			if (userData) {
				return userData as User; // cast to type; ensure fields are correct
			} else {
				throw new Error("failed to cast user data");
			}
		} else {
			throw new Error("document not found");
		}
	} catch (error) {
		console.error(error);
		throw error;
	}
};

/**
 * Create a user document in Firestore.
 * @param user - The user object.
 * @returns A promise that resolves to the created user document.
 * @Danny
 */
export const createUser = async (user: User): Promise<void> => {
	const firestore = getFirestore(app);

	try {
		const userDocumentRef = doc(firestore, "users", user.uid);

		await setDoc(userDocumentRef, {
			uid: user.uid,
			name: user.name,
			email: user.email,
			photoURL: user.photoURL,
			createdAt: user.createdAt,
			roles: user.roles
		});

		console.log("success");
	} catch (error) {
		throw error;
	}
};

/**
 * Create a user document in Firestore.
 * @param user - The user object.
 * @returns A promise that resolves to the created user document.
 * @Danny
 */
export const createGraph = async (graph: Graph): Promise<void> => {
	try {
		const graphsCollection = collection(db, "graphs");
		await addDoc(graphsCollection, {
			owner: graph.owner,
			graphName: graph.graphName,
			graphDescription: graph.graphDescription,
			graphFileURL: graph.graphFileURL,
			createdAt: graph.createdAt
		});
	} catch (error) {
		throw error;
	}
};

/**
 * Update a user document in Firestore.
 * @param user - The user object.
 * @returns A promise that resolves to the updated user document.
 */
export const updateUser = async (user: User): Promise<void> => {
	// implement
};

/**
 * Delete a user document in Firestore.
 * @param uid - The user's UID.
 * @returns A promise that resolves when the user document is deleted.
 */
export const deleteUser = async (uid: string): Promise<void> => {
	// implement
};