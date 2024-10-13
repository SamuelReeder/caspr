import React from 'react';
import { Line } from '@react-three/drei';

interface EdgeProps {
  sourcePosition: [number, number, number];
  targetPosition: [number, number, number];
  relationship: string;
  strength: number;
}

const Edge: React.FC<EdgeProps> = ({ sourcePosition, targetPosition, relationship, strength }) => {
  const scaledLineWidth = 0.1 + strength * 2;

  return (
    <Line
      points={[sourcePosition, targetPosition]}
      lineWidth={scaledLineWidth}
    />
  );
};

export default Edge;
