import { AppNavigatorRoutesProps } from '@routes/app.routes';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Header } from '@components/Header';
import { Text, HStack, Icon, VStack, ScrollView, Image, Avatar, Box } from 'native-base';
import { FontAwesome5} from '@expo/vector-icons';
import { ButtonDefault } from '@components/Button'
import BackgroundImg from '@assets/produto_1.png';

import React, { useState } from "react";

export function Preview(){

    const navigation = useNavigation<AppNavigatorRoutesProps>();   
    const [userPhoto, setUserPhoto] = useState('https://github.com/JRSparrowII.png');

    function handleOpenPreview() { 
        navigation.navigate('preview');
    } 

    return(
        <ScrollView 
            contentContainerStyle={{ flexGrow: 1 }} 
            showsVerticalScrollIndicator={false}>

            <VStack>
                <Header
                    title='Pré visualização do anúncio'                
                    variant='base1'
                    subtitle='é assim que seu anauncio vai aparrecer'
                />

                <Image
                    w='full'
                    h={40}
                    // rounded="lg"                       
                    source={BackgroundImg}
                    alt="Tenis vermelho"              
                    resizeMode="cover"         
                />

                <VStack             
                    flex="1" 
                    padding={8}
                    backgroundColor='gray.200'
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

                    <Box
                        bg='blue.500' 
                        color="white"                       
                        fontSize={5} 
                        rounded={8}
                        h={5}
                        w={10}
                        mt={5}
                        textAlign="center"
                    >
                        Novo
                    </Box>

                    <HStack justifyContent="space-between">
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
                        
                </VStack>

                <HStack justifyContent="space-between" padding={8} space={2}>

                    <ButtonDefault 
                        title="Voltar e Editar" 
                        size="half"                             
                        variant="default"  
                        // onPress={handleNewAd}
                    //Colocar o icone no butao                      
                    />          

                    <ButtonDefault 
                        title="Publicar" 
                        size="half"                             
                        variant="base2" 
                        onPress={handleOpenPreview}
                    //Colocar o icone no butao                      
                    />                    
                </HStack>  
            </VStack> 
        </ScrollView>       
    )        
}