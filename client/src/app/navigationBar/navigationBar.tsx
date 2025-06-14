"use client"
import { HStack, VStack } from "@chakra-ui/react"
import ProfileSnapshot from "./profileSnapshot"
import NavigationBarMenu from "./menu"
import styles from "./navigationBar.module.css"
import { useMediaQuery } from 'react-responsive';
import { mobileWidth } from "../constants";


export default function NavigationBar() {
    const isMobile = useMediaQuery({query: mobileWidth})

    function getSideBar() {
        if (isMobile) {
            return (
                <HStack alignContent="center" backgroundColor="#ECECEC">
                    <NavigationBarMenu className={styles.sidebarMenu}/>
                </HStack>
            )
        } else {
            return (
                <VStack height="100vh" className={styles.sidebar}>
                    <ProfileSnapshot/>
                    <NavigationBarMenu className={styles.sidebarMenu}/>
                </VStack>
            )
        }
    }

    return (
        getSideBar()
    )
}
