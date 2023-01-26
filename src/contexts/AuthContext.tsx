import { createContext, ReactNode, useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { storageUserGet, storageUserSave, storageUserRemove } from '@storage/storageUser';

import { UserDTO } from "@dtos/UserDTO";
import { api } from "@services/api";

export type AuthContextDataProps = {
    user: UserDTO;
    signIn: (email: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
    isLoadingUserStorageData: boolean;
}

type AuthContextProviderProps = { 
    children: ReactNode;
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

export function AuthContextProvider({children} : AuthContextProviderProps){ 
    const [ user, setUser] = useState<UserDTO>({} as UserDTO);
    const [isLoadingUserStorageData, setIsLoadingUserStorageData] = useState(true);

    async function signIn(email: string, password: string) {     
      
      try {
        const { data } = await api.post('/sessions', { email, password });       
        
        if(data.user) {
          setUser(data.user);
          storageUserSave(data.user);
        }
  
      } catch (error) {
          throw error
      }
  }

    async function loadUserData() {

      try {
        setIsLoadingUserStorageData(true);    
        const userLogged = await storageUserGet();
  
        if(userLogged) {
          setUser(userLogged);
        }
  
      } catch (error) {
        throw error
  
      } finally {
        setIsLoadingUserStorageData(false);
      }
    }

    async function signOut () { // USAR ESTA FUNÇÃO NO BOTAO DA TAB-BAR
  
      try {
        setIsLoadingUserStorageData(true);
        setUser({} as UserDTO);

        await storageUserRemove();
  
      } catch (error) {
        throw error;
  
      } finally {
        setIsLoadingUserStorageData(false);
      }
    }

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
          }}
        >
          {children}
        </AuthContext.Provider>
    )
}
