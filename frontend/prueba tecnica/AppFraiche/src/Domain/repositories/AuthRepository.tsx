import { ResponseApiDelivery } from "../../Data/sources/remote/models/ResponseApiDelivery";
import { User } from "../entities/User";
import * as ImagePicker from 'expo-image-picker';

export interface AuthRepository {
     /**
     * Autentica al usuario con su correo electrónico y contraseña
     * @param email correo electrónico del usuario
     * @param password contraseña del usuario
     * @returns una promesa que resuelve en un objeto ResponseApiDelivery que contiene el resultado de la autenticación
     */
    login(email: string, password: string): Promise<ResponseApiDelivery>;
     /**
     * Registra un nuevo usuario sin imagen
     * @param user objeto User que contiene la información del nuevo usuario a registrar
     * @returns una promesa que resuelve en un objeto ResponseApiDelivery que contiene el resultado del registro
     */
    register(user: User): Promise<ResponseApiDelivery>
     /**
     * Registra un nuevo usuario con imagen
     * @param user objeto User que contiene la información del nuevo usuario a registrar
     * @param file objeto ImageInfo que contiene la imagen del usuario a registrar
     * @returns una promesa que resuelve en un objeto ResponseApiDelivery que contiene el resultado del registro
     */
    registerWithImage(user: User, file: ImagePicker.ImagePickerAsset): Promise<ResponseApiDelivery>

    verify(pin: string): Promise<ResponseApiDelivery>; //Edgar

}