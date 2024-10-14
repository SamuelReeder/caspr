/**
 * Auth related functions
 */

import { app, db, auth } from "@/config/firebaseConfig";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithRedirect, getRedirectResult } from "firebase/auth";
import { AuthenticatedUser, User } from "@/types";
import { getUser } from "./firestore";

/**
 * Create account with email and password.
 * @param email - The user's email address.
 * @param password - The user's password.
 * @returns A promise that resolves to the newly created user.
 * @Danny
 */
export const createAccountWithEmail = async (email: string, password: string): Promise<any> => {
	// Implementation here
};

/**
 * Create account with Google.
 * @returns A promise that resolves to the newly created user.
 * @Danny
 */
export const createAccountWithGoogle = async (): Promise<any> => {
	// Implementation here
};

/**
 * Login with email and password.
 * @param email - The user's email address.
 * @param password - The user's password.
 * @returns A promise that resolves to the authenticated user.
 * @Samuel
 */
export const loginWithEmail = async (email: string, password: string): Promise<AuthenticatedUser> => {
	const auth = getAuth();
	try {
		const userCredential = await signInWithEmailAndPassword(auth, email, password);
		const firebaseUser = userCredential.user;

		// enable once create user works
		// const firestoreUser = await getUser(firebaseUser.uid);

		return { firebaseUser, firestoreUser: null, loading: false };
	} catch (error) {
		console.error(error);
		throw error;
	}
};

/**
 * Login with Google.
 * @returns A promise that resolves to the authenticated user.
 * @Samuel
 */
export const loginWithGoogle = async (): Promise<void> => {
	const auth = getAuth();
	const provider = new GoogleAuthProvider();
	try {
		await signInWithRedirect(auth, provider);
	} catch (error) {
		console.error(error);
		throw error;
	}
};

/**
 * Handle Google redirect result.
 * @returns A promise that resolves to the authenticated user.
 * @Samuel
 */
export const handleGoogleRedirect = async (): Promise<AuthenticatedUser> => {
	const auth = getAuth();
	try {
	  const result = await getRedirectResult(auth);
	  if (result) {
		const firebaseUser = result.user;
		
		// enable once create user works
		// const firestoreUser = await getUser(firebaseUser.uid);
  
		return { firebaseUser, firestoreUser: null, loading: false };
	  } else {
		throw new Error("no redirect");
	  }
	} catch (error) {
	  console.error(error);
	  throw error;
	}
  };

/**
 * Universal logout.
 * @returns A promise that resolves when the user is logged out.
 * @Jaeyong
 */
export const universalLogout = async (): Promise<void> => {
	// Implementation here
};

/**
 * Reset password.
 * @param email - The user's email address.
 * @returns A promise that resolves when the password reset email is sent.
 * @Jaeyong
 */
export const resetPassword = async (email: string): Promise<void> => {
	// Implementation here
};