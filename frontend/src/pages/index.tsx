/**
 * Index (Landing Page)
 */
import 'tailwindcss/tailwind.css'

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
    useToast,
} from "@chakra-ui/react"
import { FormEvent, useState } from "react"
import { loginWithEmail, loginWithGoogle } from '@/api';

import { ArrowForwardIcon, } from '@chakra-ui/icons'
import Link from 'next/link';
import { useAuth } from '@/app/authContext';
import { useRouter } from 'next/router';

export default function Index() {
	const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
	const [show, setShow] = useState(false)
	const [loading, setLoading] = useState<boolean>(false);
	const toast = useToast();
	const router = useRouter();
	const { firebaseUser } = useAuth();

	const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);
		try {
			await loginWithEmail(username, password);
			toast({
				title: 'login successful',
				status: 'success',
				duration: 3000,
				isClosable: true,
			});
			router.push('/home');
		} catch (error: any) {
			toast({
				title: 'login failed',
				description: error.message,
				status: 'error',
				duration: 3000,
				isClosable: true,
			});
		} finally {
			setLoading(false);
		}
	};

	const handleGoogleLogin = async (e: FormEvent<HTMLFormElement>) => {
		setLoading(true);
		try {
			await loginWithGoogle();
			toast({
				title: 'login with Google successful.',
				status: 'success',
				duration: 3000,
				isClosable: true,
			});
		} catch (error: any) {
			toast({
				title: 'Google login failed.',
				description: error.message,
				status: 'error',
				duration: 3000,
				isClosable: true,
			});
		} finally {
			setLoading(false);
		}
	};

	if (firebaseUser) {
        router.push('/home');
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
						<FormLabel className="pt-7">Username</FormLabel>
						
						<Input
							className="w-full p-2 border rounded-lg"
							placeholder='Enter username'
							_placeholder={{ opacity: 1, color: 'gray.600' }}
							type='username'
							onChange={(e) => setUsername(e.target.value)}
							value={username}
						/>

						<FormLabel className="pt-7">Password</FormLabel>
						
						<InputGroup size='md'>
							<Input
								className="w-full p-2 border rounded-lg"
								pr='4.5rem'
								type={show ? 'text' : 'password'}
								placeholder='Enter password'
								_placeholder={{ opacity: 1, color: 'gray.600' }}
								onChange={(e) => setPassword(e.target.value)}
								value={password}
							/>
							<InputRightElement width='4.5rem'>
								<Button variant="ghost" h='1.75rem' size='sm' onClick={() => {setShow(!show)}}>
									{show ? 'Hide' : 'Show'}
								</Button>
							</InputRightElement>
						</InputGroup>

						<div className="flex gap-7 justify-center mt-7">
							{/* TODO - disable button while it is loading */}
                            <Link href="/create-account">
                                <Button rightIcon={<ArrowForwardIcon />} className="border rounded-lg p-2" type="button"> 
                                    Sign Up Instead
                                </Button>
                            </Link>

							{/* TODO - disable button while it is loading */}
							<Button rightIcon={<ArrowForwardIcon />} className="border rounded-lg p-2" type="submit">
								Log In
							</Button>
						</div>
								
						{/* <div className="flex justify-center mt-4">
							<Button
								className="w-full border rounded-lg p-2"
								colorScheme="red"
								onClick={handleGoogleLogin}>
								Sign up with Google
							</Button>
						</div> */}
					</FormControl>
					</form>
				</Box>
			</div>
		</div>
	</div>
	);
  }