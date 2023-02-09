import { Text, HStack, VStack, Image, Pressable, Avatar} from 'native-base';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { useState } from 'react';

import BackgroundImg from '@assets/produto_1.png';
import { Status } from './Status';
import { ProductDTO } from '@dtos/ProductDTO'
import { api } from "@services/api"

type Props = TouchableOpacityProps & {
    data: ProductDTO;
  };

export function Product({product_images, is_new, user, name, price, ...rest}: ProductDTO){

    const [userPhoto, setUserPhoto] = useState('https://github.com/JRSparrowII.png');

    return(
        // <TouchableOpacity {...rest}>               
            <VStack
                w={'50%'}
                pr={2}
                
            >        
                <Pressable>                    
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
                                // source={{ uri: `${api.defaults.baseURL}/exercise/thumb/${data.thumb}` }}                      
                                source={{ uri: (product_images[0]) 
                                    ? api.defaults.baseURL+ '/images/'+  product_images[0].path : userPhoto }}
                                alt={name}             
                                resizeMode="cover"         
                            />
                        </VStack>

                        <HStack 
                            justifyContent="space-between" 
                            mt={0} 
                            bgColor="transparent"  
                            padding={2}
                            top={-120}
                        >
                            <Avatar h={6} w={6} rounded="full" bg="gray.100" 
                                source={{ uri: api.defaults.baseURL + '/images/'+ user.avatar }}
                            >
                                
                            </Avatar>

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
                        {price} 
                    </Text>                
                </HStack>      
            </VStack> 
        // </TouchableOpacity>       
    )
}

    