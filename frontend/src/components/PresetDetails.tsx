import { Preset } from "@/types";
import { Box, Text, Wrap, WrapItem, Tag } from "@chakra-ui/react";

export const PresetDetails: React.FC<{ preset: Preset }> = ({ preset }) => (
	<Box mt={2} p={3} bg="gray.50" borderRadius="md">
	  <Text fontSize="sm" color="gray.600" mb={2}>
		Last updated: {preset.updated.toDate().toLocaleDateString()}
	  </Text>
	  
	  {preset.filters && (
		<Box mb={2}>
		  <Text fontSize="sm" fontWeight="medium">Filters:</Text>
		  <Wrap>,
			{preset.filters.map(filter => (
			  <WrapItem key={filter}>
				<Tag size="sm" colorScheme="purple">{filter}</Tag>
			  </WrapItem>
			))}
		  </Wrap>
		</Box>
	  )}
	  
	  {preset.pathways && (
		<Box>
		  <Text fontSize="sm" fontWeight="medium">Pathways:</Text>
		  <Wrap>
			{preset.pathways.map(pathway => (
			  <WrapItem key={pathway}>
				<Tag size="sm" colorScheme="green">{pathway}</Tag>
			  </WrapItem>
			))}
		  </Wrap>
		</Box>
	  )}
	</Box>
  );