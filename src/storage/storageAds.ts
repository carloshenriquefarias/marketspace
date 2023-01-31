import { AdsDTO } from '@dtos/AdsDto';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { ADS_STORAGE } from './storageConfig';

export async function storageAdsSave(ads: AdsDTO) {
  await AsyncStorage.setItem(ADS_STORAGE, JSON.stringify(ads));
}

export async function storageAdsGet() {
  const storage = await AsyncStorage.getItem(ADS_STORAGE);

  const ads = storage ? (JSON.parse(storage) as AdsDTO) : undefined;

  return ads;
}

export async function storageAdsRemove() { 
  await AsyncStorage.removeItem(ADS_STORAGE);
}