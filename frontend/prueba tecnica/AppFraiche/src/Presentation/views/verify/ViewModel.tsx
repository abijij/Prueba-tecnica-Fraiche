import React, { useState, useEffect, useContext } from 'react'
import { VerifyAuthUseCase } from '../../../Domain/useCases/auth/VerifyAuth';
import { SaveUserLocalUseCase } from '../../../Domain/useCases/userLocal/SaveUserLocal';
import { GetUserLocalUseCase } from '../../../Domain/useCases/userLocal/GetUserLocal';
import { useUserLocal } from '../../hooks/useUserLocal';
import { UserContext } from '../../context/UserContext';
import { ToastAndroid } from 'react-native';
import { UpdateVerifyStatusUseCase } from '../../../Domain/useCases/user/UpdateVerifyStatus';

//Edgar

const VerifyViewModel = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [values, setValues] = useState({
        pin: '',
    });
    // const { user, getUserSession } = useUserLocal();// Estado del usuario local y función para obtener la sesión del usuario
    const { user, getUserSession } = useUserLocal();
    // const {user} = useContext(UserContext);
    // let [verifyVar, setVerifyVar] = useState(0);
    // verifyVar = user.verify!;
    

    // console.log('USUARIO DE SESION: ' + JSON.stringify(user, null, 3));


    // const onChange = (property: string, value: any) => {
    //     setValues({ ...values, [property]: value });
    // }

    // const verify = async () => {
    //     if (isValidForm()) {
    //         const response = await VerifyAuthUseCase(values.pin);
    //         console.log('RESPONSE: ' + JSON.stringify(response));
    //         if (!response.success) {
    //             setErrorMessage(response.message);
    //             setErrorMessage(''); // Reseteando el valor del mensaje, para que se muestre en pantalla las veces necesarias--Edgar
    //         }
    //         else {
    //             setVerifyVar(1);
    //             ToastAndroid.show("Usuario Verificado", ToastAndroid.LONG);
    //         }
    //     }
    // }

    const isValidForm = (): boolean => {
        if (values.pin === '') {
            setErrorMessage('Ingresa el pin');
            return false;
        }

        return true;
    }

    const UpdateVerifyStatus = async (id: string) => {
        const result = await UpdateVerifyStatusUseCase(id);
    }

    return {
        ...values,
        // onChange,
        // verify,
        errorMessage,
        UpdateVerifyStatus
    }
}

export default VerifyViewModel;
