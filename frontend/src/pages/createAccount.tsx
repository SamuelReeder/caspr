/**
 * Create Account (Landing Page)
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
    Text
} from "@chakra-ui/react"

import { ArrowForwardIcon } from '@chakra-ui/icons'
import Link from 'next/link';
import { useState } from "react"

export default function CreateAccount() {
	const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [showPassword, setShowPassword] = useState(false)
	const [showConfirmPassword, setShowConfirmPassword] = useState(false)
	const handleSubmit = () => {}

	return (
	<div className="bg-primary-200 h-screen">
		<div className="h-screen max-w-2xl mx-auto flex flex-col items-center justify-center">
			<div className="bg-white rounded-lg p-8 shadow-md w-[80%]">
				<Box className="text-center">
					<Heading className="text-center text-4xl">Welcome to Caspr</Heading>
					<Text className="pt-2">Create a new account</Text>

					<form onSubmit={handleSubmit}>
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
								type={showPassword ? 'text' : 'password'}
								placeholder='Enter password'
								_placeholder={{ opacity: 1, color: 'gray.600' }}
								onChange={(e) => setPassword(e.target.value)}
								value={password}
							/>
							<InputRightElement width='4.5rem'>
								<Button variant='ghost' h='1.75rem' size='sm' onClick={() => {setShowPassword(!showPassword)}}>
								{showPassword ? 'Hide' : 'Show'}
								</Button>
							</InputRightElement>
						</InputGroup>

						<FormLabel className="pt-7">Confirm Password</FormLabel>
						
						<InputGroup size='md'>
							<Input
								className="w-full p-2 border rounded-lg"
								pr='4.5rem'
								type={showConfirmPassword ? 'text' : 'password'}
								placeholder='Enter password'
								_placeholder={{ opacity: 1, color: 'gray.600' }}
								onChange={(e) => setConfirmPassword(e.target.value)}
								value={confirmPassword}
							/>
							<InputRightElement width='4.5rem'>
								<Button variant='ghost' h='1.75rem' size='sm' onClick={() => {setShowConfirmPassword(!showConfirmPassword)}}>
								{showConfirmPassword ? 'Hide' : 'Show'}
								</Button>
							</InputRightElement>
						</InputGroup>

						<div className="flex gap-7 justify-center mt-7">
							{/* TODO - disable button while it is loading */}
							<Link href="/">
								<Button rightIcon={<ArrowForwardIcon />} className="border rounded-lg p-2" type="submit">
									Login Instead
								</Button>
							</Link>
							
							{/* TODO - disable button while it is loading */}
							<Button rightIcon={<ArrowForwardIcon />} className="border rounded-lg p-2" type="submit">
								Create Account
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