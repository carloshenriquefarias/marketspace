import { AppNavigatorRoutesProps } from '@routes/app.routes';
import { useNavigation } from '@react-navigation/native';
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

export function Home(){

    const navigation = useNavigation<AppNavigatorRoutesProps>();
    const {colors, sizes} = useTheme();
    const [visibleModal, setVisibleModal] = useState(false)
    const [userPhoto, setUserPhoto] = useState('https://github.com/JRSparrowII.png');
    const [product, setProduct] = useState<string[]>([]);
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
          const response = await api.get('/sessions');
        //   setProduct(response.data);
          console.log(response.data);
    
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
                            source={
                                user.avatar ? {uri: user.avatar} : { uri: userPhoto } 
                            } //Colocar o icone

                            alt="Foto do usuário"
                            size={10}
                            mr={2}
                        />

                        <VStack>
                            <Text color="black">Boas Vindas, </Text>  
                            <Text color="black" fontWeight="bold"> {user.name} </Text> 
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
                            <Tag color={colors.blue[500]} size={sizes[7]} />

                            <VStack ml={4}>
                                <Text color="gray.600" fontSize={20} fontWeight="bold" lineHeight={'2xl'}>
                                    4
                                </Text>  
                                <Text color="black" fontSize={12}>anuncios ativos</Text> 
                            </VStack>
                        </HStack>

                        <Pressable onPress={handleMyAds}>
                            <HStack 
                                justifyContent="space-between" 
                                alignItems="center" 
                                space={1}                      
                            >
                                <Text color="blue.700" fontWeight="bold" fontSize={13}>Meus anuncios </Text>
                                <ArrowRight color={colors.blue[500]} size={sizes[5]}/>
                            </HStack>   
                        </Pressable>
                                              
                    </HStack>                    
                </Box>

                <Text 
                    color="gray.500"
                    mt={10}
                >
                    Compre produtos variados
                </Text>
                
                {/* <HStack justifyContent="space-between" space={2}> //EXCLUIR ISSO DEPOIS DE PRONTO
                    <ButtonDefault 
                        variant="base1" size="half" title='teste'
                        onPress={handleProductDetails}
                    />

                    <ButtonDefault 
                        variant="base2" size="half" title='Meus anuncios'
                        onPress={handleMyAds}
                    />
                </HStack> */}
                
                <InputFilter
                    typeInput={"filter"}
                    fulanodetal={handleOpenModal}
                />

                {/* <FlatList 
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
                /> */}

               
                {(visibleModal) ?
                    <FilterModal />
                :null}

            </VStack>                         

        </ScrollView>
    )
}
















 {/* <FlatList
    pt={4}
    mb={10}
    data={product}
    keyExtractor={(item) => item.id}
    
    renderItem={({ item }) => (
        <Product                    
            image='source={{ uri: userPhoto }}'
            title='Tenis vermelho'
            price={50}
            status='NOVO'
            avatar='source={{ uri: userPhoto }}'
            item={item}
            onPress={() => handleProductDetails(item.id)}
        /> 
    )}
    
    numColumns={2}
    columnWrapperStyle={{ flex: 1, justifyContent: 'space-between' }}
    showsVerticalScrollIndicator={false}
    ItemSeparatorComponent={() => <Box py={3} />}
    ListFooterComponent={<Box my={10} />}
/> */}
