"use client"
import {Box, Button, Flex, Grid, GridItem, HStack, Text, VStack} from "@chakra-ui/react"
import NavigationBar from "./navigationBar/navigationBar"
import { FaPlus } from "react-icons/fa6";
import SearchBar from "./SearchBar";
import { useMediaQuery } from 'react-responsive';
import { mobileWidth } from "./constants";

interface ContentContainerProps {
    children: React.ReactNode
}

export default function ContentContainer({...props}: ContentContainerProps) {
    const isMobile = useMediaQuery({query: mobileWidth})

    const handleSearchCallback = (query: string) => {
        console.log(query)
    }

    if (!isMobile) {
        return (
            <Grid templateColumns={"repeat(5, 1fr)"}>
                <GridItem colSpan={1}>
                    <NavigationBar/>         
                </GridItem>
                <GridItem colSpan={4}>
                    <VStack
                        paddingLeft="5%"
                        paddingTop="2%"
                        paddingRight="5%"
                    >
                        <HStack width="100%">
                            <SearchBar onSearch={handleSearchCallback}/>
                            <Button>
                                <HStack>
                                <FaPlus fontSize="larger"/>
                                <Text>New Post</Text>
                                </HStack>
                            </Button>
                        </HStack>
                        {props.children}
                    </VStack>
                </GridItem>
            </Grid>
        )
    } else {
        return (
            <Flex direction="column" maxHeight="100vh">
                <SearchBar onSearch={handleSearchCallback}/>
                <Box 
                    paddingLeft={"6"}
                    paddingRight={"6"}
                    overflowY={"auto"}
                >
                    {props.children}    
                </Box>
                <NavigationBar/>
            </Flex>
        )
    }
        
}