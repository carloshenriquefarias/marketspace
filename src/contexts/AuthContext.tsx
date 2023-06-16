import { createContext, ReactNode, useEffect, useState } from "react";

import AsyncStorage from '@react-native-async-storage/async-storage';
import { storageUserGet, storageUserSave, storageUserRemove } from '@storage/storageUser';
import { storageAuthTokenGet, storageAuthTokenRemove, storageAuthTokenSave } from "@storage/storageAuthToken";
import { UserDTO } from "@dtos/UserDTO";
import { api } from "@services/api";

// import { SignOutModal } from "@components/SignOutModal";

// const { CLIENT_ID } = process.env;
// const { REDIRECT_URI } = process.env;

import * as AuthSession from 'expo-auth-session';
import * as AppleAuthentication from 'expo-apple-authentication';

export type AuthContextDataProps = {
  user: UserDTO;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  isLoadingUserStorageData: boolean;
  signInWithGoogle(): Promise<void>;
  signInWithApple(): Promise<void>;
}

type AuthContextProviderProps = { 
  children: ReactNode;
}

interface AuthorizationResponse {
  params: {
    access_token: string;
  },
  type: string;
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

export function AuthContextProvider({children} : AuthContextProviderProps){ 

  const [user, setUser] = useState<UserDTO>({} as UserDTO);
  const [userSocial, setUserSocial] = useState();
  const [isLoadingUserStorageData, setIsLoadingUserStorageData] = useState(true);
  const [visibleModal, setVisibleModal] = useState(false);

  const userStorageKey = '@marketspace:user';
  const [userStorageLoading, setUserStorageLoading] = useState(true);

  function handleOpenModal() {
    setVisibleModal(true);
  }

  async function storageUserAndTokenSave(userData: UserDTO, token: string) {

    try{
      setIsLoadingUserStorageData(true) 

      await storageUserSave(userData);
      await storageAuthTokenSave(token);

    } catch (error) {
      throw error;

    } finally {
      setIsLoadingUserStorageData(false)
    }      
  }

  async function userAndTokenUpdate(userData: UserDTO, token: string) {      
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
    setUser(userData) 
    
  }

  async function signIn(email: string, password: string) {           
    try {
      const { data } = await api.post('/sessions', { email, password });       
      
      if(data.user && data.token) {
        await storageUserAndTokenSave(data.user, data.token);
        userAndTokenUpdate(data.user, data.token)
      }

    } catch (error) {
        throw error

    } finally {
        setIsLoadingUserStorageData(false);
    }
  }

  async function loadUserData() {
    try {
      setIsLoadingUserStorageData(true);    
      const userLogged = await storageUserGet();
      const token = await storageAuthTokenGet();

      if(token && userLogged) {
        userAndTokenUpdate(userLogged, token);
      }

    } catch (error) {
      throw error

    } finally {
      setIsLoadingUserStorageData(false);
    }
  }

  async function signOut () {  

    try {

      setIsLoadingUserStorageData(true);
      setUser({} as UserDTO);
      await storageUserRemove();
      await storageAuthTokenRemove();

    } catch (error) {
      throw error;

    } finally {
      setIsLoadingUserStorageData(false);
    }
  }

  async function signInWithGoogle() {
    try {
      const RESPONSE_TYPE = 'token';
      const SCOPE = encodeURI('profile email');
      const CLIENT_ID = '483831018003-obc9lfcn1bdgu0ng86hgkc58tinnbmhs.apps.googleusercontent.com'
      const REDIRECT_URI = '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'

      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

      const { type, params } = await AuthSession.startAsync({ authUrl }) as AuthorizationResponse;
      console.log( type, params)

      if (type === 'success') {
        const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`);
        const userInfo = await response.json();

        const userLogged = { 
          id: userInfo.id,
          email: userInfo.email,
          name: userInfo.given_name,
          image: userInfo.picture,
        }

        setUser(userLogged);
        await AsyncStorage.setItem(userStorageKey, JSON.stringify(userLogged));
      }
    } catch(error) {
      throw new Error(error as string);
    }
  }

  async function signInWithApple() {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ]
      });

      if (credential) {
        const name = credential.fullName!.givenName!;
        const image = `https://ui-avatars.com/api/?name=${name}&length=1`;
  
        const userLogged = {
          id: String(credential.user),
          email: credential.email!,
          name,
          image,
        }

        setUser(userLogged);
        await AsyncStorage.setItem(userStorageKey, JSON.stringify(userLogged));
      }
    } catch (error) {
      throw new Error(error as string);
    }
  }

  async function loadUserStorageData() {
    const userStoraged = await AsyncStorage.getItem(userStorageKey);

    if (userStoraged) {
      const userLogged = JSON.parse(userStoraged) as UserDTO;
      setUser(userLogged);
    }

    setUserStorageLoading(false);
  }

  useEffect(() => {
    loadUserStorageData();
  }, [])

  useEffect(() => {
    loadUserData();
  },[])

  return (
    <AuthContext.Provider 
      value={{
        user,             
        signIn,
        signOut,
        isLoadingUserStorageData,
        signInWithGoogle,
        signInWithApple
      }}
    >
      {children}
    </AuthContext.Provider>
    
  )
}
