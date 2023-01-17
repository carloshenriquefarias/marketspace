import { Platform } from 'react-native';
import { useTheme } from 'native-base';
import { createBottomTabNavigator, BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

import HomeSvg from '@assets/home.svg';
import HistorySvg from '@assets/history.svg';
import ProfileSvg from '@assets/profile.svg';

import { Home } from '@screens/Home';
import { NewAd } from '@screens/NewAd';
import { ProductDetails } from '@screens/ProductDetails';

type AppRoutes = {
  home: undefined;
  productdetails: undefined;
  exit: undefined;
  newad: undefined;
}

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>;

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>();

export function AppRoutes() {

  const { sizes, colors } = useTheme();

  const iconSize = sizes[6];

  return (
    <Navigator screenOptions={{ 
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.gray[700],
        tabBarInactiveTintColor: colors.gray[400],

        tabBarStyle: {
            backgroundColor: colors.gray[100],
            borderTopWidth: 0,
            height: Platform.OS === "android" ? 'auto' : 96,
            paddingBottom: sizes[10],
            paddingTop: sizes[6]
        }
    }}>
        <Screen 
            name='home'
            component={Home}
            options={{
                tabBarIcon: ({ color,  }) => (
                    <HomeSvg fill={color} width={iconSize} height={iconSize} />
                )
            }}
        />

        <Screen 
            name='productdetails'
            component={ProductDetails}
            options={{
            tabBarIcon: ({ color }) => (
                <HistorySvg fill={color} width={iconSize} height={iconSize} />
            )
            }}
        />      

        <Screen 
            name='exit'
            component={ProductDetails}
            options={{
                tabBarIcon: ({ color }) => (
                <HistorySvg fill={color} width={iconSize} height={iconSize} />
                )
            }}
            // options={{ tabBarButton: () => null }} //Nao quer ter disponivel no menu
        />

        <Screen 
            name='newad'
            component={NewAd}
            options={{ tabBarButton: () => null }} //Nao quer ter disponivel no menu
        />
    </Navigator>
  );
}