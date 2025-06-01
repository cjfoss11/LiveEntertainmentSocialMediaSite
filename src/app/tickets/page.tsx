"use client"
import { ChakraProvider, Text } from "@chakra-ui/react";
import ContentContainer from "../contentContainer";

export default function Tickets() {

    return (
        <ChakraProvider>
            <ContentContainer>
                <Text minHeight="100vh">Tickets</Text>
            </ContentContainer>
        </ChakraProvider>
    );
}