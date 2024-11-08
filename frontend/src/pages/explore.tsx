/**
 * Explore Page
 * @returns {ReactElement} Explore Page
 */
import { Heading, Text } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";

import { GraphData } from "@/types/graph";
import { GraphList } from "../components/graphList";
import Searchbar from "@/components/Searchbar";
import Sidebar from "@/components/Sidebar";
import { fetchGraphs } from "@/api/storage";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";

function Explore() {
	const { firebaseUser, loading } = useAuth();
	const router = useRouter();
	const [graphs, setGraphs] = useState<GraphData[] | undefined>([]);

	// const fetchGraphs = useCallback(async () => {
	// 	try {
	// 		const publicGraphs = await fetchGraphs(firebaseUser);
	// 		setGraphs(publicGraphs);
	// 	} catch (error) {
	// 		console.error("Error fetching graphs:", error);
	// 	}
	// }, [firebaseUser]);

	// useEffect(() => {
	// 	fetchPublicGraphs();
	// }, [fetchPublicGraphs, firebaseUser]);

	if (loading) {
		return <div>Loading...</div>;
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

				<GraphList graphs={graphs} page="Explore" />
			</div>
		</div>
	);
}

export default Explore;