import { Box, Button, Link, Text, VStack } from "@chakra-ui/react";
import router, { useRouter } from "next/router";

import { ArrowForwardIcon } from "@chakra-ui/icons";
import { universalLogout } from "@/api/auth";
import { usePage } from "@/context/PageContext";

export default function Sidebar() {
	const { page, setPage } = usePage();
	const router = useRouter();

	const handlePageChange = (newPage: string) => {
		setPage(newPage);
	};

	const handleLogout = async () => {
		try {
			await universalLogout();
			router.push("/");
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="bg-gray-800 text-white w-60 p-4 shadow-lg top-0 left-0 h-full">
			<VStack spacing="4" align="stretch">
				<Text fontSize="2xl" fontWeight="bold">
					Caspr
				</Text>
				<div className="flex flex-row gap-4 justify-center items-center	">
					<Button colorScheme="blue" onClick={handleLogout} size="sm">
						Logout
					</Button>
					<Link href="/upload-file">
						<Button
							className="border rounded-lg p-2"
							size="sm"
							rightIcon={<ArrowForwardIcon />}
						>
							Upload a File
						</Button>
					</Link>
				</div>
				<Link
					className={`hover:text-gray-400 ${page === "My Graphs" ? "text-gray-400" : ""}`}
					onClick={() => handlePageChange("My Graphs")}
				>
					My Graphs
				</Link>
				<Link
					className={`hover:text-gray-400 ${page === "Shared With Me" ? "text-gray-400" : ""}`}
					onClick={() => handlePageChange("Shared With Me")}
				>
					Shared With Me
				</Link>
				<Link
					className={`hover:text-gray-400 ${page === "Explore" ? "text-gray-400" : ""}`}
					onClick={() => handlePageChange("Explore")}
				>
					Explore
				</Link>
			</VStack>
		</div>
	);
}
