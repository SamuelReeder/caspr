/**
 * CameraController.tsx
 * This component is used to control the camera in the 3D graph visualization.
 * @param {CameraControllerProps} props - The props for the CameraController component
 * @returns {ReactElement} The CameraController component
 */
import React, { useRef, useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { ViewPosition } from "@/types/camera";
// import { ViewPosition } from "@/types";

interface CameraControllerProps {
	nodePositions: { [key: string]: [number, number, number] };
	setIsInteracting: (isInteracting: boolean) => void;
	onCameraStateChange?: (state: ViewPosition) => void; // Add callback prop
	initialView?: ViewPosition | null;
}

const CameraController: React.FC<CameraControllerProps> = ({
	nodePositions,
	setIsInteracting,
	onCameraStateChange,
	initialView
}) => {
	const { camera } = useThree();
	const orbitControlsRef = useRef<any>();

	const getCameraState = (): ViewPosition => {
		const controls = orbitControlsRef.current;
		return {
			x: camera.position.x,
			y: camera.position.y,
			z: camera.position.z,
			orientation: {
				pitch: controls.getPolarAngle(), // vertical rotation
				yaw: controls.getAzimuthalAngle(), // horizontal rotation
				roll: camera.rotation.z
			}
		};
	};

	const handleCameraChange = () => {
		if (onCameraStateChange) {
			onCameraStateChange(getCameraState());
		}
	};

	useEffect(() => {
		if (initialView && orbitControlsRef.current) {
			// Set camera position
			camera.position.set(initialView.x, initialView.y, initialView.z);

			// Set orientation if available
			if (initialView.orientation) {
				orbitControlsRef.current.setPolarAngle(initialView.orientation.pitch);
				orbitControlsRef.current.setAzimuthalAngle(initialView.orientation.yaw);
				camera.rotation.z = initialView.orientation.roll;
			}

			// Update controls
			orbitControlsRef.current.update();
		}
	}, [initialView, camera]);

	useEffect(() => {
		if (Object.keys(nodePositions).length > 0) {
			const positionsArray = Object.values(nodePositions);
			const minX = Math.min(...positionsArray.map(([x]) => x));
			const maxX = Math.max(...positionsArray.map(([x]) => x));
			const minY = Math.min(...positionsArray.map(([_, y]) => y));
			const maxY = Math.max(...positionsArray.map(([_, y]) => y));
			const minZ = Math.min(...positionsArray.map(([_, __, z]) => z));
			const maxZ = Math.max(...positionsArray.map(([_, __, z]) => z));

			const centerX = (minX + maxX) / 2;
			const centerY = (minY + maxY) / 2;
			const centerZ = (minZ + maxZ) / 2;

			const width = maxX - minX;
			const height = maxY - minY;
			const depth = maxZ - minZ;

			const fitOffset = 1.5;
			const distance = Math.max(width, height, depth) * fitOffset;

			camera.position.set(centerX, centerY, distance);
			camera.lookAt(centerX, centerY, centerZ);
			orbitControlsRef.current?.update();
		}
	}, [nodePositions, camera]);

	const maxDistance = Math.max(2000, Object.keys(nodePositions).length * 10);

	return (
		<OrbitControls
			enablePan={true}
			enableZoom={true}
			enableRotate={true}
			ref={orbitControlsRef}
			minDistance={10}
			maxDistance={maxDistance}
			onStart={() => setIsInteracting(true)}
			onEnd={() => setIsInteracting(false)}
			onChange={handleCameraChange}
		/>
	);
};

export default CameraController;
