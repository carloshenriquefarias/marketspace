import React from "react";
import { Modal, Button, HStack } from "native-base";

export function SignOutModal() {
    const [modalVisible, setModalVisible] = React.useState(true);
    const initialRef = React.useRef(null);
    const finalRef = React.useRef(null);
    return <>
        <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)} initialFocusRef={initialRef} finalFocusRef={finalRef}>
            <Modal.Content>
                <Modal.CloseButton />
                <Modal.Header fontWeight="bold" color="gray.700">ATENÇÃO!</Modal.Header>

                <Modal.Body fontSize="3xl" color="gray.700" fontWeight="bold" >
                Você REALMENTE deseja sair do Marketspace?
                </Modal.Body>

                <HStack>
                    <Button.Group space={1} justifyContent="space-between" w="full" p={5}>
                        <Button 
                            variant="gray.700" 
                            bg="gray.200" 
                            colorScheme="blueGray" 
                            fontSize="md"
                            w="48%"
                            onPress={() => {setModalVisible(false)}}
                        >
                            Não, Volte!
                        </Button>

                        <Button 
                            colorScheme="gray.700" 
                            bg="red.500" 
                            fontSize="md"
                            onPress={() => {setModalVisible(false)}}
                        >
                            Sim, Quero sair!
                        </Button>
                    </Button.Group>
                </HStack>
            </Modal.Content>
        </Modal>       
    </>;
}

