/**
 * Sidebar component
 * @returns {ReactElement} Sidebar component
 */
import { Box, Button, Link, Text, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";

import { ArrowForwardIcon } from "@chakra-ui/icons";
import { universalLogout } from "@/api/auth";

export default function Sidebar() {
	const router = useRouter();
	const currentRoute = location.pathname;

	const handleLogout = async () => {
		try {
			await universalLogout();
			router.push("/");
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="bg-gray-800 text-white w-60 p-7 shadow-lg top-0 left-0 h-full">
			<div className="flex flex-col gap-4 w-full h-full">
				<Text fontSize="3xl" fontWeight="bold">
					Caspr
				</Text>

				<Link href="/upload-file">
					<Button
						colorScheme="gray"
						size="md"
						className="w-full"
						rightIcon={<ArrowForwardIcon />}
					>
						Upload a File
					</Button>
				</Link>

				<Link
					className={`hover:text-gray-400`}
					onClick={() => router.push("/home")}
				>
					<Text className={`${currentRoute === "/home" ? "text-gray-400" : ""}`}>My Graphs</Text>
				</Link>

				<Link
					className={`hover:text-gray-400`}
					onClick={() => router.push("/sharedWithMe")}
				>
					<Text className={`${currentRoute === "/sharedWithMe" ? "text-gray-400" : ""}`}>Shared With Me</Text>
				</Link>
				<Link
					className={`hover:text-gray-400`}
					onClick={() => router.push("/explore")}
				>
					<Text className={`${currentRoute === "/explore" ? "text-gray-400" : ""}`}>Explore</Text>
				</Link>

				<Button
					colorScheme="blue"
					onClick={handleLogout}
					size="md"
					className="w-full mt-auto"
				>
					Logout
				</Button>
			</div>
		</div>
	);
}
