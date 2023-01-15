import { AppNavigatorRoutesProps } from '@routes/app.routes';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { View, Text, HStack, ScrollView, VStack, Box, Icon} from 'native-base';
import { Button } from '@components/Button'
import { UserPhoto } from '@components/UserPhoto';
import { useState } from 'react';

import { Feather } from '@expo/vector-icons';

export function Home(){

    const navigation = useNavigation<AppNavigatorRoutesProps>();
    const [userPhoto, setUserPhoto] = useState('https://github.com/JRSparrowII.png');

    return(

        <ScrollView 
            contentContainerStyle={{ flexGrow: 1 }} 
            showsVerticalScrollIndicator={false}
        >
            <VStack  
                mt={50}                         
                flex={1}                        
                px={10}                         
                backgroundColor="gray.200" 
            >
                <HStack justifyContent="space-between">

                    <HStack justifyContent="space-between">
                        <UserPhoto 
                            source={{ uri: userPhoto }}
                            alt="Foto do usuário"
                            size={10}
                            mr={2}
                        />

                        <VStack>
                            <Text color="black">Boas Vindas, </Text>  
                            <Text color="black" fontWeight="bold">Prisco </Text> 
                        </VStack>
                                        
                    </HStack>               

                    <Button 
                        title="Entrar" 
                        size="half"                             
                        variant="base2" 
                    //Colocar o icone no butao                      
                    />                    
                </HStack>  

                <Text 
                    color="gray.500"
                    mt={10}
                >
                    Seus produtos anunciados para vendas
                </Text>

                <Box
                    bg="blue.500" 
                    mt={5}          
                    rounded={5}   
                    h={20}      
                >
                    <HStack justifyContent="space-between">
                        <HStack justifyContent="space-between">
                            <Icon 
                                as={Feather}
                                name="arrow-left"
                                color="green.500"
                                size={6}
                            />

                            <VStack>
                                <Text color="black">04</Text>  
                                <Text color="black" fontWeight="bold">anuncios ativos</Text> 
                            </VStack>
                        </HStack>

                        <Text color="black" fontWeight="bold">anuncios ativos</Text> 
                    </HStack>
                    
                </Box>
            </VStack>   
            
           

                                 

        </ScrollView>        
        
    )
}