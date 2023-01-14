import { AppNavigatorRoutesProps } from '@routes/app.routes';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

export function Home(){

    const navigation = useNavigation<AppNavigatorRoutesProps>();

    return(
        <h1>erer</h1>
    )

}