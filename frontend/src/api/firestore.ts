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
	setDoc,
	updateDoc
} from "firebase/firestore";
import { app, db } from "@/config/firebaseConfig";

import { Graph, Preset } from "@/types/graph";

import { User } from "@/types";
import { pre } from "framer-motion/client";

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
	try {
		const response = await fetch("/api/users/createUser", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ user })
		});

		if (!response.ok) {
			throw new Error("Error while creating user");
		}

		await response.json();
	} catch (error) {
		console.error(error);
		throw error;
	}
};

/**
 * Create a graph metadata document in Firestore.
 * @param graph - The graph object.
 * @returns A promise that resolves to the created graph document.
 * @Danny @Samuel
 */
export const createGraph = async (graph: Graph): Promise<void> => {
	try {
		const graphsCollection = collection(db, "graphs");
		await addDoc(graphsCollection, {
			owner: graph.owner,
			graphName: graph.graphName,
			graphDescription: graph.graphDescription,
			graphFileURL: graph.graphFileURL,
			createdAt: graph.createdAt,
			presets: graph.presets
		});
	} catch (error) {
		throw error;
	}
};

/**
 * Create and store a preset to an existing graph in Firestore.
 * If a preset with the same name exists, it will be updated.
 * @param graphId - The ID of the graph document.
 * @param preset - The preset object.
 * @returns A promise that resolves when the preset is added or updated.
 * @Danny @Samuel
 */
export const addPresetToGraph = async (
	graphId: string,
	preset: Preset
): Promise<void> => {
	try {
		const graphDocRef = doc(db, "graphs", graphId);
		const graphDoc = await getDoc(graphDocRef);

		if (graphDoc.exists()) {
			const data = graphDoc.data();
			const presets: Preset[] = data.presets || [];
			const existingPresetIndex = presets.findIndex(
				(p) => p.name === preset.name
			);

			if (existingPresetIndex !== -1) {
				presets[existingPresetIndex] = preset;
			} else {
				presets.push(preset);
			}

			await updateDoc(graphDocRef, {
				presets: presets
			});
		} else {
			console.error("Graph document does not exist");
		}
	} catch (error) {
		throw error;
	}
};

/**
 * Deletes a specific preset from Firestore for a given graph by preset name.
 * @param graphId - The ID of the graph document.
 * @param presetName - The name of the preset to delete.
 * @returns A promise that resolves when the preset is deleted.
 * @Samuel
 */
export const deletePresetFromGraph = async (
	graphId: string,
	presetName: string
): Promise<void> => {
	try {
		const graphDocRef = doc(db, "graphs", graphId);
		const graphDoc = await getDoc(graphDocRef);

		if (graphDoc.exists()) {
			const data = graphDoc.data();
			const presets: Preset[] = data.presets || [];
			const updatedPresets = presets.filter((p) => p.name !== presetName);

			await updateDoc(graphDocRef, {
				presets: updatedPresets
			});
		} else {
			console.error("Graph document does not exist");
		}
	} catch (error) {
		throw error;
	}
};

/**
 * Gets a specific preset from Firestore for a given graph by preset name.
 * @param graphId - The ID of the graph document.
 * @param presetName - The name of the preset.
 * @returns A promise that resolves to the preset object.
 * @Samuel
 */
export const getPresetByName = async (
	graphId: string,
	presetName: string
): Promise<Preset | null> => {
	try {
		const graphDocRef = doc(db, "graphs", graphId);
		const graphDoc = await getDoc(graphDocRef);

		if (graphDoc.exists()) {
			const data = graphDoc.data();
			const presets: Preset[] = data.presets || [];
			const preset = presets.find((p) => p.name === presetName);
			return preset || null;
		} else {
			console.error("Graph document does not exist");
			return null;
		}
	} catch (error) {
		console.error("Error getting preset by name:", error);
		return null;
	}
};

/**
 * Gets all presets from Firestore for a given graph.
 * @param graphId - The ID of the graph document.
 * @returns A promise that resolves to an array containing all presets.
 * @Samuel
 */
export const getAllPresets = async (
	graphId: string
): Promise<Preset[] | null> => {
	try {
		const graphDocRef = doc(db, "graphs", graphId);
		const graphDoc = await getDoc(graphDocRef);

		if (graphDoc.exists()) {
			const data = graphDoc.data();
			return data.presets || null;
		} else {
			console.error("Graph document does not exist");
			return null;
		}
	} catch (error) {
		console.error("Error getting presets:", error);
		return null;
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
