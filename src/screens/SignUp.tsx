import { Input } from '@components/Input'
import { Button } from '@components/Button'

import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import LogoSvg from '@assets/logo.svg';

// import { AppError } from "@utils/AppError";

import { VStack, Text, Center, Heading, ScrollView, Image, } from "native-base";

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
  

export function SignUp() {

    const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
        resolver: yupResolver(signUpSchema),
    });
    
    async function handleSignUp({name, email, telefone, password }: FormDataProps) {
             
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
                <Center mt={20} mb={12}>
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
                    <Heading color="gray.400" fontSize="md" mb={6}>
                        A imagem sera colocada aqui
                    </Heading>

                    <Controller 
                        control={control}
                        name="name"
                        render={({ field: { onChange, value } }) => (
                        <Input 
                            placeholder="Nome"
                            onChangeText={onChange}
                            value={value}                            
                            size="small"   
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
                            size="small"   
                            errorMessage={errors.name?.message}
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
                            value={value}                            
                            size="small"   
                            errorMessage={errors.name?.message}
                        />
                        )}
                    />

                    <Controller 
                        control={control}
                        name="password"
                        render={({ field: { onChange, value } }) => (
                        <Input 
                            placeholder="Senha" 
                            secureTextEntry
                            onChangeText={onChange}
                            value={value}
                            errorMessage={errors.password?.message}
                            size="small"
                        />
                        )}
                    />

                    <Controller 
                        control={control}
                        name="password_confirm"
                        render={({ field: { onChange, value } }) => (
                        <Input 
                            placeholder="Confirmar a Senha" 
                            secureTextEntry
                            onChangeText={onChange}
                            value={value}
                            onSubmitEditing={handleSubmit(handleSignUp)} //Usar o botao do teclado
                            returnKeyType="send"
                            errorMessage={errors.password_confirm?.message}
                            size="small"
                        />
                        )}
                    />                            

                    <Button 
                        title="Entrar" 
                        size="total"  
                        onPress={handleSubmit(handleSignUp)}                       
                    />
                    
                </Center>               
            
                <Center mt={10} mb={10}>
                    <Text color="gray.700" fontSize="sm" mb={3} fontFamily="body">
                        Ja possui uma conta?
                    </Text>

                    <Button 
                        title="Ir para o login" 
                        size="total"   
                        variant="outline"                  
                    />
                </Center>

            </VStack>            

        </ScrollView>

    );
}