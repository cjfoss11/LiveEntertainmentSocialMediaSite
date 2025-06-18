"use client"
import { Box, Button, CloseButton, Dialog, Grid, GridItem, Skeleton, Image, Text, useDisclosure, VStack, Portal} from "@chakra-ui/react";
import { useEffect, useState} from "react";
import ContentContainer from "../contentContainer";
import styles from "../pages/pages.module.css"
import profileStyles from "./profile.module.css"
import { useRefreshUserPosts } from '../hooks/useRefreshUserPosts';

interface UserPost {
    post_id: number,
    userID: number,
    description: string,
    imageName: string, 
    createdAt: Date
}

export default function Profile() {
    const [posts, setPosts] = useState<UserPost[]>([])
    const [hasFetchedPosts, setHasFetchedPosts] = useState(false)
    const {refreshPosts, handleRefreshCallback} = useRefreshUserPosts();
    const {onClose}= useDisclosure()
    
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

    const handleDeletePost = async (post_id: number) => {
        try {
            const response = await fetch(`http://localhost:8080/userPosts/${post_id}`, {
                method: 'DELETE',
                credentials: 'include'
            });
            const result = await response.json();
            console.log('Response from server:', result);
        } catch (error) {
            console.error('Error sending data:', error);
            console.error('Post ID:', post_id)
        }

        handleRefreshCallback(!refreshPosts);
        onClose()    
    };

    return (
        <ContentContainer>
            <VStack width="100%" minHeight={"100vh"}>
                <VStack width="100%" alignItems="start">
                    <Text className={styles.sectionTitle}>
                        Your Posts
                    </Text>
                    {!hasFetchedPosts && 
                        <Grid
                            templateColumns={{ base: "1fr", md: "repeat(4, 1fr)", lg: "repeat(5, 1fr)" }}
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
                            templateColumns={{ base: "1fr", md: "repeat(4, 1fr)", lg: "repeat(5, 1fr)" }}
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
                                            <Dialog.Root>
                                                <Dialog.Trigger asChild>
                                                    <CloseButton
                                                        marginTop="2"
                                                        marginRight="2"
                                                    />
                                                </Dialog.Trigger>
                                                <Portal>
                                                    <Dialog.Backdrop />
                                                    <Dialog.Positioner>
                                                    <Dialog.Content>
                                                        <Dialog.Header>
                                                        <Dialog.Title>Are you sure you want to delete this post?</Dialog.Title>
                                                        </Dialog.Header>
                                                        <Dialog.Body>
                                                        <p>
                                                            This action cannot be undone. 
                                                        </p>
                                                        </Dialog.Body>
                                                        <Dialog.Footer>
                                                            <Dialog.ActionTrigger asChild>
                                                                <Button variant="outline">Cancel</Button>
                                                            </Dialog.ActionTrigger>
                                                            <Dialog.ActionTrigger asChild>
                                                                <Button onClick={() => handleDeletePost(post.post_id)}>Delete</Button>
                                                            </Dialog.ActionTrigger> 
                                                        </Dialog.Footer>
                                                        <Dialog.CloseTrigger asChild>
                                                        <CloseButton size="sm" />
                                                        </Dialog.CloseTrigger>
                                                    </Dialog.Content>
                                                    </Dialog.Positioner>
                                                </Portal>
                                            </Dialog.Root>
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