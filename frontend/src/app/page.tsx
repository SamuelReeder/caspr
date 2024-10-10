import { ChakraProvider } from '@chakra-ui/react'

export default function Home() {
  return (
    <ChakraProvider>
      <div>
        <h1>Hello world!</h1>
      </div>
    </ChakraProvider>
  );
}
