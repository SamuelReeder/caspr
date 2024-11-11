
import { Box, Card, CardBody, CardHeader, Heading, Text } from '@chakra-ui/react';
import React from 'react';

interface GraphObjectProps {
    title: string;
    description: string;
    author: string;
}

const SearchedGraphObject = ({ title, description, author }: GraphObjectProps) => {
    return (
        <Card my='5'>
            <CardHeader className='flex justify-between'>
                <Heading size='md'>{title}</Heading>
                <Text>{author}</Text> 
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
            </CardBody>
        </Card>
    );
};

export default SearchedGraphObject;
