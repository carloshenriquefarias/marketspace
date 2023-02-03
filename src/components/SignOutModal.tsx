// import React from "react";
// import { Modal, Button, HStack } from "native-base";

// export function SignOutModal() {
//     const [modalVisible, setModalVisible] = React.useState(true);
//     const initialRef = React.useRef(null);
//     const finalRef = React.useRef(null);
//     return <>
//         <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)} initialFocusRef={initialRef} finalFocusRef={finalRef}>
//             <Modal.Content>
//             <Modal.CloseButton />
//             <Modal.Header fontWeight="bold" color="gray.700">ATENÇÃO!</Modal.Header>

//             <Modal.Body>
//                Você REALMENTE deseja sair do Marketspace?
//             </Modal.Body>

//             <HStack justifyContent="space-between" w="full" p={5} >
//                 <Button.Group space={5}>
//                     <Button variant="gray.700" bg="gray.200" colorScheme="blueGray" onPress={() => {
//                         setModalVisible(false);
//                     }}>
//                         Não
//                     </Button>

//                     <Button colorScheme="gray.700" bg="gray.700" onPress={() => {
//                         setModalVisible(false);
//                     }}>
//                         Sim
//                     </Button>
//                 </Button.Group>
//             </HStack>

//             </Modal.Content>
//         </Modal>

       
//     </>;
// }

