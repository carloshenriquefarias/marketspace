import { 
  createStackNavigator, 
  StackNavigationProp 
} from '@react-navigation/stack';

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
  productdetails: {product_id: string};
  myadsdetails: {userProduct_id: string};
  myads: undefined;
}

export type AppNavigatorRoutesProps = StackNavigationProp<AppRoutes>;

const { Navigator, Screen } = createStackNavigator<AppRoutes>();

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