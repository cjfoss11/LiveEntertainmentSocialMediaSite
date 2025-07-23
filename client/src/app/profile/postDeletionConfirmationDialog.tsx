import { Button, CloseButton, Dialog, Portal, useDisclosure } from "@chakra-ui/react"
import { useRefreshUserPosts } from "../hooks/useRefreshUserPosts";
import { UserPost } from "./page";

export interface PostDeletionConfirmationDialogProps {
    post: UserPost
} 

export default function PostDeletionConfirmationDialog({...props}: PostDeletionConfirmationDialogProps) {
    const {refreshPosts, handleRefreshCallback} = useRefreshUserPosts();
    const {onClose}= useDisclosure()

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
                            <Button onClick={() => handleDeletePost(props.post.post_id)}>Delete</Button>
                        </Dialog.ActionTrigger> 
                    </Dialog.Footer>
                    <Dialog.CloseTrigger asChild>
                    <CloseButton size="sm" />
                    </Dialog.CloseTrigger>
                </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    );
}