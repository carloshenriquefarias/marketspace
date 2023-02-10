import { AppNavigatorRoutesProps } from '@routes/app.routes';
import { AppTabNavigatorRoutesProps } from '@routes/app.tab.routes';
import { useNavigation } from '@react-navigation/native';

import React from "react";
import { useState } from 'react';

import { Text, HStack, VStack, Button, Box, useTheme, Switch, 
   ScrollView, IconButton, Avatar, useToast, Alert , Radio, Checkbox,
   Container, FormControl, WarningOutlineIcon, Center, NativeBaseProvider, Icon
} from 'native-base';

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

import { AdsDTO } from '@dtos/AdsDTO';

import { InputNewAd } from '@components/InputNewAd';
import { storageAdsGet, storageAdsSave } from '@storage/storageAds';
import { TouchableOpacity } from 'react-native';

const NewAdSchema = yup.object({
    name: yup.string().required('Informe o nome do produto'),
    description: yup.string().required('Descreva como é o seu produto'),
    price: yup.string().required('Digite o preço do seu produto'),
});

export function NewAd(){

    const { control, handleSubmit, formState: { errors } } = useForm<AdsDTO>({
        resolver: yupResolver(NewAdSchema),
    });

    const navigation = useNavigation<AppNavigatorRoutesProps>(); 
    const navigationTab = useNavigation<AppTabNavigatorRoutesProps>(); 

    const [isLoading, setIsLoading] = useState(false);
    const [paymentMethods, setPaymentMethods] = useState<string[]>([])
    
    const toast= useToast();
    const {colors, sizes} = useTheme();    

    const [userPhoto, setUserPhoto] = useState<string | null>(null);  
    const [image, setImage] = useState(false);    
    const PHOTO_SIZE = 24;

    const [switchValue, setSwitchValue] = useState(false);
    const [statusProduto, setStatusProduto] = useState<string | undefined>(undefined);

    // const [groupValue, setGroupValue] = React.useState([]);

    // React.useEffect(() => {
    //     alert(groupValue)
    // },[groupValue])    

    const RadioStatusProduct = () => {
        return (
            <Radio.Group 
                name="radioGroupStatusProduto" 
                accessibilityLabel="favorite number" 
                value={statusProduto} 
                justifyContent="space-between"
                onChange={nextValue => {setStatusProduto(nextValue)}}
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

    function handleOpenPreview() { 
        navigation.navigate('preview');
    } 

    function handleGoHome() { 
        navigationTab.navigate('home');
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

    async function handleNewAd({ name, price, description }: AdsDTO) {
        try {  

            if(paymentMethods.length === 0) {
                return toast.show({
                  title: 'Atenção! Por favor, escolha pelo menos um método de pagamento',
                  bgColor: 'yellow.500',
                  placement: 'top',
                //   mx: 4,
                })
            }

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
            
            setIsLoading(true) 

            const data = {
                name: name,
                description: description,
                is_new:  getConverteStatusProdutoBoolean(statusProduto),
                price: setPrice(price),
                accept_trade:  true,
                payment_methods: paymentMethods,
                images: [userPhoto]
                // images: [{uri: "qualquercoisa", type: "image"}]
            }
            console.log(data)

            await storageAdsSave(data);
            setIsLoading(false)
            handleOpenPreview();               
                  
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

                        <Controller 
                            control={control}
                            name="name"
                            render={({ field: { onChange, value } }) => (
                                <Input 
                                    placeholder="Título do anúncio"
                                    onChangeText={onChange}
                                    value={value}          
                                    keyboardType="default"
                                    autoCapitalize="none"     
                                    secureTextEntry={false}               
                                    errorMessage={errors.name?.message}
                                />
                            )}
                        />

                        <Controller
                            control={control}
                            name="description"
                            render={({ field: { onChange, value } }) => (
                                <Input 
                                    placeholder="Descrição do anúncio"
                                    onChangeText={onChange}
                                    value={value}          
                                    keyboardType="default"
                                    autoCapitalize="none"     
                                    secureTextEntry={false}               
                                    errorMessage={errors.description?.message}
                                    size="high"
                                />
                            )}
                        />

                        <RadioStatusProduct />

                        <Text color="gray.700" mt={5} mb={5} fontFamily="heading" fontSize="md">
                            Venda
                        </Text>

                        <Controller 
                            control={control}
                            name="price"
                            render={({ field: { onChange, value } }) => (
                                <InputNewAd 
                                    placeholder="Valor do produto"
                                    onChangeText={onChange}
                                    value={value}          
                                    keyboardType="numeric" //COLOCAR A MASCARA
                                    autoCapitalize="none"     
                                    secureTextEntry={false}               
                                    errorMessage={errors.price?.message}
                                />
                            )}
                        />

                        <Text color="gray.700" fontFamily="heading" fontSize="md">
                            Aceita troca?
                        </Text>

                        <Switches/>

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