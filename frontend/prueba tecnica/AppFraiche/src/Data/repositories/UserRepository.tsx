import { AxiosError } from "axios";
import { ImagePickerAsset } from "expo-image-picker";
import mime from "mime";
import { User } from "../../Domain/entities/User";
import { UserRepository } from "../../Domain/repositories/UserRepository";
import { ApiDelivery, ApiDeliveryForImage } from "../sources/remote/api/ApiDelivery";
import { ResponseApiDelivery } from "../sources/remote/models/ResponseApiDelivery";

export class UserRepositoryImpl implements UserRepository {

    async getDeliveryMen(): Promise<User[]> {
        try {
            const response = await ApiDelivery.get<User[]>('/users/findDeliveryMen');
            return Promise.resolve(response.data);

        } catch (error) {
            // Si hay un error en la solicitud, lo manejamos y devolvemos un objeto de error de la API
            let e = (error as AxiosError);
            console.log('ERROR: ' + JSON.stringify(e.response?.data));
            return Promise.resolve([]);
        }
    }

    async getClient(): Promise<User[]> {
        try {
            const response = await ApiDelivery.get<User[]>('/users/findClient');
            return Promise.resolve(response.data);

        } catch (error) {
            // Si hay un error en la solicitud, lo manejamos y devolvemos un objeto de error de la API
            let e = (error as AxiosError);
            console.log('ERROR: ' + JSON.stringify(e.response?.data));
            return Promise.resolve([]);
        }
    }

    async getAdmin(): Promise<User[]> {
        try {
            const response = await ApiDelivery.get<User[]>('/users/findAdmin');
            return Promise.resolve(response.data);

        } catch (error) {
            // Si hay un error en la solicitud, lo manejamos y devolvemos un objeto de error de la API
            let e = (error as AxiosError);
            console.log('ERROR: ' + JSON.stringify(e.response?.data));
            return Promise.resolve([]);
        }
    }

    async update(user: User): Promise<ResponseApiDelivery> {

        try {

            // Hacemos una solicitud HTTP POST para registrar el usuario en la API
            const response = await ApiDelivery.put<ResponseApiDelivery>('/users/updateWhithoutImage', user);
            return Promise.resolve(response.data);

        } catch (error) {
            // Si hay un error en la solicitud, lo manejamos y devolvemos un objeto de error de la API
            let e = (error as AxiosError);
            console.log('ERROR: ' + JSON.stringify(e.response?.data));
            const apiError: ResponseApiDelivery = JSON.parse(JSON.stringify(e.response?.data));
            return Promise.resolve(apiError)
        }
    }


    async updateNotificationToken(id: string, token: string): Promise<ResponseApiDelivery> {

        try {

            // Hacemos una solicitud HTTP POST para registrar el usuario en la API
            const response = await ApiDelivery.put<ResponseApiDelivery>('/users/updateNotificationToken', {
                id: id,
                token: token
            });
            return Promise.resolve(response.data);

        } catch (error) {
            // Si hay un error en la solicitud, lo manejamos y devolvemos un objeto de error de la API
            let e = (error as AxiosError);
            console.log('ERROR: ' + JSON.stringify(e.response?.data));
            const apiError: ResponseApiDelivery = JSON.parse(JSON.stringify(e.response?.data));
            return Promise.resolve(apiError)
        }


    }

    async updateWithImage(user: User, file: ImagePickerAsset): Promise<ResponseApiDelivery> {

        try {
            // Creamos un objeto FormData para enviar la imagen y los datos del usuario a la API
            let data = new FormData();
            // @ts-ignore
            data.append('image', {
                uri: file.uri,
                name: file.uri.split('/').pop(),
                type: mime.getType(file.uri)!
            });
            data.append('user', JSON.stringify(user));
            // Hacemos una solicitud HTTP POST para registrar el usuario con la imagen en la API
            const response = await ApiDeliveryForImage.put<ResponseApiDelivery>('/users/update', data);
            return Promise.resolve(response.data);

        } catch (error) {
            // Si hay un error en la solicitud, lo manejamos y devolvemos un objetao de error de la API
            let e = (error as AxiosError);
            console.log('ERROR: ' + JSON.stringify(e.response?.data));
            const apiError: ResponseApiDelivery = JSON.parse(JSON.stringify(e.response?.data));
            return Promise.resolve(apiError)
        }

    }

    async updateVerifyStatus(id: string): Promise<ResponseApiDelivery> {

        try {

            // Hacemos una solicitud HTTP POST para registrar el usuario en la API
            const response = await ApiDelivery.put<ResponseApiDelivery>('/users/updateVerifyStatus', {
                id: id
            });
            return Promise.resolve(response.data);

        } catch (error) {
            // Si hay un error en la solicitud, lo manejamos y devolvemos un objeto de error de la API
            let e = (error as AxiosError);
            console.log('ERROR: ' + JSON.stringify(e.response?.data));
            const apiError: ResponseApiDelivery = JSON.parse(JSON.stringify(e.response?.data));
            return Promise.resolve(apiError)
        }


    }

    async updatePermissionsStatus(id: string): Promise<ResponseApiDelivery> {

        try {

            // Hacemos una solicitud HTTP POST para registrar el usuario en la API
            const response = await ApiDelivery.put<ResponseApiDelivery>('/users/updatePermissionsStatus', {
                id: id
            });
            return Promise.resolve(response.data);

        } catch (error) {
            // Si hay un error en la solicitud, lo manejamos y devolvemos un objeto de error de la API
            let e = (error as AxiosError);
            console.log('ERROR: ' + JSON.stringify(e.response?.data));
            const apiError: ResponseApiDelivery = JSON.parse(JSON.stringify(e.response?.data));
            return Promise.resolve(apiError)
        }


    }

    async remove(id: string): Promise<ResponseApiDelivery> {

        try {
            const response = await ApiDelivery.delete<ResponseApiDelivery>(`/users/delete/${id}`);
            return Promise.resolve(response.data);
        } catch (error) {
            // Si hay un error en la solicitud, lo manejamos y devolvemos un objeto de error de la API
            let e = (error as AxiosError);
            console.log('ERROR: ' + JSON.stringify(e.response?.data));
            const apiError: ResponseApiDelivery = JSON.parse(JSON.stringify(e.response?.data));
            return Promise.resolve(apiError)
        }


    }
}