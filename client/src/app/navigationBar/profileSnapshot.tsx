"use client";

import { VStack, HStack, Text } from "@chakra-ui/react"
import { useProfileViewModel } from "../ProfileViewModel"
import styles from "./navigationBar.module.css"

export default function ProfileSnapshot() {
    const { posts, followers, following } = useProfileViewModel()

    return (
        <VStack>
            <VStack>
                <div className={styles.profilePic}></div>
                <Text fontWeight="semibold">Cathy Foss</Text>
            </VStack>
            <HStack className={styles.profileInfo}>
                <VStack>
                    <Text fontWeight="semibold">
                        Posts
                    </Text>
                    <Text>
                        {posts}
                    </Text>
                </VStack>
                <VStack>
                    <Text fontWeight="semibold">
                        Followers
                    </Text>
                    <Text>
                        {followers}
                    </Text>
                </VStack>
                <VStack>
                    <Text fontWeight="semibold">
                        Following
                    </Text>
                    <Text>
                        {following}
                    </Text>
                </VStack>
            </HStack>
        </VStack>
    )
}
