import { Input as NativeBaseInput, IInputProps, FormControl, Pressable, Icon } from 'native-base';
import { Text, View } from 'react-native';

import { useState } from "react";
import React from "react";

import { MaterialIcons } from "@expo/vector-icons";

type Props = IInputProps & {
  errorMessage?: string | null; 
  typeInput?: null | 'password';
//   iconInput?: null | 'icon';
}

export function Input({ typeInput = null, errorMessage = null, isInvalid, size, ...rest }: Props) {
  
    const invalid = !!errorMessage || isInvalid;
    const [noShow, setNoShow] = React.useState(false);

    return (
        <FormControl mb={4} isInvalid={invalid}>

            <NativeBaseInput 
                bg="gray.100"                
                h={14}
                px={4}
                borderWidth={0}
                fontSize="md"
                color="gray.700"
                fontFamily="body"
                placeholderTextColor="gray.400"

                isInvalid={invalid}
                _invalid={{
                  borderWidth: 1,
                  borderColor: "red.500"
                }}
                
                _focus={{
                bgColor: 'gray.100',
                borderWidth: 1,
                borderColor: 'blue.500'
                }}
                            
                // InputLeftElement={                                      
                //     <Icon                        
                //         size={5} 
                //         ml="2" 
                //         color="gray.700" 
                //     />                    
                // }                
                
                type={noShow ? "password" : "text" }             
                InputRightElement={
                    (typeInput==="password")?
                    <Pressable onPress={() => setNoShow(!noShow)}>
                        <Icon 
                            as={<MaterialIcons name={noShow ?  "visibility-off" : "visibility"} />} 
                            size={5} 
                            mr="2" 
                            color="muted.400" 
                        />
                    </Pressable>
                    : <View></View>
                } 

                {...rest}
                
            />            

            <FormControl.ErrorMessage _text={{ color: 'red.500' }}>
                {errorMessage}
            </FormControl.ErrorMessage>

        </FormControl>
    );
}