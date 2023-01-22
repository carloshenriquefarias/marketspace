import { Text, useTheme, HStack, VStack, ScrollView, Image, 
    Avatar, IconButton, View } from 'native-base'
;
import React, { useState } from "react";

import { AppNavigatorRoutesProps } from '@routes/app.routes';
import { useNavigation } from '@react-navigation/native';

import { ArrowLeft, Bank, Barcode, CreditCard, PencilSimpleLine, Power, 
    TrashSimple, Money, QrCode } from 'phosphor-react-native'
;

import { ButtonDefault } from '@components/Button';
import { Status } from '@components/Status';

import BackgroundImg from '@assets/produto_1.png';

export function MyAdsDetails(){

    const navigation = useNavigation<AppNavigatorRoutesProps>();   
    const [deactivate, setDeactivate] = useState();
    const [userPhoto, setUserPhoto] = useState('https://github.com/JRSparrowII.png');
    const {colors, sizes} = useTheme();

    function handleOpenPreview() { 
        navigation.navigate('preview');
    } 

    function handleOpenEdit() { 
        navigation.navigate('newad');
    } 

    function deactivateButton(){
        //CRIAR A FUNCAO DE DESATIVAR O ANUNCIO
    }

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
                        onPress={deactivate}
                        leftIcon={<Power size={sizes[5]} color={colors.gray[100]} />}
                        // onPress={handleNewAd}                    
                    />          

                    <ButtonDefault 
                        title="Excluir anúncio" 
                        size="total"                             
                        variant="default"  
                        onPress={handleOpenPreview}
                        mt={2}
                        leftIcon={<TrashSimple size={sizes[5]} color={colors.gray[700]} />}                    
                    />                    
                </VStack>  
            </VStack> 
        </ScrollView>       
    )        
}
