import { Image, IImageProps } from 'native-base';

type Props = IImageProps & {
  size: number;
}

export function UserPhoto({ size, ...rest }: Props) {
  return (
    <Image 
      w={size} 
      h={size} 
      // rounded="full"
      borderWidth={2}
      // borderColor="gray.300"
      {...rest} 

      borderColor="blue.500"
      rounded="full"
      bg="gray.300"
    />
  );
}