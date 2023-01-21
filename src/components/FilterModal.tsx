import React from "react";
import { Modal, Button, Input, FormControl, HStack, Center, NativeBaseProvider } from "native-base";

export function FilterModal() {
    const [modalVisible, setModalVisible] = React.useState(true);
    const initialRef = React.useRef(null);
    const finalRef = React.useRef(null);
    return <>
        <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)} initialFocusRef={initialRef} finalFocusRef={finalRef}>
            <Modal.Content>
            <Modal.CloseButton />
            <Modal.Header>Contact Us</Modal.Header>

            <Modal.Body>
                <FormControl>
                    <FormControl.Label>Name</FormControl.Label>
                        <Input ref={initialRef} />
                            </FormControl>
                        <FormControl mt="3">
                    <FormControl.Label>Email</FormControl.Label>
                    <Input />
                </FormControl>
            </Modal.Body>

            <Modal.Footer>
                <Button.Group space={2}>
                    <Button variant="ghost" colorScheme="blueGray" onPress={() => {
                        setModalVisible(false);
                    }}>
                        Cancel
                    </Button>

                    <Button onPress={() => {
                        setModalVisible(false);
                    }}>
                        Save
                    </Button>
                </Button.Group>
            </Modal.Footer>

            </Modal.Content>
        </Modal>

       
    </>;
}

