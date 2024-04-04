import axios from 'axios';
import { User } from '../../../../Domain/entities/User';
import { LocalStorage } from '../../local/LocalStorage';

 // Crea una instancia de Axios para enviar solicitudes con el encabezado "Content-type: application/json"   

const ApiDelivery = axios.create({
    baseURL: 'http://18.190.64.227/api',
    headers: {
        'Content-type': 'application/json'
    }
})

// Crea una instancia de Axios para enviar solicitudes con el encabezado "Content-type: multipart/form-data" y "accept: application/json"
const ApiDeliveryForImage = axios.create({
    baseURL: 'http://18.190.64.227/api',
    headers: {
        'Content-type': 'multipart/form-data',
        'accept': 'application/json',
    }
})

//INTERCEPTORS
ApiDelivery.interceptors.request.use(
 
    async(config) => {
        const data = await LocalStorage().getItem('user');
        if (data) {
            const user: User = JSON.parse(data as any);
            config.headers!['Authorization'] = user?.session_token!
        }
        return config;
    }
)

ApiDeliveryForImage.interceptors.request.use(
 
    async(config) => {
        const data = await LocalStorage().getItem('user');
        if (data) {
            const user: User = JSON.parse(data as any);
            config.headers!['Authorization'] = user?.session_token!
        }
        return config;
    }
)

export { ApiDelivery, ApiDeliveryForImage }