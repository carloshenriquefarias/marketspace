import { AppNavigatorRoutesProps } from '@routes/app.routes';
import { AppTabNavigatorRoutesProps } from '@routes/app.tab.routes';
import { useNavigation } from '@react-navigation/native';

import React from "react";
import { useState } from 'react';

import { Text, HStack, VStack, Button, Box, useTheme, Switch, 
   ScrollView, IconButton, Avatar, useToast, Alert , Radio, Checkbox } from 'native-base'
;

import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

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

import { InputNewAd } from '@components/InputNewAd';
import { storageAdsGet, storageAdsSave } from '@storage/storageAds';

type NewAdData = {
    image: [ImageGroup] //O image É UM ARRAY DE STING (3 FOTOS)
    title: string;
    description: string;
    product_status: string;
    amount: string;
    swap?: string; //troca
    method_payment: string;
}

type ImageGroup = {
    //AQUI ESTAO INSERIDAS AS 3 IMAGENS
};

const NewAdSchema = yup.object({
    title: yup.string().required('Informe o título do produto'),
    //description: yup.string().required('Descreva como é o seu produto'),
    amount: yup.string().required('Digite o preço do seu produto'),
    //swap: yup.string().required('Escolha se aceita a troca ou não'),
    //method_payment: yup.string().required('Escolha seu metodo de pagamento'),
});  

