import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";

import { ChakraProvider } from "@chakra-ui/react";
import MyGraphObject from "../src/components/MyGraphObject";
import React from "react";
import customRender from "@/test-utils/render";

describe("GraphObject renders correctly", () => {
	test("renders GraphObject component", () => {
		customRender(
			<MyGraphObject
				graphName="Test Title"
				graphDescription="Test Description"
				createdAt={new Date("2023-09-01")}
			/>
		);

		const titleElement = screen.getByText(/Test Title/i);
		const descriptionElement = screen.getByText(/Test Description/i);

		expect(titleElement).toBeInTheDocument();
		expect(descriptionElement).toBeInTheDocument();
	});

	// test('renders GraphObject button', () => {
	//     customRender(
	//             <MyGraphObject graphName="Test Title" graphDescription="Test Description" author="Kevin@gmail.com" />
	//     );

	//     const buttonElement = screen.getByText(/Share/i);
	//     expect(buttonElement).toBeInTheDocument();
	// });
});
