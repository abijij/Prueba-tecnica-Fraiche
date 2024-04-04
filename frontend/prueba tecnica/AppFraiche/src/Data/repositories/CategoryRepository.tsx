import { CategoryRepository } from "../../Domain/repositories/CategoryRepository";
import { ResponseApiDelivery } from "../sources/remote/models/ResponseApiDelivery";
import { Category } from '../../Domain/entities/Category';
import { ApiDelivery, ApiDeliveryForImage } from "../sources/remote/api/ApiDelivery";
import * as ImagePicker from 'expo-image-picker';
import mime from "mime";
import { AxiosError } from "axios";

export class CategoryRepositoryImpl implements CategoryRepository {


    async getAll(): Promise<Category[]> {

        try {

            const response = await ApiDelivery.get<Category[]>('/categories/getAll');
            console.log('Categories: ' + JSON.stringify(response.data, null, 3));
            return Promise.resolve(response.data);//Pasamos la respuesrta del servidor

        } catch (error) {

            // Si hay un error en la solicitud, lo manejamos y devolvemos un objeto de error de la API
            let e = (error as AxiosError);
            console.log('ERROR: ' + JSON.stringify(e.response?.data));
            return Promise.resolve([]);

        }

    }



    async create(Category: Category, file: ImagePicker.ImagePickerAsset): Promise<ResponseApiDelivery> {

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
            data.append('category', JSON.stringify(Category));
            // Hacemos una solicitud HTTP POST para registrar el usuario con la imagen en la API
            const response = await ApiDeliveryForImage.post<ResponseApiDelivery>('/categories/create', data);
            return Promise.resolve(response.data);
        } catch (error) {
            // Si hay un error en la solicitud, lo manejamos y devolvemos un objeto de error de la API
            let e = (error as AxiosError);
            console.log('ERROR: ' + JSON.stringify(e.response?.data));
            const apiError: ResponseApiDelivery = JSON.parse(JSON.stringify(e.response?.data));
            return Promise.resolve(apiError)
        }

    }


    async update(category: Category): Promise<ResponseApiDelivery> {

        try {

            const response = await ApiDelivery.put<ResponseApiDelivery>('/categories/update', category);
            return Promise.resolve(response.data)

        } catch (error) {

            // Si hay un error en la solicitud, lo manejamos y devolvemos un objeto de error de la API
            let e = (error as AxiosError);
            console.log('ERROR: ' + JSON.stringify(e.response?.data));
            const apiError: ResponseApiDelivery = JSON.parse(JSON.stringify(e.response?.data));
            return Promise.resolve(apiError)

        }
    }

    async updateWihtImage(category: Category, file: ImagePicker.ImagePickerAsset): Promise<ResponseApiDelivery> {

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
            data.append('category', JSON.stringify(category));
            // Hacemos una solicitud HTTP POST para registrar el usuario con la imagen en la API
            const response = await ApiDeliveryForImage.put<ResponseApiDelivery>('/categories/updateWithImage', data);
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
            const response = await ApiDelivery.delete<ResponseApiDelivery>(`/categories/delete/${id}`);
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