/**
 * Firestore API
 */

import { db } from "@/config/firebaseConfig";
import { User } from "@/types";
import * as firestore from "firebase/firestore"; // change

/**
 * Get a user document from Firestore.
 * @param uid - The user's UID.
 * @returns A promise that resolves to the user document.
 */
export const getUser = async (uid: string): Promise<void> => {
	// return user
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


