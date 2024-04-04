import { AxiosError } from 'axios';
import { ImagePickerAsset } from 'expo-image-picker';
import mime from 'mime';
import { Product } from '../../Domain/entities/Product';
import { ProductRepository } from '../../Domain/repositories/ProductRepository';
import { ApiDelivery, ApiDeliveryForImage } from '../sources/remote/api/ApiDelivery';
import { ResponseApiDelivery } from '../sources/remote/models/ResponseApiDelivery';

export class ProductRepositoryImpl implements ProductRepository {

    async findByCategory(idCategory: string): Promise<Product[]> {

        try {

            const response = await ApiDelivery.get<Product[]>(`/products/findByCategory/${idCategory}`);
            return Promise.resolve(response.data);

        } catch (error) {

            let e = (error as AxiosError);
            console.log('ERROR: ' + JSON.stringify(e.response?.data));
            return Promise.resolve([]);

        }
    }
    
    async findById(idProduct: string): Promise<Product[]> {

        try {

            const response = await ApiDelivery.get<Product[]>(`/products/findById/${idProduct}`);
            return Promise.resolve(response.data);

        } catch (error) {

            let e = (error as AxiosError);
            console.log('ERROR: ' + JSON.stringify(e.response?.data));
            return Promise.resolve([]);

        }
    }

    async findByCategoryPagination(idCategory: string, page: number): Promise<Product[]> {
        try {
          {
            const response = await ApiDelivery.get<Product[]>(`/products/findByCategoryPagination/${idCategory}/${page}`);
            return Promise.resolve(response.data)
          };
          
        } catch (error) {
          let e = error as AxiosError;
          console.log('ERROR en ruta: ' + JSON.stringify(e.response?.data));
          return Promise.resolve([]);
        }
      }

    async create(product: Product, files: ImagePickerAsset[]): Promise<ResponseApiDelivery> {

        try {

            // Creamos un objeto FormData para enviar la imagen y los datos del usuario a la API
            let data = new FormData();

            files.forEach(file => {
                // @ts-ignore
                data.append('image', {
                    // @ts-ignore
                    uri: file.uri,
                    name: file.uri.split('/').pop(),
                    type: mime.getType(file.uri)!
                });
            });
            data.append('product', JSON.stringify(product));
            // Hacemos una solicitud HTTP POST para registrar el usuario con la imagen en la API
            const response = await ApiDeliveryForImage.post<ResponseApiDelivery>('/products/create', data);
            return Promise.resolve(response.data);

        } catch (error) {

            // Si hay un error en la solicitud, lo manejamos y devolvemos un objeto de error de la API
            let e = (error as AxiosError);
            console.log('ERROR: ' + JSON.stringify(e.response?.data));
            const apiError: ResponseApiDelivery = JSON.parse(JSON.stringify(e.response?.data));
            return Promise.resolve(apiError)
        }


    }


    async update(product: Product): Promise<ResponseApiDelivery> {

        try {


            const response = await ApiDelivery.put<ResponseApiDelivery>('/products/update', product);
            return Promise.resolve(response.data);

        } catch (error) {

            // Si hay un error en la solicitud, lo manejamos y devolvemos un objeto de error de la API
            let e = (error as AxiosError);
            console.log('ERROR: ' + JSON.stringify(e.response?.data));
            const apiError: ResponseApiDelivery = JSON.parse(JSON.stringify(e.response?.data));
            return Promise.resolve(apiError)

        }

    }

   
    async updateWihtImage(product: Product, files: ImagePickerAsset[]): Promise<ResponseApiDelivery> {

        try {

            // Creamos un objeto FormData para enviar la imagen y los datos del usuario a la API
            let data = new FormData();

            files.forEach(file => {
                // @ts-ignore
                data.append('image', {
                    // @ts-ignore
                    uri: file.uri,
                    name: file.uri.split('/').pop(),
                    type: mime.getType(file.uri)!
                });
            });
            data.append('product', JSON.stringify(product));
            // Hacemos una solicitud HTTP POST para registrar el usuario con la imagen en la API
            const response = await ApiDeliveryForImage.put<ResponseApiDelivery>('/products/updateWihtImage', data);
            return Promise.resolve(response.data);

        } catch (error) {

            // Si hay un error en la solicitud, lo manejamos y devolvemos un objeto de error de la API
            let e = (error as AxiosError);
            console.log('ERROR: ' + JSON.stringify(e.response?.data));
            const apiError: ResponseApiDelivery = JSON.parse(JSON.stringify(e.response?.data));
            return Promise.resolve(apiError)
        }

    }

