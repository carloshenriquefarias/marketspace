import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NewAd } from '@screens/NewAd';
import { Preview } from '@screens/Preview';
import { ProductDetails } from '@screens/ProductDetails';
import { MyAdsDetails } from '@screens/MyAdsDetails';
import { Tab } from './app.tab.routes';

type AppRoutes = {
  newad: undefined;
  tab: undefined;
  preview: undefined;
  productdetails: undefined;
  myadsdetails: undefined;
}

export type AppNavigatorRoutesProps = NativeStackNavigationProp<AppRoutes>;

const { Navigator, Screen } = createNativeStackNavigator<AppRoutes>();

export function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}> 
      <Screen name='tab' component={Tab} />
      <Screen name='newad' component={NewAd} />
      <Screen name='preview' component={Preview}/>
      <Screen name='productdetails' component={ProductDetails}/>
      <Screen name='myadsdetails' component={MyAdsDetails}/>  

    </Navigator>
  )
}