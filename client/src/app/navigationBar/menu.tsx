import { Stack } from "@chakra-ui/react"
import { NavigationBarMenuCell } from "../cells/navigationBarMenuCell"
import { useMediaQuery } from 'react-responsive';
import { mobileWidth } from "../constants";

interface SidebarMenuProps {
    className?: string
}

export default function NavigationMenu({...props}: SidebarMenuProps) {
    const constantSidebarOptions = ["Home", "Explore", "Tickets", "Profile"]
    const isMobile = useMediaQuery({query: mobileWidth})
    
    return (
       <Stack 
            width="100%" 
            className={props.className} 
            direction={isMobile ? "row" : "column"}
            justifyContent={isMobile ? "space-between" : "normal"}
            paddingLeft={isMobile ? "6" : "0"}
            paddingRight={isMobile ? "6" : "0"}
        >
            {Object.values(constantSidebarOptions).map((option, index) => (
                <NavigationBarMenuCell key={index} title={option}></NavigationBarMenuCell>          
            ))}
            {isMobile && <NavigationBarMenuCell title={"New"}></NavigationBarMenuCell>}
       </Stack>
    )
}