import { Image, IImageProps } from 'native-base';

type Props = IImageProps & {
  size: number;
}

export function Images({ size, ...rest }: Props) {
  return (
    <Image 
      w={size} 
      h={size} 
      rounded={5}
      {...rest} 
    />
  );
}