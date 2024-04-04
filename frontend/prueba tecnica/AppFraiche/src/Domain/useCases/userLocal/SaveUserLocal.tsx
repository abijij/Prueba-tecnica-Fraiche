import { UserLocalRepositoryImpl } from "../../../Data/repositories/UserLocalRepository";
import { User } from "../../entities/User";

// Obtiene la implementación de UserLocalRepository
const { save } = new UserLocalRepositoryImpl();

/**
 * Guarda la información de un usuario en el almacenamiento local.
 * 
 * @param user Objeto User que contiene la información del usuario a guardar.
 * @returns Una promesa que se resuelve cuando se ha guardado la información del usuario.
 */
export const SaveUserLocalUseCase = async (user: User) => {
    return await save(user);
}