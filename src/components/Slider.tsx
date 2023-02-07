import { Image, View, VStack } from "native-base";
import Carousel from 'react-native-snap-carousel';
import React from "react";
import { Dimensions} from "react-native";

type CarouselProps = {
    item: { imgUrl: string }    
    index: number
};

const SLIDER_WIDTH = Dimensions.get('window').width
const ITEM_WIDTH = SLIDER_WIDTH * 0.9

const carouselItens = [
    {
        imgUrl:
        'https://www.google.com/imgres?imgurl=https%3A%2F%2Fcf.shopee.com.br%2Ffile%2F2a42192d9da1cd050c34ed89f245a261&imgrefurl=https%3A%2F%2Fwww.escorregaopreco.com.br%2Fofertas%2Fshopee%2F1778005&tbnid=bqftdB1xJRO6sM&vet=12ahUKEwjBgvav64H9AhUXMLkGHTxJBKgQMygSegUIARCFAg..i&docid=L6T3HGDAD162JM&w=800&h=800&q=time&ved=2ahUKEwjBgvav64H9AhUXMLkGHTxJBKgQMygSegUIARCFAg'
    },
    {
        imgUrl: 'https://github.com/JRSparrowII.png'
    },
    {
        imgUrl:
        'https://www.google.com/imgres?imgurl=https%3A%2F%2Fimg.freepik.com%2Fvetores-premium%2Flogotipo-do-time-leao-de-futebol_441059-67.jpg%3Fw%3D2000&imgrefurl=https%3A%2F%2Fbr.freepik.com%2Fvetores-premium%2Flogotipo-do-time-leao-de-futebol_14884264.htm&tbnid=woHTvFSPbFco5M&vet=12ahUKEwjBgvav64H9AhUXMLkGHTxJBKgQMyggegUIARCpAg..i&docid=2kGTbf6_OuCMcM&w=2000&h=2000&q=time&ved=2ahUKEwjBgvav64H9AhUXMLkGHTxJBKgQMyggegUIARCpAg'
    }
]

function carousel({item, index} : CarouselProps) {
    return(
        <View key={index} w="ITEM_WIDTH">
            <Image h={250} rounded={10} source={{uri: item.imgUrl}}/>
        </View>
    )
}

export function Slider () {
    return(
        <VStack 
            flex={1}
            w='full'            
        >   
            <View 
                w="full" 
                h={300} 
                bg="gray.700" 
                justifyContent="center" 
                alignItems="center"
            >
                {/* <Carousel
                    // ref={(c) => { this._carousel = c; }}
                    data={carouselItens}
                    renderItem={carousel}
                    sliderWidth={SLIDER_WIDTH}
                    itemWidth={ITEM_WIDTH}
                    useScrollView={true}
                />                */}
            </View>               
        </VStack>     
    )
}























{/* <HStack flex-direction="row" alignItems="flex-end" pr={24} space={1}  bg="gray.600" mt={-3}>

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
</HStack> */}