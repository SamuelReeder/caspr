import React, { useRef, useState } from 'react';
import { Html } from '@react-three/drei'; 
import { Mesh } from 'three';
import '../styles/node-styles.css';
import { ThreeEvent } from '@react-three/fiber';

interface NodeProps {
  position: [number, number, number];
  label: string;
  value: number;
  category: string;
  color: string;
  isInteracting: boolean;
  isSelected: boolean;
  isDimmed: boolean,
  onPointerOver: () => void;
  onPointerOut: () => void; 
}

const Node: React.FC<NodeProps> = ({ position, label, value, category, color, isInteracting, isSelected, isDimmed, onPointerOver, onPointerOut }) => {
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);

  const handlePointerOver = () => {
    if (!isInteracting) {
      setHovered(true);
      onPointerOver(); // Notify parent component
    }
  };

  const handlePointerOut = () => {
    setHovered(false);
    onPointerOut(); // Notify parent component
  };

  return (
    <mesh
      scale={isSelected ? [4, 4, 4] : [2, 2, 2]} // Increase scale if selected
      ref={meshRef}
      position={position}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      <sphereGeometry args={[6, 32, 32]} /> 
      <meshStandardMaterial color={color} emissive={isSelected ? 'red' : 'black'} emissiveIntensity={isSelected ? 1 : 0} opacity={isDimmed ? 0.3 : 1} transparent/>
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