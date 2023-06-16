import { Platform } from 'react-native';
import { Icon, useTheme } from 'native-base';
import { createBottomTabNavigator, BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

import HomeSvg from '@assets/home.svg';
import HistorySvg from '@assets/history.svg';
import ProfileSvg from '@assets/profile.svg';

import { Tag, House, SignOut } from 'phosphor-react-native';
import { Home } from '@screens/Home';
import { MyAds } from '@screens/MyAds';
import { SignIn } from '@screens/SignIn';
import { useAuth } from '@hooks/useAuth';

type AppRoutes = {
    signIn: undefined;
    home: undefined;
    productdetails: undefined;
    exit: undefined;
    newad: undefined;
    myadsdetails: undefined;
    myads: undefined;
    preview: undefined;
}

export type AppTabNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>;

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>();

export function Tab() {

    const { sizes, colors } = useTheme();
    const { signOut } = useAuth();

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
                    tabBarIcon: ({ color }) => <House color={color} size={iconSize} />
                }}
            />

            <Screen 
                name='myads'
                component={MyAds}
                options={{
                    tabBarIcon: ({ color }) => <Tag color={color} size={iconSize} />
                }}
            />

            <Screen
                name="signIn"
                component={SignIn}
                options={{
                    tabBarIcon: ({color}) => (
                        <SignOut color={'red'} size={iconSize} />
                    ),
                }}           

                listeners={{
                    tabPress: (e) => {
                        e.preventDefault();
                        signOut();
                    },
                }}
            />

        </Navigator>
    );
}