import { AppNavigatorRoutesProps } from '@routes/app.routes';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { View, Text } from 'native-base';

export function NewAd(){

    const navigation = useNavigation<AppNavigatorRoutesProps>();

    return(
        <View>
            <Text color="black" mt={50}>NewAD</Text>
        </View>
    )

}