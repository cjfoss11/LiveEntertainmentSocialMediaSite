import { Box, Button, Field, FileUpload, Icon, Image, Input, VStack } from "@chakra-ui/react"
import { HiUpload } from "react-icons/hi"
import { LuUpload } from "react-icons/lu"
import { useCurrentMaterialsToUpload } from "../hooks/useCurrentMaterialsToUpload";

export default function NewPostContent() {
    const { file, description, imageSrc, setFile, setDescription, setImageSrc } = useCurrentMaterialsToUpload()
    
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const file = event.target.files[0]
            setFile(file);
            const imageURL = URL.createObjectURL(file);
            setImageSrc(imageURL.toString());
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target) {
        setDescription(event.target.value);
        }
  };

    return (
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
                value={description}
                onChange={handleInputChange}
            />
            </Field.Root>
        </VStack>
    )
}