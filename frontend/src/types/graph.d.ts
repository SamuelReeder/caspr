import { Timestamp } from "firebase/firestore";
import { deprecate } from "util";

/**
 * Represents a graph object from a Firebase document.
 * @Samuel @Terry
 */
export interface Graph {
	owner: string;
	graphName: string;
	graphDescription: string;
	graphVisibility: boolean;
	graphFileURL: string;
	createdAt: Timestamp;
	presets: Preset[] | null;
}

/**
 * Props for GraphList component used in home page
 * @Jaeyong
 */
export interface GraphListProps {
	graphs: Graph[] | undefined;
	page: string;
}

/**
 * Props for MyGraphObject component used in home page
 * @Jaeyong
 */
export interface MyGraphObjectProps {
	graphName: string;
	graphDescription: string;
	createdAt: Timestamp;
	author: string;
}

/**
 * Represents a preset for graph viewing and manipulation.
 * @Samuel
 */
export interface Preset {
	name: string;
	updated: Timestamp;
	filters: string[] | null;
	pathways: string[] | null;
	view: ViewPosition | null;
}

/**
 * Represents the viewing position for a graph.
 * @Samuel
 */
export interface ViewPosition {
	x: number;
	y: number;
	z: number;
	orientation: Orientation | null;
}

/**
 * Represents the orientation in 3D space.
 * @Samuel
 */
export interface Orientation {
	pitch: number; // Rotation around the x-axis
	yaw: number; // Rotation around the y-axis
	roll: number; // Rotation around the z-axis
}
