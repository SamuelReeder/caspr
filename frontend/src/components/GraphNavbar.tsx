import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Tabs, TabList, Tab, IconButton, Button, Flex, Avatar, Spacer, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure, Input, Center } from '@chakra-ui/react';
import { AddIcon, CloseIcon, ArrowBackIcon, ExternalLinkIcon } from '@chakra-ui/icons';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import ShareButton from './ShareButton';
import { Timestamp } from 'firebase/firestore';
import { Graph, Preset, SharedUser } from '@/types/graph';

interface Diagram {
  id: number;
  data: {
    nodes: { id: string; label: string; value: number; category: string }[];
    edges: { source: string; target: string; relationship: string; strength: number }[];
  };
  label: string;
}

interface NavBarProps {
  diagrams: Diagram[];
  selectedTab: number;
  setSelectedTab: (index: number) => void;
  addDiagram: () => void;
  removeDiagram: (id: number) => void;
  graph: Graph;
}

const NavBar: React.FC<NavBarProps> = ({ diagrams, selectedTab, setSelectedTab, addDiagram, removeDiagram, graph }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [username, setUsername] = useState("");
  const router = useRouter();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUsername(user.displayName || "User");
      }
    });
    return () => unsubscribe();
  }, []);
  

  const goBack = () => {
    router.back();
  };

  const handleAvatarClick = () => {
    // Function to handle avatar click
  };

  return (
    <Flex alignItems="center" mb={0} p={2} backgroundColor="gray.300">
      <Link href="/home">
        <IconButton
          aria-label="Go Back"
          icon={<ArrowBackIcon />}
          size="lg"
          ml={2}
          mr={2}
          onClick={goBack}
          p={2}
        />
      </Link>
      <Tabs index={selectedTab} onChange={(index) => setSelectedTab(index)}>
        <TabList>
          {diagrams.map((diagram) => (
            <Tab key={diagram.id} p={2}>
              {diagram.label}
              <IconButton
                aria-label="Delete Diagram"
                icon={<CloseIcon />}
                size="xs"
                ml={2}
                onClick={(e) => {
                  e.stopPropagation();
                  removeDiagram(diagram.id);
                }}
                p={2}
              />
            </Tab>
          ))}
        </TabList>
      </Tabs>
      <IconButton
        aria-label="Add New Diagram"
        icon={<AddIcon />}
        size="xs"
        ml={2}
        onClick={(e) => {
          e.stopPropagation();
          addDiagram();
        }}
        p={2}
      />
      <Spacer />
      <ShareButton
						url={graph.graphFileURL}
						title={graph.graphName}
						graph={graph}
						onMakePublic={function (isPublic: boolean): Promise<void> {
							return Promise.resolve();
			} }/>
      <Avatar
        name={username ? username.slice(0, 2).toUpperCase() : ""}
        src="path_to_image.jpg"
        size="md"
        ml={2}
        onClick={handleAvatarClick}
        cursor="pointer"
        p={2}
      />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Shared with:</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Button width="100%" mb={2}>List Item</Button>
            <Button width="100%" mb={2}>List Item</Button>
            <Button width="100%" mb={2}>List Item</Button>
            <Center mt={4}>
              <Input placeholder="Search for people to add..." width="75%" />
            </Center>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="gray" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default NavBar;