//Acciones a realizar con la API    
import { ResponseApiDelivery } from "../../Data/sources/remote/models/ResponseApiDelivery";
import { User } from "../entities/User";
import * as ImagePicker from 'expo-image-picker';

export interface UserRepository {

    getDeliveryMen(): Promise<User[]>;

    getClient(): Promise<User[]>;

    getAdmin(): Promise<User[]>;

    update(user: User): Promise<ResponseApiDelivery>;

    updateWithImage(user: User, file: ImagePicker.ImagePickerAsset): Promise<ResponseApiDelivery>;

    updateNotificationToken(id: string, token: string): Promise<ResponseApiDelivery>;

    updateVerifyStatus(id: string): Promise<ResponseApiDelivery>;

    updatePermissionsStatus(id: string): Promise<ResponseApiDelivery>;

    remove(id: string): Promise<ResponseApiDelivery>;
}