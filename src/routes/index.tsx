import { useTheme, Box } from 'native-base';
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";

import { useContext } from 'react';

import { Preview } from '@screens/Preview';

import {useAuth} from '@hooks/useAuth';
import {useAds} from '@hooks/useAds';

import { AuthRoutes } from "./auth.routes";
import { AppRoutes } from "./app.routes"

import { Loading } from '@components/Loading';

export function Routes() {

  const {colors} = useTheme();
  const {user, isLoadingUserStorageData} = useAuth();
  // console.log ("usuario logado =>", user);

  const theme = DefaultTheme;
  theme.colors.background = colors.gray[200];

  if(isLoadingUserStorageData){
    return <Loading/>;
  }

  return (
    <Box flex={1} bg="gray.200"> 
        <NavigationContainer theme={theme}>
          <Preview/>
          {/* {user.id ? <AppRoutes/> : <AuthRoutes/>} */}
          {/* <AppRoutes/>           */}
        </NavigationContainer>
    </Box>
  );
}