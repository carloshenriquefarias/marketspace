import { Input } from '@components/Input'
import { Button } from '@components/Button'
import { VStack, Text, Center, Heading, ScrollView} from "native-base";

import { AuthNavigatorRoutesProps } from '@routes/auth.routes';
import { useNavigation } from "@react-navigation/native";

import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import LogoSvg from '@assets/logo.svg';

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

    const navigation = useNavigation<AuthNavigatorRoutesProps>();

    function handleNewAccount() {
        navigation.navigate('signUp');
    }

    async function handleSignIn({email, password }: FormDataProps) {
        // console.log(handleSignUp)
    }  

    return (
        <ScrollView 
            contentContainerStyle={{ flexGrow: 1 }} 
            showsVerticalScrollIndicator={false}>
            
            <VStack backgroundColor="gray.200" flex={1}>

                <VStack                     
                    px={10}                       
                    rounded={50}
                    mt={60}
                >                  
                    <Center mb={16}>

                        <LogoSvg />

                        <Text color="gray.700" fontSize="35px" fontFamily="heading">
                            marketspace
                        </Text>

                        <Text color="gray.400" fontSize="sm">
                            Seu espaço de compra e venda
                        </Text>

                    </Center>

                    <Center>
                        <Heading color="gray.400" fontSize="md" mb={6}>
                            Acesse sua conta
                        </Heading>

                        <Controller 
                            control={control}
                            name="email"
                            render={({ field: { onChange, value } }) => (
                            <Input 
                                placeholder="Nome"
                                onChangeText={onChange}
                                keyboardType="email-address"
                                autoCapitalize="none" 
                                // iconInput="icon"
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
                        
                        <Button 
                            title="Entrar" 
                            size="total"  
                            variant="base1" 
                            onPress={handleSubmit(handleSignIn)}                      
                        />
                        
                    </Center>
                
                </VStack>

                <VStack 
                    flex={1} 
                    px={10}  
                    backgroundColor="white"
                    mt={60}
                >
                    <Center>
                        <Text color="gray.700" fontSize="sm" mb={3} fontFamily="body" mt={5}>
                            Ainda não tem acesso?
                        </Text>

                        <Button 
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