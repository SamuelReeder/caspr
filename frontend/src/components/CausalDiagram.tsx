import React, { useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Node from './Node';
import Edge from './Edge';
import { NodeType } from '../types/node';
import { EdgeType } from '../types/edge';

interface CausalDiagramProps {
  nodes: NodeType[];
  edges: EdgeType[];
}

const colors = [
  '#195c90',
  '#ffffff',
  '#a0db8e',
  '#ac1e8e',
  '#edae01',
  '#d61800',
  '#cf6766'
];

const CausalDiagram: React.FC<CausalDiagramProps> = ({ nodes, edges }) => {
  const categoryColorMap = useRef<{ [key: string]: string }>({}).current;
  const [nodePositions, setNodePositions] = useState<{ [key: string]: [number, number, number] }>({});

  // function to assign colors based on category (same color for nodes from one category)
  const getColorByCategory = (category: string): string => {
    if (!categoryColorMap[category]) {
      categoryColorMap[category] = colors[Object.keys(categoryColorMap).length % colors.length];
    }
    return categoryColorMap[category];
  };

  useEffect(() => {
    const initialPositions: { [key: string]: [number, number, number] } = {};
    const width = 800;
    const height = 600;

    nodes.forEach((node, index) => {
      const x = (Math.random() - 0.5) * width * 0.05;
      const y = (Math.random() - 0.5) * height * 0.05;
      const z = (Math.random() - 0.5) * width * 0.1; 
      initialPositions[node.id] = [x, y, z];
    });

    edges.forEach((edge) => {
      const sourcePos = initialPositions[edge.source];
      const targetPos = initialPositions[edge.target];

      const adjustmentFactor = 0.2;
      const midX = (sourcePos[0] + targetPos[0]) / 2;
      const midY = (sourcePos[1] + targetPos[1]) / 2;
      const midZ = (sourcePos[2] + targetPos[2]) / 2;

      initialPositions[edge.target] = [
        midX * (1 - adjustmentFactor) + targetPos[0] * adjustmentFactor,
        midY * (1 - adjustmentFactor) + targetPos[1] * adjustmentFactor,
        midZ * (1 - adjustmentFactor) + targetPos[2] * adjustmentFactor,
      ];
    });

    setNodePositions(initialPositions);
  }, [nodes, edges]);
  
  return (
    <Canvas style={{ width: '1280px', height: '720px' }}>
      <ambientLight intensity={1} />
      <pointLight position={[10, 10, 10]} />
      <OrbitControls enableZoom={true} enablePan={true} panSpeed={2} />

      {Object.keys(nodePositions).length > 0 &&
        nodes.map((node) => (
          <Node
            key={node.id}
            position={nodePositions[node.id]}
            label={node.label}
            value={node.value}
            category={node.category}
            color={getColorByCategory(node.category)}
          />
        ))}

      {edges.map((edge, index) => (
        <Edge
          key={index}
          sourcePosition={nodePositions[edge.source]}
          targetPosition={nodePositions[edge.target]}
          relationship={edge.relationship}
          strength={edge.strength}
        />
      ))}
    </Canvas>
  );
};

export default CausalDiagram;
