/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */

/**
 * Storage related functions. ie. upload, download, etc.
 */

import { Graph, GraphData } from "@/types/graph";
import { app, auth } from "@/config/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

import { Timestamp } from "firebase/firestore";
import { User } from "firebase/auth";
import { createGraph } from "./firestore";
import { db } from "@/config/firebaseConfig";
import { useAuth } from "@/app/authContext";

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

/**
 * Fetches the graphs belonging to the user from firestore.
 * @returns A promise that resolves to the array of graphs.
 * @Jaeyong
 */
export const fetchGraphs = async (id: string) => {

	if (!id) {
		return [];
	}

	if (id) {
		try {
			const graphsRef = collection(db, "graphs");
			const q = query(graphsRef, where("owner", "==", id));
			const querySnapshot = await getDocs(q);

			const graphData: GraphData[] = [];

			querySnapshot.forEach((doc) => {
				const data = doc.data();
				graphData.push({
					createdAt: data.createdAt.toDate(),
					graphName: data.graphName,
					graphDescription: data.graphDescription
				});
			});

			return graphData;
		} catch (error) {
			console.error("Error fetching graphs:", error);
			return [];
		}
	}
};