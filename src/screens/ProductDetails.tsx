import { AppNavigatorRoutesProps } from '@routes/app.routes';
import { useNavigation, useFocusEffect, useRoute } from '@react-navigation/native';
import { Header } from '@components/Header';
import { Text, HStack, Icon, VStack, ScrollView, Image, Avatar, Box, IconButton, View, useToast } from 'native-base';
import { FontAwesome5} from '@expo/vector-icons';
import { ButtonDefault } from '@components/Button'
import BackgroundImg from '@assets/produto_1.png';

import { useTheme } from 'native-base';
import { Linking } from "react-native";

import { ArrowLeft, Bank, Barcode, CreditCard, PencilSimpleLine, Power, 
    TrashSimple, Money, QrCode } from 'phosphor-react-native'
;

import React, { useEffect, useState } from "react";
import { Status } from '@components/Status';
// import { ArrowLeft, PencilSimpleLine } from 'phosphor-react-native';
import { AppError } from '@utils/AppError';
import { useAuth } from '@hooks/useAuth';
import { ProductDTO } from '@dtos/ProductDTO';
import { api } from '@services/api';

type RouteParams = {
    product_id: string;
}

export function ProductDetails(){

    const navigation = useNavigation<AppNavigatorRoutesProps>();  
    const {colors, sizes} = useTheme(); 
    const [userPhoto, setUserPhoto] = useState('https://github.com/JRSparrowII.png');
    const [sendingMessage, setSendingMessage] = useState(false)
    const toast= useToast();
    const { user } = useAuth();
    const [product, setProduct] = useState<ProductDTO>({} as ProductDTO); 
    const [isLoading, setIsLoading] = useState(true);

    const route = useRoute();
    const {product_id} = route.params as RouteParams;  

    function handleGoBack() { 
        navigation.navigate('hometab');
    } 

    // async function handleOpenWhats() {
    //     try {
    //         const url = `https://wa.me/55${product.user.tel}`;
        
    //         const supported = await Linking.canOpenURL(url);
        
    //         if (!supported) {
    //             throw new AppError('Não foi possível abrir o whatsapp!');
    //         }
        
    //         await Linking.openURL(url);

    //     } catch (e) {
    //         console.error(e);
    //         const isAppError = e instanceof AppError;
        
    //         const title = isAppError
    //             ? e.message
    //             : 'Não foi possível abrir o whatsapp. Tente novamente mais tarde!';
        
    //         toast.show({
    //             title,
    //             placement: 'top',
    //             bgColor: 'red',
    //         });
    //     }
    // }

    async function handleSendMessage() {
        setSendingMessage(true)

        try{
            // Linking.openURL(`https://wa.me/${product.user.tel}`)

        } catch (error) {
            const isAppError = error instanceof AppError;
            const title = isAppError ? error.message : 'Não foi possível fazer contato. Tente novamente mais tarde.';
        
            toast.show({
                title,
                placement: 'top',
                bgColor: 'red.500'
            })

        } finally {
            setSendingMessage(false)
        }
    }

    async function fetchProductDetails() {
        try {
            setIsLoading(true);
            const response = await api.get(`/products/${product_id}`);
            console.log(product_id); //Checar pra ver se ta trazendo os dados
            setProduct(response.data);
        
        } catch (error) {
            const isAppError = error instanceof AppError;
            // const title = isAppError ? error.message : 'Não foi possível carregar os detalhes do produto';
            const title = 'Não foi possível carregar os detalhes do produto';
        
            toast.show({
                title,
                placement: 'top',
                bgColor: 'red.500'
            })
    
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchProductDetails();
    },[product_id])

    return(
        <HStack>
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }} 
                showsVerticalScrollIndicator={false}            
            >
                <VStack backgroundColor='gray.100' flex={1} pb='18%'>
                    <HStack 
                        justifyContent="space-between" 
                        pt={10}
                        pr={6}
                        pl={6}
                        pb={2}
                    >
                        <IconButton
                            icon={<ArrowLeft size={sizes[6]} color={colors.gray[600]} weight="bold"/>}
                            onPress={handleGoBack}
                        />         
                    </HStack> 

                    <View h='300px' >
                        <Image
                            w='full'
                            h='full'
                            // rounded="lg"       
                            // source={{ uri: `${api.defaults.baseURL}/products/images/${userProduct_id}` }}                 
                            source={BackgroundImg}
                            alt="Tenis vermelho"              
                            resizeMode="cover"         
                        />
                    </View>

                    <VStack             
                        flex="1" 
                        padding={6}
                        backgroundColor='gray.100'
                    >                    
                        <HStack space={3} mb={2}>
                            <Avatar 
                                h={6} w={6} 
                                rounded="full" 
                                bg="gray.100" 
                                source={{ uri: userPhoto }}
                            />          
                        
                            <Text color="gray.700" fontFamily="body" fontSize="lg">
                                {user.name}
                            </Text> 
                        </HStack>

                        {/* <Status {productId.is_new}/> */}
                        
                        <HStack justifyContent="space-between" mt={1}>
                            <Text color="gray.700" fontFamily="heading" fontSize="2xl">
                                {product.name}
                            </Text>

                            <HStack space={1} alignItems="baseline">
                                <Text color="blue.500" fontWeight="bold" fontSize="md" textAlign="center">
                                    R$
                                </Text>

                                <Text color="blue.500" fontWeight="bold" fontSize="2xl" textAlign="center">
                                    {product.price}
                                </Text>
                            </HStack>  
                        </HStack>

                        <Text color="gray.700" mt={3}>
                            {product.description}
                        </Text> 

                        <HStack space={3} mt={5}>
                            <Text color="gray.700" fontWeight="bold">
                                Aceita troca?
                            </Text>         
                        
                            <Text color="gray.700" >
                                {product.accept_trade ? 'Sim' : 'Não'}
                            </Text> 
                        </HStack>                                     

                        <Text color="gray.700" mb={0} fontWeight="bold" mt={3}>
                            Meios de pagamentos aceitos:
                        </Text>

                        <VStack mt={2}>

                            {/* {productId.payment_methods.map(method =>
                                <HStack alignItems='center' key={method}>
                                    <Icon as={MaterialCommunityIcons} name='cash-multiple' size={4} color='gray.2' mr={2}/>
                                    <Text fontFamily='body' textTransform='capitalize' fontSize='sm' color='gray.2'>
                                        {method}
                                    </Text>
                                </HStack>
                            )} */}
                            
                            <HStack space={2}>
                                <Barcode size={sizes[5]} color={colors.gray[700]} />

                                <Text fontSize="sm" color="gray.700">
                                    Boleto
                                </Text>
                            </HStack>
                            
                            <HStack space={2}>
                                <QrCode size={sizes[5]} color={colors.gray[700]} />

                                <Text fontSize="sm" color="gray.700">
                                    Pix
                                </Text>
                            </HStack>                 
                            
                            <HStack space={2}>
                                <Money size={sizes[5]} color={colors.gray[700]} />

                                <Text fontSize="sm" color="gray.700">
                                    Dinheiro
                                </Text>
                            </HStack>
                                                    
                            <HStack space={2}>
                                <CreditCard size={sizes[5]} color={colors.gray[700]} />

                                <Text fontSize="sm" color="gray.700">
                                    Cartão de crédito
                                </Text>
                            </HStack>
                                                
                            <HStack space={2}>
                                <Bank size={sizes[5]} color={colors.gray[700]} />

                                <Text fontSize="sm" color="gray.700">
                                    Depósito bancário
                                </Text>
                            </HStack>                                
                        </VStack>                    
                    </VStack>                              
                </VStack>
            </ScrollView> 

            <HStack 
                justifyContent="space-between" 
                pr={8} pl={8}
                space={2} 
                bg="white" 
                pt={5} pb={5}
                position="absolute" 
                bottom={0}
                flex={1}
                w='full'
                h='12%'
            >
                <HStack space={1} alignItems="baseline">
                    <Text color="blue.500" fontWeight="bold" fontSize="md" textAlign="center">
                        R$
                    </Text>

                    <Text color="blue.500" fontWeight="bold" fontSize="2xl" textAlign="center">
                        {/* {product.price} */}
                    </Text>
                </HStack>
                        
                <ButtonDefault 
                    title="Entrar em contato" 
                    size="half"                             
                    variant="base1" 
                    leftIcon={<Icon as={FontAwesome5} name='whatsapp' size={5} color='gray.100'/>}
                    isLoading={sendingMessage}
                    onPress={handleSendMessage}                   
                />                    
            </HStack> 
        </HStack>      
    )        
}