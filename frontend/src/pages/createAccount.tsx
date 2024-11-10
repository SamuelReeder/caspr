/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */

/**
 * Create Account (Landing Page)
 */
import "tailwindcss/tailwind.css";

import {
	Box,
	Button,
	FormControl,
	FormLabel,
	Heading,
	Input,
	InputGroup,
	InputRightElement,
	Text,
	useToast
} from "@chakra-ui/react";
import { createAccountWithEmail, loginWithGoogle } from "@/api";

import { ArrowForwardIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import { useState } from "react";

export default function CreateAccount() {
	const toast = useToast();
	const router = useRouter();

	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [loading, setLoading] = useState(false);
	const [googleLoading, setGoogleLoading] = useState<boolean>(false);

	const handleSubmit = async () => {
		// If user mistyped the password
		if (password != confirmPassword) {
			toast({
				title: "Make sure that passwords are matching",
				status: "error",
				duration: 3000,
				isClosable: true
			});
			return;
		}

		// If passwords do match
		setLoading(true);

		try {
			const user = await createAccountWithEmail(email, password, username);

			toast({
				title: "Account created",
				description: `Welcome ${user.email}`,
				status: "success",
				duration: 5000,
				isClosable: true
			});
			router.push("/");
		} catch (error) {
			toast({
				title: "Error while creating account",
				description: `Error: ${error}`,
				status: "error",
				duration: 5000,
				isClosable: true
			});
		} finally {
			setLoading(false);
		}
	};

	const handleGoogleCreateAccount = async () => {
		try {
			setGoogleLoading(true);
			const user = await loginWithGoogle();

			toast({
				title: "Account created",
				description: `Welcome ${user.email}`,
				status: "success",
				duration: 5000,
				isClosable: true
			});

			router.push("/");
		} catch (error) {
			toast({
				title: "Error while creating account",
				description: `Error: ${error}`,
				status: "error",
				duration: 5000,
				isClosable: true
			});
		} finally {
			setGoogleLoading(false);
		}
	};

	return (
		<div className="bg-gray-800 h-screen">
			<div className="h-screen max-w-2xl mx-auto flex flex-col items-center justify-center">
				<div className="bg-white rounded-lg p-8 shadow-md w-[80%]">
					<Box className="text-center">
						<Heading className="text-center text-4xl">Welcome to Caspr</Heading>
						<Text className="pt-2">Create a new account</Text>

						<form>
							<FormControl>
								<FormLabel className="pt-7">Email</FormLabel>

								<Input
									className="w-full p-2 border rounded-lg"
									placeholder="Enter email"
									_placeholder={{ opacity: 1, color: "gray.600" }}
									type="username"
									onChange={(e) => setEmail(e.target.value)}
									value={email}
								/>

								<FormLabel className="pt-7">Username</FormLabel>

								<Input
									className="w-full p-2 border rounded-lg"
									placeholder="Enter username"
									_placeholder={{ opacity: 1, color: "gray.600" }}
									type="username"
									onChange={(e) => setUsername(e.target.value)}
									value={username}
								/>

								<FormLabel className="pt-7">Password</FormLabel>

								<InputGroup size="md">
									<Input
										className="w-full p-2 border rounded-lg"
										pr="4.5rem"
										type={showPassword ? "text" : "password"}
										placeholder="Enter password"
										_placeholder={{ opacity: 1, color: "gray.600" }}
										onChange={(e) => setPassword(e.target.value)}
										value={password}
									/>
									<InputRightElement width="4.5rem">
										<Button
											variant="ghost"
											h="1.75rem"
											size="sm"
											onClick={() => {
												setShowPassword(!showPassword);
											}}
										>
											{showPassword ? "Hide" : "Show"}
										</Button>
									</InputRightElement>
								</InputGroup>

								<FormLabel className="pt-7">Confirm Password</FormLabel>

								<InputGroup size="md">
									<Input
										className="w-full p-2 border rounded-lg"
										pr="4.5rem"
										type={showConfirmPassword ? "text" : "password"}
										placeholder="Enter password"
										_placeholder={{ opacity: 1, color: "gray.600" }}
										onChange={(e) => setConfirmPassword(e.target.value)}
										value={confirmPassword}
									/>
									<InputRightElement width="4.5rem">
										<Button
											variant="ghost"
											h="1.75rem"
											size="sm"
											onClick={() => {
												setShowConfirmPassword(!showConfirmPassword);
											}}
										>
											{showConfirmPassword ? "Hide" : "Show"}
										</Button>
									</InputRightElement>
								</InputGroup>

								<hr className="mt-4" />

								<div className="flex flex-col gap-3 justify-center mt-7">
									<Button
										rightIcon={<ArrowForwardIcon />}
										className="border rounded-lg p-2"
										type="submit"
										isLoading={loading}
										loadingText="Creating Account"
										onClick={handleSubmit}
									>
										Create Account
									</Button>

									<Button
										rightIcon={<ArrowForwardIcon />}
										className="border rounded-lg p-2"
										type="submit"
										onClick={() => {
											router.push("/");
										}}
									>
										Login Instead
									</Button>

									<Button
										colorScheme="blue"
										className="w-full"
										isLoading={googleLoading}
										onClick={handleGoogleCreateAccount}
									>
										Sign-up with Google
									</Button>
								</div>
							</FormControl>
						</form>
					</Box>
				</div>
			</div>
		</div>
	);
}
