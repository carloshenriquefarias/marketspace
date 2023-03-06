import { Text, Pressable, IPressableProps } from 'native-base';

type Props = IPressableProps & {
  name: string;
  isActive: boolean
}

export function BoxCondition({ name, isActive, ...rest }: Props) {
  return (
    <Pressable
        bg="gray.300"
        rounded={10}
        h={6}
        w={'16'} 
        justifyContent="center"
        alignItems="center"
        overflow="hidden"
        isPressed={isActive}
        mr={2}

        _pressed={{
            background: 'blue.500'
        }}
        
        {...rest}
    >
        <Text
            color={isActive ? "gray.100" : "gray.500"}
            textTransform="uppercase"
            fontSize="xs"
            fontWeight="bold"
        >
            {name}
        </Text>
    </Pressable>
  );
}