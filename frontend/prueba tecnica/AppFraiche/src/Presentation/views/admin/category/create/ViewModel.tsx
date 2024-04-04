import React, { useState, useContext } from 'react'
import * as ImagePicker from 'expo-image-picker';
import { CreateCategoryUseCase } from '../../../../../Domain/useCases/category/CreateCategory';
import { CategoryContext } from '../../../../context/CategoryContext';

const AdminCategoryCreateViewModel = () => {

    const [values, setValues] = useState({
        name: '',
        description: '',
        image: ''
    });

    const [errorMessage, setErrorMessage] = useState('');// Estado del mensaje de error en el formulario
    const [responseMessage, setResponseMessage] = useState('');// Estado del mensaje de exito en el formulario
    const [loading, setLoading] = useState(false);// Estado de carga del formulario
    const [file, setFile] = useState<ImagePicker.ImagePickerAsset>()// Estado de la imagen seleccionada o tomada con la cámara
    const { create } = useContext(CategoryContext);

    const onChange = (property: string, value: any) => {
        setValues({ ...values, [property]: value });
    }

    const createCategory = async () => {

        if (isValidForm()) {
            setLoading(true);//Muestra vista de cargando//manda la pantalla antes de la  peticion
            const response = await create(values, file!);
            setLoading(false);//Esconde la vista de carga despues de mandar lla peticion
            if (response.success) {
                setResponseMessage(response.message)
                resetForm();
            }
            else {
                setErrorMessage(response.message);
                setErrorMessage(''); // Reseteando el valor del mensaje, para que se muestre en pantalla
                // las veces necesarias--Edgar
            }
        }
    }

    //Validando que el formulario no esté vacío -- Edgar
    const isValidForm = (): boolean => {
        if (values.name === '') {
            setErrorMessage('Ingresa el nombre de la categoría');
            return false;
        }
        if (values.description === '') {
            setErrorMessage('Ingresa la descripción del producto');
            return false;
        }
        if (values.image === '') {
            setErrorMessage('Ingresa una imagen');
            return false;
        }

        return true;
    }

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
    // const takePhoto = async () => {
    //     let result = await ImagePicker.launchCameraAsync({
    //         mediaTypes: ImagePicker.MediaTypeOptions.All,
    //         allowsEditing: true,
    //         quality: 1
    //     });
    //     if (!result.canceled) {            
    //         onChange('image', result.assets[0].uri);
    //         setFile(result.assets[0]);
    //     }
    // }

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

    //Resetea los valores del formulario
    const resetForm = async () => {
        setValues({
            name: '',
            description: '',
            image: '',
        })



    }



    return {

        ...values,
        onChange,
        takePhoto,
        pickImage,
        createCategory,
        setErrorMessage,
        errorMessage,
        loading,
        responseMessage

    }
}

export default AdminCategoryCreateViewModel;

