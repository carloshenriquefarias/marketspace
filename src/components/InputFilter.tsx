import { Input as NativeBaseInput, IInputProps, Pressable, Icon, HStack } from 'native-base';
import { View } from 'react-native';

import React from "react";

import { Entypo, Octicons} from '@expo/vector-icons'; 

type Props = IInputProps & {
    typeInput?: null | 'filter';
    fulanodetal: () => void;
}

export function InputFilter({ typeInput = null, fulanodetal }: Props) { 

    return (
        
        <NativeBaseInput
            bg="white"                
                h={12}
                px={4}
                borderWidth={0}
                fontSize="md"
                color="gray.700"
                fontFamily="body"
                placeholderTextColor="gray.400"  
                placeholder='Buscar anúncio'
                rounded={8} 
                mt={2}         
                
                _focus={{
                bgColor: 'white',
                borderWidth: 1,
                borderColor: 'blue.500'
            }}               

            InputRightElement={
                <HStack justifyContent="center" pr={4}>
                    <Pressable>
                        <Icon 
                            as={<Octicons name="search" size={24} color="gray.700" />}  
                            size={5} 
                            mr="2" 
                            color="gray.700" 
                        />
                    </Pressable>

                    <View
                        style={{height:22, width:1, backgroundColor:'lightgray'}}
                    />            

                    <Pressable 
                        onPress={() => fulanodetal()}
                    >
                        <Icon 
                            as={<Entypo name="sound-mix" size={24} color="gray.700" />}
                            ml="2"
                            color="gray.700"
                            size={5}
                        />
                    </Pressable>
                </HStack>        
              
            }   

        />   
       
    );
}
