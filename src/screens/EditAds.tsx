import { AppNavigatorRoutesProps } from '@routes/app.routes';
import { AppTabNavigatorRoutesProps } from '@routes/app.tab.routes';
import { useNavigation, useRoute } from '@react-navigation/native';

import React, { useEffect } from "react";
import { useState } from 'react';

import { Text, HStack, VStack, Button, Box, useTheme, Switch, 
   ScrollView, IconButton, Avatar, useToast, Alert , Radio, Checkbox,
   Container, FormControl, WarningOutlineIcon, Center, NativeBaseProvider, Icon
} from 'native-base';

import { ButtonDefault } from '@components/Button';
import { Input } from '@components/Input'
import { Images } from '@components/Image';
import { TextAreaAtual } from '@components/TextArea';
import { Loading } from '@components/Loading';

import { ArrowLeft, Plus } from 'phosphor-react-native';

import * as ImagePicker from 'expo-image-picker';
// import * as FileSystem from 'expo-file-system';

import { api } from '@services/api';
import { AppError } from '@utils/AppError';

import { AdsDTO } from '@dtos/AdsDTO';

import { InputNewAd } from '@components/InputNewAd';
import { storageAdsGet, storageAdsSave } from '@storage/storageAds';
import { TouchableOpacity } from 'react-native';
import { ModalMenseger } from '@components/ModalMenseger';
import { ProductDTO } from '@dtos/ProductDTO';

type RouteParams = {
    userProduct_id: ProductDTO;
}

