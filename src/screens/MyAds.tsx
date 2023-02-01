import { AppNavigatorRoutesProps } from '@routes/app.routes';
import { AppTabNavigatorRoutesProps } from '@routes/app.tab.routes';
import { useNavigation} from '@react-navigation/native';

import { Text, HStack, VStack, ScrollView, CheckIcon, useTheme, Box, Select, 
    Center, FlatList, IconButton, useToast } from 'native-base'
;

import React, { useEffect, useState } from "react";

import { Plus } from 'phosphor-react-native';

import { Product } from '@components/Product';
import { api } from '@services/api';
import { AppError } from '@utils/AppError';

type ActiveTypes = 'todos' | 'ativos' | 'inativos';

const Selects = () => {
    const [service, setService] = React.useState("");
    return <Center>
        <Box maxW="300">
            <Select 
                selectedValue={service} 
                minWidth="150" 
                accessibilityLabel="Escolha o tipo de anúncio" 
                placeholder="Escolha o anuncio" 
                fontSize="md"

                _selectedItem={{
                    bg: "gray.700",
                    endIcon: 
                        <CheckIcon size="5"/>
                }} 
                mt={1} 
                onValueChange={itemValue => setService(itemValue)}
            >
                <Select.Item label="Todos" value="all" />
                <Select.Item label="Novos" value="new" />
                <Select.Item label="Usados" value="used" />
            </Select>
        </Box>
    </Center>;
};

export function MyAds(){

    const navigation = useNavigation<AppNavigatorRoutesProps>();  
    const navigationTab = useNavigation<AppTabNavigatorRoutesProps>(); 
    const {colors, sizes} = useTheme();
    const toast = useToast();

    const [active, setActive] = useState<ActiveTypes>('todos');
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

    function handleOpenPreview() { 
        navigation.navigate('preview');
    } 

    function handleGoHome() { 
        navigationTab.navigate('home');
    } 

    function handleNewAd() { 
        navigation.navigate('newad');
    } 

    async function fetchMyAds() {
       
        try {
          const response = await api.get('/products');
          setProduct(response.data);
            //   console.log(response.data);
    
        } catch (error) {
          const isAppError = error instanceof AppError;
          const title = isAppError ? error.message : 'Não foi possível carregar os produtos';
    
          toast.show({
            title,
            placement: 'top',
            bgColor: 'red.500'
          })
        }
    }

    useEffect(() => {
        fetchMyAds();
    },[])

    return(
        <ScrollView 
            contentContainerStyle={{ flexGrow: 1 }} 
            showsVerticalScrollIndicator={false}
            backgroundColor="gray.100"
        >            
            <VStack padding={6} backgroundColor="gray.100">

                <HStack 
                    justifyContent="space-between" 
                >
                    <IconButton/>  

                    <Center>
                        <Text 
                            fontFamily="heading" 
                            color="gray.700"
                            fontSize="2xl"
                        > 
                            Meus anúncios
                        </Text>
                    </Center>
                    
                    <IconButton
                        icon={<Plus size={sizes[6]} color={colors.gray[600]} weight="bold"/>}
                        onPress={handleNewAd}
                    />          

                </HStack>       

                <HStack justifyContent="space-between" alignItems="center" mt={5}>
                    <Text color="gray.700" fontFamily="body" fontSize="lg">
                        9 anúnicios
                    </Text>

                    <Selects/>
                </HStack>              
            </VStack> 

            <VStack pr={4} pl={6} backgroundColor="gray.100">            
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