import { useState } from "react";
import { Button, Link, Text } from "@chakra-ui/react";
import { ArrowForwardIcon, ChevronLeftIcon, ChevronRightIcon, HamburgerIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import { universalLogout } from "@/api";

export default function Sidebar() {
	const router = useRouter();
	const currentRoute = location.pathname;
	const [isCollapsed, setIsCollapsed] = useState(false);

	const handleLogout = async () => {
		try {
			await universalLogout();
			router.push("/login");
		} catch (error) {
			console.error(error);
		}
	};

	const toggleCollapse = () => {
		setIsCollapsed(!isCollapsed);
	};

	return (
		<div className={`bg-gray-800 text-white ${isCollapsed ? "w-20" : "w-60"} p-7 shadow-lg top-0 left-0 h-full transition-width duration-300`}>
			<div className="flex flex-col gap-4 w-full h-full">
				<div className="flex flex-row items-center justify-between h-12">
					{!isCollapsed && (
						<Text fontSize="3xl" fontWeight="bold">
							Caspr
						</Text>
					)}
					<Button
						onClick={toggleCollapse}
						variant="ghost"
						size="xl"
						colorScheme="white"
						className={`p-3 ${isCollapsed ? "justify-center w-full" : ""} hover:bg-gray-500 hover:bg-opacity-50`}
					>
						{isCollapsed ? <ChevronRightIcon boxSize={5}/> : <HamburgerIcon boxSize={5}/>}
					</Button>
				</div>
				{!isCollapsed && (
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
							onClick={() => router.push("/home")}
						>
							<Text className={`${currentRoute === "/home" ? "text-gray-400" : ""}`}>
								My Graphs
							</Text>
						</Link>

						<Link
							className={`hover:text-gray-400`}
							onClick={() => router.push("/sharedWithMe")}
						>
							<Text className={`${currentRoute === "/sharedWithMe" ? "text-gray-400" : ""}`}>
								Shared With Me
							</Text>
						</Link>
						<Link
							className={`hover:text-gray-400`}
							onClick={() => router.push("/explore")}
						>
							<Text className={`${currentRoute === "/explore" ? "text-gray-400" : ""}`}>
								Explore
							</Text>
						</Link>

						<div className="flex flex-col gap-2 mt-auto">
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
						</div>
					</>
				)}
			</div>
		</div>
	);
}