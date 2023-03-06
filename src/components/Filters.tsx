import { Divider, Icon, IconButton, IIconButtonProps, Pressable} from "native-base";
import {Entypo, Feather, Octicons} from '@expo/vector-icons'

type Props = IIconButtonProps & {
  filter: () => Promise<void>;
  handleOpenModal: () => void;
}

export function Filters({filter, handleOpenModal,...rest} : Props) {
  return(
    <>
        <IconButton
            onPress={filter}
            icon={<Icon
                as={Entypo}
                name='magnifying-glass'
                color='gray.400'
            />}
        />

        <Divider orientation="vertical" height='50%'/>

        <IconButton
            onPress={handleOpenModal}
            icon={<Icon
                as={Octicons}
                name='sliders'
                color='gray.400'
                />
            }
            
            {...rest}
        />
    </>
  )
}