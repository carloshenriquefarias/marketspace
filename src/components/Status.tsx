import { Box, HStack, IconButton, Text } from 'native-base';
import { useTheme } from 'native-base';
import { X } from 'phosphor-react-native';

type Props = {
  title: string;
  variant?: 'New' | 'Used';
}

export function Status({ title, variant = 'New'}: Props) {

  const {colors, sizes} = useTheme();

  function handleCloseCondition(){

  }

  return (
    <HStack
      bg={variant === 'New' ? 'blue.500' :  'gray.300'} 
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
          color={variant === 'New' ? 'white' : 'gray.700'} 
          fontWeight="bold"
          fontSize={14} 
        >
          {title}
        </Text> 
      </Box>       

      {/* <Box bg="gray.200" rounded={50} size={3} alignItems="center" mt={1}>
        <IconButton
          icon={<X size={sizes[2]} color={colors.gray[600]} weight="bold"/>}
          onPress={handleCloseCondition}
          mt={-2}
          pl={3.5}
        /> 
      </Box> */}
                                  
    </HStack>
  );
}