import { AuthRepositoryImpl } from "../../../Data/repositories/AuthRepository";

/**
 * Llama al método login de la implementación del repositorio de autenticación 
 * y devuelve una promesa que se resuelve con la respuesta de la API.
 * @param {string} email - El correo electrónico del usuario.
 * @param {string} password - La contraseña del usuario.
 * @returns {Promise<ResponseApiDelivery>} - Una promesa que se resuelve con la respuesta de la API.
 */

const { login } = new AuthRepositoryImpl();

export const LoginAuthUseCase = async (email: string, password: string) => {
    return await login(email, password);
}