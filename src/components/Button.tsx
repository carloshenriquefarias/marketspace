import { Button as ButtonNativeBase, IButtonProps, Text } from 'native-base';

type Props = IButtonProps & {
  title: string;
  variant?: 'solid' | 'outline';
  icon?: string;
  size?: 'total' | 'half' 
}

export function Button({ title, variant = 'solid',...rest }: Props) {
  return (
    <ButtonNativeBase
        w="full"
        //   w={size === "half" ? 'gray.500' : 'full'}
        h={14}      
        bg={variant === 'outline' ? 'gray.300' : 'blue.500'} //Condicional de butao  
        borderColor="blue.500"
        rounded="xl" //Border radius

        _pressed={{
            bg: variant === 'outline' ? 'gray.400' : 'blue.700'  
        }} //Hover button
        {...rest}
    >
        <Text 
            color={variant === 'outline' ? 'gray.700' : 'white'}
            fontFamily="heading"
            fontSize="sm"
        >
            {title}
        </Text>
      
    </ButtonNativeBase>
  );
}