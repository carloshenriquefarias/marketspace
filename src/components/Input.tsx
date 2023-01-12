import { Input as NativeBaseInput, IInputProps, FormControl } from 'native-base';

type Props = IInputProps & {
  errorMessage?: string | null;
  size: 'small' | 'big';   
}

export function Input({ errorMessage = null, isInvalid, size, ...rest }: Props) {
  
    const invalid = !!errorMessage || isInvalid;

    return ( //O uso do mb={4} aqui no form control e pra ele NAO FICAR TAO ESPAÇADO quando der erro
        <FormControl mb={4}>

            <NativeBaseInput 
                bg="gray.100"
                size={size === 'big' ?  'h={36}': 'h={14}'} //Ver depois
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
                {...rest}
            />

            <FormControl.ErrorMessage _text={{ color: 'red.500' }}>
                {errorMessage}
            </FormControl.ErrorMessage>

        </FormControl>
    );
}
