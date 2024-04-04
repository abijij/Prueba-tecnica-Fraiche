import React, { useContext, useState } from 'react';
import { RegisterWithImageAuthUseCase } from '../../../Domain/useCases/auth/RegisterWithImageAuth';
import * as ImagePicker from 'expo-image-picker';
import { UserContext } from '../../context/UserContext';


//Edgar c:

/**
 * RegisterViewModel es un componente de React que se encarga de manejar el estado del formulario de registro de usuarios
 * y manejar las acciones de registro, selección de imagen y toma de foto, y validación de formulario. También proporciona
 * el estado de carga y mensaje de error al componente que lo consume.
 */
const RegisterViewModel = () => {
    console.log('El usuario ha efectuado una funcion en el ViewModel de Register');

    const [flaggy, setflaggy] = useState(false);


    const [errorMessage, setErrorMessage] = useState('');// Estado del mensaje de error en el formulario
    const [values, setValues] = useState({// Estado de los valores del formulario
        name: '',
        lastname: '',
        phone: '',
        email: '',
        image: '',
        password: '',
        confirmPassword: '',
        verify: 0,
        permissions: 0
    });
    const [loading, setLoading] = useState(false);// Estado de carga del formulario
    const [file, setFile] = useState<ImagePicker.ImagePickerAsset>()// Estado de la imagen seleccionada o tomada con la cámara
    const { user, getUserSession, saveUserSession } = useContext(UserContext);// Estado del usuario local y función para obtener la sesión del usuario
    const [canContinue, setCanContinue] = useState(false); // Estado para indicar si se puede continuar a la siguiente pantalla


    /**
     * Función para seleccionar una imagen de la galería
     */
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            quality: 1
        });

        if (!result.canceled) {
            onChange('image', result.assets[0].uri);
            setFile(result.assets[0]);
        }
    }

    /**
   * Función para tomar una foto con la cámara
   */
    const takePhoto = async () => {
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    
        console.log("Resultado de permissionResult: ", permissionResult);
    
        if (permissionResult.granted === false) {
            alert("Debes darle acceso a la cámara para el correcto uso de la App");
            return;
        }
    
        try {
            let result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                quality: 1
            });
    
            if (!result.canceled) {
                onChange('image', result.assets[0].uri);
                setFile(result.assets[0]);
            } else {
                
                console.log("Captura de imagen cancelada");
            }
        } catch (error) {
            console.error("Error al lanzar la cámara:", error);
            alert("Tu equipo no es compatible con la camara porfavor ocupar la Galeria");
           
        }
    }
    
    const onChange = (property: string, value: any) => {
        setValues({ ...values, [property]: value })
    }
    const isPasswordValid = (password: string) => {
        // Verificar longitud de al menos 8 caracteres
        if (password.length < 8) {
            setErrorMessage('La contraseña debe tener al menos 8 caracteres.');
            return false;
        }

        // Verificar al menos una letra mayúscula o minúscula
        if (!/[A-Za-z]/.test(password)) {
            setErrorMessage('La contraseña debe tener al menos una letra.');
            return false;
        }

        // Verificar al menos una letra mayúscula o minúscula
        if (!/[A-Z]/.test(password)) {
            setErrorMessage('La contraseña debe tener al menos una letra mayúscula.');
            return false;
        }

        // Verificar al menos un número
        if (!/\d/.test(password)) {
            setErrorMessage('La contraseña debe tener al menos un número.');
            return false;
        }

        // Verificar al menos un carácter especial
        if (!/[!-\/:-@\[-\`{-~]/.test(password)) {
            setErrorMessage('La contraseña debe tener al menos un caracter especial.');
            return false;
        }

        


        return true;



    };

    // RegisterViewModel

    // ...

    // Función para realizar el registro de usuario con los valores del formulario
    const register = async () => {
        if (isValidForm()) {// Si el formulario es válido
            setLoading(true);// Establecer el estado de carga a verdadero
            // const response = await RegisterAuthUseCase(values); // Registrar usuario sin imagen
            const response = await RegisterWithImageAuthUseCase(values, file!);// Registrar usuario con imagen
            setLoading(false);// Establecer el estado de carga a falso
            console.log('RESULT: ' + JSON.stringify(response, null, 3));  // Mostrar la respuesta del registro en la consola      

            if (response.success) {// Si el registro fue exitoso
                saveUserSession(response.data);// Guardar datos del usuario en local storage
                setCanContinue(true);
                // ToastAndroid.show("Registro exitoso", ToastAndroid.LONG);
            } else {
                setErrorMessage(response.message);
                setErrorMessage(''); // Reseteando el valor del mensaje, para que se muestre en pantalla las veces necesarias--Edgar
                setCanContinue(false);
            }
        }
    }





    const isValidForm = (): boolean => {

        if (values.name === '') {
            setErrorMessage('Ingresa tu nombre');
            return false;
        }
        if (values.lastname === '') {
            setErrorMessage('Ingresa tu apellido');
            return false;
        }
        if (values.email === '') {
            setErrorMessage('Ingresa tu correo electrónico');
            return false;
        }
        if (values.phone === '') {
            setErrorMessage('Ingresa tu teléfono');
            return false;
        }
        if (values.password === '') {
            setErrorMessage('Ingresa la contraseña');
            return false;
        }
        if (values.confirmPassword === '') {
            setErrorMessage('Ingresa la confirmacion de la contraseña');
            return false;
        }
        if (values.password !== values.confirmPassword) {
            setErrorMessage('Las contraseñas no coinciden');
            return false;
        }
        if (values.image === '') {
            setErrorMessage('Selecciona una imagen');
            return false;
        }
        if (!values.email.includes('@')) {
            setErrorMessage('Ingresa un correo electrónico válido');
            return false;
        }
        if (!isPasswordValid(values.password)) {
            return false;
        }

        return true;

    }

    const flaggySetting = () => {
        if (isValidForm()) {
            setflaggy(true);
        }
    }



    
    return {
        ...values,
        onChange,
        register,
        pickImage,
        takePhoto,
        setErrorMessage,
        flaggySetting,
        setflaggy,
        flaggy,
        errorMessage,
        loading,
        user,
        canContinue

    }
}

export default RegisterViewModel;
