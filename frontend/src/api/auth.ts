/**
 * Auth related functions
 */

import { app, db, auth } from "@/config/firebaseConfig";
import * as firebaseAuth  from "firebase/auth"; // change this
import { User } from "@/types";

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
export const loginWithEmail = async (email: string, password: string): Promise<any> => {
	// Implementation here
};

/**
 * Login with Google.
 * @returns A promise that resolves to the authenticated user.
 * @Samuel
 */
export const loginWithGoogle = async (): Promise<any> => {
	// Implementation here
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