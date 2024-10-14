import React from 'react';
import { Tabs, TabList, Tab, IconButton, Button, Flex, Avatar, Spacer } from '@chakra-ui/react';
import { AddIcon, CloseIcon, ArrowBackIcon, ExternalLinkIcon } from '@chakra-ui/icons';

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
}

const NavBar: React.FC<NavBarProps> = ({ diagrams, selectedTab, setSelectedTab, addDiagram, removeDiagram }) => {
  const goBack = () => {
    // Function to go back to the last page
  };

  const handleAvatarClick = () => {
    // Function to handle avatar click
  };

  const handleShareClick = () => {
    // Function to handle share button click

  };

  return (
    <Flex alignItems="center" mb={0} p={2} backgroundColor="gray.300" width="100%" minWidth="1800px">
      <IconButton
        aria-label="Go Back"
        icon={<ArrowBackIcon />}
        size="lg"
        ml={2}
        mr={2}
        onClick={goBack}
        p={2}
      />
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
      <Button
        leftIcon={<ExternalLinkIcon />}
        size="md"
        ml={2}
        onClick={handleShareClick}
        p={4}
        borderRadius="md"
        width="150px"
      >
        Share
      </Button>
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