import { View, StatusBar, RecyclerViewBackedScrollView } from 'react-native';
import { NativeBaseProvider } from 'native-base';
import { useFonts, Karla_400Regular, Karla_700Bold } from '@expo-google-fonts/karla';
import { Loading } from '@components/Loading';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'

import { Theme } from './src/theme';

import { AuthContextProvider} from '@contexts/AuthContext';

import { Routes } from './src/routes';

import { SignIn } from '@screens/SignIn';
import { SignUp } from '@screens/SignUp';
// import { Home } from '@screens/Home';


import { LogBox } from 'react-native';
LogBox.ignoreLogs(['We can not support a function callback.']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications


export default function App() {

  const [fontsloaded] = useFonts({Karla_400Regular, Karla_700Bold})

  return (

    <NativeBaseProvider theme={Theme}>
      <BottomSheetModalProvider>     
        <StatusBar
          barStyle="dark-content"
          backgroundColor="#F7F7F8"
          translucent
        />
        
        <AuthContextProvider>
          { fontsloaded ? <Routes/> : <Loading/>}
        </AuthContextProvider>
      </BottomSheetModalProvider>
            
    </NativeBaseProvider>
  );
}