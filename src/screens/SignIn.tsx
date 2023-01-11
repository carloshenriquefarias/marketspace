import { Input } from '@components/Input'
import { Button } from '@components/Button'
import { VStack, Text, Center, Heading, ScrollView} from "native-base";

export function SignIn() {
    return (
        <ScrollView 
            contentContainerStyle={{ flexGrow: 1 }} 
            showsVerticalScrollIndicator={false}>

            <VStack 
                flex={1} 
                px={10}   
                backgroundColor="gray.200"
                rounded={20}
            >                  
                <Center mt={32} mb={16}>

                    {/* <LogoSvg /> */}

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
                   
                    <Input 
                        placeholder="E-mail" 
                        keyboardType="email-address"
                        autoCapitalize="none"  
                        size="small"                      
                    />

                    <Input 
                        placeholder="Senha" 
                        keyboardType="email-address"
                        autoCapitalize="none" 
                        size="small"                         
                    />                    

                    <Button 
                        title="Entrar" 
                        size="total"                       
                    />
                    
                </Center>
               
            </VStack>

            <VStack 
                flex={1} 
                px={10}  
                backgroundColor="white"
                mt={10}
            >
                <Center>
                    <Text color="gray.700" fontSize="sm" mb={3} fontFamily="body">
                        Ainda não tem acesso?
                    </Text>

                    <Button 
                        title="Criar uma conta" 
                        size="total"   
                        variant="outline"                  
                    />
                </Center>

            </VStack>            

        </ScrollView>

    );
}