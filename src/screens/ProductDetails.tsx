import { AppNavigatorRoutesProps } from '@routes/app.routes';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Header } from '@components/Header';
import { Text, HStack, Icon, VStack, ScrollView, Image, Avatar, Box, IconButton, View } from 'native-base';
import { FontAwesome5} from '@expo/vector-icons';
import { ButtonDefault } from '@components/Button'
import BackgroundImg from '@assets/produto_1.png';

import { useTheme } from 'native-base';

import React, { useState } from "react";
import { Status } from '@components/Status';
import { ArrowLeft, PencilSimpleLine } from 'phosphor-react-native';

export function ProductDetails(){

    const navigation = useNavigation<AppNavigatorRoutesProps>();  
    const {colors, sizes} = useTheme(); 
    const [userPhoto, setUserPhoto] = useState('https://github.com/JRSparrowII.png');

    function handleGoBack() { 
        navigation.navigate('home');
    } 

    return(
        <ScrollView 
            contentContainerStyle={{ flexGrow: 1 }} 
            showsVerticalScrollIndicator={false}>

            <VStack backgroundColor='gray.100'>
                <HStack 
                    justifyContent="space-between" 
                    pt={8}
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
                        source={BackgroundImg}
                        alt="Tenis vermelho"              
                        resizeMode="cover"         
                    />
                </View>  
                
                <VStack             
                    flex="1" 
                    padding={8}
                    backgroundColor='gray.100'
                >                    
                    <HStack space={3}>
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

                    <Status variant='New' title='Novo'/>

                    <HStack justifyContent="space-between" mt={3}>
                        <Text color="gray.700" fontFamily="heading" fontSize="lg">
                            Teste da pagina
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
                        
                </VStack>

                <HStack justifyContent="space-between" padding={8} space={2}>

                    <Text color="blue.700" fontWeight="bold" fontSize="2xl">
                        R$ 145,00
                    </Text>      

                    <ButtonDefault 
                        title="Entrar em contato" 
                        size="half"                             
                        variant="base1" 
                        // onPress={handleOpenPreview}                    
                    />                    
                </HStack>  
            </VStack> 
        </ScrollView>       
    )        
}