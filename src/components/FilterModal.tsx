// import React from "react";
// import { Modal, Text, Button, FormControl, HStack, Switch, VStack, Checkbox, Box, IconButton, useTheme } from "native-base";
// import { X } from 'phosphor-react-native';

// type Props = {
//   title: string;
//   variant?: 'New' | 'Used';
//   close?: 'true' | 'false';
// }

// const Switchs = () => {
//     return <HStack alignItems="center" space={0}>
//         <Switch size="lg" color="blue" bg="blue"/>
//     </HStack>;
// };

// const Checkboxs = () => {
//     const [groupValues, setGroupValues] = React.useState([]);
//     return <Checkbox.Group onChange={setGroupValues} value={groupValues} accessibilityLabel="choose numbers">
//         <Checkbox value="one">Boleto</Checkbox>
//         <Checkbox value="two" mt={2} >Pix</Checkbox>
//         <Checkbox value="three" mt={2}>Dinheiro</Checkbox>
//         <Checkbox value="four" mt={2}>Cartão de crédito</Checkbox>
//         <Checkbox value="five" mt={2}>Depósito Bancário</Checkbox>
//     </Checkbox.Group>;
// };

// export function FilterModal({ title, variant = 'New'}: Props) {
//     const [modalVisible, setModalVisible] = React.useState(true);
//     const initialRef = React.useRef(null);
//     const finalRef = React.useRef(null);
//     const {colors, sizes} = useTheme();
    
//     return <>
//         <Modal 
//             isOpen={modalVisible} 
//             onClose={() => setModalVisible(false)} 
//             initialFocusRef={initialRef} 
//             finalFocusRef={finalRef}
          
//         >
//             <Modal.Content w="full" mt={250}>
//                 <Modal.CloseButton />
//                 <Modal.Header borderBottomColor="none" fontWeight="bold" color="gray.700" fontFamily="heading">Filtrar Anúncios</Modal.Header>

//                 <Modal.Body>
//                     <FormControl>
//                         <FormControl.Label fontWeight="bold" colorScheme="gray.700" fontFamily="heading">
//                             Condição
//                         </FormControl.Label>

//                         <HStack
//                             bg={variant === 'New' ? 'blue.500' :  'gray.300'} 
//                             color="white"                       
//                             fontSize={5} 
//                             rounded={10}
//                             h={6}
//                             w={'22%'} 
//                             pl={2} pr={2} pt={.5}
//                             justifyContent="space-between"
//                         >
//                             <Box>
//                                 <Text 
//                                     textAlign="center" 
//                                     color={variant === 'New' ? 'white' : 'gray.700'} 
//                                     fontWeight="bold"
//                                     fontSize={12} 
//                                 >
//                                     Novo
//                                 </Text> 

//                                 <Text 
//                                     textAlign="center" 
//                                     color={variant === 'New' ? 'white' : 'gray.700'} 
//                                     fontWeight="bold"
//                                     fontSize={12} 
//                                 >
//                                     Usado
//                                 </Text> 
//                             </Box>       

//                             <Box bg="gray.200" rounded={50} size={3} alignItems="center" mt={1}>
//                                 <IconButton
//                                     icon={<X size={sizes[2]} color={colors.gray[600]} weight="bold"/>}
//                                     // onPress={handleCloseCondition}
//                                     mt={-2}
//                                     pl={3.5}
//                                 /> 
//                             </Box>
                                                        
//                         </HStack>

//                         <VStack>
//                             <FormControl.Label fontWeight="bold" color="gray.700" mt={2} fontFamily="heading">
//                                 Aceita troca?
//                             </FormControl.Label>

//                             <Switchs/>
//                         </VStack>

//                         <VStack>
//                             <FormControl.Label fontWeight="bold" color="gray.700" mb={3} fontFamily="heading">
//                                 Meios de pagamentos aceitos:
//                             </FormControl.Label>

//                             <Checkboxs/>
//                         </VStack>                        
//                     </FormControl>
//                 </Modal.Body>

//                 <HStack justifyContent="space-between" w="full" p={5} >
//                     <Button.Group space={5}>
//                         <Button variant="gray.700" bg="gray.200" colorScheme="blueGray" onPress={() => {
//                             setModalVisible(false);
//                         }}>
//                             Resetar filtros
//                         </Button>

//                         <Button colorScheme="gray.700" bg="gray.700" onPress={() => {
//                             setModalVisible(false);
//                         }}>
//                             Aplicar filtros
//                         </Button>
//                     </Button.Group>
//                 </HStack>

//             </Modal.Content>
//         </Modal>       
//     </>;
// }
















{/* <HStack flexDirection="row" space={2} mb={5}>
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
</HStack> */}

