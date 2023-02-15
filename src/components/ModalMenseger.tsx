import React from "react";
import { Modal, Button, HStack } from "native-base";

type ModalProps = {
    title: string;
    nameButtonOne: string;
    nameButtonTwo: string;
    onPress: () => Promise<void>;
    isLoading?: boolean;
};

export function ModalMenseger({title, nameButtonOne, nameButtonTwo, onPress}: ModalProps) {
    const [modalVisible, setModalVisible] = React.useState(true);
    const initialRef = React.useRef(null);
    const finalRef = React.useRef(null);
    return <>
        <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)} initialFocusRef={initialRef} finalFocusRef={finalRef}>
            <Modal.Content>
                <Modal.CloseButton />
                <Modal.Header fontWeight="bold" color="gray.700">ATENÇÃO!</Modal.Header>

                <Modal.Body fontSize="3xl" color="gray.700" fontWeight="bold" >
                    {title}
                </Modal.Body>

                <HStack>
                    <Button.Group space={0.2} justifyContent="space-between" w="full" p={2}>
                        <Button 
                            variant="gray.700" 
                            bg="gray.200" 
                            colorScheme="blueGray" 
                            fontSize="md"
                            w="49%"
                            onPress={onPress}
                            textAlign="center"
                            justifyContent="center"
                        >
                            {nameButtonOne}
                        </Button>

                        <Button 
                            colorScheme="gray.700" 
                            bg="red.500" 
                            fontSize="md"
                            textAlign="center"
                            justifyContent="center"
                            w="49%"
                            onPress={onPress}
                        >
                            {nameButtonTwo}
                        </Button>
                    </Button.Group>
                </HStack>
            </Modal.Content>
        </Modal>       
    </>;
}

