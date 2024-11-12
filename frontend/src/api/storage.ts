/**
 * Storage related functions. ie. upload, download, etc.
 */

import { app, auth } from "@/config/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

import { Graph } from "@/types/graph";
import { Timestamp } from "firebase/firestore";
import { User } from "firebase/auth";
import { createGraph } from "@/api";
import { db } from "@/config/firebaseConfig";
import { apiClient } from "@/utils/apiClient";

import { v4 as uuidv4 } from "uuid";
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
	graphDescription: string,
	graphVisibility: boolean
): Promise<Graph | undefined> => {
	try {
		const storage = getStorage(app);
		const storageRef = ref(
			storage,
			`graphs/${auth.currentUser?.uid}/${graphName}.json`
		);
		await uploadBytes(storageRef, graphFile);

		const hashedId = uuidv4(); // Generate a unique hashed ID
		const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
		const graphURL = `${baseURL}/graph/${hashedId}`;

		const downloadURL = await getDownloadURL(storageRef);
		const graph: Graph = {
			owner: firebaseUser?.uid || "",
			graphName: graphName,
			graphDescription: graphDescription,
			graphVisibility: graphVisibility,
			graphFileURL: downloadURL,
			graphURL: graphURL,
			createdAt: Timestamp.now(),
			sharedEmails: [],
			sharing: [],
			presets: []
		};

		await createGraph(graph);
		return graph;
	} catch (error) {
		console.error("Error uploading file or storing metadata: ", error);
		return undefined;
	}
};

/**
 * Fetches the graphs belonging to the user from firestore.
 * @param firebaseUser - The current user object.
 * @returns A promise that resolves to the array of graphs.
 * @Jaeyong @Samuel
 */
export const fetchCurrUserGraphs = async (firebaseUser: User | null) => {
	if (!firebaseUser) {
		return [];
	}

	if (firebaseUser) {
		try {
			const uid = firebaseUser.uid;
			const graphDataResponse = await apiClient(
				`/api/data/getGraphs?uid=${uid}`,
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json"
					}
				}
			);
			const graphData = await graphDataResponse.json();
			return graphData;
		} catch (error) {
			console.error("Error fetching graphs:", error);
			return [];
		}
	}
};

/**
 * Fetches all publically visible graphs stored in Firestore.
 * @param firebaseUser - The current user object.
 * @returns A promise that resolves to the array of graphs.
 * @Jaeyong
 */
export const fetchAllPublicGraphs = async (firebaseUser: User | null) => {
	if (!firebaseUser) {
		return [];
	}

	try {
		const graphsRef = collection(db, "graphs");
		const q = query(
			graphsRef,
			where("graphVisibility", "==", true),
			where("owner", "!=", firebaseUser.uid)
		);
		const querySnapshot = await getDocs(q);
		return querySnapshot.docs.map((doc) => ({
			id: doc.id,
			...doc.data()
		})) as Graph[];
	} catch (error) {
		console.error("Error fetching graphs:", error);
		return [];
	}
};

/**
 * Fetches all publically visible graphs stored in Firestore inclduing the current user's graphs.
 * @returns A promise that resolves to the array of graphs.
 * @Samuel
 */
export const fetchAllPublicGraphsIncludingUser = async () => {
	try {
		const graphsRef = collection(db, "graphs");
		const q = query(graphsRef, where("graphVisibility", "==", true));
		const querySnapshot = await getDocs(q);
		return querySnapshot.docs.map((doc) => ({
			id: doc.id,
			...doc.data()
		})) as Graph[];
	} catch (error) {
		console.error("Error fetching graphs:", error);
		return [];
	}
};

/**
 * Fetches the graph data from the URL stored in the Firestore graph object.
 * @param graph - The graph object containing the URL.
 * @returns A promise that resolves to the graph data
 * @Samuel
 */
export const getGraphData = async (graph: Graph): Promise<any> => {
	try {
		const storage = getStorage(app);
		const storageRef = ref(storage, graph.graphFileURL);
		const downloadURL = await getDownloadURL(storageRef);

		const response = await fetch(downloadURL);
		if (!response.ok) {
			console.error("Error fetching graph data");
		}

		const jsonData = await response.json();
		return jsonData;
	} catch (error) {
		console.error("Error fetching graph data:", error);
	}
};
