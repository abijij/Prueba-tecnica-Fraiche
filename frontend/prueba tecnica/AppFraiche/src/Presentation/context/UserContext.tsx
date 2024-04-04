//Esta calse nos permitira esparcir sobre todo el varias pantalla la informacion del usuario
import React from 'react';
import { createContext, useEffect, useState } from "react";
import { User } from "../../Domain/entities/User";
import { SaveUserLocalUseCase } from '../../Domain/useCases/userLocal/SaveUserLocal';
import { GetUserLocalUseCase } from '../../Domain/useCases/userLocal/GetUserLocal';
import { RemoveUserLocalUseCase } from "../../Domain/useCases/userLocal/RemoveUserLocal";

import { SaveOrderLocalUseCase } from '../../Domain/useCases/userLocal/SaveOrderLocal';
import { GetOrderLocalUseCase } from '../../Domain/useCases/userLocal/GetOrderLocal';
import { RemoveOrderLocalUseCase } from '../../Domain/useCases/userLocal/RemoveOrderLocal';


export const userInitialState: User = {

    id: '',
    name: '',
    lastname: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    image: '',
    session_token: '',
    roles: [],
    verify: 0,
    permissions: 0

}

export interface UserContextProps {

    
    user: User;
    //Guardar informacion de usuario en sesion
    saveUserSession: (user: User) => Promise<void>;
    //Obtener el usuario en sesion
    getUserSession: () => Promise<void>;
    //Eliminar usuario de sesion
    removeUserSession: () => Promise<void>;

    flaggy: boolean;
    setFlaggyTrue: () => Promise<void>;

}

export const UserContext = createContext({} as UserContextProps);

export const UserProvider = ({ children }: any) => {

    const [user, setUser] = useState(userInitialState);


    const [flaggy, setFlaggy] = useState(false);
    

    useEffect(() => {
        getUserSession();
    }, [])

    

    const saveUserSession = async (user: User) => {
        await SaveUserLocalUseCase(user);
        setUser(user);
    }

    

    const getUserSession = async () => {
        const user = await GetUserLocalUseCase();
        setUser(user);

    }


    const setFlaggyTrue = async () => {
        await setFlaggy(true);
    }

    const removeUserSession = async () => {

        await RemoveUserLocalUseCase();
        setUser(userInitialState);

    }


   
    
    return (
        <UserContext.Provider value={{

            user,
            flaggy,
            saveUserSession,
            getUserSession,
            removeUserSession,
            setFlaggyTrue
        }}>
            {/*Sin este children no renderiza ninguna pantalla */}
            {children}
        </UserContext.Provider>
    )

}