export function NewAd(){

    const { control, handleSubmit, formState: { errors } } = useForm<NewAdData>({
        resolver: yupResolver(NewAdSchema),
    });
    const [ imageUpload, setImageUpload] = useState<any>(null);
    const [ valueRadio, setValueRadio] = useState('1'); //Valor do radio no console log

    const navigation = useNavigation<AppNavigatorRoutesProps>(); 
    const navigationTab = useNavigation<AppTabNavigatorRoutesProps>(); 

    const [isLoading, setIsLoading] = useState(false);
    const toast= useToast();

    const {colors, sizes} = useTheme(); 

    const [userPhoto, setUserPhoto] = useState<string | null>(null);  
    const [image, setImage] = useState(false);    
    const PHOTO_SIZE = 24;

    const [switchValue, setSwitchValue] = useState(false);
    const [statusProduto, setStatusProduto] = useState<string | undefined>(undefined);
    const [groupValues, setGroupValues] = React.useState([]);

    const RadioStatusProduct = () => {
        return <Radio.Group name="radioGroupStatusProduto" 
            accessibilityLabel="favorite number" 
            value={statusProduto} 
            onChange={nextValue => {
                setStatusProduto(nextValue);
            }
            }>
                <Radio value="new" my={1}>
                Produto novo
                </Radio>
                <Radio value="used" my={1}>
                Produto usado
                </Radio>
        </Radio.Group>;
    };

    const Switches = () => {
      
        const toggleSwitch = (value) => {
          setSwitchValue(value);
        };
      
        return (
            <VStack alignItems='flex-start'>
                <Switch
                    onValueChange={toggleSwitch}
                    value={switchValue}
                />
            </VStack>
        );
    };

    const Checkboxes = () => {
    
        return(
            <Checkbox.Group onChange={setGroupValues} value={groupValues} accessibilityLabel="choose numbers">
                <Checkbox value="boleto">Boleto</Checkbox>
                <Checkbox value="pix" mt={2} >Pix</Checkbox>
                <Checkbox value="dinheiro" mt={2}>Dinheiro</Checkbox>
                <Checkbox value="cartão de crédito" mt={2}>Cartão de crédito</Checkbox>
                <Checkbox value="depósito bancário" mt={2}>Depósito Bancário</Checkbox>
            </Checkbox.Group>
        );
    }

    function handleOpenPreview() { 
        navigation.navigate('preview');
    } 

    function handleGoHome() { 
        navigationTab.navigate('home');
    } 

    async function handleUserPhotoSelected(){
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

    function setPrice(amount : string) {
        return parseFloat(amount);
    }

    function getConverteStatusProdutoBoolean(status : string): boolean {
        if (statusProduto == "new") {
            return true;
        } else {
            return false;
        }
    }    

    async function handleNewAd({ title, amount }: NewAdData) {
        try {
            setIsLoading(true)   

            if ( !statusProduto ) {
                const title = 'Atenção! Por favor, informe se o produto novo ou usado.';

                toast.show({    
                    title,
                    placement: 'top',
                    bgColor: 'blue.500'
                })           
                return
            }

            if ( !userPhoto ) {
                const title = 'Atenção! Por favor, escolha uma imagem.';

                toast.show({    
                    title,
                    placement: 'top',
                    bgColor: 'blue.500'
                })           
                return
            }            

            const data = {
                name: title,
                description:  "Essa é a melhor luminária do mundo. Você não vai se arrepender",
                is_new:  getConverteStatusProdutoBoolean(statusProduto),
                price: setPrice(amount),
                accept_trade:  true,
                payment_methods: ["pix"],
                images: [{uri: "qualquercoisa", type: "image"}]
            }

            await storageAdsSave (data);
            // const adLoad = await storageAdsGet();
            // console.log(adLoad);
        
            handleOpenPreview();

            // const response_product = await api.post('/products', 
            //     { image, name , description, is_new,  price : setPrice(amount),
            //     accept_trade, payment_methods },
                
            // );  
                        
            // if (response_product.data.id) {   

            //     let formData = new FormData(); 

            //     formData.append("images", {
            //         uri: userPhoto,
            //         name: "image.jpg",
            //         type: "image/jpg",
            //     });
    
            //     formData.append('product_id', response_product.data.id)
               
            //     const response = await api.post('/products/images', formData, {
            //         headers: {
            //             'Content-Type': 'multipart/form-data',
            //         },
            //         transformRequest: (data, headers) => {                        
            //             return formData;
            //         },
            //     });

            //     const title = 'Salvo com sucesso';
            //     toast.show({    
            //         title,
            //         placement: 'top',
            //         bgColor: 'green.500'
            //     })   
                
            //     handleOpenPreview();

            //     return

            // } else {
            //     throw new Error();
            // }         
                  
        } catch (error) {
            setIsLoading(false);
        
            const isAppError = error instanceof AppError;
            const title = isAppError ? error.message : 
            'Não foi possível enviar os dados. Tente novamente mais tarde';
        
            toast.show({    
                title,
                placement: 'top',
                bgColor: 'red.500'
            })
        }        
    }
   
    return(
        <VStack>
        
            <ScrollView 
                contentContainerStyle={{ flexGrow: 1 }} 
                showsVerticalScrollIndicator={false}>
                                
                <VStack padding={8} backgroundColor='gray.100' flex={1}  pb='28%'>
                    <HStack justifyContent="space-between" pt={5}>
                        <IconButton
                            p={0}
                            icon={<ArrowLeft size={sizes[6]} color={colors.gray[500]} />}
                            onPress={navigation.goBack}
                        />

                        <Text fontSize="xl" fontFamily="heading">
                            Criar anúncio
                        </Text>

                        <Box size={6} bg="gray.100"/>
                    </HStack>

                    <VStack mt={5}>                
                        <Text color="gray.700" fontFamily="heading" fontSize="md">
                            Imagens
                        </Text>

                        <Text color="gray.700">
                            Escolha até 3 imagens para mostrar o quanto seu produto é incrivel!
                        </Text>

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

                        <Controller 
                            control={control}
                            name="title"
                            render={({ field: { onChange, value } }) => (
                                <Input 
                                    placeholder="Título do anúncio"
                                    onChangeText={onChange}
                                    value={value}          
                                    keyboardType="default"
                                    autoCapitalize="none"     
                                    secureTextEntry={false}               
                                    errorMessage={errors.title?.message}
                                />
                            )}
                        />

                        <Controller
                            control={control}
                            name="description"
                            render={({ field: { onChange, value } }) => (
                                <TextAreaAtual
                                    placeholder="Descrição do anúncio"
                                    onChangeText={onChange}
                                    value={value}          
                                    keyboardType="default"
                                    autoCapitalize="none"     
                                    secureTextEntry={false}               
                                    errorMessage={errors.description?.message}
                                /> 
                            )}
                        />

                        <RadioStatusProduct />

                        <Text color="gray.700" mt={5} mb={5} fontFamily="heading" fontSize="md">
                            Venda
                        </Text>

                        <Controller 
                            control={control}
                            name="amount"
                            render={({ field: { onChange, value } }) => (
                                <InputNewAd 
                                    placeholder="Valor do produto"
                                    onChangeText={onChange}
                                    value={value}          
                                    keyboardType="default"
                                    autoCapitalize="none"     
                                    secureTextEntry={false}               
                                    errorMessage={errors.amount?.message}
                                />
                            )}
                        />

                        <Text color="gray.700" fontFamily="heading" fontSize="md">
                            Aceita troca?
                        </Text>

                        <Switches/>

                        <Text color="gray.700" fontFamily="heading" fontSize="md" mb={5}>
                            Meios de pagamentos aceitos:
                        </Text>

                        <Checkboxes/>   
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
                    onPress={handleGoHome}                            
                />          

                <ButtonDefault 
                    title="Avançar" 
                    size="half"                             
                    variant="base2" 
                    isLoading={isLoading}  
                    onPress={handleSubmit(handleNewAd)}                                 
                />                    
            </HStack>  
        </VStack>      
    )        
}