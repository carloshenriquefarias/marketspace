import { AppNavigatorRoutesProps } from '@routes/app.routes';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { View, Text, HStack, Icon } from 'native-base';
import { FontAwesome5} from '@expo/vector-icons';
import { Pressable } from 'react-native';

type HeaderProps = {
    icon?: string;
    iconleft?: string;
    title?: string;
    variant?: 'default' | 'base1' 
}

export function Header({title, variant = 'default', icon, iconleft, ...rest} : HeaderProps){   

    const navigation = useNavigation<AppNavigatorRoutesProps>();   
    
    function handleGoBack() {
        navigation.goBack();
    }

    return(

        <HStack 
            padding={8} 
            paddingTop={12}            
            w="full"
            h={32}
            justifyContent="space-between"            

            bg={variant === 'default' ? 'gray.300' : 'blue.500' } 
        >
            <Pressable>
                <Icon 
                    as={FontAwesome5}
                    name="arrow-left"
                    color="blue.500"
                    size={6}
                    onPress={handleGoBack}
                    // ml={1}
                />   
            </Pressable>

            <Text 
                color={variant === 'default' ? 'gray.700' : 'white'}
                fontFamily="heading"
                fontSize="lg"
                textAlign="center"
            >
                {title}
            </Text>

            <Pressable>
                <Icon 
                    as={FontAwesome5}
                    name="arrow-right"
                    color="blue.500"
                    size={6}
                    // ml={1}
                />   
            </Pressable>   
        </HStack>
    )
}