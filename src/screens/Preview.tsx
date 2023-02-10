import { AppNavigatorRoutesProps } from '@routes/app.routes';
import { useNavigation } from '@react-navigation/native';
import { AppTabNavigatorRoutesProps } from '@routes/app.tab.routes';

import React, { useEffect, useState } from "react";

import { Text, HStack, VStack, ScrollView, Image, useTheme, Avatar, 
    Center, Heading, View, useToast, Icon } from 'native-base'
;
import {useAuth} from '@hooks/useAuth';
import { AdsDTO } from "@dtos/AdsDTO";

import { ButtonDefault } from '@components/Button'
import { Status } from '@components/Status'
import { ImageCarousel } from '@components/Carousel';
// import { IndexCarousel } from '@components/Slider';
import { Loading } from '@components/Loading';

import BackgroundImg from '@assets/produto_2.png';

import { ArrowLeft, Bank, Barcode, CreditCard, Money, QrCode, Tag} from 'phosphor-react-native';
import { MaterialCommunityIcons, Feather} from '@expo/vector-icons';
import { AppError } from '@utils/AppError';

import { storageAdsGet } from '@storage/storageAds';

export function Preview(){

    const { user } = useAuth();
    const toast= useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [ads, setAds] = useState<AdsDTO | undefined>(undefined);

    const navigation = useNavigation<AppNavigatorRoutesProps>(); 
    const navigationTab = useNavigation<AppTabNavigatorRoutesProps>(); 
    
    const {colors, sizes} = useTheme();  
    const [userPhoto, setUserPhoto] = useState('https://github.com/JRSparrowII.png');

    function handleGoHome() { 
        navigationTab.navigate('home');
    } 

    function handleOpenMyAdsDetails() { 
        navigation.navigate('myadsdetails');
    } 

    function handleOpenNewAd() { 
        navigation.navigate('newad');
    }

    // async function handleCreateNewAd (image: string, name: string, description: string, price: number,
    //     is_new: boolean, accept_trade: boolean, payment_methods: string[]) { 
            
    //     try {
    //         setIsLoading(true);

    //         const response_product = await api.post('/products', 
    //             { image, name , description, is_new,  price : setPrice(amount),
    //             accept_trade, payment_methods },
                
    //         );  
                        
    //         if (response_product.data.id) {   

    //             let formData = new FormData(); 

    //             formData.append("images", {
    //                 uri: userPhoto,
    //                 name: "image.jpg",
    //                 type: "image/jpg",
    //             });
    
    //             formData.append('product_id', response_product.data.id)
               
    //             const response = await api.post('/products/images', formData, {
    //                 headers: {
    //                     'Content-Type': 'multipart/form-data',
    //                 },
    //                 transformRequest: (data, headers) => {                        
    //                     return formData;
    //                 },
    //             });

    //             const title = 'Salvo com sucesso';
    //             toast.show({    
    //                 title,
    //                 placement: 'top',
    //                 bgColor: 'green.500'
    //             })   
                
    //             handleOpenPreview();

    //             return

    //         } else {
    //             throw new Error();
    //         }         

    //     } catch(error) {

    //         const isAppError = error instanceof AppError;
    //         const title = isAppError ? error.message : 
    //         'Não foi possível enviar os dados. Tente novamente mais tarde';

    //         setIsLoading(false);
        
    //         toast.show({    
    //             title,
    //             placement: 'top',
    //             bgColor: 'red.500'
    //         })
    //     }
    // }

    useEffect(() => {
        async function fetchAds() {
       
            try {
                const adLoad = await storageAdsGet();
                setAds(adLoad);
            
            }   catch (error) {
    
                const isAppError = error instanceof AppError;
                const title = isAppError ? error.message : 'Não foi possível carregar os produtos';
            
                toast.show({
                    title,
                    placement: 'top',
                    bgColor: 'red.500'
                })
            }
        }

        fetchAds()
    }, []);      

    return(
        <>
            {(!ads) ? <Loading /> :        
                <HStack>      
                    <ScrollView 
                        contentContainerStyle={{ flexGrow: 1 }} 
                        showsVerticalScrollIndicator={false}              
                    >
                        <VStack flex={1}  pb='18%'>

                            <Center bg="blue.500" h={32} pt={8}>
                                <Heading fontSize="md" color="gray.100">
                                    Pré visualização do anúncio
                                </Heading>

                                <Text fontSize="sm" color="gray.100">
                                    É assim que seu produto vai aparecer!
                                </Text>
                            </Center>                            

                            <View h='300px' >

                               {/* <ImageCarousel/>*/}

                                {/* <Image
                                    w='full'
                                    h='full'
                                    // rounded="lg"                       
                                    source={{uri: ads?.images[0]}}
                                    alt="Tenis vermelho"              
                                    resizeMode="cover"         
                                /> */}
                            </View>                

                            <VStack             
                                flex="1"
                                padding={8}
                                backgroundColor='gray.100'
                            >                    
                                <HStack space={3} mb={3}>
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

                                <Status name={ads.is_new}/> 

                                <HStack justifyContent="space-between" mt={3}>
                                    <Text color="gray.700" fontFamily="heading" fontSize="2xl">
                                        {ads.name} 
                                    </Text>

                                    <HStack space={1} alignItems="baseline">
                                        <Text color="blue.500" fontWeight="bold" fontSize="md" textAlign="center">
                                            R$
                                        </Text>

                                        <Text color="blue.500" fontWeight="bold" fontSize="2xl" textAlign="center">
                                            {ads.price}
                                        </Text>
                                    </HStack>                            
                                </HStack>

                                <Text color="gray.700" mt={3}>
                                    {ads.description}
                                </Text> 

                                <HStack space={3} mt={5}>
                                    <Text color="gray.700" fontWeight="bold">
                                        Aceita troca?
                                    </Text>         
                                
                                    <Text color="gray.700" >
                                        {ads.accept_trade ? 'Sim' : 'Não'}
                                    </Text> 
                                </HStack>                                     
                
                                <Text color="gray.700" mb={0} fontWeight="bold" mt={3}>
                                    Meios de pagamentos aceitos:
                                </Text>

                                <VStack mt={2}>
                                    {ads.payment_methods.map(method =>
                                        <HStack alignItems='center' key={method}>
                                            <Icon as={MaterialCommunityIcons} name='cash-multiple' size={4} color='gray.2' mr={2}/>
                                            <Text fontFamily='body' textTransform='capitalize' fontSize='sm' color='gray.2'>
                                                {method}
                                            </Text>
                                        </HStack>
                                    )}
                                    
                                    {/* <HStack space={2}>
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
                                    </HStack> */}
                                    
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
                        <ButtonDefault 
                            title="Voltar e Editar" 
                            size="half"                             
                            variant="default"  
                            leftIcon={<ArrowLeft color={colors.gray[500]} size={sizes[5]} />}
                            onPress={handleOpenNewAd}                    
                        />          

                        <ButtonDefault 
                            title="Publicar" 
                            size="half"                             
                            variant="base1" 
                            onPress={handleOpenMyAdsDetails}
                            isLoading={isLoading}
                            // onPress={handleCreateNewAd}
                            leftIcon={<Tag color={colors.gray[200]} size={sizes[5]} /> }                                         
                        />                    
                    </HStack>  
                </HStack>
            }
        </>
    )        
}