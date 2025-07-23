"use client"
import { Box, Grid, GridItem, Skeleton, Image, Text, VStack} from "@chakra-ui/react";
import { useEffect, useState} from "react";
import ContentContainer from "../contentContainer";
import styles from "../pages/pages.module.css"
import profileStyles from "./profile.module.css"
import { useRefreshUserPosts } from '../hooks/useRefreshUserPosts';
import PostDeletionConfirmationDialog from "./postDeletionConfirmationDialog";

export interface UserPost {
    post_id: number,
    userID: number,
    description: string,
    imageName: string, 
    createdAt: Date
}

export default function Profile() {
    const [posts, setPosts] = useState<UserPost[]>([])
    const [hasFetchedPosts, setHasFetchedPosts] = useState(false)
    const {refreshPosts} = useRefreshUserPosts();
    
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`http://localhost:8080/userPosts`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json, charset=UTF-8',
                    'Accept': 'application/json, text/html',
                },
                credentials: 'include'
            });
            const result = await response.json();
            setPosts(result.images)
            
            if (!hasFetchedPosts) {
                setHasFetchedPosts(true)
            }   
            console.log('Response from server:', result);
        }

        fetchData()

    }, [refreshPosts]);

    return (
        <ContentContainer>
            <VStack width="100%" minHeight={"100vh"}>
                <VStack width="100%" alignItems="start">
                    <Text className={styles.sectionTitle}>
                        Your Posts
                    </Text>
                    {!hasFetchedPosts && 
                        <Grid
                            templateColumns={{ base: "1fr", md: "repeat(3, 1fr)", lg: "repeat(5, 1fr)" }}
                            gap={6}
                        >
                            {Array.from({ length: 10}, (_, index) => (
                                <GridItem key={index}>
                                    <Skeleton
                                        width="25vh"
                                        aspectRatio={1/1}
                                        borderBottomRadius={5}
                                        borderTopRadius={5}
                                    >
                                    </Skeleton>
                                </GridItem>
                            ))}
                        </Grid>
                    }
                        <Grid
                            templateColumns={{ base: "1fr", md: "repeat(3, 1fr)", lg: "repeat(5, 1fr)" }}
                            gap={6}
                        >
                            {posts.map((post, index) => {
                                return (
                                <GridItem key={index}>
                                    <Box 
                                        className={profileStyles.imageContainer}
                                        position="relative"
                                        width="25vh"
                                        aspectRatio={1/1}
                                    >
                                        <Image 
                                            src={`http://localhost:8080/uploads/images/${post.imageName}`}
                                            width="100%"
                                            height="100%"
                                            objectFit="cover"
                                        />
                                        <Box
                                            className={profileStyles.hiddenOverlay}
                                            position="absolute"
                                            top="0"
                                            left="0"
                                            width="100%"
                                            height="100%"
                                        >
                                            <PostDeletionConfirmationDialog post={post}/>
                                        </Box>
                                    </Box>
                                    
                                </GridItem>
                                )
                            })}
                        </Grid>
                </VStack>
            </VStack>
        </ContentContainer>
    );
}