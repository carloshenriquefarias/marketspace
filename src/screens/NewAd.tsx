import { AppNavigatorRoutesProps } from '@routes/app.routes';
import { AppTabNavigatorRoutesProps } from '@routes/app.tab.routes';
import { useNavigation } from '@react-navigation/native';

import React from "react";
import { useState } from 'react';

import { Text, HStack, VStack, Button, Radio, Stack, TextArea, Box, useTheme, Center,
    Switch, Checkbox, ScrollView, IconButton, Avatar, useToast, Alert } from 'native-base'
;

import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { ButtonDefault } from '@components/Button';
import { Input } from '@components/Input'

import { ArrowLeft, Plus } from 'phosphor-react-native';

import * as ImagePicker from 'expo-image-picker';
import { api } from '@services/api';
import { AppError } from '@utils/AppError';
// import * as FileSystem from 'expo-file-system';

type NewAdData = {
    image: string;
    title: string;
    description: string;
    product_status: string;
    price: string;
    swap?: string; //troca
    method_payment: string;
}

const NewAdSchema = yup.object({
    image: yup.string().required('Informe o nome.'), //Ver isso com Prisco
    title: yup.string().required('Informe o título do produto'),
    description: yup.string().required('Descreva como é o seu produto'),
    product_status: yup.string().required('Escolha o estado do seu produto'),
    price: yup.string().required('Digite o preço do seu produto'),
    swap: yup.string().required('Escolha se aceita a troca ou não'),
    method_payment: yup.string().required('Escolha seu metodo de pagamento'),
});  

const TextAreas = () => {
    return <Box alignItems="center" w="100%">
            <TextArea 
                h={40} 
                w="full" maxW="full"
                placeholder="Descrição do produto"
                backgroundColor="white"
                fontSize="md"
                borderColor="blue.500"
                size={14}
            />
        </Box>
    ;
};

const Toasts = () => {
  const toast = useToast();
  return <Center>
        <VStack space={2}>           

            <Button onPress={() => toast.show({
                title: "Hello world",
                placement: "top"
            })}>
                Top
            </Button>
           
        </VStack>
    </Center>;
};

const Radios = () => {
    return <Radio.Group name="exampleGroup" defaultValue="1" accessibilityLabel="pick a size">
        <Stack 
            mt={5}
            direction={{
                base: "row",
                md: "row"
            }} 
            alignItems={{
            base: "space-between",
            md: "space-between"
            }} 
            space={10} 
            w="100%" maxW="300px"
        >
            
            <Radio value="1" colorScheme="blue" size="md" my={1}>
                Produto Novo
            </Radio>

            <Radio value="2" colorScheme="blue" size="md" my={1}>
                Produto Usado
            </Radio>
            
        </Stack>
    </Radio.Group>;
};

const Switchs = () => {
    return <HStack alignItems="center" space={0}>
        <Text></Text>
        <Switch size="lg" color="blue" bg="blue"/>
    </HStack>;
};

const Checkboxs = () => {
    const [groupValues, setGroupValues] = React.useState([]);
    return <Checkbox.Group onChange={setGroupValues} value={groupValues} accessibilityLabel="choose numbers">
        <Checkbox value="one">Boleto</Checkbox>
        <Checkbox value="two" mt={2} >Pix</Checkbox>
        <Checkbox value="three" mt={2}>Dinheiro</Checkbox>
        <Checkbox value="four" mt={2}>Cartão de crédito</Checkbox>
        <Checkbox value="five" mt={2}>Depósito Bancário</Checkbox>
    </Checkbox.Group>;
};  

export function NewAd(){

    const { control, handleSubmit, formState: { errors } } = useForm<NewAdData>({
        resolver: yupResolver(NewAdSchema),
    });
    const [imageUpload, setImageUpload] = useState<any>(null);

    const navigation = useNavigation<AppNavigatorRoutesProps>(); 
    const navigationTab = useNavigation<AppTabNavigatorRoutesProps>(); 

    const [isLoading, setIsLoading] = useState(false);
    const toast= useToast();

    const {colors, sizes} = useTheme(); 

    const [userPhoto, setUserPhoto] = useState('https://github.com/JRSparrowII.png');  
    const [image, setImage] = useState(false);    
    const PHOTO_SIZE = 24;

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
          console.log(error)
          
        } finally {
          setImage(false)
        }
    }

    async function handleNewAd({ image, title, description, product_status, 
        price, swap, method_payment}: NewAdData) {
        try {
            setIsLoading(true)        
      
           await api.post('/products', { image, title, description, product_status, 
            price, swap, method_payment });            
      
        } catch (error) {
            setIsLoading(false);
        
            const isAppError = error instanceof AppError;
            const title = isAppError ? error.message : 'Não foi possível enviar os dados. Tente novamente mais tarde';
        
            toast.show({    
                title,
                placement: 'top',
                bgColor: 'red.500'
            })
        }        
    }  

    // async function upload() {
    
    //     if ( !imageUpload ) {

    //         <Toasts />
    //         // Alert.alert ('Atenção!', 'Por favor, escolha uma imagem.')
    //         return
    //     }
    
    //     let formData = new FormData();
    //     // const idCompany = await AsyncStorage.getItem('@PCAuth:idCompany')
            
    //     formData.append("image", {
    //       uri: imageUpload,
    //       name: "image.jpg",
    //       type: "image/jpg",
    //     });
    
    //     formData.append('title', title)
    //     formData.append('description', description)
    //     formData.append('product_status', product_status)
    //     formData.append('price', price)
    //     formData.append('swap', swap)
    //     formData.append('method_payment', method_payment)
    
    //     const response = await api.post('/products', formData, {
    //         headers: {
    //             'Content-Type': 'multipart/form-data',
    //         },
    //         transformRequest: (data, headers) => {            
    //             return formData;
    //         },
    //     });

    //     if (response.data.success) {
    //     //   Alert.alert("", "Adicionado com sucesso.");  
    //       navigation.navigate("preview")
    //     }   
    // }

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
                            justifyContent="space-between" 
                            mt={5}
                        >
                            <Button
                                onPress={handleUserPhotoSelected} 
                                h={24} w={24} 
                                backgroundColor="gray.300"
                                alignItems="center"
                            >
                                {image ? (
                                    <Avatar
                                        source={{ uri: userPhoto }}   
                                        size={24}                     
                                    />
                                ) : (
                                    <Plus />
                                )}
                            </Button>   

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

                        <Controller //PRECISA DO CONTROLER
                            control={control}
                            name="title"
                            render={({ field: { onChange, value } }) => (
                                <TextAreas/> 
                            )}
                        />

                        {/* <TextAreas/>            */}

                        <Radios/>

                        <Text color="gray.700" mt={5} mb={5} fontFamily="heading" fontSize="md">
                            Venda
                        </Text>

                        <Controller 
                            control={control}
                            name="price"
                            render={({ field: { onChange, value } }) => (
                            <Input 
                                placeholder="R$ Valor do produto"
                                onChangeText={onChange}
                                value={value}          
                                keyboardType="default"
                                autoCapitalize="none"     
                                secureTextEntry={false}               
                                errorMessage={errors.price?.message}
                            />
                            )}
                        />

                        <Text color="gray.700" fontFamily="heading" fontSize="md">
                            Aceita troca?
                        </Text>

                        <Switchs/>

                        <Text color="gray.700" mb={5}>
                            Meios de pagamentos aceitos:
                        </Text>

                        <Checkboxs/>     
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
                    // onPress={upload}   
                    onPress={handleSubmit(handleNewAd)}                                     
                />                    
            </HStack>  
        </VStack>      
    )        
}