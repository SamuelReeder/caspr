/**
 * Firestore API
 */

import { db, app } from "@/config/firebaseConfig";
import { User } from "@/types";
import { getFirestore, doc, setDoc } from "firebase/firestore";

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
  const firestore = getFirestore(app);

  try {
    const userDocumentRef = doc(firestore, "users", user.uid);

    await setDoc(userDocumentRef, {
      uid: user.uid,
      name: user.name,
      email: user.email,
      photoURL: user.photoURL,
      createdAt: user.createdAt,
      roles: user.roles,
    });

    console.log("success");
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
