import React from "react";
import { screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import GraphSideBar from "../src/components/GraphSideBar";
import { NodeType, EdgeType } from "@/types";
import data from "../src/data/100nodes_example.json"; // Import the JSON data
import customRender from "@/test-utils/render";

describe("Simple Math", () => {
  const mockNodes: NodeType[] = data.nodes;
  const mockEdges: EdgeType[] = data.edges;
  const mockOnNodeSelect = jest.fn();

  const renderGraphSideBar = () => {
    return customRender(
      <GraphSideBar
        nodes={mockNodes}
        edges={mockEdges}
        onNodeSelect={mockOnNodeSelect}
      />
    );
  };

  test("renders GraphSideBar component", () => {
    renderGraphSideBar();

    expect(screen.getByPlaceholderText("Search by label, id, or category...")).toBeInTheDocument();
  });
  
  test("filters nodes based on search query", () => {
    renderGraphSideBar();

    const searchInput = screen.getByPlaceholderText("Search by label, id, or category...");
    fireEvent.change(searchInput, { target: { value: "Cybersecurity" } });

    expect(screen.getByText("Cybersecurity")).toBeInTheDocument();

    mockNodes.forEach((node) => {
      if (node.label !== "Cybersecurity") {
        expect(screen.queryByText(node.label)).not.toBeInTheDocument();
      }
    });
  });

  test("handles node click", () => {
    renderGraphSideBar();

    const searchInput = screen.getByPlaceholderText("Search by label, id, or category...");
    fireEvent.change(searchInput, { target: { value: "Cybersecurity" } });

    const nodeElement = screen.getByText("Cybersecurity");
    fireEvent.click(nodeElement);

    const selectedNode = mockNodes.find((node) => node.label === "Cybersecurity");

    expect(mockOnNodeSelect).toHaveBeenCalledWith(selectedNode);
  });
});

