/**
 * Node component
 * @returns {ReactElement} Node component
 */

import { Html } from "@react-three/drei";
import React, { useRef, useState } from "react";
import { Mesh } from "three";
import "@/styles/node-styles.css";

interface NodeProps {
	position: [number, number, number];
	label: string;
	value: number;
	category: string;
	color: string;
	isInteracting: boolean;
	isSelected: boolean;
	isDimmed: boolean;
	onPointerOver: () => void;
	onPointerOut: () => void;
	onClick: () => void;
}

const Node: React.FC<NodeProps> = ({
	position,
	label,
	value,
	category,
	color,
	isInteracting,
	isSelected,
	isDimmed,
	onPointerOver,
	onPointerOut,
	onClick
}) => {
	const meshRef = useRef<Mesh>(null);
	const [hovered, setHovered] = useState(false);
	const hideTooltipTimeout = useRef<NodeJS.Timeout | null>(null);

	const handlePointerOver = () => {
		if (!isInteracting) {
			if (hideTooltipTimeout.current) {
				clearTimeout(hideTooltipTimeout.current);
				hideTooltipTimeout.current = null;
			}
			setHovered(true);
			onPointerOver();
		}
	};

	const handlePointerOut = () => {
		hideTooltipTimeout.current = setTimeout(() => {
			setHovered(false);
			onPointerOut();
		}, 200);
	};

	return (
		<mesh
			scale={isSelected ? [4, 4, 4] : [2, 2, 2]} // Increase scale if selected
			ref={meshRef}
			position={position}
			onPointerOver={handlePointerOver}
			onPointerOut={handlePointerOut}
			onClick={onClick}
		>
			<sphereGeometry args={[6, 32, 32]} />
			<meshStandardMaterial
				color={color}
				emissive={isSelected ? "red" : "black"}
				emissiveIntensity={isSelected ? 1 : 0}
				opacity={isDimmed ? 0.3 : 1}
				transparent
			/>
			{hovered && (
				<Html>
					<div className="node-tooltip">
						<strong>{label}</strong>
						<br />
						Value: {value}
						<br />
						Category: {category}
					</div>
				</Html>
			)}
		</mesh>
	);
};

export default Node;
