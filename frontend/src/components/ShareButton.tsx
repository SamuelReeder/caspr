import React, { useState } from 'react';
import {
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Select,
  Switch,
  useDisclosure,
  useToast,
  InputGroup,
  InputRightElement,
  Tag,
  TagLabel,
  TagCloseButton,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import { Preset } from '@/types';
import { Timestamp } from 'firebase/firestore';
import { PresetDetails } from '@/components';


interface ShareButtonProps {
  url: string;
  title: string;
  presets?: Preset[];
  onMakePublic: (isPublic: boolean) => Promise<void>;
}

const ShareButton: React.FC<ShareButtonProps> = ({ url, title }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [email, setEmail] = useState('');
  const [emailList, setEmailList] = useState<string[]>([]);
  const [selectedPreset, setSelectedPreset] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [publicLink, setPublicLink] = useState('');
  const toast = useToast();


  // dummy
  const presets: Preset[] = [
    {
      name: 'Preset 1',
      updated: Timestamp.fromDate(new Date()),
      filters: ['filter1', 'filter2'],
      pathways: ['pathway1', 'pathway2'],
      view: null,
    },
    {
      name: 'Preset 2',
      updated: Timestamp.fromDate(new Date()),
      filters: ['filter3', 'filter4'],
      pathways: ['pathway3', 'pathway4'],
      view: null,
    },
    {
      name: 'Preset 3',
      updated: Timestamp.fromDate(new Date()),
      filters: null,
      pathways: null,
      view: null,
    },
  ];


  const handleShare = () => {
    if (emailList.length === 0) {
      toast({
        title: 'No recipients',
        description: 'Please add at least one email address',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    toast({
      title: 'Email sent.',
      description: `Email has been sent to ${emailList.length} recipient(s)`,
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
    onClose();
  };

  const handleMakePublic = async () => {
    try {
      // await onMakePublic(true);
      setIsPublic(!isPublic);
      // setPublicLink(`${window.location.origin}/graph/${url}${selectedPreset ? `?preset=${selectedPreset}` : ''}`);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to make the graph public',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(publicLink);
    toast({
      title: 'Link copied',
      status: 'success',
      duration: 2000,
    });
  };

  const handleEmailKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && email) {
      e.preventDefault();
      if (!email.includes('@')) {
        toast({
          title: 'Invalid email',
          description: 'Please enter a valid email address',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
        return;
      }
      if (!emailList.includes(email)) {
        setEmailList([...emailList, email]);
        setEmail('');
      }
    }
  };

  const removeEmail = (emailToRemove: string) => {
    setEmailList(emailList.filter(e => e !== emailToRemove));
  };

  return (
    <Box className='flex items-end justify-center'>
      <Button onClick={onOpen}>Share</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Share Graph</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={4}>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={handleEmailKeyDown}
                placeholder="Enter email address and press Enter"
              />
              <Wrap spacing={2} mt={2}>
                {emailList.map((email) => (
                  <WrapItem key={email}>
                    <Tag size="md" borderRadius="full" variant="solid" colorScheme="blue">
                      <TagLabel>{email}</TagLabel>
                      <TagCloseButton onClick={() => removeEmail(email)} />
                    </Tag>
                  </WrapItem>
                ))}
              </Wrap>
            </FormControl>

            {presets && presets.length > 0 && (
              <FormControl mb={4}>
                <FormLabel>Select Preset</FormLabel>
                <Select
                  value={selectedPreset}
                  onChange={(e) => setSelectedPreset(e.target.value)}
                  placeholder="Select a preset"
                >
                  {presets.map((preset) => (
                    <option key={preset.name} value={preset.name}>
                      {preset.name} ({preset.filters?.length || 0} filters, {preset.pathways?.length || 0} pathways)
                    </option>
                  ))}
                </Select>

                {selectedPreset && (
                  <PresetDetails
                    preset={presets.find(p => p.name === selectedPreset)!}
                  />
                )}
              </FormControl>
            )}

            <FormControl display="flex" alignItems="center" mb={4}>
              <FormLabel mb="0">Make graph public</FormLabel>
              <Switch
                isChecked={isPublic}
                onChange={() => handleMakePublic()}
              />
            </FormControl>

            {isPublic && (
              <FormControl>
                <FormLabel>Public Link</FormLabel>
                <InputGroup>
                  <Input value={publicLink} isReadOnly />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={copyToClipboard}>
                      Copy
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleShare}>
              Send
            </Button>
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ShareButton;