import React, { useRef, useState } from 'react';
import { Html } from '@react-three/drei'; 
import { Mesh } from 'three';
import '../styles/node-styles.css';

interface NodeProps {
  position: [number, number, number];
  label: string;
  value: number;
  category: string;
  color: string;
  isInteracting: boolean;
}

const Node: React.FC<NodeProps> = ({ position, label, value, category, color, isInteracting }) => {
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);

  return (
    <mesh
    scale={[2, 2, 2]}
      ref={meshRef}
      position={position}
      onPointerOver={() => !isInteracting && setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
     <sphereGeometry args={[6, 32, 32]} /> 
      <meshStandardMaterial color={color} /> 
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
