/**
 * Home
 */

import { useAuth } from '@/app/authContext';
import { Box, Heading, Text, Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { universalLogout } from '@/api/auth';

function Home() {
    const { firebaseUser, loading } = useAuth();
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await universalLogout();
            router.push('/');
        } catch (error) {
            console.error(error);
        }
    };

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
            <Button colorScheme="teal" onClick={handleLogout}>
                Logout
            </Button>
        </Box>
    );
}

export default Home;