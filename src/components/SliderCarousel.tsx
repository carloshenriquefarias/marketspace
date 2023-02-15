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

export function SliderCarousel({ images } : Props) {
  const { width } = Dimensions.get('window')
  // console.log('conteudo do meu images', images)

  return (
    
            <Carousel
                //loop
                width={width}
                height={width} 
                //autoPlay={true}
                data={images}
                scrollAnimationDuration={1000}
                onSnapToItem={(item:number) => console.log('current index:', item)}
                renderItem={({ item }) => (
                    <Image 
                        w={width}
                        h={300}
                        justifyContent="center"
                        alt={"Imagens"}
                        //source={{ uri: `${api.defaults.baseURL}/images/${item.path}` }}
                        source={{ uri: item }}
                    />
                )}
            />
      

    )
}