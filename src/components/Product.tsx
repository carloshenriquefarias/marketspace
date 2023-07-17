import { Text, HStack, VStack, Image, Pressable, Avatar, Box} from 'native-base';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { useState } from 'react';

import BackgroundImg from '@assets/produto_1.png';
import { Status } from './Status';
import { ProductDTO } from '@dtos/ProductDTO'
import { baseURL } from "@services/api"
// import FormattedNumber from 'src/global/price';

// type Props = TouchableOpacityProps & {
//     data: ProductDTO;
//   };

export function Product({onPress, product_images, is_new, is_active, user, name, price, ...rest}: ProductDTO){

    const [userPhoto, setUserPhoto] = useState('https://github.com/JRSparrowII.png');
    const [product, setProduct] = useState<ProductDTO>({} as ProductDTO);

    return(                 
        <VStack w={'50%'} pr={2} backgroundColor="gray.100">        
            <Pressable onPress={onPress}>                    
                <VStack  
                    justifyContent="space-between" 
                    w='full'
                    h={120}
                    mt={5}
                    rounded="lg"         
                > 
                    <VStack>
                        <Image
                            w='full'
                            h='full' 
                            rounded="lg"                      
                            source={{ uri: (product_images[0]) 
                                ? baseURL()+ '/images/'+  product_images[0].path : userPhoto }}
                            alt={name}             
                            resizeMode="cover"         
                        />

                        {!is_active &&
                            (
                                <VStack  h='120' w='100%' justifyContent='center' alignItems='center' position='absolute' zIndex={1}>
                                    <Box h='100%' w='100%' opacity={0.6} rounded='md' backgroundColor="gray.600"/>
                                    <Text fontFamily='heading' fontSize='sm' color='gray.100' position='absolute' zIndex={2}>
                                        ANÚNCIO DESATIVADO
                                    </Text>
                                </VStack>
                            )
                        } 

                    </VStack>

                    <HStack 
                        justifyContent="space-between" 
                        mt={0} 
                        bgColor="transparent"  
                        padding={2}
                        top={-120}
                    >
                        {
                            (user) ?                         
                                <Avatar h={6} w={6} rounded="full" bg="gray.100" 
                                    source={{ uri: baseURL() + '/images/'+ user.avatar }}
                                /> :                             
                            null
                        }
                        <Status name={is_new} />
                    </HStack>                       
                </VStack>
            </Pressable>

            <Text fontSize={15} mt={2}>{name}</Text> 

            <HStack 
                justifyContent="flex-start" 
                bgColor="transparent" 
                space={1}
            >
                <Text fontSize={20} fontWeight="bold">
                    R$ 
                </Text> 
                <Text fontSize={20} fontWeight="bold">                     
                </Text>                
            </HStack>                
        </VStack>               
    )
}

