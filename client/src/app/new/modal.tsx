import { Button, Dialog, Portal, CloseButton, Box, Icon, Image, Input, Field, VStack, useDisclosure } from "@chakra-ui/react"
import { LuUpload } from "react-icons/lu"
import { FaPlus } from "react-icons/fa6";
import {FileUpload} from "@chakra-ui/react"
import { HiUpload } from "react-icons/hi"
import { useState } from "react";
import { useRefreshUserPosts } from '../hooks/useRefreshUserPosts';

export default function NewPostModal() {
  const [file, setFile] = useState<File | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState("");
  const {onClose}= useDisclosure()
  const { refreshPosts, handleRefreshCallback } = useRefreshUserPosts();
  

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target) {
      setInputValue(event.target.value);
    }
  };
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) {
        const file = event.target.files[0]
        setFile(file);
        const imageURL = URL.createObjectURL(file);
        setImageSrc(imageURL.toString());
      }
    };

  const handleSubmit = async () => {
    if (!file) { return }
    try {
      const formData = new FormData()
      formData.append("image", file)
      formData.append("description", inputValue)
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
    onClose()    
  };

    return (
      <Dialog.Root size="cover">
        <Dialog.Trigger asChild>
            <Button>
                <FaPlus fontSize="large"/> New Post
            </Button>
        </Dialog.Trigger>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>Create a Post</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body overflowY={"scroll"}>
                <VStack>
                  <Field.Root required>
                    <Field.Label>
                      Upload a Photo <Field.RequiredIndicator />
                    </Field.Label>
                    {file == null && 
                    <VStack 
                      align={"center"} 
                      justify={"center"} 
                    >
                      <Box>
                        <FileUpload.Root alignItems="stretch" maxFiles={1} width="92vw" onChange={handleFileChange}>
                        <FileUpload.HiddenInput />
                        <FileUpload.Dropzone>
                            <Icon size="md" color="fg.muted">
                            <LuUpload />
                            </Icon>
                            <FileUpload.DropzoneContent>
                            <Box>Drag and drop files here or use the button below.</Box>
                            <Box color="fg.muted">.png, .jpg up to 5MB</Box>
                            </FileUpload.DropzoneContent>
                        </FileUpload.Dropzone>
                        <FileUpload.List />
                        </FileUpload.Root>  
                      </Box>
                      <Box>
                        <FileUpload.Root accept={["image/png", "image/jpeg"]}maxFiles={1} onChange={handleFileChange}>
                        <FileUpload.HiddenInput />
                        <FileUpload.Trigger asChild>
                          <Button variant="outline" size="sm">
                            <HiUpload /> Upload file
                          </Button>
                        </FileUpload.Trigger>
                        <FileUpload.List />
                      </FileUpload.Root>
                      </Box>
                    </VStack>
                  }
                  {imageSrc && 
                    <Image 
                      src={imageSrc}
                      alt="image"
                      fit="contain"
                      height="550px"
                    />
                  }
                  </Field.Root>
                  <Field.Root>
                    <Field.Label>
                      Add a Description
                    </Field.Label>
                    <Input 
                      placeholder="Add a description here (optional)"
                      value={inputValue}
                      onChange={handleInputChange}
                    />
                  </Field.Root>
                </VStack>
              </Dialog.Body>
              <Dialog.Footer>
                <Dialog.ActionTrigger asChild>
                  <Button variant="outline">Cancel</Button>
                </Dialog.ActionTrigger>
                <Dialog.ActionTrigger asChild>
                  <Button colorPalette="green" onClick={handleSubmit}>Post</Button>
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

