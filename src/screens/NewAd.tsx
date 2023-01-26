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
import { Images } from '@components/Image';
import { TextAreaAtual } from '@components/TextArea';
import { RadiosAtual } from '@components/Radios';

import { ArrowLeft, Plus } from 'phosphor-react-native';

import * as ImagePicker from 'expo-image-picker';
// import * as FileSystem from 'expo-file-system';

import { api } from '@services/api';
import { AppError } from '@utils/AppError';

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
    // image: yup.string().required('Informe o nome.'), //Ver isso com Prisco
    title: yup.string().required('Informe o título do produto'),
    //description: yup.string().required('Descreva como é o seu produto'),
    // product_status: yup.string().required('Escolha o estado do seuR produto'),
    amount: yup.string().required('Digite o preço do seu produto'),
    //swap: yup.string().required('Escolha se aceita a troca ou não'),
    //method_payment: yup.string().required('Escolha seu metodo de pagamento'),
});  

// const TextAreas = () => {
//     return <Box alignItems="center" w="100%">
//             <TextArea 
//                 h={40} 
//                 w="full" maxW="full"
//                 placeholder="Descrição do produto"
//                 backgroundColor="white"
//                 fontSize="md"
//                 borderColor="blue.500"
//                 size={14}
//             />
//         </Box>
//     ;
// };

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
        <Checkbox value="1">Boleto</Checkbox>
        <Checkbox value="2" mt={2} >Pix</Checkbox>
        <Checkbox value="3" mt={2}>Dinheiro</Checkbox>
        <Checkbox value="4" mt={2}>Cartão de crédito</Checkbox>
        <Checkbox value="5" mt={2}>Depósito Bancário</Checkbox>
    </Checkbox.Group>;
};  

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

    async function handleNewAd({ title, amount }: NewAdData) {
        try {
            setIsLoading(true)   

            if ( !userPhoto ) {
                const title = 'Atenção! Por favor, escolha uma imagem.';

                toast.show({    
                    title,
                    placement: 'top',
                    bgColor: 'blue.500'
                })           
                return
            }

            const name = title
            const description =  "Essa é a melhor luminária do mundo. Você não vai se arrepender";
            const is_new =  true;
            const price = setPrice(amount)
            const accept_trade =  true;
            const payment_methods =  ["pix"];  

            const response_product = await api.post('/products', 
                { image, name , description, is_new,  price : setPrice(amount)  , accept_trade, payment_methods },
                {
                    headers: {          
                        "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzQ3Njg5MzgsImV4cCI6MTY3NDg1NTMzOCwic3ViIjoiMzY2NjU3ODEtN2I3NC00YzQzLWJlYzEtYjcwMmQ1ZjlhNmNiIn0.FH30l07dunRaOjgU3dx7PlvDmK5S78JUxgIBp_NCTBc`
                    } 
                }
            );  
                        
            if (response_product.data.id) {
            
                let formData = new FormData();
                        
                formData.append("images", {
                    uri: userPhoto,
                    name: "image.jpg",
                    type: "image/jpg",
                });
    
                formData.append('product_id', response_product.data.id)
               
                const response = await api.post('/products/images', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzQ3Njg5MzgsImV4cCI6MTY3NDg1NTMzOCwic3ViIjoiMzY2NjU3ODEtN2I3NC00YzQzLWJlYzEtYjcwMmQ1ZjlhNmNiIn0.FH30l07dunRaOjgU3dx7PlvDmK5S78JUxgIBp_NCTBc`
                    },
                    transformRequest: (data, headers) => {                        
                        return formData;
                    },
                });

                alert('salvo com sucesso') // trocar pelo toast

            } else {
                throw new Error();
            }  
      
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

                        {/* <TextAreas/>            */}

                        <RadiosAtual/>

                        <Text color="gray.700" mt={5} mb={5} fontFamily="heading" fontSize="md">
                            Venda
                        </Text>

                        <Controller 
                            control={control}
                            name="amount"
                            render={({ field: { onChange, value } }) => (
                            <Input 
                                placeholder="R$ Valor do produto"
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

                        <Switchs />

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