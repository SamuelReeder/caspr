/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */

/**
 * Firestore API
 */

import {
	DocumentData,
	Timestamp,
	addDoc,
	arrayUnion,
	collection,
	doc,
	getDoc,
	getDocs,
	getFirestore,
	orderBy,
	query,
	setDoc,
	updateDoc,
	where
} from "firebase/firestore";
import { app, auth, db } from "@/config/firebaseConfig";
import { Graph, Preset, SharedUser, User } from "@/types";

/**
 * Get a user document from Firestore.
 * @param uid - The user's UID.
 * @returns A promise that resolves to the user document.
 * @Samuel
 */
export const getUser = async (uid: string): Promise<User> => {
	try {
		// TODO: make the base url dynamic
		const response = await fetch(`http://localhost:3000/api/data/${uid}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		});

		if (!response.ok) {
			throw new Error("Error while getting user data");
		}

		const user = await response.json();

		return user;
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
		const response = await fetch("/api/data/createUser", {
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
		const response = await fetch("/api/data/createGraph", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ graph })
		});

		if (!response.ok) {
			throw new Error("Error while creating graph");
		}

		await response.json();
	} catch (error) {
		console.error(error);
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

/**
 * Share graph and specific presets with a user
 * @param graphId - The ID of the graph document.
 * @param email - The email of the user to share with.
 * @param presetNames - Optional. The names of the presets to share. If not provided, no presets will be shared.
 * @param role - The role of the user in the graph.
 * @returns A promise that resolves to true if the share was successful.
 */
export const shareGraphWithUser = async (
	graphId: string,
	email: string,
	presetNames?: string[],
	role = 0
): Promise<boolean> => {
	try {
		const graphRef = doc(db, "graphs", graphId);
		const graphSnap = await getDoc(graphRef);

		if (!graphSnap.exists()) return false;

		const graph = graphSnap.data() as Graph;
		const sharing = graph.sharing || [];
		const sharedEmails = graph.sharedEmails || [];

		if (sharedEmails.some((u) => u === email)) {
			return true;
		}

		const validPresets = presetNames
			? presetNames.filter((name) =>
					graph.presets?.some((p) => p.name === name)
				)
			: [];

		const newShare: SharedUser = {
			email,
			status: "pending",
			role,
			presetAccess: validPresets,
			addedAt: Timestamp.now(),
			addedBy: auth.currentUser?.email || ""
		};

		// if sharing field doesn't exist, create it with new share
		// await updateDoc(graphRef, {
		// 	...(sharing.length === 0 ? { sharing: [newShare] } : { sharing: arrayUnion(newShare) })
		// });

		await updateDoc(graphRef, {
			sharing: arrayUnion(newShare),
			sharedEmails: arrayUnion(email)
		});

		return true;
	} catch (error) {
		console.error("Error sharing graph:", error);
		return false;
	}
};

/**
 * Remove sharing access for a user from a graph
 * @param graphId - The ID of the graph document
 * @param email - The email of the user to unshare from
 * @returns Promise resolving to true if successful
 */
export const unshareGraphFromUser = async (
	graphId: string,
	email: string
): Promise<boolean> => {
	try {
		const graphRef = doc(db, "graphs", graphId);
		const graphSnap = await getDoc(graphRef);

		if (!graphSnap.exists()) return false;

		const graph = graphSnap.data() as Graph;
		const sharing = graph.sharing || [];
		const sharedEmails = graph.sharedEmails || [];

		const updatedSharing = sharing.filter((u) => u.email !== email);
		const updatedEmails = sharedEmails.filter((e) => e !== email);

		if (updatedSharing.length === sharing.length) {
			return false;
		}

		await updateDoc(graphRef, {
			sharing: updatedSharing,
			sharedEmails: updatedEmails
		});

		return true;
	} catch (error) {
		console.error("Error unsharing graph:", error);
		return false;
	}
};

/**
 * Remove a user from the shared users list of a graph
 * @param email - The email of the user to remove.
 * @returns A promise that resolves to true if the user was removed.
 * @Samuel
 */
export const getSharedGraphs = async (email: string): Promise<Graph[]> => {
	try {
		const graphsRef = collection(db, "graphs");
		const q = query(
			graphsRef,
			where("sharedEmails", "array-contains", email)
			// orderBy("createdAt", "desc"),
		);
		const querySnap = await getDocs(q);

		return querySnap.docs.map((doc) => ({
			id: doc.id,
			...doc.data()
		})) as Graph[];
	} catch (error) {
		console.error("Error getting shared graphs:", error);
		return [];
	}
};

/**
 * Accept a graph share invitation and update user ID
 * @param graphId - The ID of the graph document.
 * @param email - The email of the user to accept the share.
 * @param uid - The user ID to update in the shared users list.
 * @returns A promise that resolves to true if the share was accepted.
 * @Samuel
 */
export const acceptShareInvite = async (
	graphId: string,
	email: string,
	uid: string
): Promise<boolean> => {
	try {
		const graphRef = doc(db, "graphs", graphId);
		const graphSnap = await getDoc(graphRef);

		if (!graphSnap.exists()) return false;

		const graph = graphSnap.data() as Graph;
		const sharing = graph.sharing || [];
		const userIndex = sharing.findIndex((u) => u.email === email);

		if (userIndex === -1) return false;

		sharing[userIndex] = {
			...sharing[userIndex],
			uid,
			status: "accepted",
			acceptedAt: Timestamp.now()
		};

		await updateDoc(graphRef, { sharing });
		return true;
	} catch (error) {
		console.error("Error accepting invite:", error);
		return false;
	}
};

/**
 * Get accessible presets for a user in a shared graph
 * @param graphId - The ID of the graph document.
 * @param email - The email of the user to get presets for.
 * @returns A promise that resolves to an array of accessible presets.
 * @Samuel
 */
export const getUserAccessiblePresets = async (
	graphId: string,
	email: string
): Promise<Preset[]> => {
	try {
		const graphRef = doc(db, "graphs", graphId);
		const graphSnap = await getDoc(graphRef);

		if (!graphSnap.exists()) return [];

		const graph = graphSnap.data() as Graph;
		const userShare = graph.sharing?.find((u) => u.email === email);

		if (!userShare || userShare.status !== "accepted") return [];

		return (
			graph.presets?.filter((p) => userShare.presetAccess.includes(p.name)) ||
			[]
		);
	} catch (error) {
		console.error("Error getting accessible presets:", error);
		return [];
	}
};

/**
 * Share specific presets with a user in a shared graph
 * @param graphId - The ID of the graph document.
 * @param email - The email of the user to share with.
 * @param presetNames - The names of the presets to share.
 * @returns A promise that resolves to true if the share was successful.
 * @Samuel
 */
export const updatePresetAccess = async (
	graphId: string,
	email: string,
	presetNames: string[]
): Promise<boolean> => {
	try {
		const graphRef = doc(db, "graphs", graphId);
		const graphSnap = await getDoc(graphRef);

		if (!graphSnap.exists()) return false;

		const graph = graphSnap.data() as Graph;
		const sharing = graph.sharing || [];
		const userIndex = sharing.findIndex((u) => u.email === email);

		if (userIndex === -1) return false;

		const validPresets = presetNames.filter((name) =>
			graph.presets?.some((p) => p.name === name)
		);

		sharing[userIndex].presetAccess = validPresets;
		await updateDoc(graphRef, { sharing });
		return true;
	} catch (error) {
		console.error("Error updating preset access:", error);
		return false;
	}
};
