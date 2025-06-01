// import { HStack, Skeleton, Text, VStack } from "@chakra-ui/react"
// import styles from "./pages.module.css"

// export default function Home() {

//     return (
//         <VStack width="100%" minHeight={"100vh"}>
//             <VStack width="100%">
//                 <Text className={styles.sectionTitle}>
//                     Featured Stories
//                 </Text>
//                 <HStack 
//                     overflowX="scroll"
//                     width="100%"
//                     scrollBehavior="smooth"
//                 >
//                     {Array.from({ length: 6}, (_, index) => (
//                         <div key={index}>
//                             <Skeleton
//                                 width="160px"
//                                 height="280px"
//                                 marginRight="18px"
//                             >
//                             </Skeleton>
//                         </div>
//                     ))}
//                 </HStack>
//             </VStack>

//             <VStack width="100%">
//                 <Text className={styles.sectionTitle}>
//                     Latest Feed
//                 </Text>
//             </VStack>
//         </VStack>
//     );
// }