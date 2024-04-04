import React, { useState, useContext, useEffect } from 'react'
import * as ImagePicker from 'expo-image-picker';
import { CreateCategoryUseCase } from '../../../../../Domain/useCases/category/CreateCategory';
import { CategoryContext } from '../../../../context/CategoryContext';
import { Category } from '../../../../../Domain/entities/Category';
import { ProductContext } from '../../../../context/ProductContext';
import { Product } from '../../../../../Domain/entities/Product';
import { ResponseApiDelivery } from '../../../../../Data/sources/remote/models/ResponseApiDelivery';
import { UserContext } from '../../../../context/UserContext';

const AdminProductUpdateViewModel = (product: Product, category: Category) => {


    const [values, setValues] = useState(product);

    console.log('Product: ' + JSON.stringify(product, null, 3));
    const { saveProductSession } = useContext(ProductContext);
    
    useEffect(() => {
        saveProductSession(product);
        console.log('Valor de product' + JSON.stringify(product, null, 5));
      }, [])

   


    const [responseMessage, setResponseMessage] = useState('');// Estado del mensaje de exito en el formulario
    const [loading, setLoading] = useState(false);// Estado de carga del formulario
    const [file1, setFile1] = useState<ImagePicker.ImagePickerAsset>()
    const [file2, setFile2] = useState<ImagePicker.ImagePickerAsset>()
    const [file3, setFile3] = useState<ImagePicker.ImagePickerAsset>()
    const { update, updateWihtImage, updateWihtImage3, updateWihtImage2, updateWihtImage1, updateWihtImage1and2, updateWihtImage1and3, updateWihtImage2and3 } = useContext(ProductContext);
    const [errorMessage, setErrorMessage] = useState(''); 
    const {user} = useContext(UserContext)
    console.log("Valor de User" + JSON.stringify(user, null, 3))

    const onChange = (property: string, value: any) => {
        setValues({ ...values, [property]: value });
    }



    const updateProduct = async () => {
        console.log('Producto Formulario' + JSON.stringify(values, null, 3));
        if (isValidForm()) {
            let files = [];
            files.push(file1!);
            files.push(file2!);
            files.push(file3!);

            let files1 = [];
            files1.push(file1!);

            let files2 = [];
            files2.push(file2!);

            let files3 = [];
            files3.push(file3!);

            let files1and2 = [];
            files1and2.push(file1!);
            files1and2.push(file2!);

            let files1and3 = [];
            files1and3.push(file1!);
            files1and3.push(file3!);

            let files2and3 = [];
            files2and3.push(file2!);
            files2and3.push(file3!);

            setLoading(true);

            let response = {} as ResponseApiDelivery;

            console.log('Prueba Actualización1' + JSON.stringify(values.image1));
            console.log('Prueba Actualización2' + JSON.stringify(values.image2));
            console.log('Prueba Actualización3' + JSON.stringify(values.image3));

            if (values.image1.includes('https://') && values.image2.includes('https://') && values.image3.includes('https://')) {
                console.log('Entro el metodo update');
                response = await update(values);
            }
            else if (values.image1.includes('file:///') && values.image2.includes('file:///')) {
                console.log('Entro el metodo updateWihtImage1and2');
                response = await updateWihtImage1and2(values, files1and2);
            }
            else if (values.image1.includes('file:///') && values.image3.includes('file:///')) {
                console.log('Entro el metodo updateWihtImage1and3');
                response = await updateWihtImage1and3(values, files1and3);
            }
            else if (values.image2.includes('file:///') && values.image3.includes('file:///')) {
                console.log('Entro el metodo updateWihtImage2and3');
                response = await updateWihtImage2and3(values, files2and3);
            }
            else if (values.image1.includes('file:///')) {
                console.log('Entro el metodo updateWihtImage1');
                response = await updateWihtImage1(values, files1);
            }
            else if (values.image2.includes('file:///')) {
                console.log('Entro el metodo updateWihtImage2');
                response = await updateWihtImage2(values, files2);
            }
            else if (values.image3.includes('file:///')) {
                console.log('Entro el metodo updateWihtImage3');
                response = await updateWihtImage3(values, files3);
            }
            else {
                console.log('Entro el metodo updateWihtImage');
                response = await updateWihtImage(values, files);
            }
            setLoading(false);
            if (response.success) {
                setResponseMessage(response.message);
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

    /**
   * Función para tomar una foto con la cámara
   */
    // const takePhoto = async (numberImage: number) => {
    //     let result = await ImagePicker.launchCameraAsync({
    //         mediaTypes: ImagePicker.MediaTypeOptions.All,
    //         allowsEditing: true,
    //         quality: 1
    //     });

    //     if (!result.canceled) {

    //         if (numberImage == 1) {
    //             onChange('image1', result.assets[0].uri);
                
    //             setFile1(result.assets[0]);
    //         }
    //         else if (numberImage == 2) {
    //             onChange('image2',  result.assets[0].uri);
    //             setFile2(result.assets[0]);
    //         }
    //         else if (numberImage == 3) {
    //             onChange('image3', result.assets[0].uri);
    //             setFile3(result.assets[0]);
    //         }
    //     }
    // }

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
    /* const resetForm = async () => {
        setValues({
 
         name: '',
         description: '',
         image1: '',
         image2: '',
         image3: '',
         price: 0,
         id_category:category.id,
 
         })
     }*/



    return {

        ...values,
        user,
        onChange,
        takePhoto,
        pickImage,
        updateProduct,
        setResponseMessage,
        setErrorMessage,
        errorMessage,
        loading,
        responseMessage

    }
}

export default AdminProductUpdateViewModel;

