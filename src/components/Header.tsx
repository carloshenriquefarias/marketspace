import { AppNavigatorRoutesProps } from '@routes/app.routes';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { View, Text, HStack, Icon, VStack } from 'native-base';
import { FontAwesome5, SimpleLineIcons} from '@expo/vector-icons';
import { Pressable } from 'react-native';

type HeaderProps = {
    icon?: string;
    iconleft?: string;
    title?: string;
    subtitle?: string;
    variant?: 'default' | 'base1' 
}

export function Header({title, subtitle, variant = 'default', icon, iconleft, ...rest} : HeaderProps){   

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

            <VStack>
            <Text 
                color={variant === 'default' ? 'gray.700' : 'white'}
                fontFamily="heading"
                fontSize="lg"
                textAlign="center"
            >
                {title}
            </Text>

            <Text 
                color={variant === 'default' ? 'gray.700' : 'white'}
                fontFamily="body"
                fontSize="md"
                textAlign="center"
            >
                {subtitle}
            </Text>
            </VStack>
            

            <Pressable>
                <Icon 
                    as={SimpleLineIcons}
                    name="pencil"
                    color="blue.500"
                    size={6}
                    // ml={1}
                />   
            </Pressable>   
        </HStack>
    )
}