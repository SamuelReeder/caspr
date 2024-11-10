/**
 * Shared With Me Page
 * @returns {ReactElement} Shared With Me Page
 */
import { Heading, Text } from "@chakra-ui/react";
import { getSharedGraphs, getUser } from "@/api";
import { useCallback, useEffect, useState } from "react";

import FullScreenLoader from "./fullScreenLoader";
import { Graph } from "@/types/graph";
import GraphList from "@/components/GraphList";
import Searchbar from "@/components/Searchbar";
import Sidebar from "@/components/Sidebar";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";

function SharedWithMe() {
	const { firebaseUser, loading } = useAuth();
	const router = useRouter();
	const [graphs, setGraphs] = useState<Graph[] | undefined>([]);
	const [isLoading, setIsLoading] = useState(true);

	const fetchUsersSharedGraphs = useCallback(async () => {
		if (!firebaseUser?.email) return;

		try {
			setIsLoading(true);
			const sharedGraphs = await getSharedGraphs(firebaseUser.email);
			const graphsWithOwners = await Promise.all(
				sharedGraphs.map(async (graph) => {
					try {
						const owner = await getUser(graph.owner);
						return {
							...graph,
							owner: owner.name || "Unknown"
						};
					} catch (error) {
						return {
							...graph,
							ownerName: "Unknown"
						};
					}
				})
			);

			setGraphs(graphsWithOwners);
		} catch (error) {
			console.error("Error fetching shared graphs:", error);
			setGraphs([]);
		} finally {
			setIsLoading(false);
		}
	}, [firebaseUser?.email]);

	useEffect(() => {
		fetchUsersSharedGraphs();
	}, [fetchUsersSharedGraphs]);

	if (loading || isLoading) {
		return <FullScreenLoader />;
	}

	if (!firebaseUser) {
		router.push("/");
		return null;
	}

	return (
		<div className="flex flex-row">
			<div className="sticky top-0 h-screen">
				<Sidebar />
			</div>

			<div className="p-8 flex flex-col w-full overflow-y-auto">
				<div className="flex flex-row w-full">
					<div className="flex flex-col gap-2 w-full">
						<Searchbar graphs={graphs} setGraphs={setGraphs} />
						<Heading>Welcome, {firebaseUser?.displayName || "User"}</Heading>
						<Text>Email: {firebaseUser.email}</Text>
					</div>
				</div>

				<GraphList graphs={graphs} page="Shared With Me" />
			</div>
		</div>
	);
}

export default SharedWithMe;
