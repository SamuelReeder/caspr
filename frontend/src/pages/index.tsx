/**
 * Index (Landing Page)
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
import { FormEvent, useEffect, useState } from "react";
import { handleGoogleRedirect, loginWithEmail, loginWithGoogle } from "@/api";

import { ArrowForwardIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { useAuth } from "@/app/authContext";
import { useRouter } from "next/router";	

export default function Index() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [show, setShow] = useState(false);
	const [loading, setLoading] = useState<boolean>(false);
	const toast = useToast();
	const router = useRouter();
	const { firebaseUser } = useAuth();

	const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);
		try {
			await loginWithEmail(email, password);
			toast({
				title: "Login successful",
				status: "success",
				duration: 3000,
				isClosable: true
			});
			router.push("/home");
		} catch (error: any) {
			toast({
				title: "Login failed",
				description: error.message,
				status: "error",
				duration: 3000,
				isClosable: true
			});
		} finally {
			setLoading(false);
		}
	};

	const handleGoogleLogin = async () => {
        setLoading(true);
        try {
            await loginWithGoogle();
        } catch (error: any) {
            toast({
                title: "Google login failed",
                description: error.message,
                status: "error",
                duration: 3000,
                isClosable: true
            });
            setLoading(false);
        }
	};
	
	useEffect(() => {
        const handleRedirect = async () => {
            setLoading(true);
            try {
                await handleGoogleRedirect();
                router.push("/home");
            } catch (error: any) {
				console.error(error);
            } finally {
                setLoading(false);
            }
        };

        handleRedirect();
    }, [loginWithGoogle]);

	if (firebaseUser) {
		router.push("/home");
		return null;
	}

	return (
		<div className="bg-primary-200 h-screen">
			<div className="h-screen max-w-2xl mx-auto flex flex-col items-center justify-center">
				<div className="bg-white rounded-lg p-8 shadow-md w-[80%]">
					<Box className="text-center">
						<Heading className="text-center text-4xl">Welcome to Caspr</Heading>
						<Text className="pt-2">Log in to your account</Text>

						<form onSubmit={handleLogin}>
							<FormControl>
								<FormLabel className="pt-7">Email</FormLabel>

								<Input
									className="w-full p-2 border rounded-lg"
									placeholder="Enter email"
									_placeholder={{ opacity: 1, color: "gray.600" }}
									type="email"
									onChange={(e) => setEmail(e.target.value)}
									value={email}
								/>

								<FormLabel className="pt-7">Password</FormLabel>

								<InputGroup size="md">
									<Input
										className="w-full p-2 border rounded-lg"
										pr="4.5rem"
										type={show ? "text" : "password"}
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
												setShow(!show);
											}}
										>
											{show ? "Hide" : "Show"}
										</Button>
									</InputRightElement>
								</InputGroup>

								<div className="flex justify-end mt-2">
									<Link href="/forgotPassword">
										<Text
											color="blue.500"
											_hover={{ textDecoration: "underline" }}
										>
											Forgot password?
										</Text>
									</Link>
								</div>

								<div className="flex gap-7 justify-center mt-7">
									{/* TODO - disable button while it is loading */}
									<Link href="/createAccount">
										<Button
											rightIcon={<ArrowForwardIcon />}
											className="border rounded-lg p-2"
										>
											Sign Up Instead
										</Button>
									</Link>

									{/* TODO - disable button while it is loading */}
									<Button
										rightIcon={<ArrowForwardIcon />}
										className="border rounded-lg p-2"
										type="submit"
										isLoading={loading}
										loadingText="Logging In"
									>
										Log In
									</Button>
								</div>
								<div className="flex flex-col gap-4 justify-center mt-7">
									<Button
										colorScheme="blue"
										className="w-full"
										isLoading={loading}
										type="button"
										onClick={handleGoogleLogin}
									>
										Sign in with Google
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
