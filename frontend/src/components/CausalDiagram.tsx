import React, { useEffect, useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import Node from "./Node";
import Edge from "./Edge";
import CameraController from "./CameraController";
import { NodeType } from "../types/node";
import { EdgeType } from "../types/edge";

interface CausalDiagramProps {
	nodes: NodeType[];
	edges: EdgeType[];
	selectedNode?: NodeType | null;
}

const colors = [
	"#195c90",
	"#ffffff",
	"#a0db8e",
	"#ac1e8e",
	"#edae01",
	"#d61800",
	"#cf6766"
];

const CausalDiagram: React.FC<CausalDiagramProps> = ({
	nodes,
	edges,
	selectedNode
}) => {
	const categoryColorMap = useRef<{ [key: string]: string }>({}).current;
	const [nodePositions, setNodePositions] = useState<{
		[key: string]: [number, number, number];
	}>({});
	const zPositions = useRef<{ [key: string]: number }>({});
	const [isInteracting, setIsInteracting] = useState(false);
	const [minStrength, setMinStrength] = useState(0);
	const [maxStrength, setMaxStrength] = useState(1);

	// function to assign colors based on category (same color for nodes from one category)
	const getColorByCategory = (category: string): string => {
		if (!categoryColorMap[category]) {
			categoryColorMap[category] =
				colors[Object.keys(categoryColorMap).length % colors.length];
		}
		return categoryColorMap[category];
	};

	// Function to calculate the distance between two points in 3D space
	const calculateDistance = (
		pos1: [number, number, number],
		pos2: [number, number, number]
	): number => {
		const [x1, y1, z1] = pos1;
		const [x2, y2, z2] = pos2;
		return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2 + (z1 - z2) ** 2);
	};

	useEffect(() => {
		// Calculate radial positions for each category
		const categories = Array.from(new Set(nodes.map((node) => node.category)));
		const radius = 200; // Adjust the radius as needed
		const angleStep = (2 * Math.PI) / categories.length;
		const categoryPositions: { [key: string]: [number, number] } = {};

		categories.forEach((category, index) => {
			const angle = index * angleStep;
			categoryPositions[category] = [
				Math.cos(angle) * radius,
				Math.sin(angle) * radius
			];
		});

		// Calculate scaling factor based on the number of nodes
		const scaleFactor = Math.sqrt(nodes.length) * 0.25;
		const minDistance = 50 * scaleFactor; // Minimum distance between nodes

		// Set node positions based on category with added deterministic noise
		const positions: { [key: string]: [number, number, number] } = {};
		nodes.forEach((node, index) => {
			if (!zPositions.current[node.id]) {
				const noiseZ = ((index % 5) - 5) * 100 * scaleFactor; // Deterministic noise for z position
				zPositions.current[node.id] = noiseZ;
			}
			const [x, y] = categoryPositions[node.category];
			const noiseX = ((index % 10) - 5) * 10 * scaleFactor; // Deterministic noise for x position
			const noiseY = ((Math.floor(index / 10) % 10) - 5) * 10 * scaleFactor; // Deterministic noise for y position
			positions[node.id] = [
				(x + noiseX) * scaleFactor,
				(y + noiseY) * scaleFactor,
				zPositions.current[node.id]
			];
		});

		// Adjust positions if nodes are too close
		nodes.forEach((node, index) => {
			const pos1 = positions[node.id];
			nodes.forEach((otherNode, otherIndex) => {
				if (index !== otherIndex) {
					const pos2 = positions[otherNode.id];
					if (calculateDistance(pos1, pos2) < minDistance) {
						// Adjust position to ensure minimum distance
						positions[otherNode.id] = [
							pos2[0] + minDistance,
							pos2[1] + minDistance,
							pos2[2] + minDistance
						];
					}
				}
			});
		});

		setNodePositions(positions);
	}, [nodes]);

	// Input handlers for min and max strength fields
	const handleMinStrengthChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setMinStrength(parseFloat(event.target.value));
	};

	const handleMaxStrengthChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setMaxStrength(parseFloat(event.target.value));
	};

	return (
		<div>
			<Box
				display="flex"
				alignItems="center"
				justifyContent="space-between"
				marginBottom="10px"
			>
				<Box display="flex" alignItems="center">
					<label htmlFor="min-strength" style={{ marginRight: "10px" }}>
						Min Strength:
					</label>
					<input
						type="number"
						id="min-strength"
						value={minStrength}
						onChange={handleMinStrengthChange}
						step="0.1"
						min="0"
						max="1"
						style={{ marginRight: "20px" }}
					/>

					<label htmlFor="max-strength" style={{ marginRight: "10px" }}>
						Max Strength:
					</label>
					<input
						type="number"
						id="max-strength"
						value={maxStrength}
						onChange={handleMaxStrengthChange}
						step="0.1"
						min="0"
						max="1"
					/>
				</Box>


			<Canvas
				camera={{
					position: [0, 0, 100],
					fov: 50,
					near: 0.1,
					far: 5000
				}}
				style={{ width: "100%", height: "910px" }}
			>
				<ambientLight intensity={1.0} />
				<directionalLight position={[10, 10, 10]} intensity={1} />
				<CameraController
					nodePositions={nodePositions}
					setIsInteracting={setIsInteracting}
				/>

				{Object.keys(nodePositions).length > 0 &&
					nodes.map((node) => (
						<Node
							key={node.id}
							position={nodePositions[node.id]}
							label={node.label}
							value={node.value}
							category={node.category}
							color={getColorByCategory(node.category)}
							isInteracting={isInteracting}
							isSelected={!!(selectedNode && selectedNode.id === node.id)}
						/>
					))}
				{Object.keys(nodePositions).length > 0 &&
					edges
						.filter(
							(edge) =>
								edge.strength >= minStrength && edge.strength <= maxStrength
						)
						.map((edge) => {
							const sourcePosition = nodePositions[edge.source];
							const targetPosition = nodePositions[edge.target];
							if (!sourcePosition || !targetPosition) return null;

							return (
								<Edge
									key={`${edge.source}-${edge.target}`}
									sourcePosition={sourcePosition}
									targetPosition={targetPosition}
									relationship={edge.relationship}
									strength={edge.strength}
								/>
							);
						})}
			</Canvas>
		</div>
	);
};

export default CausalDiagram;
