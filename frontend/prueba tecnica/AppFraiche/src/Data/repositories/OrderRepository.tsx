import { AxiosError } from 'axios';
import { Order } from '../../Domain/entities/Order';
import { OrderRepository } from '../../Domain/repositories/OrderRepository';
import { ResponseApiDelivery } from '../sources/remote/models/ResponseApiDelivery';
import { ApiDelivery, ApiDeliveryForImage } from '../sources/remote/api/ApiDelivery';




export class OrderRepositoryImpl implements OrderRepository{

    async getByStatus(status: string): Promise<Order[]> {
        try {
            const response = await ApiDelivery.get<Order[]>(`/orders/findByStatus/${status}`)
            return Promise.resolve(response.data);
        } catch (error) {
            let e = (error as AxiosError);
            console.log('ERROR: ' + JSON.stringify(e.response?.data));
            return Promise.resolve([]);
        }
        
    }

    async getByDeliveryAndStatus(idDelivery: string, status: string): Promise<Order[]> {
        try {
            const response = await ApiDelivery.get<Order[]>(`/orders/findByDeliveryAndStatus/${idDelivery}/${status}`)
            return Promise.resolve(response.data);
        } catch (error) {
            let e = (error as AxiosError);
            console.log('ERROR: ' + JSON.stringify(e.response?.data));
            return Promise.resolve([]);
        }
    }

    async getByClientAndStatus(idClient: string, status: string): Promise<Order[]> {
        try {
            const response = await ApiDelivery.get<Order[]>(`/orders/findByClientAndStatus/${idClient}/${status}`)
            return Promise.resolve(response.data);
        } catch (error) {
            let e = (error as AxiosError);
            console.log('ERROR: ' + JSON.stringify(e.response?.data));
            return Promise.resolve([]);
        }
    }


   async create(order: Order): Promise<ResponseApiDelivery> {
        try {
            const response = await ApiDelivery.post<ResponseApiDelivery>('/orders/create', order);
            return Promise.resolve(response.data);
        } catch (error) {
            // Si hay un error en la solicitud, lo manejamos y devolvemos un objeto de error de la API
            let e = (error as AxiosError);
            console.log('ERROR: ' + JSON.stringify(e.response?.data));
            const apiError:ResponseApiDelivery = JSON.parse(JSON.stringify(e.response?.data)); 
            return Promise.resolve(apiError)
        }
        
    }

    async createEfec(order: Order): Promise<ResponseApiDelivery> {
        try {
            const response = await ApiDelivery.post<ResponseApiDelivery>('/orders/createEfec', order);
            return Promise.resolve(response.data);
        } catch (error) {
            // Si hay un error en la solicitud, lo manejamos y devolvemos un objeto de error de la API
            let e = (error as AxiosError);
            console.log('ERROR: ' + JSON.stringify(e.response?.data));
            const apiError:ResponseApiDelivery = JSON.parse(JSON.stringify(e.response?.data)); 
            return Promise.resolve(apiError)
        }
        
    }

    async updateToDispached(order: Order): Promise<ResponseApiDelivery> {
        try {
            const response = await ApiDelivery.put<ResponseApiDelivery>('/orders/updateToDispached', order);
            return Promise.resolve(response.data);
        } catch (error) {
            // Si hay un error en la solicitud, lo manejamos y devolvemos un objeto de error de la API
            let e = (error as AxiosError);
            console.log('ERROR: ' + JSON.stringify(e.response?.data));
            const apiError:ResponseApiDelivery = JSON.parse(JSON.stringify(e.response?.data)); 
            return Promise.resolve(apiError)
        }
    }

    async updateToOnTheWay(order: Order): Promise<ResponseApiDelivery> {
        try {
            const response = await ApiDelivery.put<ResponseApiDelivery>('/orders/updateToOnTheWay', order);
            return Promise.resolve(response.data);
        } catch (error) {
            // Si hay un error en la solicitud, lo manejamos y devolvemos un objeto de error de la API
            let e = (error as AxiosError);
            console.log('ERROR: ' + JSON.stringify(e.response?.data));
            const apiError:ResponseApiDelivery = JSON.parse(JSON.stringify(e.response?.data)); 
            return Promise.resolve(apiError)
        }
    }

    async updateToDelivered(order: Order): Promise<ResponseApiDelivery> {
        try {
            const response = await ApiDelivery.put<ResponseApiDelivery>('/orders/updateToDelivered', order);
            return Promise.resolve(response.data);
        } catch (error) {
            // Si hay un error en la solicitud, lo manejamos y devolvemos un objeto de error de la API
            let e = (error as AxiosError);
            console.log('ERROR: ' + JSON.stringify(e.response?.data));
            const apiError:ResponseApiDelivery = JSON.parse(JSON.stringify(e.response?.data)); 
            return Promise.resolve(apiError)
        }
    }

    async updatePaymentMethodsCash(order: Order): Promise<ResponseApiDelivery> {
        try {
            const response = await ApiDelivery.put<ResponseApiDelivery>('/orders/updatePaymentMethodsCash', order);
            return Promise.resolve(response.data);
        } catch (error) {
            // Si hay un error en la solicitud, lo manejamos y devolvemos un objeto de error de la API
            let e = (error as AxiosError);
            console.log('ERROR: ' + JSON.stringify(e.response?.data));
            const apiError:ResponseApiDelivery = JSON.parse(JSON.stringify(e.response?.data)); 
            return Promise.resolve(apiError)
        }
    }

  

