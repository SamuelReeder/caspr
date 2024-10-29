import React, { useRef, useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

interface CameraControllerProps {
  nodePositions: { [key: string]: [number, number, number] };
  setIsInteracting: (isInteracting: boolean) => void;
}

const CameraController: React.FC<CameraControllerProps> = ({ nodePositions, setIsInteracting }) => {
  const { camera } = useThree();
  const orbitControlsRef = useRef<any>();

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

  return (
    <OrbitControls
      enablePan={true}
      enableZoom={true}
      enableRotate={true}
      ref={orbitControlsRef}
      minDistance={10}
      maxDistance={2000}
      onStart={() => setIsInteracting(true)}
      onEnd={() => setIsInteracting(false)}
    />
  );
};

export default CameraController;
