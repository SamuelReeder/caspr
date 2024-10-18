import React, { useState, useEffect } from 'react';
import { Tabs, TabPanels, TabPanel, Box } from '@chakra-ui/react';
import CausalDiagram from '../components/CausalDiagram';
import jsonData from '../data/100nodes_example.json';
import NavBar from '../components/GraphNavbar';
import GraphSideBar from '../components/GraphSideBar';
import { NodeType } from '../types/node';

interface Diagram {
  id: number;
  data: {
    nodes: { id: string; label: string; value: number; category: string }[];
    edges: { source: string; target: string; relationship: string; strength: number }[];
  };
  label: string;
}

const GraphPage = () => {
  const [diagrams, setDiagrams] = useState<Diagram[]>([]);
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedNode, setSelectedNode] = useState<NodeType | null>(null);

  const handleNodeSelect = (node: NodeType | null) => {
    setSelectedNode(node);
  };

  useEffect(() => {
    // Set initial state on the client side
    setDiagrams([
      { id: 0, data: jsonData, label: 'Diagram 1' },
    ]);
  }, []);

  const addDiagram = () => {
    const newId = diagrams.length ? diagrams[diagrams.length - 1].id + 1 : 0;
    const newDiagram = { id: newId, data: jsonData, label: `Diagram ${newId + 1}` };
    setDiagrams([...diagrams, newDiagram]);
  };

  const removeDiagram = (id: number) => {
    setDiagrams(diagrams.filter(diagram => diagram.id !== id));
    if (selectedTab >= diagrams.length - 1) {
      setSelectedTab(diagrams.length - 2);
    }
  };

  return (
    <Box height="100vh" display="flex" flexDirection="column">
      <NavBar
        diagrams={diagrams}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        addDiagram={addDiagram}
        removeDiagram={removeDiagram}
      />
      <Box display="flex" flex="1">
        <Box flex="1">
          <Tabs index={selectedTab} onChange={(index) => setSelectedTab(index)}>
            <TabPanels>
              {diagrams.map((diagram) => (
                <TabPanel key={diagram.id}>
                  <CausalDiagram nodes={diagram.data.nodes} edges={diagram.data.edges} selectedNode={selectedNode} />
                </TabPanel>
              ))}
            </TabPanels>
          </Tabs>
        </Box>
        <Box width="350px">
          <GraphSideBar 
            onNodeSelect={handleNodeSelect} 
            nodes={[]} 
            edges={[]} 
          />
        </Box>
      </Box>
    </Box>
  );
};

export default GraphPage;