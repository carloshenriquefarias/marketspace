import { AppNavigatorRoutesProps } from '@routes/app.routes';
import { AppTabNavigatorRoutesProps } from '@routes/app.tab.routes';
import { useNavigation } from '@react-navigation/native';

import { ArrowRight, Plus, Tag} from 'phosphor-react-native';

import { Product } from '@components/Product'
import { UserPhoto } from '@components/UserPhoto'
import { InputFilter } from '@components/InputFilter' 
import { Loading } from '@components/Loading'
import { ButtonDefault } from "@components/Button";
import { BoxCondition } from '@components/BoxCondition';

import { AppError } from '@utils/AppError';
import { api, baseURL } from '@services/api';

import { useAuth } from '@hooks/useAuth'
import { RFValue } from 'react-native-responsive-fontsize';
import { SafeAreaView } from 'react-native';

import { ProductDTO } from '@dtos/ProductDTO';

import { Box, FlatList, Checkbox, Heading, HStack, Icon, Pressable, useTheme,
    IconButton, ScrollView, Switch, Text, useToast, VStack 
} from "native-base";

import React, { useEffect, useMemo, useRef, useState } from "react";

import BottomSheet from "@gorhom/bottom-sheet";
import {AntDesign} from '@expo/vector-icons'

export function Home(){

    const navigation = useNavigation<AppNavigatorRoutesProps>();
    const toast = useToast();
    const bottomSheetRef = useRef<BottomSheet>(null)
    const snapPoints = useMemo(() => ['88%'] ,[]) 

    const { user } = useAuth();
    const { colors, sizes } = useTheme();
    
    const [loading, setLoading] = useState(true)
    const [userPhoto, setUserPhoto] = useState('https://github.com/JRSparrowII.png');
    const [isLoading, setIsLoading] = useState(false);                
    const [products, setProducts] = useState<ProductDTO[]>([]);
    const [conditionSelected, setConditionSelected] = useState('NOVO');        
    const [filterName, setFilterName] = useState('')
    const [isNew, setIsNew] = useState(true)
    const [acceptTrade, setAcceptTrade] = useState(true);
    const [paymentMethods, setPaymentMethods] = useState<string[]>([])

    const conditionOptions = ['Novo', 'Usado'];

    const Switches = () => {      
        const toggleSwitch = (value : any) => {
            setAcceptTrade(value);
        };
      
        return (
            <VStack alignItems='flex-start'>
                <Switch
                    onValueChange={toggleSwitch}
                    value={acceptTrade}
                />
            </VStack>
        );
    };

    function handleProductDetails(product_id: string) {
        navigation.navigate('productdetails', {product_id});
    }
    
    function handleNewAd() {
        navigation.navigate('newad');
    }

    function handleMyAds() {
        navigation.navigate('myads');
    }

    function handleOpenModal() {
        bottomSheetRef.current?.expand()
    }

    function handleCloseModal() {
        bottomSheetRef.current?.close()
    }

    async function fetchProduct() {       
        try {
            const response = await api.get('/products');
            setProducts(response.data);
            setLoading(false); 
    
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

    function handleCondition(item: string) {       
        setConditionSelected(item);             
        setIsNew(item ==='Novo' ? true : false);        
    }

    function resetCondition() {
        setConditionSelected(conditionOptions[0]);             
        setIsNew(true); 
    }

    async function handleFilterProducts() {
        try {      
            
            setIsLoading(true);                 
                       
            const params = `is_new=${isNew}&accept_trade=${acceptTrade}&payment_methods=${JSON.stringify(paymentMethods)}`

            const response = await api.get(`/products?${params}`)  
           
            setProducts(response.data)
            setIsLoading(false)
            handleCloseModal()
    
        } catch (error) {
            const isAppError = error instanceof AppError;
            const title = isAppError ? error.message : 'Não foi possível carregar os filtros do produto';
        
            toast.show({
                title,
                placement: 'top',
                bgColor: 'red.500'
            })
            setIsLoading(false)
        }
    }

    async function handleFilterByName() {
        try {           
           const response = await api.get(`/products?query=${filterName}`)
           setProducts(response.data)    

        } catch (error) {
            const isAppError = error instanceof AppError;
            const title = isAppError ? error.message : 'Não foi possível carregar os filtros do produto';
        
            toast.show({
                title,
                placement: 'top',
                bgColor: 'red.500'
            })
        }
    }

    async function handleResetFilters() {
        try {
            resetCondition()
            
            setFilterName('')                        
            setAcceptTrade(true)
            setPaymentMethods([])
    
            await fetchProduct()

        } catch (error) {
            const isAppError = error instanceof AppError;
            const title = isAppError ? error.message : 'Não foi possível carregar os resetar os filtros do produto';
        
            toast.show({
                title,
                placement: 'top',
                bgColor: 'red.500'
            })
        }
    }

    useEffect(() => {
        fetchProduct()
    },[])

    return(        
        <ScrollView 
            contentContainerStyle={{ flexGrow: 1 }} 
            showsVerticalScrollIndicator={false}
            backgroundColor="gray.100"
        >
            <SafeAreaView>                
                <VStack  
                    mt={50}                         
                    flex={1}                        
                    px={6}                    
                >
                    <HStack justifyContent="space-between">
                        <HStack justifyContent="space-between">
                            <UserPhoto 
                                source={
                                    user.avatar ? {uri: baseURL() + '/images/' + user.avatar} 
                                    : { 
                                        uri: userPhoto 
                                    } 
                                }
                                alt="Foto do usuário"
                                size={12}
                                mr={2}
                            />

                            <VStack>
                                <Text color="black" fontSize={RFValue(13)}>Boas Vindas, </Text>  
                                <Text color="black" fontFamily="heading" fontSize={RFValue(14)} fontWeight="700">{user.name}</Text> 
                            </VStack>                                            
                        </HStack>               

                        <ButtonDefault 
                            title="Criar Anúncio" 
                            size="half"                             
                            variant="base2" 
                            onPress={handleNewAd}
                            leftIcon={<Plus size={sizes[5]} color={colors.gray[200]} />}                 
                        />                    
                    </HStack>  

                    <Text color="gray.500" mt={10}>
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
                                <Tag color={colors.blue[500]} size={sizes[7]} />

                                <VStack ml={4}>
                                    <Text 
                                        color="gray.600" 
                                        fontFamily={'heading'} 
                                        fontSize={RFValue(20)} 
                                        fontWeight="bold" 
                                        lineHeight={'md'}
                                    >
                                        {products.length}
                                    </Text>  
                                    <Text color="black" fontSize={RFValue(12)}>anúncios ativos</Text> 
                                </VStack>
                            </HStack>

                            <Pressable onPress={handleMyAds}>
                                <HStack 
                                    justifyContent="space-between" 
                                    alignItems="center" 
                                    space={1}                      
                                >
                                    <Text 
                                        color="blue.700" 
                                        fontFamily={'heading'} 
                                        fontWeight="bold" 
                                        fontSize={RFValue(13)}
                                    >
                                        Meus anúncios 
                                    </Text>
                                    <ArrowRight color={colors.blue[500]} size={sizes[5]}/>
                                </HStack>   
                            </Pressable>                                                
                        </HStack>                    
                    </Box>

                    <Text color="gray.500" mt={8}>
                        Compre produtos variados
                    </Text>
                    
                    <InputFilter
                        value={filterName} 
                        onChangeText={setFilterName}
                        typeInput={"filter"}
                        filter={handleFilterByName}  
                        handleOpenModal={handleOpenModal}                 
                    />                     
                </VStack>

                <VStack pr={4} pl={6} backgroundColor="gray.100">                   
                    <FlatList
                        data={products} 
                        keyExtractor={item => item.id}
                        numColumns={2}

                        renderItem={({ item }) => (
                            (!loading) ?
                                <Product                    
                                    product_images={item.product_images}
                                    name={item.name}
                                    price={item.price}
                                    user={item.user}
                                    is_active={true}
                                    onPress={() => handleProductDetails(item.id)} 
                                /> 
                            :  
                            <Loading bgColor='white'/>                  
                        )}

                        w='full' 
                        showsVerticalScrollIndicator={false}
                        _contentContainerStyle={{ paddingBottom: 20 }}

                        ListEmptyComponent={() => (
                            <VStack alignItems='center' justifyContent='center' flex={1} mt={16}>                                    
                                <Text fontFamily='body' color='gray.400' fontSize='md'>
                                    Nenhum anúncio encontrado
                                </Text>
                            </VStack>
                        )}
                    />                    
                </VStack>

                <BottomSheet
                    ref={bottomSheetRef}
                    snapPoints={snapPoints}
                    enablePanDownToClose
                    index={-1}
                >
                    <VStack flex={1} px={6}>
                        <HStack justifyContent='space-between' alignItems='center'>
                            <Heading fontFamily='heading' fontSize='xl' color='gray.700'>
                                Filtrar anúncios
                            </Heading>

                            <IconButton
                                onPress={handleCloseModal}
                                icon={<Icon
                                    as={AntDesign}
                                    name='close'
                                    size={6}
                                    color='gray.600'
                                />}
                            />
                        </HStack>

                        <ScrollView 
                            showsVerticalScrollIndicator={false} 
                            contentContainerStyle={{paddingBottom: 16}}
                        >
                            <Text fontFamily='heading' fontSize='sm' color='gray.600' mb={3}>
                                Condição
                            </Text>
                        
                            <HStack mb={6} space={5}>
                                <FlatList 
                                    data={conditionOptions}
                                    keyExtractor={item => item}
                                    renderItem={({ item }) => (
                                        <BoxCondition 
                                            name={item}
                                            isActive={conditionSelected.toLocaleUpperCase() 
                                                === item.toLocaleUpperCase()}
                                            onPress={() =>  handleCondition(item)}                                               
                                        />                                                                         
                                    )}
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                />                                                                 
                            </HStack>

                            <Text fontFamily='heading' fontSize='sm' color='gray.600' mb={1}>
                                Aceita troca?
                            </Text>
                        
                            <Switches/>

                            <Text fontFamily='heading' fontSize='sm' color='gray.600' mb={3}>
                                Métodos de Pagamentos Aceitos:
                            </Text>
                            
                            <Checkbox.Group 
                                onChange={setPaymentMethods} 
                                value={paymentMethods} 
                                accessibilityLabel="choose numbers"
                            >
                                <Checkbox value='boleto' mb={1}>Boleto</Checkbox>
                                <Checkbox value='pix' mb={1}>Pix</Checkbox>
                                <Checkbox value='cash' mb={1}>Dinheiro</Checkbox>
                                <Checkbox value='card' mb={1}>Cartão Crédito</Checkbox>
                                <Checkbox value='deposit' mb={1}>Depósito Bancário</Checkbox>
                            </Checkbox.Group>   

                            <HStack 
                                justifyContent="space-between" 
                                space={2} 
                                pt={5} 
                                pb={5}
                            >
                                <ButtonDefault 
                                    title="Resetar Filtros" 
                                    size="half"                             
                                    variant="default"  
                                    onPress={handleResetFilters}                    
                                />          

                                <ButtonDefault 
                                    title="Aplicar Filtros" 
                                    size="half"                             
                                    variant="base1" 
                                    isLoading={isLoading}
                                    onPress={handleFilterProducts}                                      
                                />                    
                            </HStack> 
                        </ScrollView>
                    </VStack>
                </BottomSheet>
            </SafeAreaView>                             
        </ScrollView>        
    )
}