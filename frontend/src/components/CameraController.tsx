import React, { useEffect, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

interface CameraControllerProps {
  nodePositions: { [key: string]: [number, number, number] };
}

const CameraController: React.FC<CameraControllerProps> = ({ nodePositions }) => {
  const { camera } = useThree();
  const orbitControlsRef = useRef<any>();

  useEffect(() => {
    if (Object.keys(nodePositions).length > 0) {
      const positionsArray = Object.values(nodePositions);
      const minX = Math.min(...positionsArray.map(([x]) => x));
      const maxX = Math.max(...positionsArray.map(([x]) => x));
      const minY = Math.min(...positionsArray.map(([_, y]) => y));
      const maxY = Math.max(...positionsArray.map(([_, y]) => y));

      const centerX = (minX + maxX) / 2;
      const centerY = (minY + maxY) / 2;

      const width = maxX - minX;
      const height = maxY - minY;

      const fitOffset = 1.2;
      const distance = Math.max(width, height) * fitOffset;

      camera.position.set(centerX, centerY, distance);
      camera.lookAt(centerX, centerY, 0);
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
      maxDistance={1000}
    />
  );
};

export default CameraController;
