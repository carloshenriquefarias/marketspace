import { Box, HStack, IconButton, Text } from 'native-base';
import { useTheme } from 'native-base';
import { X } from 'phosphor-react-native';

type Props = {
  name: boolean;
}

export function Status({ name }: Props) {

  const {colors, sizes} = useTheme();
  
  return (
    <HStack
      bg={name === true ? 'blue.500' :  'gray.300'} 
      color="white"                       
      fontSize={5} 
      rounded={10}
      h={6}
      w={'16'} 
      pl={2} pr={2}
      justifyContent="center"
    >
      <Box>
        <Text 
          textAlign="center" 
          color={name === true ? 'white' : 'gray.700'} 
          fontWeight="bold"
          fontSize={14} 
        >
          {(name) ? 'NOVO' : 'USADO'}
        </Text> 
      </Box>
                                  
    </HStack>
  );
}