export function EditAds(){

    const navigation = useNavigation<AppNavigatorRoutesProps>(); 
    const navigationTab = useNavigation<AppTabNavigatorRoutesProps>(); 

    // const route = useRoute();
    // const product = route.params as AdsDTO;

    const PHOTO_SIZE = 24;
    const toast= useToast();

    const {colors, sizes} = useTheme(); 

    const [isLoading, setIsLoading] = useState(false);
    // const [paymentMethods, setPaymentMethods] = useState<string[]>([])
    // const [ads, setAds] = useState<AdsDTO | undefined>(undefined);

    const [userPhoto, setUserPhoto] = useState<string | null>(null);  
    const [image, setImage] = useState(false);   

    const [switchValue, setSwitchValue] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [visibleModal, setVisibleModal] = useState(false)

    const [editing, setEditing] = useState(false)

    const route = useRoute();
    const {userProduct_id} = route.params as RouteParams; 

    // const paymentMethodsKey = product.payment_methods.map(({ key }) => key)

    // const [images, setImages] = useState<string[]>([])
    const [name, setName] = useState()
    const [description, setDescription] = useState()
    const [isNew, setIsNew] = useState <string | undefined> (undefined);
    const [price, setPrice] = useState()
    const [isTradable, setIsTradable] = useState()
    const [paymentMethods, setPaymentMethods] = useState([]) 

    const [product, setProduct] = useState<ProductDTO>({} as ProductDTO);
     

    // const [groupValue, setGroupValue] = React.useState([]);

    const RadioStatusProduct = () => {
        return (
            <Radio.Group 
                name="radioGroupStatusProduto" 
                accessibilityLabel="favorite number" 
                value={isNew} 
                justifyContent="space-between"
                onChange={nextValue => {setIsNew(nextValue)}}
            >
                <Radio value="new" my={1}>
                    Produto novo
                </Radio>

                <Radio value="used" my={1}>
                    Produto usado
                </Radio>
            </Radio.Group>
        );
    };

    const Switches = () => {      
        const toggleSwitch = (value) => {
            setIsTradable(value);
        };
      
        return (
            <VStack alignItems='flex-start'>
                <Switch
                    onValueChange={toggleSwitch}
                    value={isTradable}
                />
            </VStack>
        );
    };

    async function fetchGetProductDetails() {
        try {
            setIsLoading(true);
            const response = await api.get(`/products/${userProduct_id}`);
            // console.log(response.data); //Checar pra ver se ta trazendo os dados

            // setImages(response.data.images)
            setName(response.data.name);
            setDescription(response.data.description);
            setIsNew(response.data.is_new);
            setPrice(response.data.price);
            setIsTradable(response.data.isTradable);
            // setPaymentMethods(response.data.payment_methods)
        
        } catch (error) {
            const isAppError = error instanceof AppError;
            // const title = isAppError ? error.message : 'Não foi possível carregar os detalhes do produto';
            const title = 'Não foi possível carregar os detalhes do produto';
        
            toast.show({
                title,
                placement: 'top',
                bgColor: 'red.500'
            })
    
        } finally {
            setIsLoading(false);
        }
    }

    async function UpdateAds(product: AdsDTO) {
        try {

            setEditing(true)

            if (    
                    // product.images.length  === 0 || 
                    // product.payment_methods.length === 0 || 
                    product.name.trim() === '' || 
                    product.description.trim() === '' || 
                    product.price === null
                ) {

                return toast.show({
                    title: 'Por favor preenchar todos os campos.',
                    bg: 'yellow.400',
                    placement: 'top',
                    mx: 4,
                })
            }
    
            const data = {
                // images,
                name,
                description,
                // is_new,
                price,
                // accept_trade,
                // payment_methods,
            }

            console.log('NOVO ITEM', data);
        
            await api.put(`/products/${userProduct_id}`, data)

            toast.show({
                title: 'Dados do seu anúncio foram atualizados com sucesso!',
                placement: 'top',
                bgColor: 'green.500'
            });

        } catch (error) {
            const isAppError = error instanceof AppError;
            const title = isAppError ? error.message : 'Não foi possível atualizar os dados. Tente novamente mais tarde.';
        
            toast.show({
                title,
                placement: 'top',
                bgColor: 'red.500'
            })
        } finally {
            setEditing(false)
        }
    }

    // async function handleEditDataAds() {

    //     setEditing(true)

    //     const updatedAds: AdsDTO = {
    //         name: name,
    //         images: images,
    //         description: description,
    //         is_new: isNew,
    //         accept_trade: isTradable,
    //         // payment_methods: paymentMethods,
    //         price: Number(price)
    //     }
        
    //     try {
    //         // await editAnnounce (updatedAds, product.id)

    //         toast.show({
    //             title: 'Dados do seu anúncio foram atualizados com sucesso!',
    //             placement: 'top',
    //             bgColor: 'green.500'
    //         });

    //         handleGoBack()
    
    //     } catch (error) {
    //         const isAppError = error instanceof AppError;
    //         const title = isAppError ? error.message : 'Não foi possível atualizar os dados. Tente novamente mais tarde.';
        
    //         toast.show({
    //             title,
    //             placement: 'top',
    //             bgColor: 'red.500'
    //         })

    //     } finally {
    //         setEditing(false)
    //     }
    // }

    // async function handleDataUpdate(data: AdsDTO) { 
    //     try {
    //         setEditing(true)

    //         const updatedAds: AdsDTO = {
    //             name: name,
    //             images: images,
    //             description: description,
    //             is_new: isNew,
    //             accept_trade: isTradable,
    //             // payment_methods: paymentMethods,
    //             price: Number(price)
    //         }

    //         // setIsUpdating(true);
        
    //         // const userUpdated = user;
    //         // userUpdated.name = data.name;
        
    //         await api.put('/users/products', updatedAds); //PUT é o metodo para atualizar
        
    //         // await updateUserProfile(userUpdated);
        
    //         toast.show({
    //             title: 'Dados do seu anúncio foram atualizados com sucesso!',
    //             placement: 'top',
    //             bgColor: 'green.500'
    //         });

    //     } catch (error) {
    //         const isAppError = error instanceof AppError;
    //         const title = isAppError ? error.message : 'Não foi possível atualizar os dados. Tente novamente mais tarde.';
        
    //         toast.show({
    //             title,
    //             placement: 'top',
    //             bgColor: 'red.500'
    //         })

    //     } finally {
    //         setEditing(false)
    //         // setIsUpdating(false);
    //     }
    // }

    function handleGoBack() {
        navigation.goBack()
    }

    function handleOpenPreview() { 
        navigation.navigate('preview');
    } 

    function handleOpenMyAds() { 
        navigation.navigate('myads');
    } 

    function handleGoHome() { 
        navigationTab.navigate('home');
    } 

    function handleOpenModal() {
        setVisibleModal(true);
    }

    async function handleUserPhotoSelected(){

        // if(image.length > 3) {
        //     return toast.show({
        //       title: 'Seu produto pode ter somente 3 imagens',
        //       bg: 'yellow.500',
        //       placement: 'top',
        //       mx: 4
        //     })
        // } //Perguntar ao Prisco

        setImage(true);
        
        try {
          const photoSelected = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
            aspect: [4, 4],
            allowsEditing: true, 
          });
      
          if(photoSelected.canceled) {
            return;
          }           

            setUserPhoto(photoSelected.assets[0].uri);
      
        } catch (error) {
          console.log(error)  // trocar por toast informando que n foi possivel pegar a imagem        
        } 
    } 

    useEffect(() => {
        fetchGetProductDetails();
    },[userProduct_id])
   
    return(
        <VStack>
        
            <ScrollView 
                contentContainerStyle={{ flexGrow: 1 }} 
                showsVerticalScrollIndicator={false}
            >                                
                <VStack padding={8} backgroundColor='gray.100' flex={1}  pb='28%'>
                    <HStack justifyContent="space-between" pt={5}>
                        <IconButton
                            p={0}
                            icon={<ArrowLeft size={sizes[6]} color={colors.gray[500]} />}
                            onPress={navigation.goBack}
                        />

                        <Text fontSize="xl" fontFamily="heading">
                            Edite seu anúncio
                        </Text>

                        <Box size={6} bg="gray.300"/>
                    </HStack>

                    <VStack mt={5}>                
                        <Text color="gray.700" fontFamily="heading" fontSize="md">
                            Imagens
                        </Text>

                        <Text color="gray.700">
                            Escolha até 3 imagens para mostrar o quanto seu produto é incrivel!
                        </Text>

                        {/* <ScrollView mb={8} horizontal showsHorizontalScrollIndicator={false}>
                            {image.map (image => <Images source={{uri: image}} key={image} />)}
                            <TouchableOpacity onPress={handleUserPhotoSelected}>
                                <Center h='100px' w='100px' bg='gray.5' rounded='md'>
                                <Icon/>
                                </Center>
                            </TouchableOpacity>
                        </ScrollView> */}

                        <HStack 
                            justifyContent="flex-start" 
                            mt={5}
                            space={5}
                        >
                            {image ? (
                                <Images
                                    source={{ uri: userPhoto }}   
                                    size={24}  
                                    alt="photo"                  
                                />
                            ) : null}
                            
                            <HStack>
                                <Button
                                    onPress={handleUserPhotoSelected} 
                                    h={24} w={24} 
                                    backgroundColor="gray.300"
                                    alignItems="center"
                                >
                                    <Plus />
                                </Button> 
                            </HStack>                         
                        </HStack>

                        <Text color="gray.700" mt={5} mb={5} fontFamily="heading" fontSize="md">
                            Sobre o produto
                        </Text>

                        <Input 
                            placeholder="Título do anúncio"
                            onChangeText={() => setName}
                            value={name}          
                            keyboardType="default"
                            autoCapitalize="none"     
                            secureTextEntry={false}               
                        />                         
                    
                        <Input 
                            placeholder="Descrição do anúncio"
                            onChangeText={() => setDescription}
                            value={description}          
                            keyboardType="default"
                            autoCapitalize="none"     
                            secureTextEntry={false}               
                            size="high"
                        />                           
                        
                        <RadioStatusProduct />

                        <Text color="gray.700" mt={5} mb={5} fontFamily="heading" fontSize="md">
                            Venda
                        </Text>

                        <InputNewAd 
                            placeholder="Valor do produto"
                            onChangeText={() => setPrice}
                            value={price}          
                            keyboardType="numeric" //COLOCAR A MASCARA
                            autoCapitalize="none"     
                            secureTextEntry={false}               
                        />                          
                        
                        <Text color="gray.700" fontFamily="heading" fontSize="md">
                            Aceita troca?
                        </Text>

                        <Switches
                            // onChange={setIsTradable} 
                            // value={isTradable} 
                        />

                        <Text color="gray.700" fontFamily="heading" fontSize="md" mb={1}>
                            Meios de pagamentos aceitos:
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
                    </VStack>                    
                </VStack> 
            </ScrollView> 

            <HStack 
                justifyContent="space-between" 
                pr={8} pl={8}
                space={2} 
                bg="white" 
                pt={5} pb={5}
                position="absolute" 
                bottom={0}
                flex={1}
                w='full'
                h='12%'
            >
                <ButtonDefault 
                    title="Cancelar" 
                    size="half"                             
                    variant="default"  
                    onPress={handleOpenModal}                            
                />          

                <ButtonDefault 
                    title="Atualizar" 
                    size="half"                             
                    variant="base2" 
                    isLoading={isUpdating}  
                    // onPress={handleOpenModal}
                    onPress={UpdateAds}                                 
                />                    
            </HStack> 

            {(visibleModal) ?
                <ModalMenseger
                    title='Você deseja REALMENTE quer voltar a tela anterior? Você perderá tudo!'
                    nameButtonOne='Não, Quero Editar!'
                    nameButtonTwo='Sim, Retornar!'
                    onPress={handleOpenMyAds} 
                    //PRECISA PASSAR DUAS FUNÇÕES POIS SAO DOIS BOTOES DIFETENTES
                />
            :null}

        </VStack>      
    )        
}




