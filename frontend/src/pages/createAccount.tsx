"use client";

import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  InputGroup,
  InputRightElement,
  Link,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { createAccountWithEmail } from "@/api";
/**
 * Create account page
 */
export default function CreateAccount() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const toast = useToast();

  const handlePasswordVisibility = () => setShowPassword(!showPassword);

  // const handleSignUp = async () => {
  //   // If user mistyped the password
  //   if (password != confirmPassword) {
  //     toast({
  //       title: "Make sure that passwords are matching",
  //       status: "error",
  //       duration: 3000,
  //       isClosable: true,
  //     });
  //     return;
  //   }

  //   // If passwords do match
  //   setLoading(true);

  //   try {
  //     const user = await createAccountWithEmail(email, password);

  //     toast({
  //       title: "Account created",
  //       description: `Welcome ${user.email}`,
  //       status: "success",
  //       duration: 5000,
  //       isClosable: true,
  //     });
  //   } catch (error) {
  //     toast({
  //       title: "Error while creating account",
  //       description: `Error: ${error}`,
  //       status: "error",
  //       duration: 5000,
  //       isClosable: true,
  //     });
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"} bg={"purple.700"}>
      <Box rounded={"lg"} boxShadow={"lg"} bg={"white"} p={8} width={"400px"}>
        <Stack spacing={4}>
          <Heading fontSize={"2xl"} textAlign={"center"}>
            Create a new account
          </Heading>

          <FormControl id="username">
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </FormControl>

          <FormControl id="email">
            <FormLabel>Email address</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>

          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <InputRightElement width="4.5rem">
                <Button
                  h="1.75rem"
                  size="sm"
                  onClick={handlePasswordVisibility}
                >
                  {showPassword ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>

          <FormControl id="confirm-password">
            <FormLabel>Confirm Password</FormLabel>
            <InputGroup>
              <Input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <InputRightElement width="4.5rem">
                <Button
                  h="1.75rem"
                  size="sm"
                  onClick={handlePasswordVisibility}
                >
                  {showPassword ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>

          <Stack spacing={10}>
            <Checkbox>Remember me</Checkbox>
            <Button
              bg={"purple.700"}
              color={"white"}
              _hover={{
                bg: "purple.600",
              }}
              isLoading={loading}
              loadingText="Creating Account"
              // onClick={handleSignUp}
            >
              Sign Up
            </Button>
          </Stack>

          <Stack pt={6}>
            <Text align={"center"}>
              Already have an account? <Link color={"purple.500"}>Log In</Link>
            </Text>
          </Stack>
        </Stack>
      </Box>
    </Flex>
  );
}
