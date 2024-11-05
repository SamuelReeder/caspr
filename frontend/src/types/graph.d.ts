import { Timestamp } from "firebase/firestore";
import { deprecate } from "util";

/**
 * Represents a graph object from a Firebase document.
 * @Samuel
 */
export interface Graph {
	owner: string;
	graphName: string;
	graphDescription: string;
	graphFileURL: string;
	createdAt: Timestamp;
	presets: { [key: string]: Preset } | null;
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
    x: number | null;
    y: number | null;
    z: number | null;
    orientation: Orientation | null;
}

/**
 * Represents the orientation in 3D space.
 * @Samuel
 */
export interface Orientation {
    pitch: number; // Rotation around the x-axis
    yaw: number;   // Rotation around the y-axis
    roll: number;  // Rotation around the z-axis
}

/**
 * @deprecated
 * Represents the data structure for a graph.
 */
export interface GraphData {
	createdAt: Date;
	graphName: string;
	graphDescription: string;
}
