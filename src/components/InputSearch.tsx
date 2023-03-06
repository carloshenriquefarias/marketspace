import { Input as NativeBaseInput, IInputProps, IIconButtonProps} from 'native-base';
import { Filters } from './Filters';

type Props = IIconButtonProps & {
    filter: () => Promise<void>;
    handleOpenModal: () => void;
}

export function InputSearch({filter, handleOpenModal,...rest} : Props) { 
    return (        
        <NativeBaseInput
            bg="red"                
            h={14}
            px={4}
            borderWidth={0}
            fontSize="md"
            color="gray.700"
            fontFamily="body"
            placeholderTextColor="gray.400"  
            placeholder='Buscar anúncio'
            rounded={8} 
            mt={4}         
            
            _focus={{
                bgColor: 'red',
                borderWidth: 1,
                borderColor: 'blue.500'
            }}  
            
            InputRightElement={
                <Filters handleOpenModal={handleOpenModal} filter={filter}/>     
            }   
            
        />          
    );
}
