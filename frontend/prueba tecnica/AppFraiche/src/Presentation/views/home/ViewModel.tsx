import React, { useState, useEffect, useContext } from 'react'
import { LoginAuthUseCase } from '../../../Domain/useCases/auth/LoginAuth';
import { SaveUserLocalUseCase } from '../../../Domain/useCases/userLocal/SaveUserLocal';
import { GetUserLocalUseCase } from '../../../Domain/useCases/userLocal/GetUserLocal';
import { useUserLocal } from '../../hooks/useUserLocal';
import { UserContext } from '../../context/UserContext';
import { UpdateNotificationTokenUserUseCase } from '../../../Domain/useCases/user/UpdateNotificationTokenUser';

const HomeViewModel = () => {
    console.log('El usuario ha efectuado una funcion en el View Model de HomeScreen');

    const [errorMessage, setErrorMessage] = useState('');
    const [values, setValues] = useState({
        email: '',
        password: '',
    });
    //const { user, getUserSession } = useUserLocal();
    const { user, saveUserSession, removeUserSession, getUserSession } = useContext(UserContext);
    console.log('USUARIO DE SESION: ' + JSON.stringify(user, null, 3));


    const onChange = (property: string, value: any) => {
        setValues({ ...values, [property]: value });
    }

    const login = async () => {
        if (isValidForm()) {
            const response = await LoginAuthUseCase(values.email, values.password);
            console.log('RESPONSE: ' + JSON.stringify(response));
            if (!response.success) {
                setErrorMessage(response.message);
                setErrorMessage(''); // Reseteando el valor del mensaje, para que se muestre en pantalla
                // las veces necesarias--Edgar
            }
            else {
                saveUserSession(response.data);
                getUserSession();
            }
        }
    }

    const updateNotificationToken = async (id: string, token: string) => {
        const result = await UpdateNotificationTokenUserUseCase(id, token);
    }

    const isValidForm = (): boolean => {

        if (values.email === '' && values.password === '') { //Validación en caso de que no se registre ningún valor en el formulario
            setErrorMessage('Ingrese algún dato')
            return false;
        }
        else if (values.email === '') {
            setErrorMessage('Ingresa el correo electrónico');
            return false;
        }
        else if (values.password === '') {
            setErrorMessage('Ingresa la contraseña');
            return false;
        }
        else if (!values.email.includes('@')) {
            setErrorMessage('Ingresa un correo electrónico válido');
            return false;
        }

        return true;
    }

    return {
        ...values,
        user,
        onChange,
        login,
        errorMessage,
        setErrorMessage,
        updateNotificationToken,
        removeUserSession,
        getUserSession,
        saveUserSession,
    }
}

export default HomeViewModel;
