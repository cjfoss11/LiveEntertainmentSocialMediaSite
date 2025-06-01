import {Text, VStack, ChakraProvider } from "@chakra-ui/react"
import ContentContainer from "../contentContainer";

export default function Explore() {

    return (
        <ChakraProvider>
            <ContentContainer>
                <VStack width="100%" minHeight={"100vh"}>
                    <Text>Explore</Text>
                </VStack>
            </ContentContainer>
        </ChakraProvider>
    );
}