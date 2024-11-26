import { FullScreenLoader, GraphList, Searchbar, Sidebar } from "@/components";
/**
 * Shared With Me Page
 * @returns {ReactElement} Shared With Me Page
 */
import { Heading, Text } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";

import { Graph } from "@/types";
import { getSharedGraphs } from "@/api";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";

function SharedWithMe() {
	const { firebaseUser, loading } = useAuth();
	const router = useRouter();
	const [graphs, setGraphs] = useState<Graph[] | undefined>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [sortType, setSortType] = useState("none");

	const fetchUsersSharedGraphs = useCallback(async () => {
		if (!firebaseUser?.email) return;

		try {
			setIsLoading(true);
			const sharedGraphs = await getSharedGraphs(firebaseUser.email, sortType);
			setGraphs(sharedGraphs);
		} catch (error) {
			console.error("Error fetching shared graphs:", error);
			setGraphs([]);
		} finally {
			setIsLoading(false);
		}
	}, [firebaseUser?.email, sortType]);

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

	const sortOptions = [
		{ value: "none", label: "Sort: None" },
		{ value: "nameAsc", label: "Sort: Name (A - Z)" },
		{ value: "nameDesc", label: "Sort: Name (Z - A)" },
		{ value: "uploadDateDesc", label: "Sort: Newest First" },
		{ value: "uploadDateAsc", label: "Sort: Oldest First" }
	];

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

				<GraphList
					graphs={graphs}
					page="Shared With Me"
					sortOptions={sortOptions}
					sortType={sortType}
					setSortType={setSortType}
				/>
			</div>
		</div>
	);
}

export default SharedWithMe;
