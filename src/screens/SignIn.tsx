import { Input } from '@components/Input'
import { ButtonDefault } from '@components/Button'
import { Loading } from '@components/Loading'
import { VStack, Text, Center, Heading, ScrollView, useToast, Button, HStack, KeyboardAvoidingView} from "native-base";

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
    <KeyboardAvoidingView behavior="padding">
        <ScrollView
            contentContainerStyle={{ flexGrow: 1 }} 
            showsVerticalScrollIndicator={false}
        >
            <VStack 
                backgroundColor="gray.200" 
                px={12}    
                pb={16}
                pt={32}     
                rounded="3xl"
            >   
                    <Center >
                        <LogoSvg />

                        <Text color="gray.700" fontSize="35px" fontFamily="heading" >
                            marketspace
                        </Text>

                        <Text color="gray.400" fontSize="sm" mt={-2} >
                            Seu espaço de compra e venda
                        </Text>
                    </Center>

                    <Center pt={16}>
                        <Heading color="gray.600" fontSize="sm" mb={4}>
                            Entre com sua conta
                        </Heading>

                        <Controller 
                            control={control}
                            name="email"
                            render={({ field: { onChange, value } }) => (
                            <Input  
                                secureTextEntry={false}
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
                                    errorMessage={errors.password?.message}                                
                                />
                            )}
                        />
                        
                        <ButtonDefault
                            mt={4}
                            title="Entrar" 
                            size="total"  
                            variant="base1" 
                            onPress={handleSubmit(handleSignIn)} 
                            isLoading={isLoading}                     
                        />  
                                              
                    </Center>     
                               
                

                {/* <VStack 
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
                </VStack>  */}

            
            </VStack>    
            <Center pt={12} px={12} pb={"full"} bg="white" >
                <Text color="gray.700" fontSize="sm" mb={4} fontFamily="body">
                    Ainda não tem acesso?
                </Text>
                <ButtonDefault 
                    title="Criar uma conta" 
                    size="total"   
                    variant="default"  
                    onPress={handleNewAccount}                
                />                        
            </Center>   
        </ScrollView>
    </KeyboardAvoidingView>
    );
}