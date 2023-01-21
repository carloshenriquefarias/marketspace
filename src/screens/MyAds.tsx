import { AppNavigatorRoutesProps } from '@routes/app.routes';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Header } from '@components/Header';
import { View, Text, HStack, Icon, VStack, Button, Radio, Stack, Switch, Checkbox, ScrollView, CheckIcon, Center, FlatList, IconButton } from 'native-base';
import { FontAwesome5} from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons'; 
import { ButtonDefault } from '@components/Button'

import { Product } from '@components/Product'

import { useTheme } from 'native-base';

import React, { useState } from "react";
import { TextArea, Box, Select } from "native-base";

import { Input } from '@components/Input'
import { Plus } from 'phosphor-react-native';

type ActiveTypes = 'todos' | 'ativos' | 'inativos';

const Selects = () => {
    const [service, setService] = React.useState("");
    return <Center>
        <Box maxW="300">
            <Select 
                selectedValue={service} 
                minWidth="150" 
                accessibilityLabel="Escolha o tipo de anúncio" 
                placeholder="Escolha o anuncio" 
                fontSize="md"

                _selectedItem={{
                    bg: "gray.700",
                    endIcon: 
                        <CheckIcon size="5"/>
                }} 
                mt={1} 
                onValueChange={itemValue => setService(itemValue)}
            >
                <Select.Item label="Todos" value="all" />
                <Select.Item label="Novos" value="new" />
                <Select.Item label="Usados" value="used" />
            </Select>
        </Box>
    </Center>;
};

export function MyAds(){

    const navigation = useNavigation<AppNavigatorRoutesProps>();  
    const {colors, sizes} = useTheme();
    const [active, setActive] = useState<ActiveTypes>('todos');
    const [userPhoto, setUserPhoto] = useState('https://github.com/JRSparrowII.png'); 
    const [product, setProduct] = useState<string[]>([
        // {
        //     id: '1'
        // },
        // {
        //     id: '2'
        // },
        // {
        //     id: '3'
        // },
        // {
        //     id: '4'
        // }
    ]);

    function handleOpenPreview() { 
        navigation.navigate('preview');
    } 

    function handleGoHome() { 
        navigation.navigate('home');
    } 

    function handleNewAd() { 
        navigation.navigate('newad');
    } 

    return(
        <ScrollView 
            contentContainerStyle={{ flexGrow: 1 }} 
            showsVerticalScrollIndicator={false}>

            
            <VStack padding={8} >

                <HStack 
                    justifyContent="space-between" 
                >
                    <IconButton/>  

                    <Center>
                        <Text 
                            fontFamily="heading" 
                            color="gray.700"
                            fontSize="2xl"
                        > 
                            Meus anúncios
                        </Text>
                    </Center>
                    
                    <IconButton
                        icon={<Plus size={sizes[6]} color={colors.gray[600]} weight="bold"/>}
                        onPress={handleNewAd}
                    />          

                </HStack>       

                <HStack justifyContent="space-between" alignItems="center" mt={5}>
                    <Text color="gray.700" fontFamily="body" fontSize="lg">
                        9 anúnicios
                    </Text>

                    <Selects/>
                </HStack>              
            </VStack> 

            <VStack>            
                <FlatList 
                    data={product}
                    keyExtractor={item => item.id}
                    numColumns={2}
                    renderItem={({ item }) => (
                        <Product                    
                            image='source={{ uri: userPhoto }}'
                            title='Tenis vermelho'
                            price={50}
                            status='NOVO'
                            avatar='source={{ uri: userPhoto }}'
                        />                      
                    )}
                    w='full' 
                    showsVerticalScrollIndicator={false}
                    _contentContainerStyle={{
                        paddingBottom: 20
                    }}
                /> 
            </VStack>
        </ScrollView>       
    )        
}