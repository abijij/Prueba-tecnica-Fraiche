import { AuthRepositoryImpl } from "../../../Data/repositories/AuthRepository";
import { User } from "../../entities/User";

const { register } = new AuthRepositoryImpl();

/**
 * Registra un nuevo usuario en la aplicación.
 * @param user Los datos del usuario a registrar.
 * @returns Una promesa que resuelve en una respuesta de la API Delivery.
 */

export const RegisterAuthUseCase = async (user: User) => {
    return await register(user);
}