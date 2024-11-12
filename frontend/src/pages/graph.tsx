/**
 * GraphPage component
 * @returns {ReactElement} GraphPage component
 */
import React, { useState, useEffect } from "react";
import {
	Tabs,
	TabPanels,
	TabPanel,
	Box,
} from "@chakra-ui/react";
import jsonData from "../data/100nodes_example.json";
import { FullScreenLoader, GraphSideBar, GraphNavbar, CausalDiagram } from '@/components';
import { NodeType } from "@/types";

interface Diagram {
	id: number;
	data: {
		nodes: { id: string; label: string; value: number; category: string }[];
		edges: {
			source: string;
			target: string;
			relationship: string;
			strength: number;
		}[];
	};
	label: string;
}

const GraphPage = () => {
	const [diagrams, setDiagrams] = useState<Diagram[]>([]);
	const [selectedTab, setSelectedTab] = useState(0);
	const [selectedNode, setSelectedNode] = useState<NodeType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

	const handleNodeSelect = (node: NodeType | null) => {
		setSelectedNode(node);
	};

	useEffect(() => {
		// Set initial state on the client side
		setDiagrams([{ id: 0, data: jsonData, label: "Diagram 1" }]);

    setLoading(false);
	}, []);

	const addDiagram = () => {
		const newId = diagrams.length ? diagrams[diagrams.length - 1].id + 1 : 0;
		const newDiagram = {
			id: newId,
			data: jsonData,
			label: `Diagram ${newId + 1}`
		};
		setDiagrams([...diagrams, newDiagram]);
	};

	const removeDiagram = (id: number) => {
		setDiagrams(diagrams.filter((diagram) => diagram.id !== id));
		if (selectedTab >= diagrams.length - 1) {
			setSelectedTab(diagrams.length - 2);
		}
	};
  if (loading) {
    return <FullScreenLoader />; // Show FullScreenLoader when loading
  }

  return (
    <Box height="100vh" display="flex" flexDirection="column">
      <GraphNavbar
        diagrams={diagrams}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        addDiagram={addDiagram}
		removeDiagram={removeDiagram}
		graph={null}
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
