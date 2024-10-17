/**
 * Storage related functions. ie. upload, download, etc.
 */

import { app, auth } from "@/config/firebaseConfig";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

import { Graph } from "@/types/graph";
import { Timestamp } from "firebase/firestore";
import { User } from "firebase/auth";
import { createGraph } from "./firestore";

/**
 * Upload a graph via a JSON file to Firebase Storage and add metadata to Firestore.
 * @param graphFile - The JSON file containing graph data.
 * @param graphName - The name for the graph.
 * @param graphDescription - The description for the graph.
 * @returns A promise that resolves to the newly created graph.
 * @Jaeyong
 */
export const uploadGraph = async (
	firebaseUser: User | null,
	graphFile: File,
	graphName: string,
	graphDescription: string
): Promise<any> => {
	try {
		const storage = getStorage(app);
		const storageRef = ref(
			storage,
			`graphs/${auth.currentUser?.uid}/${graphName}.json`
		);
		await uploadBytes(storageRef, graphFile);

		const downloadURL = await getDownloadURL(storageRef);
		const graph: Graph = {
			owner: firebaseUser?.uid || "",
			graphName: graphName,
			graphDescription: graphDescription,
			graphFileURL: downloadURL,
			createdAt: Timestamp.now()
		};

		await createGraph(graph);
		return graph;
	} catch (error) {
		console.error("Error uploading file or storing metadata: ", error);
	}
};
