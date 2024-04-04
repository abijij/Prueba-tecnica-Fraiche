import { AxiosError } from "axios";
import { User } from "../../Domain/entities/User";
import { AuthRepository } from "../../Domain/repositories/AuthRepository";
import { ApiDelivery, ApiDeliveryForImage } from "../sources/remote/api/ApiDelivery";
import { ResponseApiDelivery } from "../sources/remote/models/ResponseApiDelivery";
import mime from 'mime';
import * as ImagePicker from 'expo-image-picker';

//Alex

// Implementación del repositorio de autenticación
export class AuthRepositoryImpl implements AuthRepository {

    // Función para registrar un nuevo usuario
    async register(user: User): Promise<ResponseApiDelivery> {
        try {
            
            // Hacemos una solicitud HTTP POST para registrar el usuario en la API
            const response = await ApiDelivery.post<ResponseApiDelivery>('/users/create', user);
            return Promise.resolve(response.data);

        } catch (error) {
            // Si hay un error en la solicitud, lo manejamos y devolvemos un objeto de error de la API
            let e = (error as AxiosError);
            console.log('ERROR: ' + JSON.stringify(e.response?.data));
            const apiError:ResponseApiDelivery = JSON.parse(JSON.stringify(e.response?.data)); 
            return Promise.resolve(apiError)
        }
    }

    // Función para registrar un nuevo usuario con una imagen de perfil
    async registerWithImage(user: User, file: ImagePicker.ImagePickerAsset): Promise<ResponseApiDelivery> {
        try {
            
             // Creamos un objeto FormData para enviar la imagen y los datos del usuario a la API
            let data = new FormData();
            // @ts-ignore
            data.append('image', {
                // @ts-ignore
                uri: file.uri,
                name: file.uri.split('/').pop(),
                type: mime.getType(file.uri)!
            });
            data.append('user', JSON.stringify(user));
             // Hacemos una solicitud HTTP POST para registrar el usuario con la imagen en la API
            const response = await ApiDeliveryForImage.post<ResponseApiDelivery>('/users/createWithImage', data);
            return Promise.resolve(response.data);

        } catch (error) {
             // Si hay un error en la solicitud, lo manejamos y devolvemos un objetao de error de la API
            let e = (error as AxiosError);
            console.log('ERROR: ' + JSON.stringify(e.response?.data));
            const apiError:ResponseApiDelivery = JSON.parse(JSON.stringify(e.response?.data)); 
            return Promise.resolve(apiError)
        }
    }
    
    // Función para iniciar sesión con un correo electrónico y contraseña
    async login(email: string, password: string): Promise<ResponseApiDelivery> {
        try {
            // Hacemos una solicitud HTTP POST para iniciar sesión en la API
            
            const response = await ApiDelivery.post<ResponseApiDelivery>('/users/login', {
                email: email,
                password: password                
            });
            
            return Promise.resolve(response.data);

        } catch (error) {
            // Si hay un error en la solicitud, lo manejamos y devolvemos un objeto de error de la API
            let e = (error as AxiosError);
            console.log('ERROR: ' + JSON.stringify(e.response?.data));
            const apiError:ResponseApiDelivery = JSON.parse(JSON.stringify(e.response?.data)); 
            return Promise.resolve(apiError)
        }
    }

    // Función para verificar el pin --Alex
    async verify(pin: string): Promise<ResponseApiDelivery> {
        try {
            // Hacemos una solicitud HTTP POST para iniciar sesión en la API
            
            const response = await ApiDelivery.post<ResponseApiDelivery>('/users/pinVerify', {
                pin: pin,              
            });
            
            return Promise.resolve(response.data);

        } catch (error) {
            // Si hay un error en la solicitud, lo manejamos y devolvemos un objeto de error de la API
            let e = (error as AxiosError);
            console.log('ERROR: ' + JSON.stringify(e.response?.data));
            const apiError:ResponseApiDelivery = JSON.parse(JSON.stringify(e.response?.data)); 
            return Promise.resolve(apiError)
        }
    }

}