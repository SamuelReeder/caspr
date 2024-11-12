import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import GraphPage from "../src/pages/graph";
import "@testing-library/jest-dom";
import customRender from "@/test-utils/render";

// Mock the components that are imported in GraphPage
jest.mock("../src/components/CausalDiagram", () => () => (
	<div>CausalDiagram</div>
));
jest.mock("../src/components/GraphNavbar", () => (props: any) => (
	<div>
		GraphNavbar
		<button onClick={props.addDiagram}>Add Diagram</button>
		{props.diagrams.map((diagram: any) => (
			<button key={diagram.id} onClick={() => props.removeDiagram(diagram.id)}>
				Remove Diagram {diagram.id}
			</button>
		))}
	</div>
));
jest.mock("../src/components/GraphSideBar", () => () => (
	<div>GraphSideBar</div>
));

test("renders GraphPage component", () => {
	customRender(<GraphPage />);

	expect(screen.getByText("GraphNavbar")).toBeInTheDocument();
	expect(screen.getByText("CausalDiagram")).toBeInTheDocument();
	expect(screen.getByText("GraphSideBar")).toBeInTheDocument();
});

test("adds and removes diagrams", () => {
	customRender(<GraphPage />);

	fireEvent.click(screen.getByText("Add Diagram"));
	expect(screen.getAllByText("CausalDiagram").length).toBe(2);

	fireEvent.click(screen.getByText("Remove Diagram 0"));
	expect(screen.getAllByText("CausalDiagram").length).toBe(1);
});
