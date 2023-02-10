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

type RouteParamsProps = {
    AdsId: string;
}

export function MyAdsDetails({ route }){

    const navigation = useNavigation<AppNavigatorRoutesProps>();   
    const [userPhoto, setUserPhoto] = useState('https://github.com/JRSparrowII.png');
    const {colors, sizes} = useTheme();
    const [isDeleting, setIsDeleting] = useState(false)
    const [isUpdating, setIsUpdating] = useState(false)
    const toast = useToast();
    const { user } = useAuth();
    const [ads, setAds] = useState<AdsDTO | undefined>(undefined);

    const [visibleModal, setVisibleModal] = useState(false)

    

    function handleOpenPreview() { 
        navigation.navigate('preview');
    } 

    function handleOpenEdit() { 
        navigation.navigate('newad');
    } 

    function handleGoBack() {
        navigation.goBack()
    }

    function handleOpenModal() {
        setVisibleModal(true);
    }

    async function handleAdsEnabledOrDisabled() {
        try {
            setIsUpdating(true)
          
           //FAZER FUNÇÃO DE HABILITAR E DESABILITAR

            handleGoBack()

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

    async function handleDeleteAds() {
        try {
            setIsDeleting(true)
            
            //FAZER A FUNÇÃO DELETAR
        
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
        const user_id = route.params;
        console.log("user", user_id)


        // load 

        // functio load  {
        //     user_id

        //     const repose = awa it get('teste/'+ user_id)

        //     setData


        // }
    },[])

    return(
        <ScrollView
            contentContainerStyle={{ flexGrow: 1 }} 
            showsVerticalScrollIndicator={false}>

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
                        onPress={handleOpenPreview}
                    />          

                    <IconButton
                        icon={<PencilSimpleLine size={sizes[6]} color={colors.gray[600]} weight="bold"/>}
                        onPress={handleOpenEdit}
                    />
                </HStack>

                <View h='300px' >
                    <Image
                        w='full'
                        h='full'
                        // rounded="lg"                       
                        source={BackgroundImg}
                        alt="Tenis vermelho"              
                        resizeMode="cover"         
                    />
                </View>    

                {/* <VStack             
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
                    </VStack>                        
                </VStack> */}



                <VStack             
                    flex="1" 
                    padding={6}
                    backgroundColor='gray.100'
                >                    
                    <HStack space={3} mb={3}>
                        <Avatar 
                            h={5} w={5} 
                            rounded="full" 
                            bg="gray.100" 
                            source={{ uri: userPhoto }}
                        />          
                    
                        <Text color="gray.700">
                            Maria Gomes
                        </Text> 
                    </HStack>

                    <Status
                        title='Usado'
                        variant='Used'
                    />
                    
                    <HStack justifyContent="space-between" mt={5}>
                        <Text color="gray.700" fontFamily="heading" fontSize="lg">
                            Luminaria Pendente
                        </Text>

                        <Text color="blue.700" fontWeight="bold" fontSize="lg">
                            R$ 45,00
                        </Text>
                    </HStack>

                    <Text color="gray.700" mt={3}>
                        Este e um produto muito legal, pois ele pode ser usado 
                        em qualquer lugar e em qualqer momento e por qualquer pessoa, 
                        muito facil e pratico s de ser usado. Aproveite voce tambem!
                    </Text> 

                    <HStack space={3} mt={5}>
                        <Text color="gray.700" fontWeight="bold">
                            Aceita troca?
                        </Text>         
                    
                        <Text color="gray.700" >
                            Não
                        </Text> 
                    </HStack>                                     
       
                    <Text color="gray.700" mb={5} fontWeight="bold" mt={3}>
                        Meios de pagamentos aceitos:
                    </Text>

                    <VStack mt={2}>
                        
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

                <VStack pr={6} pl={6}>

                    <ButtonDefault 
                        title="Desativar anúncio" 
                        size="total"                             
                        variant="base2"  
                        onPress={handleAdsEnabledOrDisabled}
                        leftIcon={<Power size={sizes[5]} color={colors.gray[100]} />}
                        // onPress={handleNewAd}                    
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
            </VStack> 

            {(visibleModal) ?
                <ModalMenseger
                    title='Você deseja REALMENTE excluir este produto?'
                    nameButtonOne='Não, Volte!'
                    nameButtonTwo='Sim, Excluir!'
                    onPress={handleDeleteAds} 
                />
            :null}

        </ScrollView>       
    )        
}
