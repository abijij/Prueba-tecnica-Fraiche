import { UserLocalRepositoryImpl } from "../../../Data/repositories/UserLocalRepository";
import { User } from "../../entities/User";

const { remove } = new UserLocalRepositoryImpl();


/**
 * Caso de uso para remover el usuario localmente
 * @returns Promesa que resuelve con void
 */
export const RemoveUserLocalUseCase = async () => {
    return await remove();
}