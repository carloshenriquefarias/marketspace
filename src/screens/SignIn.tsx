import { Input } from '@components/Input'
import { ButtonDefault } from '@components/Button'
import { Loading } from '@components/Loading'
import { VStack, Text, Center, Heading, ScrollView, useToast, Button, HStack} from "native-base";

import { AuthNavigatorRoutesProps } from '@routes/auth.routes';
import { useNavigation } from "@react-navigation/native";
import { useAuth } from '@hooks/useAuth'

import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import LogoSvg from '@assets/logo.svg';
import GoogleSvg from '@assets/google.svg';
import AppleSvg from '@assets/apple.svg';

import { AppError } from '@utils/AppError';

import { useState } from 'react';
import { Platform } from 'react-native';

type FormDataProps = {    
    email: string;    
    password: string;    
}
  
const signInSchema = yup.object({   
    email: yup.string().required('Informe o e-mail').email('E-mail inválido.'),    
    password: yup.string().required('Informe a senha').min(6, 'A senha deve ter pelo menos 6 dígitos.'),
});  

export function SignIn() {

    const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
        resolver: yupResolver(signInSchema),
    });

    const { signIn, 
        signInWithGoogle,  signInWithApple,
    } = useAuth();

    const toast = useToast();
    const [isLoading, setIsLoading] = useState(false);

    const navigation = useNavigation<AuthNavigatorRoutesProps>();

    function handleNewAccount() {
        navigation.navigate('signUp');
    }
    
    async function handleSignIn({email, password}: FormDataProps) {
        try {
            setIsLoading(true)
            await signIn(email, password);   

        } catch (error) {

            const isAppError = error instanceof AppError
            const title = isAppError ? error.message : 'Não foi possível entrar agora! Tente mais tarde!'
           
            setIsLoading(false)

            toast.show({
                title,
                placement: 'top',
                bgColor: 'red.500',
            });           
        }         
    }   
    
    async function handleSignInWithGoogle() {
        try {
          setIsLoading(true);
          return await signInWithGoogle();

        } catch (error) {

            const isAppError = error instanceof AppError
            const title = isAppError ? error.message : 'Não foi possível conectar a conta Google'
           
            setIsLoading(false)

            toast.show({
                title,
                placement: 'top',
                bgColor: 'red.500',
            });           
        }
    }

    async function handleSignInWithApple() {
        try {
          setIsLoading(true);
          return await signInWithApple();

        } catch (error) {

            const isAppError = error instanceof AppError
            const title = isAppError ? error.message : 'Não foi possível conectar a conta Apple'
           
            setIsLoading(false)

            toast.show({
                title,
                placement: 'top',
                bgColor: 'red.500',
            });           
        }
    }

    return (
        <ScrollView 
            contentContainerStyle={{ flexGrow: 1 }} 
            showsVerticalScrollIndicator={false}>
            
            <VStack backgroundColor="gray.100" flex={1} >

                <VStack                     
                    px={10}                       
                    rounded={50}
                    mt={60}
                >                  
                    <Center mb={5}>
                        <LogoSvg />

                        <Text color="gray.700" fontSize="35px" fontFamily="heading">
                            marketspace
                        </Text>

                        <Text color="gray.400" fontSize="sm">
                            Seu espaço de compra e venda
                        </Text>
                    </Center>

                    <Center >
                        <Heading color="gray.400" fontSize="md" mb={6}>
                            Acesse sua conta
                        </Heading>

                        <Controller 
                            control={control}
                            name="email"
                            render={({ field: { onChange, value } }) => (
                            <Input 
                                placeholder="Email"
                                onChangeText={onChange}
                                keyboardType="email-address"
                                autoCapitalize="none" 
                                value={value}                             
                                errorMessage={errors.email?.message}
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
                                    // secureTextEntry
                                    errorMessage={errors.password?.message}                                
                                />
                            )}
                        />
                        
                        <ButtonDefault
                            title="Entrar" 
                            size="total"  
                            variant="base1" 
                            onPress={handleSubmit(handleSignIn)} 
                            isLoading={isLoading}                     
                        />                        
                    </Center>                
                </VStack>

                <VStack 
                    flex={1} 
                    px={10}  
                    backgroundColor="gray.100"
                    mt={5}
                >
                    <Center>  
                        <Text color="gray.700" fontSize="md" mb={3} fontFamily="body" mt={3}>
                            Ou entrar com
                        </Text>  

                        <Button
                            w={'100%'}
                            h={16}
                            bg="gray.300"
                            rounded={30}
                            onPress={handleSignInWithGoogle}
                            _pressed={{bg:'gray.400' }}
                        >
                            <HStack 
                                justifyContent="space-between" 
                                alignItems="center" 
                                space={4}                      
                            >
                                <GoogleSvg />
                                <Text color="gray.700" fontWeight="bold" fontSize={14}>Minha conta Google</Text>
                            </HStack>       
                        </Button>                

                        {   
                            Platform.OS === 'ios' &&          
                            <Button
                                w={'100%'}
                                h={16}
                                bg="gray.300"
                                rounded={30}
                                onPress={handleSignInWithApple} 
                                mt={5}
                                _pressed={{bg:'gray.400' }}
                            >
                                <HStack 
                                    justifyContent="space-between" 
                                    alignItems="center" 
                                    space={4}                      
                                >
                                    <AppleSvg />
                                    <Text color="gray.700" fontWeight="bold" fontSize={14}>Minha conta Apple</Text>
                                </HStack>       
                            </Button>    
                        }   
                    </Center>
                </VStack> 

                <VStack 
                    flex={1} 
                    px={10}  
                    backgroundColor="white"
                    mt={60}
                >
                    <Center mb={10}>
                        <Text color="gray.700" fontSize="sm" mb={3} fontFamily="body" mt={5}>
                            Ainda não tem acesso?
                        </Text>

                        <ButtonDefault 
                            title="Criar uma conta" 
                            size="total"   
                            variant="default"  
                            onPress={handleNewAccount}                
                        />                        
                    </Center>
                </VStack>  
            </VStack>       
        </ScrollView>
    );
}