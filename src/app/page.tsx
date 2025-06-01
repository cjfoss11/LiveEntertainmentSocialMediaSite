import {ChakraProvider, VStack, Text, HStack, Skeleton} from "@chakra-ui/react"
import styles from "./pages/pages.module.css"
//import HomePage from "./pages/HomePage"
import ContentContainer from "./contentContainer";

export default function Home() {
  return (
    <ChakraProvider>
      <ContentContainer>
          <VStack width="100%" minHeight={"100vh"}>
            <VStack width="100%">
                <Text className={styles.sectionTitle}>
                    Featured Stories
                </Text>
                <HStack 
                    overflowX="scroll"
                    width="100%"
                    scrollBehavior="smooth"
                >
                    {Array.from({ length: 6}, (_, index) => (
                        <div key={index}>
                            <Skeleton
                                width="160px"
                                height="280px"
                                marginRight="18px"
                            >
                            </Skeleton>
                        </div>
                    ))}
                </HStack>
            </VStack>

            <VStack width="100%">
                <Text className={styles.sectionTitle}>
                    Latest Feed
                </Text>
            </VStack>
        </VStack>
      </ContentContainer>
    </ChakraProvider>

  );
}
