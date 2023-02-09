import { Input as NativeBaseInput, IInputProps, FormControl, Pressable, Icon } from 'native-base';
import { View } from 'react-native';
import React from "react";

import { MaterialIcons } from "@expo/vector-icons";

type Props = IInputProps & {
  errorMessage?: string | null; 
  typeInput?: null | 'password';
  size?: 'normal' | 'high';
}

export function Input({ typeInput = null, errorMessage = null, isInvalid, ...rest }: Props) {
  
    const invalid = !!errorMessage || isInvalid;
    const [noShow, setNoShow] = React.useState(true);

    return (
        <FormControl mb={4} isInvalid={invalid}>

            <NativeBaseInput 
                
                bg="white"                
                size="lg"
                px={4}
                py={3}
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
                
                type={noShow ? "password" : "text" }             
                InputRightElement={
                    (typeInput==="password")?
                    <Pressable onPress={() => setNoShow(!noShow)}>
                        <Icon 
                            as={<MaterialIcons name={!noShow ? "visibility-off" : "visibility"} />} 
                            size={6} 
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
