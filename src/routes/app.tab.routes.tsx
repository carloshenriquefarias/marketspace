import { Platform } from 'react-native';
import { HStack, Icon, Tag, useTheme } from 'native-base';
import { createBottomTabNavigator, BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

import HomeSvg from '@assets/home.svg';
import HistorySvg from '@assets/history.svg';
import ProfileSvg from '@assets/profile.svg';

import { Home } from '@screens/Home';

import { MyAdsDetails } from '@screens/MyAdsDetails';
import { MyAds } from '@screens/MyAds';
import { Preview } from '@screens/Preview';
import { ProductDetails } from '@screens/ProductDetails';

import { AntDesign, FontAwesome5} from '@expo/vector-icons';
import { ButtonDefault } from '@components/Button';
import { ArrowLeft } from 'phosphor-react-native';

type AppRoutes = {
  home: undefined;
  productdetails: undefined;
  exit: undefined;
  newad: undefined;
  myadsdetails: undefined;
  myads: undefined;
  preview: undefined;
}

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>;

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>();


export function Tab() {

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
            name='myads'
            component={MyAds}
            options={{
                tabBarIcon: ({ color }) => (
                    // <Tag color={colors.gray[500]} size={sizes[7]}/>

                    <Icon 
                        as={AntDesign}
                        name="tago"
                        color="gray.400"
                        fill={color}
                        size={6}
                    />
                    // O icone do meio nao esta funcionado
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
        />

    </Navigator>
  );
}