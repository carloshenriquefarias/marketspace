import { AppNavigatorRoutesProps } from '@routes/app.routes';
import { AppTabNavigatorRoutesProps } from '@routes/app.tab.routes';
import { useFocusEffect, useNavigation} from '@react-navigation/native';

import { Text, HStack, VStack, ScrollView, CheckIcon, useTheme, Box, Select, 
    Center, FlatList, IconButton, useToast } from 'native-base'
;

import React, { useCallback, useEffect, useState } from "react";

import { Plus } from 'phosphor-react-native';

import { Product } from '@components/Product';
import { api } from '@services/api';
import { AppError } from '@utils/AppError';
import { ProductDTO } from '@dtos/ProductDTO';
import { Pressable } from 'react-native';

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
    const [product, setProduct] = useState<ProductDTO[]>([]);
    const [filterSelected, setFilterSelected] = useState('todos');

    const [active, setActive] = useState<ActiveTypes>('todos');
    const [userPhoto, setUserPhoto] = useState('https://github.com/JRSparrowII.png'); 

    function handleOpenPreview() { 
        navigation.navigate('preview');
    } 

    function handleGoHome() { 
        navigationTab.navigate('home');
    } 

    function handleNewAd() { 
        navigation.navigate('newad');
    } 

    function handleProductDetails(userProduct_id: string) {
        navigation.navigate('myadsdetails', {userProduct_id});
    }    

    async function fetchMyAds() {       
        try {
            const response = await api.get('/users/products');
            setProduct(response.data);
            // console.log(response.data);
    
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

    useFocusEffect(useCallback(() => {
        fetchMyAds();
    },[]))

    return(
        <ScrollView 
            contentContainerStyle={{ flexGrow: 1 }} 
            showsVerticalScrollIndicator={false}
            backgroundColor="gray.100"
        >            
            <VStack padding={6} backgroundColor="gray.100" mt={3}>

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
                        {product.length} anúncios
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
                            product_images={item.product_images}
                            name={item.name}
                            price={item.price}
                            is_new={item.is_new}
                            is_active={item.is_active}
                            onPress={() => handleProductDetails(item.id)}
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