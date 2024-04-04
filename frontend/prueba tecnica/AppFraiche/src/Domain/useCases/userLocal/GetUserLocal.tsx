import { UserLocalRepositoryImpl } from "../../../Data/repositories/UserLocalRepository";
import { User } from "../../entities/User";

// Se instancia la clase UserLocalRepositoryImpl y se obtiene la función getUser
const { getUser } = new UserLocalRepositoryImpl();

/**
 * Caso de uso para obtener el usuario local almacenado en el dispositivo.
 * 
 * @returns Una promesa que resuelve en el objeto User almacenado en el dispositivo.
 */
export const GetUserLocalUseCase = async () => {
    return await getUser();
}