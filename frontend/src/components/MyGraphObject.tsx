
import { Box, Card, CardBody, CardHeader, Heading, Text } from '@chakra-ui/react';
import React from 'react';
import ShareButton from './ShareButton';

interface GraphObjectProps {
    title: string;
    description: string;
    owner: string;
    // Add more props here
}

const MyGraphObject = ({ title, description, owner }: GraphObjectProps) => {
    return (
        <Card my='5'>
            <CardHeader className='flex justify-between'>
                <Heading size='md'>{title}</Heading>
                <Text>{owner}</Text> 
            </CardHeader>

            <CardBody className='flex justify-between'>
                <Box>
                    <Heading size='xs' textTransform='uppercase'>
                        Description:
                    </Heading>
                    <Text pt='1' pr='1' fontSize='sm'>
                        {description}
                    </Text>
                </Box>
                <ShareButton url={''} title={title}></ShareButton>
            </CardBody>
        </Card>
    );
};

export default MyGraphObject;


// <div key={index} className="bg-gray-100 p-4 rounded-lg my-4">
//   <div className="w-full h-64 bg-gray-300 mb-4"></div>
//   <span className="text-sm font-semibold">{result.title}</span>
// </div>