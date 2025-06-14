"use client"

import { HStack, Icon, Text } from "@chakra-ui/react"
import { GoHome } from "react-icons/go";
import { MdOutlineExplore } from "react-icons/md";
import { IoTicketSharp } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { FaPlus } from "react-icons/fa6";
import Link from 'next/link'
import styles from "./navigationBarMenuCell.module.css";
import { mobileWidth } from "../constants";
import { useMediaQuery } from "react-responsive";
import { usePathname } from "next/navigation";

function getIcon(title: string) {
    if (title == "Home")
        return <GoHome/>
    else if (title == "Explore")
        return <MdOutlineExplore/>
    else if (title == "Tickets")
        return <IoTicketSharp />
    else if (title == "New")
        return <FaPlus/>
    else if (title == "Profile")
        return <CgProfile />
}

interface NavigationBarMenuCellProps {
    title: string,
}

export function NavigationBarMenuCell(props: NavigationBarMenuCellProps) {
    const route = props.title.toLowerCase()
    const isMobile = useMediaQuery({query: mobileWidth})
    const pathName = usePathname()
    
    return (
        <Link
            href={`/${props.title == "Home" ? "" : route}`}
        >
            <HStack 
                className={styles.menuCell}
                color={(pathName == `/${route}` || pathName == '/' && route == 'home') ? '#e6353b;' : 'black'}
            >
                <Icon className={styles.menuCellIcon}>
                    {getIcon(props.title)}
                </Icon>
                {!isMobile && 
                <Text>
                    {props.title}
                </Text>
                }
            </HStack>
        </Link>
    )
}