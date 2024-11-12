import { render, screen, act } from "@testing-library/react";
import Searchbar from "../src/components/Searchbar";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import customRender from "@/test-utils/render";

describe("Searchbar renders correctly", () => {
	test("renders Searchbar component", () => {
		const mockSetGraphs = jest.fn();

		customRender(<Searchbar graphs={[]} setGraphs={mockSetGraphs} />);

		const searchElement = screen.getByPlaceholderText(/Search/i);

		expect(searchElement).toBeInTheDocument();
	});

	test("renders Searchbar component with search value", async () => {
		const mockSetGraphs = jest.fn();

		customRender(<Searchbar graphs={[]} setGraphs={mockSetGraphs} />);

		const searchElement = screen.getByPlaceholderText(/Search/i);
		expect(searchElement).toBeInTheDocument();

		// Type in the search bar
		const user = userEvent.setup();
		const searchBarInput = screen.getByPlaceholderText(/Search/i);
		await act(async () => {
			await user.type(searchBarInput, "Graph");
		});

		expect(searchBarInput).toHaveValue("Graph");
	});
});
