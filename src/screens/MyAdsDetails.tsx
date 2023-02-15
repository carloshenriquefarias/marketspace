import { Text, useTheme, HStack, VStack, ScrollView, Image, 
    Avatar, IconButton, View, useToast, Icon } from 'native-base'
;
import React, { useEffect, useState } from "react";

import { AppNavigatorRoutesProps } from '@routes/app.routes';

import { ArrowLeft, Bank, Barcode, CreditCard, PencilSimpleLine, Power, 
    TrashSimple, Money, QrCode } from 'phosphor-react-native'
;
import { useNavigation, useRoute } from '@react-navigation/native';

import { ButtonDefault } from '@components/Button';
import { Status } from '@components/Status';

import { storageAdsRemove } from '@storage/storageAds';

import BackgroundImg from '@assets/produto_1.png';
import { AppError } from '@utils/AppError';
import { api } from '@services/api';
import { ModalMenseger } from '@components/ModalMenseger';
import { useAuth } from '@hooks/useAuth';
import { storageAdsGet } from '@storage/storageAds';
import { AdsDTO } from "@dtos/AdsDTO";
import { MaterialCommunityIcons, Feather} from '@expo/vector-icons';
import { ProductDTO } from '@dtos/ProductDTO';
import { Loading } from '@components/Loading';
import { SliderCarousel } from '@components/SliderCarousel';

type RouteParams = {
    userProduct_id: string;
}

export function MyAdsDetails(){

    const navigation = useNavigation<AppNavigatorRoutesProps>();   
    const [userPhoto, setUserPhoto] = useState('https://github.com/JRSparrowII.png');
    const {colors, sizes} = useTheme();

    const [isDeleting, setIsDeleting] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const toast = useToast();
    const { user } = useAuth();
    const [ads, setAds] = useState<AdsDTO | undefined>(undefined);

    const route = useRoute();
    const {userProduct_id} = route.params as RouteParams;     

    const [product, setProduct] = useState<ProductDTO>({} as ProductDTO); 
    const [products, setProducts] = useState<ProductDTO>({} as ProductDTO); 
    const [visibleModal, setVisibleModal] = useState(false)

    async function fetchProductDetails() {
        try {
            setIsLoading(true);
            const response = await api.get(`/products/${userProduct_id}`);
            // console.log(response.data); //Checar pra ver se ta trazendo os dados
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

    function handleEditProductDetails(userProduct_id: string) {
        navigation.navigate('editads', {userProduct_id});
    }  

    function handleOpenMyAds() { 
        navigation.navigate('myads');
    } 

    function handleGoBack() {
        navigation.goBack()
    }

    function handleOpenModal() {
        setVisibleModal(true);
    }

    // async function fetchUserProducts() {
    //     try {
    //       const { data } = await api.get('/users/products')
    //       setProducts(data)

    //     } catch (error) {
    
    //     } 
    // }

    async function handleAdsEnabledOrDisabled() {
        try {
            setIsUpdating(true)
                  
            const data = {
                is_active : !products.is_active
            }
        
            await api.patch(`/products/${userProduct_id}`, data)

            // await fetchUserProducts()

            const title = 'Seu anúncio está desabilitado!'; //Fazer a condição DO ANUNCIO
      
            toast.show({
                title,
                placement: 'top',
                bgColor: 'green.500'
            })
                          
            // handleGoBack()

        } catch (error) {
            const isAppError = error instanceof AppError;
            const title = isAppError ? error.message : 'Não foi possível desabilitar o aunúncio! Tente mais tarde!';
      
            toast.show({
                title,
                placement: 'top',
                bgColor: 'red.500'
            })

            } finally {
            setIsUpdating(false)
        }
    }

    async function handleDeleteAds(userProduct_id: string) {
        try {
            setIsDeleting(true)
            
            await api.delete(`/products/${userProduct_id}`)            
        
            handleGoBack()

            toast.show({
                title: 'SUCESSO!, seu anúncio foi excluido!',
                placement: 'top',
                bgColor: 'green.500'
            })

        } catch (error) {
            const isAppError = error instanceof AppError;
            const title = isAppError ? error.message : 'Não foi possível excluir o aunúncio! Tente mais tarde!';
      
            toast.show({
              title,
              placement: 'top',
              bgColor: 'red.500'
            })

        } finally {
          setIsDeleting(false)
        }
    }

    useEffect(() => {
        fetchProductDetails();
    },[userProduct_id])

    // useEffect(() => {
    //     fetchUserProducts()
    // })

    return(
        <ScrollView
            contentContainerStyle={{ flexGrow: 1 }} 
            showsVerticalScrollIndicator={false}            
        >
            <VStack backgroundColor='gray.100'>
                <HStack 
                    justifyContent="space-between" 
                    pt={10}
                    pr={6}
                    pl={6}
                    pb={2}
                >
                    <IconButton
                        icon={<ArrowLeft size={sizes[6]} color={colors.gray[600]} weight="bold"/>}
                        onPress={handleOpenMyAds}
                    />          

                    <IconButton
                        icon={<PencilSimpleLine size={sizes[6]} color={colors.gray[600]} weight="bold"/>}
                        onPress={() => handleEditProductDetails(userProduct_id)}
                    />
                </HStack>

                { isLoading ? <Loading/> :
                    <>                  
                        <SliderCarousel 
                            // images={product.product_images}  
                        />                            

                        <VStack             
                            flex="1" 
                            padding={6}
                            backgroundColor='gray.100'
                        >                    
                            <HStack space={3} mb={5}>
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

                            <Status name={product.is_new}/>
                            
                            <HStack justifyContent="space-between" mt={3}>
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

                                {/* {product.payment_methods.map(method =>
                                    <HStack alignItems='center' key={method.key}>
                                        <Icon as={MaterialCommunityIcons} name='cash-multiple' size={4} color='gray.2' mr={2}/>
                                        <Text fontFamily='body' textTransform='capitalize' fontSize='sm' color='gray.2'>
                                            {method.key}
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

                        <VStack pr={6} pl={6} mb={5}>
                            <ButtonDefault 
                                title= {products.is_active ? 'Ativar anúncio' : 'Desativar anúncio'}
                                size="total"                             
                                variant={products.is_active ? 'base2' : 'base1'} 
                                isLoading={isUpdating} 
                                onPress={handleAdsEnabledOrDisabled}
                                leftIcon={<Power size={sizes[5]} color={colors.gray[100]} />}                    
                            />          

                            <ButtonDefault 
                                title="Excluir anúncio" 
                                size="total"                             
                                variant="default" 
                                mt={2}
                                onPress={handleOpenModal}
                                leftIcon={<TrashSimple size={sizes[5]} color={colors.gray[700]} />}                    
                            />                    
                        </VStack>
                    </>
                } 
            </VStack> 

            {(visibleModal) ?
                <ModalMenseger
                    title='Você deseja REALMENTE excluir este produto?'
                    nameButtonOne='Não, Volte!'
                    nameButtonTwo='Sim, Excluir!'
                    onPress={() => handleDeleteAds(userProduct_id)} 
                    isLoading={isLoading}
                />
            :null}

        </ScrollView>       
    )        
}
