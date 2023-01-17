import { Input } from '@components/Input'
import { ButtonDefault } from '@components/Button'

import { useState } from "react";
import React from "react";

import { MaterialIcons } from "@expo/vector-icons";

import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import LogoSvg from '@assets/logo.svg';

import { AppError } from "@utils/AppError";

import { api } from "@services/api";
import  axios  from 'axios';

import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

import { useNavigation } from "@react-navigation/native";

import { VStack, Text, Center, Heading, ScrollView, Image, Stack, 
    Icon, Pressable, HStack, View, useToast, Skeleton} from "native-base";
import { UserPhoto } from '@components/UserPhoto';
import { TouchableOpacity } from 'react-native';

type FormDataProps = {
    name: string;
    email: string;
    telefone: string; //DEPOIS TRANSFORMAR PRA NUMERO
    password: string;
    password_confirm: string;
}
  
const signUpSchema = yup.object({
    name: yup.string().required('Informe o nome.'),
    email: yup.string().required('Informe o e-mail').email('E-mail inválido.'),
    telefone: yup.string().required('Digite seu telefone'),
    password: yup.string().required('Informe a senha').min(6, 'A senha deve ter pelo menos 6 dígitos.'),
    password_confirm: yup.string().required('Confirme a senha.').oneOf([yup.ref('password'), null], 'A confirmação da senha não confere')
});  

const PHOTO_SIZE = 20;

export function SignUp() {

    const navigation = useNavigation();  
    const toast = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [photoIsLoading, setPhotoIsLoading] = useState(false);
    const [userPhoto, setUserPhoto] = useState('https://github.com/JRSparrowII.png');

    const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
        resolver: yupResolver(signUpSchema),
    });

    function handleGoBack() {
        navigation.goBack();
    }    
    
    async function handleSignUp({name, email, telefone, password }: FormDataProps) {
        try {
            setIsLoading(true)        
      
           await api.post('/users', { name, email, telefone, password });            
            // await singIn(email, password)
      
        } catch (error) {
            setIsLoading(false);
        
            const isAppError = error instanceof AppError;
            const title = isAppError ? error.message : 'Não foi possível criar a conta. Tente novamente mais tarde';
        
            toast.show({    
                title,
                placement: 'top',
                bgColor: 'red.500'
            })
        }        
    }  

    async function handleUserPhotoSelected(){
        setPhotoIsLoading(true);
        
        try {
          const photoSelected = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
            aspect: [4, 4], //Tamanho da imagem
            allowsEditing: true, //Deixa o usuario editar a imagem
          });
      
          if(photoSelected.canceled) {
            return;
          }
    
            if(photoSelected.uri) {
        
                const photoInfo = await FileSystem.getInfoAsync(photoSelected.uri);
                
                if(photoInfo.size && (photoInfo.size  / 1024 / 1024 ) > 2){
                
                    return toast.show({
                        title: 'Essa imagem é muito grande. Escolha uma de até 5MB.',
                        placement: 'top',
                        bgColor: 'red.500'
                    })
                }        
                setUserPhoto(photoSelected.assets[0].uri);
            }
      
        } catch (error) {
          console.log(error)
          
        } finally {
          setPhotoIsLoading(false)
        }
    }

    return (
        <ScrollView 
            contentContainerStyle={{ flexGrow: 1 }} 
            showsVerticalScrollIndicator={false}>

            <VStack 
                flex={1} 
                px={10}   
                backgroundColor="gray.200"              
            >                  
                <Center mt={20} mb={8}>
                    <LogoSvg />

                    <Text color="gray.700" fontSize="25px" fontFamily="heading">
                        Boas vindas!
                    </Text>

                    <Text color="gray.400" fontSize="sm" textAlign="center">
                        Crie sua conta e use este espaço para comprar itens variados 
                        e vender seus produtos
                    </Text>

                </Center>

                <Center>                    
                   
                    <HStack alignItems="center">

                        { //Mudando a foto de perfil
                            photoIsLoading ?
                            <Skeleton 
                                w={PHOTO_SIZE}
                                h={PHOTO_SIZE}
                                rounded="full"
                                startColor="gray.700"
                                endColor="gray.400"
                            />
                            :
                            <UserPhoto 
                                source={{ uri: userPhoto }}
                                alt="Foto do usuário"
                                size={PHOTO_SIZE}
                                mr={-4}
                                mb={5}
                                ml={5}
                            />
                        }                       

                        <TouchableOpacity  
                            onPress={handleUserPhotoSelected}                           
                        >
                            <View 
                            mt={3} 
                            w={12} 
                            h={12} 
                            rounded={24} 
                            backgroundColor="white" 
                            alignItems="center"
                            >
                                <Icon  
                                    as={MaterialIcons} // No Icone passa a biblioteca e as propriedades
                                    name="edit" 
                                    color="gray.700"
                                    size={10}                                
                                />
                            </View>                        
                        </TouchableOpacity>

                    </HStack>

                    <Controller 
                        control={control}
                        name="name"
                        render={({ field: { onChange, value } }) => (
                        <Input 
                            placeholder="Nome"
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
                        name="email"
                        render={({ field: { onChange, value } }) => (
                            <Input 
                                placeholder="E-mail"
                                onChangeText={onChange}
                                value={value}
                                keyboardType="email-address"
                                autoCapitalize="none"       
                                            
                                errorMessage={errors.email?.message}
                            />
                        )}
                    />

                    <Controller 
                        control={control}
                        name="telefone"
                        render={({ field: { onChange, value } }) => (
                            <Input 
                                placeholder="Telefone"
                                onChangeText={onChange}
                                keyboardType="numeric"
                                value={value}  
                                type="text"                                
                                errorMessage={errors.telefone?.message}
                            />
                        )}
                    />

                    <Controller 
                        control={control}
                        name="password"
                        render={({ field: { onChange, value } }) => (
                            <Input 
                                placeholder="Senha" 
                                onChangeText={onChange}
                                value={value}
                                typeInput={"password"}
                                errorMessage={errors.password?.message}                                
                            />
                        )}
                    />

                    <Controller 
                        control={control}
                        name="password_confirm"
                        render={({ field: { onChange, value } }) => (
                            <Input 
                                placeholder="Confirmar a Senha"                                                               
                                onChangeText={onChange}
                                value={value}
                                onSubmitEditing={handleSubmit(handleSignUp)} //Usar o botao do teclado
                                returnKeyType="send"
                                typeInput={"password"}
                                errorMessage={errors.password_confirm?.message}  
                                                           
                            />
                        )}
                    />  
                  
                    <ButtonDefault 
                        title="Entrar" 
                        size="total"  
                        onPress={handleSubmit(handleSignUp)}  
                        isLoading={isLoading}                     
                        variant="base2"                       
                    />
                    
                </Center>               
            
                <Center mt={10} mb={10}>
                    <Text color="gray.700" fontSize="sm" mb={3} fontFamily="body">
                        Ja possui uma conta?
                    </Text>

                    <ButtonDefault 
                        title="Ir para o login" 
                        size="total"   
                        variant="default" 
                        onPress={handleGoBack}                 
                    />
                </Center>

            </VStack>            

        </ScrollView>

    );
}