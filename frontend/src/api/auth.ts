/**
 * Auth related functions
 */

import { app, db, auth } from "@/config/firebaseConfig";
import {
	getAuth,
	createUserWithEmailAndPassword,
	sendEmailVerification,
	signInWithPopup,
	signInWithEmailAndPassword,
	GoogleAuthProvider,
	signInWithRedirect,
	getRedirectResult
} from "firebase/auth";
import { AuthenticatedUser, User } from "@/types";
import { getUser, createUser } from "./firestore";
import { Timestamp } from "firebase/firestore";

/**
 * Create account with email and password.
 * @param email - The user's email address.
 * @param password - The user's password.
 * @returns A promise that resolves to the newly created user.
 * @Danny
 */
export const createAccountWithEmail = async (
	email: string,
	password: string,
	username: string
): Promise<User> => {
	// create user account in firebase authentication -> Store the user's details in Firestore

	const auth = getAuth(app);

	try {
		const userCredentials = await createUserWithEmailAndPassword(
			auth,
			email,
			password
		);
		const authUser = userCredentials.user; // https://firebase.google.com/docs/reference/js/v8/firebase.User

		// If user authentication setup right send email verification and setup user document in firestore
		if (authUser) {
			await sendEmailVerification(authUser);

			// Construct the user object
			const user: User = {
				uid: authUser.uid,
				name: username || "",
				email: authUser.email || "",
				photoURL: authUser.photoURL || "",
				createdAt: Timestamp.now(),
				roles: []
			};

			await createUser(user);

			return user;
		} else {
			throw new Error("Error creating user");
		}
	} catch (error) {
		throw error;
	}
};

/**
 * Create account with Google.
 * @returns A promise that resolves to the newly created user.
 * @Danny
 */
export const createAccountWithGoogle = async (): Promise<User> => {
	const auth = getAuth(app);
	const provider = new GoogleAuthProvider();

	try {
		// Popup Google Sign-in Page
		const userCredentials = await signInWithPopup(auth, provider);
		const authUser = userCredentials.user;

		if (authUser) {
			// Construct the user object
			const user: User = {
				uid: authUser.uid,
				name: authUser.displayName || "",
				email: authUser.email || "",
				photoURL: authUser.photoURL || "",
				createdAt: Timestamp.now(),
				roles: []
			};

			await createUser(user);

			return user;
		} else {
			throw new Error("Error creating account with Google");
		}
	} catch (error) {
		throw error;
	}
};

/**
 * Login with email and password.
 * @param email - The user's email address.
 * @param password - The user's password.
 * @returns A promise that resolves to the authenticated user.
 * @Samuel
 */
export const loginWithEmail = async (
	email: string,
	password: string
): Promise<AuthenticatedUser> => {
	const auth = getAuth();
	try {
		const userCredential = await signInWithEmailAndPassword(
			auth,
			email,
			password
		);
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
 * @Samuel
 */
export const universalLogout = async (): Promise<void> => {
	const auth = getAuth();
	try {
		await auth.signOut();
		console.log("Logged out");
	} catch (error) {
		console.error(error);
		throw error;
	}
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
