import { Box, Button, Center, Checkbox, Heading, HStack, Icon, IconButton, ScrollView, Switch, Tag, Text, useToast, VStack } from "native-base";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Status } from '@components/Status'
import BottomSheet from "@gorhom/bottom-sheet";
import {AntDesign} from '@expo/vector-icons'
import { api } from "@services/api";
import { ProductDTO } from "@dtos/ProductDTO";
import { ButtonDefault } from "@components/Button";
import { AppError } from "@utils/AppError";

export function TesteDeModal() {

    const [products, setProducts] = useState<ProductDTO[]>([])
    const [loadingProducts, setLoadingProducts] = useState(true)
    const [isLoading, setIsLoading] = useState(true)

    const toast= useToast();

    const bottomSheetRef = useRef<BottomSheet>(null)
    const snapPoints = useMemo(() => ['80%'] ,[]) 

    const [filterName, setFilterName] = useState('')
    const [isNew, setIsNew] = useState(true)
    const [switchValue, setSwitchValue] = useState(true);
    const [paymentMethods, setPaymentMethods] = useState<string[]>([])

    const Switches = () => {      
        const toggleSwitch = (value : any) => {
          setSwitchValue(value);
        };
      
        return (
            <VStack alignItems='flex-start'>
                <Switch
                    onValueChange={toggleSwitch}
                    value={switchValue}
                />
            </VStack>
        );
    };

    function handleOpenModal() {
        bottomSheetRef.current?.expand()
    }

    function handleCloseModal() {
        bottomSheetRef.current?.close()
    }

    async function fetchProducts() {
        try {
            setLoadingProducts(true)
            const response = await api.get('/products')        
            setProducts(response.data)

        } catch (error) {
            const isAppError = error instanceof AppError;
            const title = isAppError ? error.message : 'Não foi possível carregar os produtos';
        
            toast.show({
                title,
                placement: 'top',
                bgColor: 'red.500'
            })

        } finally {
            setLoadingProducts(false)
            setIsLoading(false)
        }
    }

    async function handleFilterProducts() {
        try {
            // handleCloseModal()

            const params = {
                query: filterName.trim() === '' ? null : filterName,
                is_new: isNew,
                accept_trade: switchValue,
                payment_methods: paymentMethods,
            }

            console.log("params: ", params)

            const response = await api.get(`/products?accept_trade=${switchValue}`)   

            console.log("response: ", response)
            return;
            
        
                 
            setProducts(response.data)
    
        } catch (error) {
            const isAppError = error instanceof AppError;
            const title = isAppError ? error.message : 'Não foi possível carregar os filtros do produto';
        
            toast.show({
                title,
                placement: 'top',
                bgColor: 'red.500'
            })
        }
    }

    async function handleResetFilters() {
        try {
            setFilterName('')
            setIsNew(true)
            setSwitchValue(true)
            setPaymentMethods([])
    
            await fetchProducts()

        } catch (error) {
            const isAppError = error instanceof AppError;
            const title = isAppError ? error.message : 'Não foi possível carregar os resetar os filtros do produto';
        
            toast.show({
                title,
                placement: 'top',
                bgColor: 'red.500'
            })
        }
    }

    useEffect(() => {
        fetchProducts()
    },[])

    return(   
        <Box mt={10} mb={3} w="full" h={'100%'}> 

            {/* <Button onPress={handleCloseModal}>
                Clique aqui para fechar o modal
            </Button> */}

            <Button onPress={handleOpenModal}>
                Clique aqui para abrir o modal
            </Button>

            <BottomSheet
                ref={bottomSheetRef}
                snapPoints={snapPoints}
                enablePanDownToClose
                index={-1}
            >
                <VStack flex={1} px={6}>
                    <HStack justifyContent='space-between' alignItems='center'>
                        <Heading fontFamily='heading' fontSize='xl' color='gray.700'>
                            Filtrar anúncios
                        </Heading>

                        <IconButton
                            onPress={handleCloseModal}
                            icon={<Icon
                                as={AntDesign}
                                name='close'
                                size={6}
                                color='gray.600'
                            />}
                        />
                    </HStack>

                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 16}}>
                        <Text fontFamily='heading' fontSize='sm' color='gray.600' mb={3}>
                            Condição
                        </Text>
                    
                        <HStack space={2} mb={6}>
                            <Status
                                name='Novo'
                                isActive={isNew === true}
                                onPress={() => setIsNew(true)}
                            />

                            <Status
                                name='Usado'
                                isActive={isNew === false}
                                onPress={() => setIsNew(false)}
                            />
                        </HStack>

                        <Text fontFamily='heading' fontSize='sm' color='gray.600' mb={1}>
                            Aceita troca?
                        </Text>
                    
                    <Switches/>

                    <Text fontFamily='heading' fontSize='sm' color='gray.600' mb={3}>
                        Métodos de Pagamentos Aceitos:
                    </Text>
                    
                    <Checkbox.Group 
                        onChange={setPaymentMethods} 
                        value={paymentMethods} 
                        accessibilityLabel="choose numbers"
                    >
                        <Checkbox value='boleto' mb={1}>Boleto</Checkbox>
                        <Checkbox value='pix' mb={1}>Pix</Checkbox>
                        <Checkbox value='cash' mb={1}>Dinheiro</Checkbox>
                        <Checkbox value='card' mb={1}>Cartão Crédito</Checkbox>
                        <Checkbox value='deposit' mb={1}>Depósito Bancário</Checkbox>
                    </Checkbox.Group>   

                    <HStack 
                        justifyContent="space-between" 
                        space={2} 
                        pt={5} pb={5}
                        // bottom={0}
                        // w='full'
                        // h='12%'
                    >
                        <ButtonDefault 
                            title="Resetar Filtros" 
                            size="half"                             
                            variant="default"  
                            onPress={handleResetFilters}                    
                        />          

                        <ButtonDefault 
                            title="Aplicar Filtros" 
                            size="half"                             
                            variant="base1" 
                            isLoading={isLoading}
                            onPress={handleFilterProducts}                                      
                        />                    
                    </HStack> 
                </ScrollView>
                </VStack>
            </BottomSheet>
        </Box>       
        
    )
}