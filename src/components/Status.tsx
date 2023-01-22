import { Box, HStack, IconButton, Text } from 'native-base';
import { useTheme } from 'native-base';
import { X } from 'phosphor-react-native';

type Props = {
  title: string;
  variant?: 'New' | 'Used';
  close?: 'true' | 'false';
}

export function Status({ title, variant = 'New', close = 'false'}: Props) {

  const {colors, sizes} = useTheme();

  function handleCloseCondition(){

  }

  return (
    <HStack
      bg={variant === 'New' ? 'blue.500' :  'gray.300'} 
      color="white"                       
      fontSize={5} 
      rounded={10}
      h={8}
      w={close === "true" ? '30%' : '16'} 
      padding={1}
      pl={2} pr={2}
      // w={16}
      justifyContent="space-between"
    >
      <Box>
        <Text 
          textAlign="center" 
          color={variant === 'New' ? 'white' : 'gray.700'} 
          fontWeight="bold"
        >
          {title}
        </Text> 
      </Box>       

      <Box bg="gray.200" rounded={50} size={4}>
        <IconButton
          icon={<X size={sizes[3]} color={colors.gray[600]} weight="bold"/>}
          onPress={handleCloseCondition}
        /> 
      </Box>
                                  
    </HStack>
  );
}