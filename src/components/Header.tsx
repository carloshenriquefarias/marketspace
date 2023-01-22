import { AppNavigatorRoutesProps } from '@routes/app.routes';
import { useNavigation } from '@react-navigation/native';

import { Text, HStack, Icon, VStack } from 'native-base';
import { FontAwesome5} from '@expo/vector-icons';

import { Pressable } from 'react-native';

type HeaderProps = {
    icon?: string;
    iconright?: 'disabled' | 'edit' | 'add'
    title?: string;
    subtitle?: string;
    variant?: 'default' | 'base1'     
}

export function Header(
    {title, subtitle, variant = 'default', icon, iconright = 'disabled', ...rest} 
    : HeaderProps){   

    const navigation = useNavigation<AppNavigatorRoutesProps>();   
    
    function handleGoBack() {
        navigation.goBack();
    }

    return(

        <HStack 
            alignItems="center"
            pr={8} 
            pl={8}          
            w="full"
            h={32} 
            justifyContent="space-between"   
            flex="1"
            bg={variant === 'default' ? 'gray.300' : 'blue.500' } 
        >
            <Pressable>
                <Icon 
                    as={FontAwesome5}
                    name="arrow-left"
                    color="gray.500"
                    size={5}
                    onPress={handleGoBack}
                />   
            </Pressable>

            <VStack textAlign="center" pt={5}>
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
                {/* <Icon
                    as={iconright === 'edit' ? {SimpleLineIcons} : 
                    iconright === 'add' ? {FontAwesome5} : ''}
                    // as={SimpleLineIcons}
                    name={iconright === 'edit' ? "pencil" :  iconright === 'add' ? 'arrow-left' : ''}
                    color="blue.500"
                    size={5}
                    // ml={1}
                />    */}
            </Pressable>   
        </HStack>
    )
}