    async findLastOrderByUserId(id_client:string): Promise<Order[]> {
        try {
            const response = await ApiDelivery.get<Order[]>(`/orders/findLastOrderByUserId/${id_client}`)
            return Promise.resolve(response.data);
        } catch (error) {
            let e = (error as AxiosError);
            console.log('ERROR: ' + JSON.stringify(e.response?.data));
            return Promise.resolve([]);
        }
    }


    async remove(order: Order): Promise<ResponseApiDelivery> {
            
            
        try {
            const response = await ApiDelivery.delete<ResponseApiDelivery>(`/orders/delete/${order.id}`);
            return Promise.resolve(response.data);
        } catch (error) {
             // Si hay un error en la solicitud, lo manejamos y devolvemos un objeto de error de la API
            let e = (error as AxiosError);
            console.log('ERROR: ' + JSON.stringify(e.response?.data));
            const apiError:ResponseApiDelivery = JSON.parse(JSON.stringify(e.response?.data)); 
            return Promise.resolve(apiError)
        }


    }

    
    async countOrdersByDate(): Promise<ResponseApiDelivery> {
        
        try {

            const  response = await ApiDelivery.get<ResponseApiDelivery>('/orders/countOrdersByDate');
            return Promise.resolve(response.data)

        } catch (error) {
            
              // Si hay un error en la solicitud, lo manejamos y devolvemos un objeto de error de la API
              let e = (error as AxiosError);
              console.log('ERROR: ' + JSON.stringify(e.response?.data));
              const apiError:ResponseApiDelivery = JSON.parse(JSON.stringify(e.response?.data)); 
              return Promise.resolve(apiError)

        }
    }

    async getTotalSalesCurrentDay(): Promise<ResponseApiDelivery> {
        
        try {

            const  response = await ApiDelivery.get<ResponseApiDelivery>('/orders/getTotalSalesCurrentDay');
            return Promise.resolve(response.data)

        } catch (error) {
            
              // Si hay un error en la solicitud, lo manejamos y devolvemos un objeto de error de la API
              let e = (error as AxiosError);
              console.log('ERROR: ' + JSON.stringify(e.response?.data));
              const apiError:ResponseApiDelivery = JSON.parse(JSON.stringify(e.response?.data)); 
              return Promise.resolve(apiError)

        }
    }

    async getTotalOrdersCurrentWeek(): Promise<ResponseApiDelivery> {
        
        try {

            const  response = await ApiDelivery.get<ResponseApiDelivery>('/orders/getTotalOrdersCurrentWeek');
            return Promise.resolve(response.data)

        } catch (error) {
            
              // Si hay un error en la solicitud, lo manejamos y devolvemos un objeto de error de la API
              let e = (error as AxiosError);
              console.log('ERROR: ' + JSON.stringify(e.response?.data));
              const apiError:ResponseApiDelivery = JSON.parse(JSON.stringify(e.response?.data)); 
              return Promise.resolve(apiError)

        }
    }

    async getTotalSalesCurrentWeek(): Promise<ResponseApiDelivery> {
        
        try {

            const  response = await ApiDelivery.get<ResponseApiDelivery>('/orders/getTotalSalesCurrentWeek');
            return Promise.resolve(response.data)

        } catch (error) {
            
              // Si hay un error en la solicitud, lo manejamos y devolvemos un objeto de error de la API
              let e = (error as AxiosError);
              console.log('ERROR: ' + JSON.stringify(e.response?.data));
              const apiError:ResponseApiDelivery = JSON.parse(JSON.stringify(e.response?.data)); 
              return Promise.resolve(apiError)

        }
    }

    async getTotalOrdersCurrentMonth(): Promise<ResponseApiDelivery> {
        
        try {

            const  response = await ApiDelivery.get<ResponseApiDelivery>('/orders/getTotalOrdersCurrentMonth');
            return Promise.resolve(response.data)

        } catch (error) {
            
              // Si hay un error en la solicitud, lo manejamos y devolvemos un objeto de error de la API
              let e = (error as AxiosError);
              console.log('ERROR: ' + JSON.stringify(e.response?.data));
              const apiError:ResponseApiDelivery = JSON.parse(JSON.stringify(e.response?.data)); 
              return Promise.resolve(apiError)

        }
    }

    async getTotalSalesCurrentMonth(): Promise<ResponseApiDelivery> {
        
        try {

            const  response = await ApiDelivery.get<ResponseApiDelivery>('/orders/getTotalSalesCurrentMonth');
            return Promise.resolve(response.data)

        } catch (error) {
            
              // Si hay un error en la solicitud, lo manejamos y devolvemos un objeto de error de la API
              let e = (error as AxiosError);
              console.log('ERROR: ' + JSON.stringify(e.response?.data));
              const apiError:ResponseApiDelivery = JSON.parse(JSON.stringify(e.response?.data)); 
              return Promise.resolve(apiError)

        }
    }


}