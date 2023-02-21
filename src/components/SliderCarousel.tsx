import { Image } from 'native-base'
import { Dimensions } from 'react-native'
import { api } from '../services/api'

import Carousel from 'react-native-reanimated-carousel';
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

  return (    
    <Carousel
      width={width}
      height={width} 
      data={images}
      scrollAnimationDuration={1000}
      onSnapToItem={(item:number) => console.log('current index:', item)}
      renderItem={({ item }) => (
        <Image 
          w={width}
          h={300}
          justifyContent="center"
          alt={"Imagens"}
          source={{uri : item.path ? `${api.defaults.baseURL}/images/${item.path}` : item}}
        />
      )}
    />    
  )
}