// async function handleNewAd({ name, price, description }: AdsDTO) {
//     try {  

//         if(paymentMethods.length === 0) {
//             return toast.show({
//               title: 'Atenção! Por favor, escolha pelo menos um método de pagamento',
//               bgColor: 'yellow.500',
//               placement: 'top',
//             //   mx: 4,
//             })
//         }

//         if ( !statusProduto ) {
//             const title = 'Atenção! Por favor, informe se o produto novo ou usado.';

//             toast.show({    
//                 title,
//                 placement: 'top',
//                 bgColor: 'blue.500'
//             })           
//             return
//         }

//         if ( !userPhoto ) {
//             const title = 'Atenção! Por favor, escolha uma imagem.';

//             toast.show({    
//                 title,
//                 placement: 'top',
//                 bgColor: 'blue.500'
//             })           
//             return
//         }        
        
//         setIsLoading(true) 

//         const data = {
//             name: name,
//             description: description,
//             is_new:  getConverteStatusProdutoBoolean(statusProduto),
//             price: setPrice(price),
//             accept_trade:  true,
//             payment_methods: paymentMethods,
//             images: [userPhoto]
//             // images: [{uri: "qualquercoisa", type: "image"}]
//         }
//         console.log(data)

//         await storageAdsSave(data);
//         setIsLoading(false)
//         handleOpenPreview();               
              
//     } catch (error) {
//         setIsLoading(false);
    
//         const isAppError = error instanceof AppError;
//         const title = isAppError ? error.message : 
//         'Não foi possível enviar os dados. Tente novamente mais tarde';
    
//         toast.show({    
//             title,
//             placement: 'top',
//             bgColor: 'red.500'
//         })
//     }        
// }