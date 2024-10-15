import React, { useState } from 'react';
import { Line, Html } from '@react-three/drei';
import { extend } from '@react-three/fiber';
import * as THREE from 'three';
extend({ ConeGeometry: THREE.ConeGeometry });

interface EdgeProps {
  sourcePosition: [number, number, number];
  targetPosition: [number, number, number];
  relationship: string;
  strength: number;
}

const Edge: React.FC<EdgeProps> = ({ sourcePosition, targetPosition, relationship, strength }) => {
  const [hovered, setHovered] = useState(false);

  if (!sourcePosition || !targetPosition) {
    console.error("Invalid source or target position for edge", { sourcePosition, targetPosition });
    return null;
  }

  const scaledLineWidth = 0.1 + strength * 3;

  let color = 'black';
  let dashed = false;
  let arrow = false;

  switch (relationship) {
    case 'causal':
      arrow = true;
      break;
    case 'correlated':
      dashed = false;
      break;
    case 'inhibitory':
      color = 'red';
      break;
    default:
      console.error("Unknown relationship type", relationship);
  }

  const direction = new THREE.Vector3(
    targetPosition[0] - sourcePosition[0],
    targetPosition[1] - sourcePosition[1],
    targetPosition[2] - sourcePosition[2]
  );

  const normalizedDirection = direction.clone().normalize();

  // Calculate the midpoint between source and target
  const arrowPosition = new THREE.Vector3(
    targetPosition[0] - normalizedDirection.x * 16,
    targetPosition[1] - normalizedDirection.y * 16,
    targetPosition[2] - normalizedDirection.z * 16
  );

  // Calculate the rotation quaternion for the arrow
  const arrowRotation = new THREE.Quaternion();
  arrowRotation.setFromUnitVectors(new THREE.Vector3(0, 1, 0), normalizedDirection);

  return (
    <>
      <Line
        points={[sourcePosition, targetPosition]}
        lineWidth={scaledLineWidth}
        color={color}
        dashed={dashed}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      />
      {arrow && (
        <mesh position={arrowPosition} quaternion={arrowRotation}>
          <coneGeometry args={[5, 10, 32]} />
          <meshBasicMaterial color={color} />
        </mesh>
      )}
      <mesh
        position={arrowPosition}
        rotation={[0, 0, Math.atan2(direction.y, direction.x)]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <boxGeometry args={[direction.length(), 5, 5]} />
        <meshBasicMaterial color="transparent" opacity={0} transparent />
      </mesh>
      {hovered && (
        <Html position={arrowPosition}>
          <div className="edge-tooltip">
            <strong>Relationship:</strong> {relationship}
            <br />
            <strong>Strength:</strong> {strength}
          </div>
        </Html>
      )}
    </>
  );
};

export default Edge;