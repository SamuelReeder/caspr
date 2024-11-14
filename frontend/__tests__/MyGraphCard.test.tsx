import "@testing-library/jest-dom";

import { Graph, User } from "@/types";

import MyGraphObject from "../src/components/MyGraphCard";
import React from "react";
import { Timestamp } from "firebase/firestore"; // Import Timestamp
import customRender from "@/test-utils/render";
import { screen, fireEvent } from "@testing-library/react";

describe("GraphObject renders correctly", () => {
	test("renders GraphObject component", () => {
		customRender(
			<MyGraphObject
				graph={
					{
						id: "1",
						owner: "Kevin",
						graphName: "Test Title",
						graphDescription: "Test Description",
						graphFileURL: "https://www.google.com",
						graphURL: "https://www.example.com",
						graphVisibility: true,
						createdAt: Timestamp.fromDate(new Date("2023-09-01")),
						sharing: [],
						sharedEmails: [],
						presets: []
					} as Graph
				}
				owner={
					{
						uid: "1",
						name: "Kevin",
						email: "",
						photoURL: "",
						createdAt: Timestamp.fromDate(new Date("2023-09-01")),
						roles: []
					} as User
				}
			/>
		);

		const titleElement = screen.getByText(/Test Title/i);
		const descriptionElement = screen.getByText(/Test Description/i);
		const authorElement = screen.getByText(/Kevin/i);

		expect(titleElement).toBeInTheDocument();
		expect(descriptionElement).toBeInTheDocument();
		expect(authorElement).toBeInTheDocument();
	});

	test("renders GraphObject button", () => {
		customRender(
			<MyGraphObject
				graph={
					{
						id: "1",
						owner: "Kevin",
						graphName: "Test Title",
						graphDescription: "Test Description",
						graphFileURL: "https://www.google.com",
						graphURL: "https://www.example.com",
						graphVisibility: true,
						createdAt: Timestamp.fromDate(new Date("2023-09-01")),
						sharing: [],
						sharedEmails: [],
						presets: []
					} as Graph
				}
				owner={
					{
						uid: "1",
						name: "Kevin",
						email: "",
						photoURL: "",
						createdAt: Timestamp.fromDate(new Date("2023-09-01")),
						roles: []
					} as User
				}
			/>
		);
		

		const buttonElement = screen.getByText(/Share/i);
		expect(buttonElement).toBeInTheDocument();
	});
	
	test("navigates to the correct page when Open button is clicked", () => {
    const originalLocation = window.location;
		Object.defineProperty(window, 'location', {
			writable: true,
			value: { href: "" }
		});

    customRender(
      <MyGraphObject
        graph={
          {
            id: "1",
            owner: "Kevin",
            graphName: "Test Title",
            graphDescription: "Test Description",
            graphFileURL: "https://www.google.com",
            graphURL: "https://www.example.com",
            graphVisibility: true,
            createdAt: Timestamp.fromDate(new Date("2023-09-01")),
            sharing: [],
            sharedEmails: [],
            presets: [],
          } as Graph
        }
        owner={
          {
            uid: "1",
            name: "Kevin",
            email: "",
            photoURL: "",
            createdAt: Timestamp.fromDate(new Date("2023-09-01")),
            roles: [],
          } as User
        }
      />
    );

    const openButton = screen.getByText(/Open/i);
    fireEvent.click(openButton);

    expect(window.location.href).toBe("https://www.example.com");

    window.location = originalLocation;
  });
});
