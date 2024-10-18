import React, { useEffect, useState, useRef } from 'react';
import * as d3 from 'd3';
import { Canvas } from '@react-three/fiber';
import Node from './Node';
import Edge from './Edge';
import CameraController from './CameraController';
import { NodeType } from '../types/node';
import { EdgeType } from '../types/edge';

interface CausalDiagramProps {
  nodes: NodeType[];
  edges: EdgeType[];
  selectedNode?: NodeType | null; 
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

const CausalDiagram: React.FC<CausalDiagramProps> = ({ nodes, edges, selectedNode }) => {
  const categoryColorMap = useRef<{ [key: string]: string }>({}).current;
  const [nodePositions, setNodePositions] = useState<{ [key: string]: [number, number, number] }>({});
  const zPositions = useRef<{ [key: string]: number }>({});
  const [isInteracting, setIsInteracting] = useState(false); 
  const [minStrength, setMinStrength] = useState(0);
  const [maxStrength, setMaxStrength] = useState(1); 

  // function to assign colors based on category (same color for nodes from one category)
  const getColorByCategory = (category: string): string => {
    if (!categoryColorMap[category]) {
      categoryColorMap[category] = colors[Object.keys(categoryColorMap).length % colors.length];
    }
    return categoryColorMap[category];
  };

  useEffect(() => {
    nodes.forEach((node) => {
      if (!zPositions.current[node.id]) {
        zPositions.current[node.id] = Math.random() * 100 - 50;
      }
    });

    // use d3.js for nodes positions
    const simulation = d3.forceSimulation(nodes)
      .force('link', d3.forceLink(edges).id((d: any) => d.id).distance(10))
      .force('charge', d3.forceManyBody().strength(-5))
      .force('center', d3.forceCenter(0, 0))
      .force('collision', d3.forceCollide().radius(40))
      .on('tick', () => {
        const positions: { [key: string]: [number, number, number] } = {};
        nodes.forEach((node: any) => {
          positions[node.id] = [node.x ?? 0, node.y ?? 0,  zPositions.current[node.id]];
        });
        setNodePositions(positions);
      });

    return () => {
      simulation.stop();
    };
  }, [nodes, edges]);

  // Input handlers for min and max strength fields
  const handleMinStrengthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMinStrength(parseFloat(event.target.value));
  };

  const handleMaxStrengthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMaxStrength(parseFloat(event.target.value));
  };

  return (
    <div>
      <div style={{ marginBottom: '10px' }}>
        <label htmlFor="min-strength" style={{ marginRight: '10px' }}>Min Strength:</label>
        <input 
          type="number" 
          id="min-strength" 
          value={minStrength}
          onChange={handleMinStrengthChange}
          step="0.1" 
          min="0" 
          max="1" 
          style={{ marginRight: '20px' }}
        />

        <label htmlFor="max-strength" style={{ marginRight: '10px' }}>Max Strength:</label>
        <input 
          type="number" 
          id="max-strength" 
          value={maxStrength}
          onChange={handleMaxStrengthChange}
          step="0.1" 
          min="0" 
          max="1"
        />
      </div>

      <Canvas
        camera={{
          position: [0, 0, 100],
          fov: 50,
          near: 0.1,
          far: 5000, 
        }}
        style={{ width: '100%', height: '910px' }}
      >
        <ambientLight intensity={1.0} />
        <directionalLight position={[10, 10, 10]} intensity={1} />
        <CameraController nodePositions={nodePositions} setIsInteracting={setIsInteracting}/>

        {Object.keys(nodePositions).length > 0 &&
          nodes.map((node) => (
            <Node
              key={node.id}
              position={nodePositions[node.id]}
              label={node.label}
              value={node.value}
              category={node.category}
              color={selectedNode && selectedNode.id === node.id ? '#00FFFF' : getColorByCategory(node.category)}
              isInteracting={isInteracting}
            />
          ))}
        {Object.keys(nodePositions).length > 0 &&
          edges
            .filter((edge) => edge.strength >= minStrength && edge.strength <= maxStrength) 
            .map((edge) => {
              const sourcePosition = nodePositions[(edge.source as any).id];
              const targetPosition = nodePositions[(edge.target as any).id];

              if (!sourcePosition || !targetPosition) return null;

              return (
                <Edge
                  key={`${(edge.source as any).id}-${(edge.target as any).id}`}
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
