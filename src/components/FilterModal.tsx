import React from "react";
import { Modal, Button, FormControl, HStack, Switch, VStack, Checkbox } from "native-base";
import { Status } from "./Status";

const Switchs = () => {
    return <HStack alignItems="center" space={0}>
        <Switch size="lg" color="blue" bg="blue"/>
    </HStack>;
};

const Checkboxs = () => {
    const [groupValues, setGroupValues] = React.useState([]);
    return <Checkbox.Group onChange={setGroupValues} value={groupValues} accessibilityLabel="choose numbers">
        <Checkbox value="one">Boleto</Checkbox>
        <Checkbox value="two" mt={2} >Pix</Checkbox>
        <Checkbox value="three" mt={2}>Dinheiro</Checkbox>
        <Checkbox value="four" mt={2}>Cartão de crédito</Checkbox>
        <Checkbox value="five" mt={2}>Depósito Bancário</Checkbox>
    </Checkbox.Group>;
};

export function FilterModal() {
    const [modalVisible, setModalVisible] = React.useState(true);
    const initialRef = React.useRef(null);
    const finalRef = React.useRef(null);
    return <>
        <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)} initialFocusRef={initialRef} finalFocusRef={finalRef}>
            <Modal.Content>
            <Modal.CloseButton />
            <Modal.Header fontWeight="bold" color="gray.700">Filtrar Anúncios</Modal.Header>

            <Modal.Body>
                <FormControl>
                    <FormControl.Label fontWeight="bold" colorScheme="gray.700">
                        Condição
                    </FormControl.Label>

                    <HStack flexDirection="row" space={2} mb={5}>
                        <Status 
                            variant="New"
                            title="Novo"
                            close="true"
                        />

                        <Status 
                            variant="Used"
                            title="Usado"
                            close="true"
                        />
                    </HStack>

                    <VStack>
                        <FormControl.Label fontWeight="bold" color="gray.700">
                            Aceita troca?
                        </FormControl.Label>

                        <Switchs/>
                    </VStack>

                    <VStack>
                        <FormControl.Label fontWeight="bold" color="gray.700" mb={3}>
                            Meios de pagamentos aceitos:
                        </FormControl.Label>

                        <Checkboxs/>
                    </VStack>
                    
                       
                </FormControl>
            </Modal.Body>

            <HStack justifyContent="space-between" w="full" p={5} >
                <Button.Group space={5}>
                    <Button variant="gray.700" bg="gray.200" colorScheme="blueGray" onPress={() => {
                        setModalVisible(false);
                    }}>
                        Resetar filtros
                    </Button>

                    <Button colorScheme="gray.700" bg="gray.700" onPress={() => {
                        setModalVisible(false);
                    }}>
                        Aplicar filtros
                    </Button>
                </Button.Group>
            </HStack>

            </Modal.Content>
        </Modal>

       
    </>;
}

