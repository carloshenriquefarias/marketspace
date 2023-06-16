import * as React from 'react';
import { Dimensions, Text, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

export function IndexCarousel() {
    const width = Dimensions.get('window').width;
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

    return (
        <View style={{ flex: 1 }}>
            <Carousel
                loop
                width={width}
                height={width / 2}
                autoPlay={true}
                data={carouselItens}
                scrollAnimationDuration={1000}
                onSnapToItem={(index) => console.log('current index:', index)}
                renderItem={({ index }) => (
                    <View
                        style={{
                            flex: 1,
                            borderWidth: 1,
                            justifyContent: 'center',
                        }}
                    >
                        <Text style={{ textAlign: 'center', fontSize: 30 }}>
                            {index}
                        </Text>
                    </View>
                )}
            />
        </View>
    );
}