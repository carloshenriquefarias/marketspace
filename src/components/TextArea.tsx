import { TextArea, IInputProps, FormControl, Box} from 'native-base';
import React from "react";

type Props = IInputProps & {
  errorMessage?: string | null; 
}

export function TextAreaAtual({ errorMessage = null, isInvalid, size, ...rest }: Props) {
  
    const invalid = !!errorMessage || isInvalid;

    return (
        <FormControl mb={4} isInvalid={invalid}>

            <Box alignItems="center" w="100%">
                <TextArea
                    h={40} 
                    w="full" maxW="full"
                    placeholder="Descrição do produtodffgsdfsfsdfsd"
                    backgroundColor="white"
                    fontSize="md"
                    borderColor="blue.500"
                    size={14}

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

                    {...rest} 
                />
            </Box>

            <FormControl.ErrorMessage _text={{ color: 'red.500' }}>
                {errorMessage}
            </FormControl.ErrorMessage>

        </FormControl>
    );
}
