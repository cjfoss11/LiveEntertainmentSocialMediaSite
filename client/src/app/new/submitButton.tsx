import { Button, Dialog } from "@chakra-ui/react";
import { useRefreshUserPosts } from "../hooks/useRefreshUserPosts";
import { useCurrentMaterialsToUpload } from "../hooks/useCurrentMaterialsToUpload";

interface SubmitButtonProps {
    onSubmit: () => void
}

export default function SubmitButton({...props}: SubmitButtonProps) {
    const { refreshPosts, handleRefreshCallback } = useRefreshUserPosts();
    const { file, description, setFile, setDescription, setImageSrc } = useCurrentMaterialsToUpload()
    
    const handleSubmit = async () => {
        if (!file) { return }
        try {
            const formData = new FormData()
            formData.append("image", file)
            formData.append("description", description)
            formData.append("userID", "1")
            formData.append("imageName", file.name)
            const response = await fetch(`http://localhost:8080/userPosts`, {
                method: 'POST',
                body: formData,
                credentials: 'include'
            });
            const result = await response.json();
            console.log('Response from server:', result);
        } catch (error) {
            console.error('Error sending data:', error);
        }
    
        handleRefreshCallback(!refreshPosts)
        setFile(null)
        setDescription("")
        setImageSrc(null)
        props.onSubmit()    
    };

    return (
        <Dialog.ActionTrigger asChild>
            <Button colorPalette="green" onClick={handleSubmit}>Post</Button>
        </Dialog.ActionTrigger>
    )
}