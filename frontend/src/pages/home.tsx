/**
 * Home
 */

import { Box, Button, Heading, Link, Text } from "@chakra-ui/react";

import { ArrowForwardIcon } from "@chakra-ui/icons";
import { universalLogout } from "@/api/auth";
import { useAuth } from "@/app/authContext";
import { useRouter } from "next/router";

function Home() {
	const { firebaseUser, loading } = useAuth();
	const router = useRouter();

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
		<div className="p-8 flex flex-row">
			<div className="flex flex-col gap-2">
				<Heading>Welcome, {firebaseUser?.displayName || "User"}</Heading>
				<Text>Email: {firebaseUser.email}</Text>
			</div>

			<div className="flex flex-row gap-4 justify-center mt-7 ml-auto">
				<Link href="/upload-file">
					<Button
						className="border rounded-lg p-2"
						rightIcon={<ArrowForwardIcon />}
					>
						Upload a File
					</Button>
				</Link>
				<Button colorScheme="blue" onClick={handleLogout}>
					Logout
				</Button>
			</div>
		</div>
	);
}

export default Home;
