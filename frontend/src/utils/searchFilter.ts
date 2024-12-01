// searchFilter.ts
import { Graph } from "@/types";
import { getUser } from "@/api/firestore";

export const fetchOwnerData = async (
	graphs: Graph[]
): Promise<[Graph, string][]> => {
	if (graphs && graphs.length > 0) {
		const graphsWithUsers = await Promise.all(
			graphs.map(async (graph) => {
				const user = await getUser(graph.owner);
				return [graph, user.name] as [Graph, string];
			})
		);
		return graphsWithUsers;
	}
	return [];
};

export const handleSearch = (
	searchValue: string,
	originalGraphs: [Graph, string][],
	sortType: string,
	filterType: string
): Graph[] => {
	const value = searchValue.toLowerCase();

	if (value.length > 0) {
		const filteredResults = originalGraphs.filter(
			(item) =>
				item[0].graphName.toLowerCase().includes(value) ||
				item[0].graphDescription.toLowerCase().includes(value) ||
				item[1].toLowerCase().includes(value)
		);

		// Prioritize results by name, then description, then author
		let prioritizedResults;
		if (sortType === "none" && filterType === "none") {
			prioritizedResults = filteredResults.sort((a, b) => {
				const aNameMatch = a[0].graphName.toLowerCase().includes(value) ? 1 : 0;
				const bNameMatch = b[0].graphName.toLowerCase().includes(value) ? 1 : 0;
				const aDescriptionMatch = a[0].graphDescription
					.toLowerCase()
					.includes(value)
					? 1
					: 0;
				const bDescriptionMatch = b[0].graphDescription
					.toLowerCase()
					.includes(value)
					? 1
					: 0;
				const aAuthorMatch = a[1].toLowerCase().includes(value) ? 1 : 0;
				const bAuthorMatch = b[1].toLowerCase().includes(value) ? 1 : 0;

				return (
					bNameMatch - aNameMatch ||
					bDescriptionMatch - aDescriptionMatch ||
					bAuthorMatch - aAuthorMatch
				);
			});
		} else {
			prioritizedResults = filteredResults;
		}

		return prioritizedResults.map((item) => item[0]);
	} else {
		return originalGraphs.map((item) => item[0]);
	}
};
