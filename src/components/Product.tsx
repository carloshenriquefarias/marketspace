import { Text, HStack, VStack, Image, Pressable, Avatar} from 'native-base';
import { useState } from 'react';

import BackgroundImg from '@assets/produto_1.png';
import { Status } from './Status';
import { ProductDTO } from '@dtos/ProductDTO'
import { baseURL } from "@services/api"

export function Product({product_images, status = 'NOVO', avatar, title, price, ...rest}: ProductDTO){

    const [userPhoto, setUserPhoto] = useState('https://github.com/JRSparrowII.png');

    return(
               
        <VStack
           w={'50%'}
           pr={2}
           backgroundColor="gray.100"
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
                            source={{ uri: baseURL()+ '/images/'+  product_images[0].path}}
                            alt="Tenis vermelho"              
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
                        <Avatar h={6} w={6} rounded="full" bg="gray.100" source={{ uri: userPhoto }}>
                            {avatar}
                        </Avatar>

                        <Status variant='New' title='Novo'/>

                    </HStack>   
                    
                </VStack>
            </Pressable>

            <Text fontSize={15} mt={2}>{title}</Text>  

            <Text fontSize={20} fontWeight="bold"> {price} </Text> 
        </VStack>        
    )
}

    