import { Button as ButtonNativeBase, IButtonProps, Text } from 'native-base';

type Props = IButtonProps & {
  title: string;
  variant?: 'default' | 'base1' | 'base2';
  icon?: string;
  size?: 'total' | 'half' 
}

export function Button({ title, variant = 'default', size = 'half',...rest }: Props) {
  return (
    <ButtonNativeBase
        // w="full"
        w={size === "half" ? '50%' : 'full'}
        h={size === "half" ? '10' : '14'}
        // h={14}      
        bg={variant === 'default' ? 'gray.300' :  
          variant === 'base1' ? 'blue.500' : 'gray.700'
        } //Condicional de butao     

        borderColor="blue.500"
        rounded="md" //Border radius

        _pressed={{
            bg: variant === 'default' ? 'gray.400' : 'blue.700'  
        }} //Hover button
        {...rest}
    >
        <Text 
            color={variant === 'default' ? 'gray.700' : 'white'}
            fontFamily="heading"
            fontSize="sm"
        >
            {title}
        </Text>
      
    </ButtonNativeBase>
  );
}