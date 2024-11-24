/**
 * Sidebar component
 * @returns {ReactElement} Sidebar component
 */
import { Button, Link, Text } from "@chakra-ui/react";

import { ArrowForwardIcon } from "@chakra-ui/icons";
import { universalLogout } from "@/api";
import { useRouter } from "next/router";
import { useAuth } from "@/context";

export default function Sidebar() {
	const { firebaseUser } = useAuth()
	const router = useRouter();
	const currentRoute = location.pathname;

	const handleLogout = async () => {
		try {
			await universalLogout();
			router.push("/login");
		} catch (error) {
			console.error(error);
		}
	};

	const handleLogin = () => {
		router.push("/login")
	}

	return (
		<div className="bg-gray-800 text-white w-60 p-7 shadow-lg top-0 left-0 h-full">
			<div className="flex flex-col gap-4 w-full h-full">
				<Text fontSize="3xl" fontWeight="bold">
					Caspr
				</Text>

				{firebaseUser && (
					<>
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
							onClick={() => router.push("/")}
						>
							<Text
								className={`${currentRoute === "/" ? "text-gray-400" : ""}`}
							>
								My Graphs
							</Text>
						</Link>

						<Link
							className={`hover:text-gray-400`}
							onClick={() => router.push("/sharedWithMe")}
						>
							<Text
								className={`${currentRoute === "/sharedWithMe" ? "text-gray-400" : ""}`}
							>
								Shared With Me
							</Text>
						</Link>
					</>
				)}
				<Link
					className={`hover:text-gray-400`}
					onClick={() => router.push("/explore")}
				>
					<Text
						className={`${currentRoute === "/explore" ? "text-gray-400" : ""}`}
					>
						Explore
					</Text>
				</Link>

				<div className="flex flex-col gap-2 mt-auto">
					{firebaseUser && (
						<>
							<Button
								colorScheme="blue"
								onClick={handleLogout}
								size="md"
								className="w-full"
							>
								Logout
							</Button>

							<Link href="/forgot-password">
								<Button size="md" className="w-full">
									Reset Password
								</Button>
							</Link>
						</>)}
					{!firebaseUser && (
						<>
							<Button
								colorScheme="blue"
								onClick={handleLogin}
								size="md"
								className="w-full"
							>
								Login
							</Button>
						</>
					)}
				</div>
			</div>
		</div>
	);
}
