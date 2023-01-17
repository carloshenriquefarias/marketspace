import { AppNavigatorRoutesProps } from '@routes/app.routes';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Header } from '@components/Header';
import { View, Text, HStack, Icon, VStack, Button, Radio, Stack, Switch, Checkbox, ScrollView } from 'native-base';
import { FontAwesome5} from '@expo/vector-icons';
import { ButtonDefault } from '@components/Button'

import React, { useState } from "react";
import { TextArea, Box, Center, NativeBaseProvider } from "native-base";

import { Input } from '@components/Input'

const TextAreas = () => {
    const [textAreaValue, setTextAreaValue] = useState();
    return <Box alignItems="center" w="100%">
            <TextArea value={textAreaValue}
                placeholder="Descrição do produto"
                backgroundColor="gray.100"
                // onChange={e => setTextAreaValue(e.currentTarget.value)} // for web
                onChangeText={text => setTextAreaValue(text)}
                w="100%" maxW="300" 
            />
      </Box>;
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
            
            <Radio value="1" colorScheme="green" size="md" my={1}>
                Produto Novo
            </Radio>

            <Radio value="2" colorScheme="green" size="md" my={1}>
                Produto Usado
            </Radio>
            
        </Stack>
    </Radio.Group>;
};

const Switchs = () => {
    return <HStack alignItems="center" space={0}>
        <Text></Text>
        <Switch size="lg" />
      </HStack>;
};

const Checkboxs = () => {
    const [groupValues, setGroupValues] = React.useState([]);
    return <Checkbox.Group onChange={setGroupValues} value={groupValues} accessibilityLabel="choose numbers">
        {/* <Checkbox value="one" my={2}>
          Boleto
        </Checkbox> */}
        <Checkbox value="one">Boleto</Checkbox>
        <Checkbox value="two" mt={2}>Pix</Checkbox>
        <Checkbox value="three" mt={2}>Dinheiro</Checkbox>
        <Checkbox value="four" mt={2}>Cartão de crédito</Checkbox>
        <Checkbox value="five" mt={2}>Depósito Bancário</Checkbox>
      </Checkbox.Group>;
};
  

export function NewAd(){

    const navigation = useNavigation<AppNavigatorRoutesProps>();   

    function handleOpenPreview() { 
        navigation.navigate('preview');
    } 

    function handleGoHome() { 
        navigation.navigate('home');
    } 

    return(
        <ScrollView 
            contentContainerStyle={{ flexGrow: 1 }} 
            showsVerticalScrollIndicator={false}>

            
            <VStack>
                <Header
                    title='Criar Anúncio'                
                />

                <VStack             
                    // flex="1" 
                    padding={8}
                    backgroundColor='gray.200'
                    // h="500px"
                    // width="full"
                >
                    <Text color="gray.700" fontFamily="heading">
                        Imagens
                    </Text>

                    <Text color="gray.700">
                        Escolha até 3 imagens para mostrar o quanto seu produto é incrivel!
                    </Text>

                    <HStack 
                        justifyContent="space-between" 
                        // alignItem="center"
                        mt={5}
                    >
                        <Button h={24} w={24} backgroundColor="gray.300">
                            <Icon 
                                as={FontAwesome5}
                                name="arrow-left"
                                color="gray.400"
                                size={6}
                                // ml={1}
                            />  
                        </Button>

                        <Button h={24} w={24} backgroundColor="gray.300">
                            <Icon 
                                as={FontAwesome5}
                                name="arrow-left"
                                color="gray.400"
                                size={6}
                                // ml={1}
                            />  
                        </Button>

                        <Button h={24} w={24} backgroundColor="gray.300">
                            <Icon 
                                as={FontAwesome5}
                                name="arrow-left"
                                color="gray.400"
                                size={6}
                                // ml={1}
                            />  
                        </Button>
                    </HStack>

                    <Text color="gray.700" mt={5} mb={5}>
                        Sobre o produto
                    </Text>

                    <Input placeholder='Título do anúncio'/>

                    <TextAreas/>

                    <Radios/>

                    <Text color="gray.700" mt={5} mb={5}>
                        Venda
                    </Text>

                    <Input placeholder='R$ Valor do produto'/>

                    <Text color="gray.700">
                        Aceita troca?
                    </Text>

                    <Switchs/>

                    <Text color="gray.700" mb={5}>
                        Meios de pagamentos aceitos:
                    </Text>

                    <Checkboxs/>      
                </VStack>

                <HStack justifyContent="space-between" padding={8} space={2}>

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
                        onPress={handleOpenPreview}                                       
                    />                    
                </HStack>  
            </VStack> 
        </ScrollView>       
    )        
}