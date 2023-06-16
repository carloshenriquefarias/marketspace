import { Input as NativeBaseInput, IInputProps, FormControl, Icon } from 'native-base';
import React from "react";
import { MaterialIcons} from '@expo/vector-icons'; 

type Props = IInputProps & {
  errorMessage?: string | null; 
  typeInput?: null | 'password';
}

export function InputNewAd({ typeInput = null, errorMessage = null, isInvalid, size, ...rest }: Props) {
  
    const invalid = !!errorMessage || isInvalid;

    return (
        <FormControl mb={4} isInvalid={invalid}>

            <NativeBaseInput 
                bg="white"                
                h={14}
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
                        
                InputLeftElement={                   
                    <Icon
                        as={<MaterialIcons name="attach-money" size={24} color="black" />}
                        size={5} 
                        ml="3" 
                        color="muted.400" 
                    />                 
                }        

                {...rest}                
            >
                
            </NativeBaseInput>            

            <FormControl.ErrorMessage _text={{ color: 'red.500' }}>
                {errorMessage}
            </FormControl.ErrorMessage>

        </FormControl>
    );
}
