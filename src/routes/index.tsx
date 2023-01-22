import { useTheme, Box } from 'native-base';
import { useContext } from 'react';
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";

import { AuthRoutes } from "./auth.routes";
import { AppRoutes } from "./app.routes";

export function Routes() {

  const {colors} = useTheme();

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