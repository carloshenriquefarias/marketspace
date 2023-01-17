import { AppNavigatorRoutesProps } from '@routes/app.routes';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { View, Text, HStack, ScrollView, VStack, Box, Icon, useToast, FlatList} from 'native-base';
import { ButtonDefault } from '@components/Button'
import { Product } from '@components/Product'
import { UserPhoto } from '@components/UserPhoto';
import { useEffect, useState } from 'react'; 
import { InputFilter } from '@components/InputFilter'

import { AntDesign, FontAwesome5} from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons'; 

import { AppError } from '@utils/AppError';
import { api } from '@services/api';

export function Home(){

    const navigation = useNavigation<AppNavigatorRoutesProps>();
    const [userPhoto, setUserPhoto] = useState('https://github.com/JRSparrowII.png');
    const [product, setProduct] = useState<string[]>([
        // {
        //     id: '1'
        // },
        // {
        //     id: '2'
        // },
        // {
        //     id: '3'
        // },
        // {
        //     id: '4'
        // }
    ]);
    const toast = useToast();

    function handleProductDetails() {
        navigation.navigate('productdetails');
    } 
    
    function handleNewAd() {
        navigation.navigate('newad');
    }

    async function fetchProduct() {
        // try {
        //   const response = await api.get('a/docs');
        //   setProduct(response.data);
        //   // console.log(response.data);
    
        // } catch (error) {
        //   const isAppError = error instanceof AppError;
        //   const title = isAppError ? error.message : 'Não foi possível carregar os produtos';
    
        //   toast.show({
        //     title,
        //     placement: 'top',
        //     bgColor: 'red.500'
        //   })
        // }
    }

    useEffect(() => {
        fetchProduct();
    },[])

    return(

        <ScrollView 
            contentContainerStyle={{ flexGrow: 1 }} 
            showsVerticalScrollIndicator={false}
        >
            <VStack  
                mt={50}                         
                flex={1}                        
                px={6}                         
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

                    <ButtonDefault 
                        title="Criar Anúncio" 
                        size="half"                             
                        variant="base2" 
                        onPress={handleNewAd}
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
                    bg="blue.100" 
                    mt={5}          
                    rounded={5}   
                    h={20}                          
                >
                    <HStack justifyContent="space-between" alignItems="center" padding={3}>
                        <HStack 
                            justifyContent="space-between" 
                            alignItems="center"                                                
                        >
                            <Icon 
                                as={AntDesign}
                                name="tago"
                                color="blue.700"
                                size={6}
                            />

                            <VStack ml={4}>
                                <Text color="gray.600" fontSize={20} fontWeight="bold">4</Text>  
                                <Text color="black" fontSize={12}>anuncios ativos</Text> 
                            </VStack>
                        </HStack>

                        <HStack 
                            justifyContent="space-between" 
                            alignItems="center"                       
                        >
                            <Text color="blue.700" fontWeight="bold" fontSize={13}>Meus anuncios </Text>

                            <Icon 
                                as={FontAwesome5}
                                name="arrow-right"
                                color="blue.500"
                                size={4}
                                ml={1}
                            />                            
                        </HStack>                         
                    </HStack>                    
                </Box>

                <Text 
                    color="gray.500"
                    mt={10}
                >
                    Compre produtos variados
                </Text>

                <InputFilter
                    typeInput={"filter"}
                />

                <FlatList 
                    data={product}
                    keyExtractor={item => item.id}
                    numColumns={2}
                    renderItem={({ item }) => (
                        <Product                    
                            image='source={{ uri: userPhoto }}'
                            title='Tenis vermelho'
                            price={50}
                            status='NOVO'
                            avatar='source={{ uri: userPhoto }}'
                        />                      
                    )}
                    w='full' 
                    showsVerticalScrollIndicator={false}
                    _contentContainerStyle={{
                        paddingBottom: 20
                    }}
                /> 
                
                 
                

            </VStack>   
            
           

                                 

        </ScrollView>        
        
    )
}