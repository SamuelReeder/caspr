import React from 'react';
import Link from 'next/link';
import ShareButton from "./ShareButton";
import { Tabs, TabList, Tab, IconButton, Button, Flex, Avatar, Spacer, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure, Input, Center } from '@chakra-ui/react';
import { AddIcon, CloseIcon, ArrowBackIcon, ExternalLinkIcon } from '@chakra-ui/icons';
import { Graph } from "@/types/graph"; 
interface Diagram {
  id: number;
  data: {
    nodes: { id: string; label: string; value: number; category: string }[];
    edges: { source: string; target: string; relationship: string; strength: number }[];
  };
  label: string;
}

interface NavBarProps {
  graph: Graph | null; 
  diagrams: Diagram[];
  selectedTab: number;
  setSelectedTab: (index: number) => void;
  addDiagram: () => void;
  removeDiagram: (id: number) => void;
}

const NavBar: React.FC<NavBarProps> = ({ graph, diagrams, selectedTab, setSelectedTab, addDiagram, removeDiagram}) => {
  const goBack = () => {
    // Function to go back to the last page
  };

  const handleAvatarClick = () => {
    // Function to handle avatar click
  };

  return (
    <Flex alignItems="center" mb={0} p={2} backgroundColor="gray.300" width="100%" minWidth="1800px">
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
      {graph && (
        <ShareButton
          url={graph.graphFileURL}
          title={graph.graphName}
          graph={graph}
          onMakePublic={function (isPublic: boolean): Promise<void> {
            return Promise.resolve();
          }}
        />
      )}
      <Avatar
        name="Hello World"
        src="path_to_image.jpg"
        size="md"
        ml={2}
        onClick={handleAvatarClick}
        cursor="pointer"
        p={2}
      />
    </Flex>
  );
};

export default NavBar;