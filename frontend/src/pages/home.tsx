/**
 * Home Page
 * @returns {ReactElement} Home Page
 */
import { Heading, Text } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { GraphList, Searchbar, Sidebar, FullScreenLoader } from "@/components";
import { useAuth, useGraph } from "@/context";
import { useRouter } from "next/router";
import { fetchCurrUserGraphs } from "@/api";

function Home() {
	const { firebaseUser, loading } = useAuth();
	const { graphs, setGraphs } = useGraph()
	const router = useRouter();


	const fetchUsersGraphs = useCallback(async () => {
		try {
			const usersGraphs = await fetchCurrUserGraphs(firebaseUser);
			setGraphs(usersGraphs);
		} catch (error) {
			console.error("Error fetching graphs:", error);
		}
	}, [firebaseUser]);

	useEffect(() => {
		fetchUsersGraphs();
	}, [fetchUsersGraphs, firebaseUser]);

	if (loading) {
		return <FullScreenLoader />;
	}

	if (!firebaseUser) {
		router.push("/explore");
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

				<GraphList graphs={graphs} page="My Graphs" />
			</div>
		</div>
	);
}

export default Home;