    async updateWihtImage3(product: Product, files: ImagePickerAsset[]): Promise<ResponseApiDelivery> {

        try {

            // Creamos un objeto FormData para enviar la imagen y los datos del usuario a la API
            let data = new FormData();

            files.forEach(file => {
                // @ts-ignore
                data.append('image', {
                    // @ts-ignore
                    uri: file.uri,
                    name: file.uri.split('/').pop(),
                    type: mime.getType(file.uri)!
                });
            });
            data.append('product', JSON.stringify(product));
            // Hacemos una solicitud HTTP POST para registrar el usuario con la imagen en la API
            const response = await ApiDeliveryForImage.put<ResponseApiDelivery>('/products/updateWihtImage3', data);
            return Promise.resolve(response.data);

        } catch (error) {

            // Si hay un error en la solicitud, lo manejamos y devolvemos un objeto de error de la API
            let e = (error as AxiosError);
            console.log('ERROR: ' + JSON.stringify(e.response?.data));
            const apiError: ResponseApiDelivery = JSON.parse(JSON.stringify(e.response?.data));
            return Promise.resolve(apiError)
        }

    }

    async updateWihtImage2(product: Product, files: ImagePickerAsset[]): Promise<ResponseApiDelivery> {

        try {

            // Creamos un objeto FormData para enviar la imagen y los datos del usuario a la API
            let data = new FormData();

            files.forEach(file => {
                // @ts-ignore
                data.append('image', {
                    // @ts-ignore
                    uri: file.uri,
                    name: file.uri.split('/').pop(),
                    type: mime.getType(file.uri)!
                });
            });
            data.append('product', JSON.stringify(product));
            // Hacemos una solicitud HTTP POST para registrar el usuario con la imagen en la API
            const response = await ApiDeliveryForImage.put<ResponseApiDelivery>('/products/updateWihtImage2', data);
            return Promise.resolve(response.data);

        } catch (error) {

            // Si hay un error en la solicitud, lo manejamos y devolvemos un objeto de error de la API
            let e = (error as AxiosError);
            console.log('ERROR: ' + JSON.stringify(e.response?.data));
            const apiError: ResponseApiDelivery = JSON.parse(JSON.stringify(e.response?.data));
            return Promise.resolve(apiError)
        }

    }

    async updateWihtImage1(product: Product, files: ImagePickerAsset[]): Promise<ResponseApiDelivery> {

        try {

            // Creamos un objeto FormData para enviar la imagen y los datos del usuario a la API
            let data = new FormData();

            files.forEach(file => {
                // @ts-ignore
                data.append('image', {
                    // @ts-ignore
                    uri: file.uri,
                    name: file.uri.split('/').pop(),
                    type: mime.getType(file.uri)!
                });
            });
            data.append('product', JSON.stringify(product));
            // Hacemos una solicitud HTTP POST para registrar el usuario con la imagen en la API
            const response = await ApiDeliveryForImage.put<ResponseApiDelivery>('/products/updateWihtImage1', data);
            return Promise.resolve(response.data);

        } catch (error) {

            // Si hay un error en la solicitud, lo manejamos y devolvemos un objeto de error de la API
            let e = (error as AxiosError);
            console.log('ERROR: ' + JSON.stringify(e.response?.data));
            const apiError: ResponseApiDelivery = JSON.parse(JSON.stringify(e.response?.data));
            return Promise.resolve(apiError)
        }

    }

    async updateWihtImage1and2(product: Product, files: ImagePickerAsset[]): Promise<ResponseApiDelivery> {

        try {

            // Creamos un objeto FormData para enviar la imagen y los datos del usuario a la API
            let data = new FormData();

            files.forEach(file => {
                // @ts-ignore
                data.append('image', {
                    // @ts-ignore
                    uri: file.uri,
                    name: file.uri.split('/').pop(),
                    type: mime.getType(file.uri)!
                });
            });
            data.append('product', JSON.stringify(product));
            // Hacemos una solicitud HTTP POST para registrar el usuario con la imagen en la API
            const response = await ApiDeliveryForImage.put<ResponseApiDelivery>('/products/updateWihtImage1and2', data);
            return Promise.resolve(response.data);

        } catch (error) {

            // Si hay un error en la solicitud, lo manejamos y devolvemos un objeto de error de la API
            let e = (error as AxiosError);
            console.log('ERROR: ' + JSON.stringify(e.response?.data));
            const apiError: ResponseApiDelivery = JSON.parse(JSON.stringify(e.response?.data));
            return Promise.resolve(apiError)
        }

    }


