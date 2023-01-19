import { AppNavigatorRoutesProps } from '@routes/app.routes';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Header } from '@components/Header';
import { View, Text, HStack, Icon, VStack, Button, Radio, Stack, Switch, Checkbox, ScrollView, CheckIcon, Center, FlatList } from 'native-base';
import { FontAwesome5} from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons'; 
import { ButtonDefault } from '@components/Button'

import { Product } from '@components/Product'

import React, { useState } from "react";
import { TextArea, Box, Select } from "native-base";

import { Input } from '@components/Input'

const Example = () => {
    const [service, setService] = React.useState("");
    return <Center>
        <Box maxW="300">
            <Select 
                selectedValue={service} 
                minWidth="150" 
                accessibilityLabel="Choose Service" 
                placeholder="Todos" 

                _selectedItem={{
                    bg: "gray.600",
                    endIcon: 
                        <CheckIcon size="5"/>
                }} 
                mt={1} 
                onValueChange={itemValue => setService(itemValue)}
            >
                <Select.Item label="UX Research" value="ux" />
                <Select.Item label="Web Development" value="web" />
                <Select.Item label="Cross Platform Development" value="cross" />
                <Select.Item label="UI Designing" value="ui" />
                <Select.Item label="Backend Development" value="backend" />
            </Select>
        </Box>
    </Center>;
};

export function MyAds(){

    const navigation = useNavigation<AppNavigatorRoutesProps>();  
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

    return(
        <ScrollView 
            contentContainerStyle={{ flexGrow: 1 }} 
            showsVerticalScrollIndicator={false}>

            
            <VStack>
                <Header
                    title='Meus Anúncios'            
                />   

                <HStack justifyContent="space-between" padding={8} alignItems="center">
                    <Text color="gray.700" fontFamily="body" fontSize="lg">
                        9 anúnicios
                    </Text>

                    <Example/>
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