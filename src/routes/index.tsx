import { useTheme, Box } from 'native-base';
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";

import { useContext } from 'react';

import { ImageSlider} from '@screens/TesteSlide';

import {useAuth} from '@hooks/useAuth';
import {useAds} from '@hooks/useAds';

import { AuthRoutes } from "./auth.routes";
import { AppRoutes } from "./app.routes"

import { Loading } from '@components/Loading';

export function Routes() {

  const {colors} = useTheme();
  const {user, isLoadingUserStorageData} = useAuth();

  const theme = DefaultTheme;
  theme.colors.background = colors.white;

  if(isLoadingUserStorageData){
    return <Loading/>;
  }

  return (
    <Box flex={1} bg="white"> 
        <NavigationContainer theme={theme}>
          {user.id ? <AppRoutes/> : <AuthRoutes/>}
        </NavigationContainer>
    </Box>
  );
}