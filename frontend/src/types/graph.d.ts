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

export interface GraphData {
	createdAt: Date;
	graphName: string;
	graphDescription: string;
}

export interface GraphListProps {
	graphs: GraphData[] | undefined;
	page: string;
}
