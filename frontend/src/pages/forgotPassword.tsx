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
	Text
} from "@chakra-ui/react";

import Link from "next/link";
import { useState } from "react";

export default function ForgotPassword() {
	const [email, setEmail] = useState("");
	const [loading, setLoading] = useState(false);

	// Handles resetting of password
	const handlePasswordReset = async () => {};

	return (
		<div className="bg-primary-200 h-screen">
			<div className="h-screen max-w-2xl mx-auto flex flex-col items-center justify-center">
				<div className="bg-white rounded-lg p-8 shadow-md w-[80%]">
					<Box className="text-center">
						<Heading className="text-center text-4xl">Forgot Password</Heading>
						<Text className="pt-2">
							Enter your email and we will send you a password reset link.
						</Text>

						<form>
							<FormControl>
								<FormLabel className="pt-7">Email</FormLabel>
								<Input
									className="w-full p-2 border rounded-lg"
									placeholder="Enter your email"
									_placeholder={{ opacity: 1, color: "gray.600" }}
									type="email"
									onChange={(e) => setEmail(e.target.value)}
									value={email}
								/>

								{/* Buttons Section */}
								<div className="flex flex-col gap-4 justify-center mt-7">
									<Button
										colorScheme="blue"
										className="w-full"
										onClick={handlePasswordReset}
										isLoading={loading}
										loadingText="Sending..."
									>
										Send Reset Link
									</Button>

									{/* Back to Login */}
									<div className="flex gap-7 justify-center">
										<Link href="/">
											<Button className="border rounded-lg p-2">
												Back to Login
											</Button>
										</Link>
									</div>
								</div>
							</FormControl>
						</form>
					</Box>
				</div>
			</div>
		</div>
	);
}
