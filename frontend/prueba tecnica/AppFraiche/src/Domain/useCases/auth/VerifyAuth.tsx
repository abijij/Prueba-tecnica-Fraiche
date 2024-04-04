import { AuthRepositoryImpl } from "../../../Data/repositories/AuthRepository";

//Edgar

/**
 * Llama al método login de la implementación del repositorio de autenticación 
 * y devuelve una promesa que se resuelve con la respuesta de la API.
 * @param {string} email - El correo electrónico del usuario.
 * @param {string} password - La contraseña del usuario.
 * @returns {Promise<ResponseApiDelivery>} - Una promesa que se resuelve con la respuesta de la API.
 */

const { verify } = new AuthRepositoryImpl();

export const VerifyAuthUseCase = async (pin: string) => {
    return await verify(pin);
}