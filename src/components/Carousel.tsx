import { Image } from 'native-base'
import { useState } from 'react'
import { Dimensions, View, Text  } from 'react-native'
import Carousel from 'react-native-reanimated-carousel';
import { api } from '../services/api'
import * as React from 'react';
import 'react-native-reanimated';

type imageProps = {
  path: string,
  id: string
}

type Props = {
  images?: imageProps[] | string[],
}

export function ImageCarousel({images} : Props) {
  const { width } = Dimensions.get('window')

  return (
    <View style={{ flex: 1 }}>
            <Carousel
                loop
                width={width}
                height={width / 2}
                autoPlay={true}
                data={[...new Array(6).keys()]}
                scrollAnimationDuration={1000}
                onSnapToItem={(index:number) => console.log('current index:', index)}
                renderItem={({ index }:{index:number}) => (
                    <View
                        style={{
                            flex: 1,
                            borderWidth: 1,
                            justifyContent: 'center',
                            backgroundColor: 'red'
                        }}
                    >
                        <Text style={{ textAlign: 'center', fontSize: 30 }}>
                            {index}
                        </Text>
                    </View>
                )}
            />
        </View>
//         <Carousel
//             //loop
//             //autoPlay
//             style={{backgroundColor: 'red'}}
//             scrollAnimationDuration={1000}
//             width={width}
//             height={width / 1.5}
//             data={[{ id : 'https://github.com/JRSparrowII.pngs'}]}
            
//             renderItem={({ item }) => (
//                 <Image
//                     //w={375}
//                     //h={280}
//                     w={width}
//                     h={300}
//                     bgColor='gray.7'
//                     alignItems="center"
//                     justifyContent="center"
//                     source={
//                         {uri : 'https://github.com/JRSparrowII.png'}
//                         // { uri: userPhoto }
//                     }
//                     alt="selected product details"
//                 />
//             )}
//         />
    )
}