import { Box, VStack, Text, Link } from '@chakra-ui/react';
import { usePage } from '@/context/PageContext';
import { useRouter } from 'next/router';

export default function Sidebar() {
  const { page, setPage } = usePage();

  const handlePageChange = (newPage: string) => {
    setPage(newPage);
  };

  return (
    <Box
      as="nav"
      bg="gray.800"
      color="white"
      w="18rem"
      p="4"
      className="shadow-lg"
      height="100vh"
      position="fixed"
      top="0"
      left="0"
    >
      <VStack spacing="4" align="stretch">
        <Text fontSize="2xl" fontWeight="bold">
          Caspr
        </Text>
        <Link
          className={`hover:text-gray-400 ${page === 'My Graphs' ? 'text-gray-400' : ''}`}
          onClick={() => handlePageChange('My Graphs')}
        >
          My Graphs
        </Link>
        <Link
          className={`hover:text-gray-400 ${page === 'Shared With Me' ? 'text-gray-400' : ''}`}
          onClick={() => handlePageChange('Shared With Me')}
        >
          Shared With Me
        </Link>
        <Link
          className={`hover:text-gray-400 ${page === 'Explore' ? 'text-gray-400' : ''}`}
          onClick={() => handlePageChange('Explore')}
        >
          Explore
        </Link>
      </VStack>
    </Box>
  );
}