import { Center, Text } from "native-base";
import React from "react";
import { Slider } from '@components/Slider';

export function ImageSlider() {
    return(
        
        <Center mt={10} mb={8}w="full" bg="blue.500">
            
            {/* <Text color="gray.700" fontSize="25px" fontFamily="heading">
                Boas vindas!
            </Text>

            <Text color="gray.400" fontSize="sm" textAlign="center">
                Crie sua conta e use este espaço para comprar itens variados 
                e vender seus produtos
            </Text> */}

        <Slider/>

        </Center>


    )
}