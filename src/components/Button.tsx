import { Button as ButtonNativeBase, IButtonProps, Text } from 'native-base';

type Props = IButtonProps & {
  title: string;
  variant?: 'default' | 'base1' | 'base2';
  icon?: JSX.Element;
  size?: 'total' | 'half' 
}

export function ButtonDefault({ title, icon, variant = 'default', size = 'half',...rest }: Props) {
  return (
    <ButtonNativeBase        
      w={size === "half" ? '50%' : 'full'}
      h={size === "half" ? '12' : '16'}           
      
      bg={variant === 'default' ? 'gray.300' :  
        variant === 'base1' ? 'blue.500' : 'gray.700'
      }    

      borderColor="blue.500"
      rounded="md"

      _pressed={{
          bg: variant === 'default' ? 'gray.400' : 'blue.700'  
      }}
      {...rest}
    >
      {icon}
      
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