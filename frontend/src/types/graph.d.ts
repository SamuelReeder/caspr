import { Timestamp } from "firebase/firestore";

/**
 * Represents a graph object from a Firebase document.
 */
export interface Graph {
	owner: string;
	graphName: string;
	graphDescription: string;
	graphFileURL: string;
	createdAt: Timestamp;
}
