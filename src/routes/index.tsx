import { useTheme, Box } from 'native-base';
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";

import { useContext } from 'react';

import {useAuth} from '@hooks/useAuth';

import { AuthRoutes } from "./auth.routes";
import { AppRoutes } from "./app.routes";

export function Routes() {

  const {colors} = useTheme();
  const {user} = useAuth();

  console.log ("usuario logado =>", user);

  const theme = DefaultTheme;
  theme.colors.background = colors.gray[200];

  return (
    <Box flex={1} bg="gray.200"> 
        <NavigationContainer theme={theme}>
          <AppRoutes/>          
        </NavigationContainer>
    </Box>
  );
}