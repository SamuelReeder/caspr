/**
 * Home
 */
import { Button, Heading, Link, Text } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";

import { ArrowForwardIcon } from "@chakra-ui/icons";
import { GraphData } from "@/types/graph";
import { GraphList } from "../components/graphList";
import Sidebar from "@/components/Sidebar";
import { fetchGraphs } from "@/api/storage";
import { universalLogout } from "@/api/auth";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";
import Searchbar from "@/components/Searchbar";

function Home() {
	const { firebaseUser, loading } = useAuth();
	const router = useRouter();
	const [graphs, setGraphs] = useState<GraphData[] | undefined>([]);

	const fetchUsersGraphs = useCallback(async () => {
		try {
			const usersGraphs = await fetchGraphs(firebaseUser);
			setGraphs(usersGraphs);
		} catch (error) {
			console.error("Error fetching graphs:", error);
		}
	}, [firebaseUser]);

	useEffect(() => {
		fetchUsersGraphs();
	}, [fetchUsersGraphs, firebaseUser]);

	const handleLogout = async () => {
		try {
			await universalLogout();
			router.push("/");
		} catch (error) {
			console.error(error);
		}
	};

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
						<Searchbar graphs={graphs} setGraphs={setGraphs}/>
						<Heading>Welcome, {firebaseUser?.displayName || "User"}</Heading>
						<Text>Email: {firebaseUser.email}</Text>
					</div>
				</div>

				<GraphList graphs={graphs} />
			</div>
		</div>
	);
}

export default Home;
