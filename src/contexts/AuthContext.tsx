import { createContext, ReactNode } from "react";

import { UserDTO } from "@dtos/UserDTO";

export type AuthContextDataProps = {
    user: UserDTO;
}

type AuthContextProviderProps = { 
    children: ReactNode;
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

export function AuthContextProvider({children} : AuthContextProviderProps){
    return (
        <AuthContext.Provider value={{
            user: {
            id: '1',
            name: 'Carlos henrique',
            email:'rike@gmail.com',
            telefone: '999999595',
            avatar: 'henrique.png', 
            }        
        }}>
            { children}
        </AuthContext.Provider>
    )
}