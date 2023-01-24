import { UserDTO } from '@dtos/UserDto';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { USER_STORAGE } from './storageConfig';

export async function storageUserSave(user: UserDTO) {
  await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(user));
}

export async function storageUserGet() {
  const storage = await AsyncStorage.getItem(USER_STORAGE);

  const user = storage ? (JSON.parse(storage) as UserDTO) : undefined;

  return user;
}
