/**
 * Firestore API
 */

import { db } from "@/config/firebaseConfig";
import { User } from "@/types";
import { doc, DocumentData, getDoc } from "firebase/firestore";

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
			return userDoc.data() as User; // cast to type; ensure fields are correct
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
	// implement
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


