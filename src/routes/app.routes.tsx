import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Tab } from './app.tab.routes';

import { NewAd } from '@screens/NewAd';
import { EditAds } from '@screens/EditAds';
import { Preview } from '@screens/Preview';
import { ProductDetails } from '@screens/ProductDetails';
import { MyAdsDetails } from '@screens/MyAdsDetails';
import { MyAds } from '@screens/MyAds';

type AppRoutes = {
  newad: undefined;
  editads: {userProduct_id: string};
  hometab: undefined;
  preview: undefined;
  productdetails: undefined;
  myadsdetails: {userProduct_id: string};
  myads: undefined;
}

export type AppNavigatorRoutesProps = NativeStackNavigationProp<AppRoutes>;

const { Navigator, Screen } = createNativeStackNavigator<AppRoutes>();

export function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}> 
      <Screen name='hometab' component={Tab} />
      <Screen name='newad' component={NewAd} />
      <Screen name='editads' component={EditAds} />
      <Screen name='preview' component={Preview}/>
      <Screen name='productdetails' component={ProductDetails}/>
      <Screen name='myadsdetails' component={MyAdsDetails}/>  
      <Screen name='myads' component={MyAds}/>  
    </Navigator>
  )
}