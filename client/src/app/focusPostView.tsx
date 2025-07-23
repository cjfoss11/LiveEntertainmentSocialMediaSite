import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react"

interface FocusPostViewProps {
    children: React.ReactNode
}
export default function FocusPostView({...props}: FocusPostViewProps) {
    return (
        <Dialog.Root size="cover">
            <Dialog.Trigger asChild>
                <Button>
                    {props.children}
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
                        // content here
                        </Dialog.Body>
                        <Dialog.CloseTrigger asChild>
                            <CloseButton size="sm" />
                        </Dialog.CloseTrigger>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    );
}