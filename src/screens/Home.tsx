import { AppNavigatorRoutesProps } from '@routes/app.routes';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react'; 

import { Pressable, useTheme } from 'native-base';
import { ArrowRight, Plus, Tag } from 'phosphor-react-native';

import { Text, HStack, ScrollView, VStack, Box, useToast, FlatList} from 'native-base';

import { ButtonDefault } from '@components/Button'
import { FilterModal } from '@components/FilterModal'
import { Product } from '@components/Product'
import { UserPhoto } from '@components/UserPhoto';
import { InputFilter } from '@components/InputFilter' 

import { AppError } from '@utils/AppError';
import { api } from '@services/api';

import { useAuth } from '@hooks/useAuth'
import { RFValue } from 'react-native-responsive-fontsize';
import { SafeAreaView } from 'react-native';
import { Loading } from '@components/Loading';

import { ProductDTO } from '@dtos/ProductDTO';
import { SignOutModal } from '@components/SignOutModal';


type RouteParamsProps = {
    productId: string;
}

// import { formatCoin } from '@utils/FormatCoin';

export function Home(){

    const navigation = useNavigation<AppNavigatorRoutesProps>();
    const {colors, sizes} = useTheme();
    const [visibleModal, setVisibleModal] = useState(false)
    const [loading, setLoading] = useState(true)
    const [userPhoto, setUserPhoto] = useState('https://github.com/JRSparrowII.png');
    const [product, setProduct] = useState<ProductDTO[]>([]);
    const [ads, setAds] = useState([]);

    const route = useRoute()
    // const { productId } = route.params as RouteParamsProps;

    const toast = useToast();
    const { user } = useAuth();
 
    function handleProductDetails() {
        navigation.navigate('productdetails');
    } 
    
    function handleNewAd() {
        navigation.navigate('newad');
    }

    function handleMyAds() {
        navigation.navigate('myads');
    }

    function handleOpenModal() {
        setVisibleModal(true);
    }

    function handleCloseModal() {
        setVisibleModal(false);
    }

    async function fetchProduct() {       
        try {
            const responseUsersProducts = await api.get(`/users/products`);

            const response = await api.get('/products');

            setProduct(response.data);
            setAds(responseUsersProducts.data)
            setLoading(false) 
            console.log(response.data)
    
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
        fetchProduct();
    },[])

    return(
        
        <ScrollView 
            contentContainerStyle={{ flexGrow: 1 }} 
            showsVerticalScrollIndicator={false}
            backgroundColor="gray.200"
        >
            <SafeAreaView>
                <VStack  
                    mt={25}                         
                    flex={1}                        
                    px={6}                    
                >
                    <HStack justifyContent="space-between">

                        <HStack justifyContent="space-between">
                            <UserPhoto 
                                source={
                                    user.avatar ? {uri: api.defaults.baseURL + '/images/' + user.avatar} 
                                    : { 
                                        uri: userPhoto 
                                    } 
                                } 

                                alt="Foto do usuário"
                                size={12}
                                mr={2}
                            />

                            <VStack>
                                <Text color="black" fontSize={RFValue(12)}>Boas Vindas, </Text>  
                                <Text color="black" fontFamily="heading" fontSize={RFValue(12)} fontWeight="700">{user.name}</Text> 
                            </VStack>
                                            
                        </HStack>               

                        <ButtonDefault 
                            title="Criar Anúncio" 
                            
                                                       
                            variant="base2" 
                            onPress={handleNewAd}
                            leftIcon={<Plus size={sizes[5]} color={colors.gray[200]} />}                 
                        />                    
                    </HStack>  

                    <Text 
                        color="gray.500"
                        mt={8}
                    >
                        Seus produtos anunciados para vendas
                    </Text>

                    <Box
                        bg="blue.100" 
                        mt={4}          
                        rounded={5}   
                        h={16}                          
                    >
                        <HStack justifyContent="space-between" alignItems="center" padding={3}>
                            <HStack 
                                justifyContent="space-between" 
                                alignItems="center"                                                
                            >
                                <Tag color={colors.blue[500]} size={sizes[7]} />

                                <VStack ml={4}>
                                    <Text color="gray.600" fontFamily={'heading'} 
                                        fontSize={RFValue(18)} fontWeight="bold" lineHeight={'md'}
                                    >
                                        
                                        {ads.length}
                                    </Text>  
                                    <Text color="black" fontSize={RFValue(10)}>anúncios ativos</Text> 
                                </VStack>
                            </HStack>

                            <Pressable onPress={handleMyAds}>
                                <HStack 
                                    justifyContent="space-between" 
                                    alignItems="center" 
                                    space={1}                      
                                >
                                    <Text color="blue.700" fontFamily={'heading'} 
                                    fontWeight="bold" fontSize={RFValue(11)}>Meus anúncios </Text>
                                    <ArrowRight color={colors.blue[500]} size={sizes[5]}/>
                                </HStack>   
                            </Pressable>
                                                
                        </HStack>                    
                    </Box>

                    <Text 
                        color="gray.500"
                        mt={8}
                    >
                        Compre produtos variados
                    </Text>
                    
                    <InputFilter
                        typeInput={"filter"}
                        fulanodetal={handleOpenModal}                           
                    />
                </VStack>

                <VStack pr={4} pl={6} >
                    { 
                        
                        
                        <FlatList //VER ERRO DE ID NA FLATLIST
                            data={product}
                            keyExtractor={item => item.id}
                            numColumns={2}
                            showsHorizontalScrollIndicator={false}
                            renderItem={({ item }) => (
                                (!loading) ?
                                <Product                    
                                    name={item.name}
                                    price={item.price}
                                    user={item.user}
                                    product_images={item.product_images}
                                    is_new={item.is_new}
                                />    
                                : <Loading bgColor='white'/>
                                                 
                            )}

                            w='full' 
                            showsVerticalScrollIndicator={false}
                            _contentContainerStyle={{
                                paddingBottom: 20
                            }}
                            ListEmptyComponent={() => (
                                    <VStack alignItems='center' justifyContent='center' flex={1} mt={16}>
                                        
                                        <Text fontFamily='body' color='gray.4' fontSize='md'>
                                        Nenhum anúncio encontrado
                                        </Text>
                                    </VStack>
                                    )}
                        /> 


                        // <FlatList
                        //     data={Products}
                        //     keyExtractor={item => item.id}
                        //     numColumns={2}
                        //     columnWrapperStyle={{ justifyContent: 'space-between' }}
                        //     contentContainerStyle={{ paddingBottom: 92 }}
                        //     showsVerticalScrollIndicator={false}
                        //     //refreshControl={<RefreshControl size={1} refreshing={refreshing} onRefresh={handleResetFilters}/>}
                        //     renderItem={({item}) => {
                        //     if(!loadingProducts) {
                        //         return (
                        //         <ProductCard
                        //         onPress={() => handleProductDetails(item.id)}
                        //         name={item.name}
                        //         avatar={item.user.avatar}
                        //         price={item.price}
                        //         is_new={item.is_new}
                        //         image={item.product_images[0].path}
                        //         />
                        //         )
                        //     }
                        //     return <SkeletonCard/>
                        //     }
                        //     }
                        //     ListEmptyComponent={() => (
                        //     <VStack alignItems='center' justifyContent='center' flex={1} mt={16}>
                        //         <LogoSvg/>
                        //         <Text fontFamily='body' color='gray.4' fontSize='md'>
                        //         Nenhum anúncio encontrado
                        //         </Text>
                        //     </VStack>
                        //     )}
                        // />
                    }
                </VStack>
                
            {/* {(visibleModal) ?
                <FilterModal title='NOVO'/>
            :null} */}

            {(visibleModal) ?
                <SignOutModal/>
            :null}
            
        </SafeAreaView>                            
        </ScrollView>
        
    )
}