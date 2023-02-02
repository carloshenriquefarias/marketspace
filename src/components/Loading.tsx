import { Spinner, Center } from 'native-base'

type IProps = {
    bgColor?: string;
}

export function Loading( { bgColor } : IProps ){
    return (
        <Center flex={1} bg={(bgColor) ? bgColor : "gray.700" } >
            <Spinner color="blue.500"/>
        </Center>
        
    )
}