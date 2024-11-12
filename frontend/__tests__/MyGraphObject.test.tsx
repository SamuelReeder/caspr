import "@testing-library/jest-dom";

import MyGraphObject from "../src/components/MyGraphObject";
import React from "react";
import { Timestamp } from "firebase/firestore"; // Import Timestamp
import customRender from "@/test-utils/render";
import { screen } from "@testing-library/react";

describe("GraphObject renders correctly", () => {
	test("renders GraphObject component", () => {
		customRender(
			<MyGraphObject
				graphName="Test Title"
				graphDescription="Test Description"
				author="Kevin@gmail.com"
				createdAt={Timestamp.fromDate(new Date("2023-09-01"))}
			/>
		);

		const titleElement = screen.getByText(/Test Title/i);
		const descriptionElement = screen.getByText(/Test Description/i);
		const authorElement = screen.getByText(/Kevin@gmail.com/i);

		expect(titleElement).toBeInTheDocument();
		expect(descriptionElement).toBeInTheDocument();
		expect(authorElement).toBeInTheDocument();
	});

	test("renders GraphObject button", () => {
		customRender(
			<MyGraphObject
				graphName="Test Title"
				graphDescription="Test Description"
				author="Kevin@gmail.com"
				createdAt={Timestamp.fromDate(new Date("2023-09-01"))}
			/>
		);

		const buttonElement = screen.getByText(/Share/i);
		expect(buttonElement).toBeInTheDocument();
	});
});
