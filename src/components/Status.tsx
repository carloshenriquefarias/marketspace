import { Box, Text } from 'native-base';

type Props = {
  title: string;
  variant?: 'New' | 'Used';
}

export function Status({ title, variant = 'New'}: Props) {
  return (

    <Box
        bg={variant === 'New' ? 'blue.500' :  'gray.300'} 
        color="white"                       
        fontSize={5} 
        rounded={8}
        h={6}
        w={16}
        // mt={5}
        textAlign="center"
    >
        <Text 
            textAlign="center" 
            color={variant === 'New' ? 'white' : 'gray.700'} 
            fontWeight="bold"
        >
            {title}
        </Text>                       
    </Box>
  );
}