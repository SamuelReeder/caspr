/**
 * Graph page
 * @returns {ReactElement} Graph page
 */
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Tabs, TabPanels, TabPanel, Box, useToast } from "@chakra-ui/react";
import { GraphSideBar, GraphNavbar, CausalDiagram} from "@/components";
import FullScreenLoader from "../../components/FullScreenLoader";
import { NodeType, Graph } from "@/types";
import { fetchAllPublicGraphsIncludingUser, getGraphData } from "@/api"; // Import the function to fetch graphs
import { useAuth } from "@/context/AuthContext";

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
	const router = useRouter();
	const { id } = router.query; // Get the graph ID from the URL
	const [diagrams, setDiagrams] = useState<Diagram[]>([]);
	const [selectedTab, setSelectedTab] = useState(0);
	const [selectedNode, setSelectedNode] = useState<NodeType | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const { firebaseUser } = useAuth();
	const [graph, setGraph] = useState<Graph | null>(null);
	const toast = useToast();

	const handleNodeSelect = (node: NodeType | null) => {
		setSelectedNode(node);
	};

	const validateJsonDate = (data: any) => {
		return data && data.nodes && data.edges;
	};

	useEffect(() => {
		const fetchGraphData = async () => {
			if (!firebaseUser || !id) return;

			try {
				const userGraphs = await fetchAllPublicGraphsIncludingUser();
				const graph = userGraphs.find((g: Graph) => {
					if (!g.graphURL) return false;
					const urlParts = g.graphURL.split("/");
					const graphId = urlParts[urlParts.indexOf("graph") + 1]; // Find the part after 'graph'
					return graphId === id;
				});

				if (graph) {
					const jsonData = await getGraphData(graph);
					if (!validateJsonDate(jsonData)) {
						router.push("/home");
						toast({
							title: "Error",
							description: "Invalid graph data",
							status: "error",
							duration: 5000,
							isClosable: true
						});
						return;
					}

					setDiagrams([{ id: 0, data: jsonData, label: graph.graphName }]);
					setGraph(graph);
				} else {
					router.push("/undefined");
				}
			} catch (error) {
				console.error("Error fetching graph data:", error);
				router.push("/undefined");
			} finally {
				setLoading(false);
			}
		};

		fetchGraphData();
	}, [firebaseUser, id, router, toast]);

	const addDiagram = () => {
		const newId = diagrams.length ? diagrams[diagrams.length - 1].id + 1 : 0;
		const newDiagram = {
			id: newId,
			data: diagrams[0].data, // Use the same data for new diagrams
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
		return <FullScreenLoader />;
	}

	return (
		<Box height="100vh" display="flex" flexDirection="column">
			<GraphNavbar
				diagrams={diagrams}
				selectedTab={selectedTab}
				setSelectedTab={setSelectedTab}
				addDiagram={addDiagram}
				removeDiagram={removeDiagram}
				graph={graph}
			/>
			<Box display="flex" flex="1">
				<Box flex="1">
					<Tabs index={selectedTab} onChange={(index) => setSelectedTab(index)}>
						<TabPanels>
							{diagrams.map((diagram) => (
								<TabPanel key={diagram.id}>
									<CausalDiagram
										nodes={diagram.data.nodes}
										edges={diagram.data.edges}
										selectedNode={selectedNode}
									/>
								</TabPanel>
							))}
						</TabPanels>
					</Tabs>
				</Box>
				<Box width="350px">
					<GraphSideBar
						onNodeSelect={handleNodeSelect}
						nodes={diagrams[0]?.data.nodes || []}
						edges={diagrams[0]?.data.edges || []}
					/>
				</Box>
			</Box>
		</Box>
	);
};

export default GraphPage;
