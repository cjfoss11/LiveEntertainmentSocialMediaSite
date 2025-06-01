"use client"
import { ChakraProvider, Text } from "@chakra-ui/react";
import ContentContainer from "../contentContainer";

export default function Profile() {

    return (
        <ChakraProvider>
            <ContentContainer>
                <Text minHeight="100vh">Profile</Text>
            </ContentContainer>
        </ChakraProvider>
    );
}