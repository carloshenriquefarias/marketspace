import { Box, Center, HStack, Text, Image, View, VStack, FlatList } from "native-base";
import React from "react";
import { Dimensions } from "react-native";

type ImageProps = {
    imagesUrl: string[]
    active?: 'true' | 'false' 
};

type BoxImageProps = {
    active: boolean
};

export function Slider({imagesUrl, active} : ImageProps) {
    return(
        <VStack 
            flex={1}
            w='full'
            
        >   
            <View 
                w="full" 
                h={250} 
                bg="gray.500" 
                justifyContent="center" 
                alignItems="center"
            >
                {/* <FlatList
                    data={imagesUrl}
                    keyExtractor={key => key.id }
                    renderItem={({item}) => (
                        <View 
                            w="full" 
                            h={250} 
                            bg="gray.500" 
                            justifyContent="center" 
                            alignItems="center"
                        >
                            <Image 
                                source={{uri: item.uri}}
                                resizeMode="contain"
                                alt='foto base'
                                w={300}
                                h={132}
                            />
                        </View>
                    )}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                /> */}
            </View>

           
                <HStack flex-direction="row" alignItems="flex-end" pr={24} space={1}  bg="gray.600" mt={-3}>

                {   
                    imagesUrl.map((_, index) => (
                        <View  
                            key={String(index)}
                            w={100}
                            h={2}
                            bg="gray.400"
                            rounded={10}
                        />                
                    ))
                }                    
                    <View  
                        w={100}
                        h={2}
                        bg="gray.200"
                        rounded={10}
                    />
                    <View  
                        w={100}
                        h={2}
                        bg="gray.200"
                        rounded={10}
                    />
                    <View  
                        w={100}
                        h={2}
                        bg="gray.200"
                        rounded={10}
                    />                
                </HStack>
               
        </VStack>     
    )
}