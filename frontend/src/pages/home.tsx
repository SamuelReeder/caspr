/**
 * Home
 */

import { useAuth } from '@/app/authContext';
import { Box, Heading, Text } from '@chakra-ui/react';


export default function Home() {
	const { firebaseUser, firestoreUser, loading } = useAuth();

	if (loading) {
		return <div>Loading...</div>;
	}

	if (!firebaseUser) {
		return <div>Please log in</div>;
	}

	return (
		<Box className="p-8">
			<Heading>Welcome, {firebaseUser?.displayName || 'User'}</Heading>
			<Text>Email: {firebaseUser.email}</Text>
		</Box>
	);
}
