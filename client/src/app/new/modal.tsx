import { Button, Dialog, Portal, CloseButton, useDisclosure } from "@chakra-ui/react"
import { FaPlus } from "react-icons/fa6";
import NewPostContent from "./content";
import SubmitButton from "./submitButton";

export default function NewPostModal() {
    const { onClose }= useDisclosure()

    const closeDialog = () => {
        onClose()
    }
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
                  <NewPostContent/>
                </Dialog.Body>
                <Dialog.Footer>
                  <Dialog.ActionTrigger asChild>
                    <Button variant="outline">Cancel</Button>
                  </Dialog.ActionTrigger>
                    <SubmitButton onSubmit={closeDialog}/>
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

