import { AppNavigatorRoutesProps } from '@routes/app.routes';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { View, Text } from 'native-base';

export function ProductDetails(){

    const navigation = useNavigation<AppNavigatorRoutesProps>();

    return(
        <View>
            <Text color="white" mt={50}>ItemDetails</Text>
        </View>
    )

}