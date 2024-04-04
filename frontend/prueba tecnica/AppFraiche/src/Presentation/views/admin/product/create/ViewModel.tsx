import React, { useState, useContext } from 'react'
import * as ImagePicker from 'expo-image-picker';
import { CreateCategoryUseCase } from '../../../../../Domain/useCases/category/CreateCategory';
import { CategoryContext } from '../../../../context/CategoryContext';
import { Category } from '../../../../../Domain/entities/Category';
import { ProductContext } from '../../../../context/ProductContext';

const AdminProductCreateViewModel = (category: Category) => {


    const [values, setValues] = useState({
        name: '',
        description: '',
        image1: '',
        image2: '',
        image3: '',
        price: 0,
        id_category: category.id,
        sku: '',
        sku_alt: '',
        purchase_department: '',
        promo_price: 0,
        stock: 0,
        promo_quantity: 0,
        tax: 0,
        price3: 0

    });


    const [responseMessage, setResponseMessage] = useState('');// Estado del mensaje de exito en el formulario
    const [loading, setLoading] = useState(false);// Estado de carga del formulario
    const [file1, setFile1] = useState<ImagePicker.ImagePickerAsset>()// Estado de la imagen seleccionada o tomada con la cámara
    const [file2, setFile2] = useState<ImagePicker.ImagePickerAsset>()// Estado de la imagen seleccionada o tomada con la cámara
    const [file3, setFile3] = useState<ImagePicker.ImagePickerAsset>()// Estado de la imagen seleccionada o tomada con la cámara
    const { create } = useContext(ProductContext);
    const [errorMessage, setErrorMessage] = useState(''); //Impplementación de errores -- Edgar

    const onChange = (property: string, value: any) => {
        setValues({ ...values, [property]: value });
    }

    const createProduct = async () => {
        console.log('Producto Formulario' + JSON.stringify(values, null, 3))

        if (isValidForm()) {
            let files = [];
            files.push(file1!);
            files.push(file2!);
            files.push(file3!);
            setLoading(true);//Muestra vista de cargando//manda la pantalla antes de la  peticion
            const response = await create(values, files);
            setLoading(false);//Esconde la vista de carga despues de mandar lla peticion
            if (response.success) {
                setResponseMessage(response.message);
                if (response.success) {

                    resetForm();
                }
            }
            else {
                setErrorMessage(response.message);
                setErrorMessage('');
            }

        }



    }
    
    const isValidForm = (): boolean => {
        if (values.name === '') {
            setErrorMessage('Ingresa el nombre del gasto');
            return false;
        }
        if (values.description === '') {
            setErrorMessage('Ingresa la descripción del gasto');
            return false;
        }
        if (values.price === 0) {
            setErrorMessage('Ingresa la cantidad del gasto');
            return false;
        }
        if (values.image1 === '' && values.image2 === '' && values.image3 === '') {
            setErrorMessage('Seleccione una imagen para el gasto o un comprobante');
            return false;
        }
        if (values.image1 === '' || values.image2 === '' || values.image3 === '') {
            setErrorMessage('Seleccione 3 imágenes para el gasto o un comprobante');
            return false;
        }
        if (values.sku === '') {
            setErrorMessage('Ingresa si fue efectivo o tarjeta');
            return false;
        }
        
        if (values.purchase_department === '') {
            setErrorMessage('Ingresa en donde lo gastaste');
            return false;
        }
        if (values.stock === 0) {
            setErrorMessage('Indica si la cantidad de meses si fue a meses o solo 0');
            return false;
        }

        return true;
    }




    /**
   * Función para seleccionar una imagen de la galería
   */
    const pickImage = async (numberImage: number) => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            quality: 1
        });

       
        if (!result.canceled) {

            if (numberImage == 1) {
                onChange('image1', result.assets[0].uri);
                
                setFile1(result.assets[0]);
            }
            else if (numberImage == 2) {
                onChange('image2',  result.assets[0].uri);
                setFile2(result.assets[0]);
            }
            else if (numberImage == 3) {
                onChange('image3', result.assets[0].uri);
                setFile3(result.assets[0]);
            }
        }

    }

  
    const takePhoto = async (numberImage: number) => {
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

                if (numberImage == 1) {
                    onChange('image1', result.assets[0].uri);
                    
                    setFile1(result.assets[0]);
                }
                else if (numberImage == 2) {
                    onChange('image2',  result.assets[0].uri);
                    setFile2(result.assets[0]);
                }
                else if (numberImage == 3) {
                    onChange('image3', result.assets[0].uri);
                    setFile3(result.assets[0]);
                }
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
            image1: '',
            image2: '',
            image3: '',
            price: 0,
            id_category: category.id,
            sku: '',
            sku_alt: '',
            purchase_department: '',
            promo_price: 0,
            stock: 0,
            promo_quantity: 0,
            tax: 0,
            price3: 0

        })
    }



    return {

        ...values,
        onChange,
        takePhoto,
        pickImage,
        createProduct,
        setErrorMessage,
        errorMessage,
        loading,
        responseMessage

    }
}

export default AdminProductCreateViewModel;

