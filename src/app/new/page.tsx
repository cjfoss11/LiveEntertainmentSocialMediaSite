"use client"
import { ChakraProvider, Text } from "@chakra-ui/react";
import ContentContainer from "../contentContainer";

export default function New() {

    return (
        <ChakraProvider>
            <ContentContainer>
                <Text minHeight="100vh">New Post</Text>
            </ContentContainer>
        </ChakraProvider>
    );
}