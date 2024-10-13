import React from 'react';
import CausalDiagram from '../components/CausalDiagram';
import jsonData from '../data/100nodes_example.json';

const GraphPage = () => {
  const { nodes, edges } = jsonData;

  return (
    <div>
      <CausalDiagram nodes={nodes} edges={edges} />
    </div>
  );
};

export default GraphPage;