    async updateWihtImage1and3(product: Product, files: ImagePickerAsset[]): Promise<ResponseApiDelivery> {

        try {

            // Creamos un objeto FormData para enviar la imagen y los datos del usuario a la API
            let data = new FormData();

            files.forEach(file => {
                // @ts-ignore
                data.append('image', {
                    // @ts-ignore
                    uri: file.uri,
                    name: file.uri.split('/').pop(),
                    type: mime.getType(file.uri)!
                });
            });
            data.append('product', JSON.stringify(product));
            // Hacemos una solicitud HTTP POST para registrar el usuario con la imagen en la API
            const response = await ApiDeliveryForImage.put<ResponseApiDelivery>('/products/updateWihtImage1and3', data);
            return Promise.resolve(response.data);

        } catch (error) {

            // Si hay un error en la solicitud, lo manejamos y devolvemos un objeto de error de la API
            let e = (error as AxiosError);
            console.log('ERROR: ' + JSON.stringify(e.response?.data));
            const apiError: ResponseApiDelivery = JSON.parse(JSON.stringify(e.response?.data));
            return Promise.resolve(apiError)
        }

    }


    async updateWihtImage2and3(product: Product, files: ImagePickerAsset[]): Promise<ResponseApiDelivery> {

        try {

            // Creamos un objeto FormData para enviar la imagen y los datos del usuario a la API
            let data = new FormData();

            files.forEach(file => {
                // @ts-ignore
                data.append('image', {
                    // @ts-ignore
                    uri: file.uri,
                    name: file.uri.split('/').pop(),
                    type: mime.getType(file.uri)!
                });
            });
            data.append('product', JSON.stringify(product));
            // Hacemos una solicitud HTTP POST para registrar el usuario con la imagen en la API
            const response = await ApiDeliveryForImage.put<ResponseApiDelivery>('/products/updateWihtImage2and3', data);
            return Promise.resolve(response.data);

        } catch (error) {

            // Si hay un error en la solicitud, lo manejamos y devolvemos un objeto de error de la API
            let e = (error as AxiosError);
            console.log('ERROR: ' + JSON.stringify(e.response?.data));
            const apiError: ResponseApiDelivery = JSON.parse(JSON.stringify(e.response?.data));
            return Promise.resolve(apiError)
        }

    }



    async remove(product: Product): Promise<ResponseApiDelivery> {


        try {
            const response = await ApiDelivery.delete<ResponseApiDelivery>(`/products/delete/${product.id}`);
            return Promise.resolve(response.data);
        } catch (error) {
            // Si hay un error en la solicitud, lo manejamos y devolvemos un objeto de error de la API
            let e = (error as AxiosError);
            console.log('ERROR: ' + JSON.stringify(e.response?.data));
            const apiError: ResponseApiDelivery = JSON.parse(JSON.stringify(e.response?.data));
            return Promise.resolve(apiError)
        }


    }


        async updateStock(id: string, stock: number): Promise<ResponseApiDelivery> {

            try {
    
                // Hacemos una solicitud HTTP POST para registrar el usuario en la API
                const response = await ApiDelivery.put<ResponseApiDelivery>('/products/updateStock', {
                    id: id,
                    stock: stock
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

        async searchByName(name: string): Promise<Product[]> {

            try {
    
                const response = await ApiDelivery.get<Product[]>(`/products/searchByName/${name}`);
                return Promise.resolve(response.data);
    
            } catch (error) {
    
                let e = (error as AxiosError);
                console.log('ERROR: ' + JSON.stringify(e.response?.data));
                return Promise.resolve([]);
    
            }
        }

        async searchId(id: string): Promise<Product[]> {

            try {
    
                const response = await ApiDelivery.get<Product[]>(`/products/findById/${id}`);
                return Promise.resolve(response.data);
    
            } catch (error) {
    
                let e = (error as AxiosError);
                console.log('ERROR: ' + JSON.stringify(e.response?.data));
                return Promise.resolve([]);
    
            }
        }

        async findTotalProductsByCategory(category_id: string): Promise<ResponseApiDelivery> {

            try {
    
                const response = await ApiDelivery.get<ResponseApiDelivery>(`/products/findTotalProductsByCategory/${category_id}`);
                return Promise.resolve(response.data)
    
            } catch (error) {
    
                let e = (error as AxiosError);
              console.log('ERROR: ' + JSON.stringify(e.response?.data));
              const apiError:ResponseApiDelivery = JSON.parse(JSON.stringify(e.response?.data)); 
              return Promise.resolve(apiError)

            }
        }

        
        async updatePriceByPercentage(productId: string, percentage: string ): Promise<ResponseApiDelivery> {

            try {
    
                const response = await ApiDelivery.put<ResponseApiDelivery>(`/products/updatePriceByPercentage/${productId}/${percentage}`);
                return Promise.resolve(response.data);
    
            } catch (error) {
    
                let e = (error as AxiosError);
                console.log('ERROR: ' + JSON.stringify(e.response?.data));
                const apiError: ResponseApiDelivery = JSON.parse(JSON.stringify(e.response?.data));
                return Promise.resolve(apiError)
    
            }
        }

       

}


