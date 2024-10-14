
import { Box, Card, CardBody, CardHeader, Heading, Stack, StackDivider, Text } from '@chakra-ui/react';
import React from 'react';

interface GraphObjectProps {
    title: string;
    description: string;
    // Add more props here
}

const GraphObject = ({ title, description }: GraphObjectProps) => {
    return (
        <Card my='5'>
            <CardHeader>
                <Heading size='md'>{title}</Heading>
            </CardHeader>

            <CardBody>
                <Box>
                    <Heading size='xs' textTransform='uppercase'>
                        Description:
                    </Heading>
                    <Text pt='2' fontSize='sm'>
                        {description}
                    </Text>
                </Box>
            </CardBody>
        </Card>
    );
};

export default GraphObject;


// <div key={index} className="bg-gray-100 p-4 rounded-lg my-4">
//   <div className="w-full h-64 bg-gray-300 mb-4"></div>
//   <span className="text-sm font-semibold">{result.title}</span>
// </div>