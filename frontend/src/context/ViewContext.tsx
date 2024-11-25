/**
 * This file contains the ViewContext, which is used to manage the current view of the graph.
 * @param {ReactNode} children - The children to render
 * @returns {ReactElement} The ViewProvider component
 * @Samuel
 */
import React, { createContext, useContext, useState } from "react";
import { ViewPosition } from "@/types/camera";
import { Graph, Preset } from "@/types/graph";

interface ViewContextType {
	graph: Graph | null;
	setGraph: (graph: Graph | null) => void;
	currentView: ViewPosition | null;
	setCurrentView: (view: ViewPosition | null) => void;
	activePreset: Preset | null;
	loadPreset: (preset: Preset) => void;
	clearActivePreset: () => void;
	addPresetToGraph: (preset: Preset) => void;
	deletePresetFromGraph: (preset: Preset) => void;
}

const ViewContext = createContext<ViewContextType | undefined>(undefined);

export const ViewProvider: React.FC<{ children: React.ReactNode }> = ({
	children
}) => {
	const [currentView, setCurrentView] = useState<ViewPosition | null>(null);
	const [graph, setGraph] = useState<Graph | null>(null);
	const [activePreset, setActivePreset] = useState<Preset | null>(null);

	const loadPreset = (preset: Preset) => {
		setActivePreset(preset);
		if (preset.view) {
			setCurrentView(preset.view);
		}
	};

	const clearActivePreset = () => {
		setActivePreset(null);
	};

	const addPresetToGraph = (preset: Preset) => {
		setGraph((currentGraph) => {
			if (!currentGraph) return null;
			return {
				...currentGraph,
				presets: [...(currentGraph.presets || []), preset]
			};
		});
	};

	const deletePresetFromGraph = (preset: Preset) => {
		setGraph((currentGraph) => {
			if (!currentGraph) return null;
			return {
				...currentGraph,
				presets: (currentGraph.presets || []).filter(
					(p) => p.name !== preset.name
				)
			};
		});
	};

	return (
		<ViewContext.Provider
			value={{
				graph,
				setGraph,
				currentView,
				setCurrentView,
				activePreset,
				loadPreset,
				addPresetToGraph,
				deletePresetFromGraph,
				clearActivePreset
			}}
		>
			{children}
		</ViewContext.Provider>
	);
};

export const useView = () => {
	const context = useContext(ViewContext);
	if (!context) {
		throw new Error("useView must be used within ViewProvider");
	}
	return context;
};
