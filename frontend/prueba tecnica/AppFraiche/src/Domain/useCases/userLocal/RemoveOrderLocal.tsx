import { UserLocalRepositoryImpl } from "../../../Data/repositories/UserLocalRepository";
import { User } from "../../entities/User";

const { removeOrder } = new UserLocalRepositoryImpl();


/**
 * Caso de uso para remover el usuario localmente
 * @returns Promesa que resuelve con void
 */
export const RemoveOrderLocalUseCase = async () => {
    return await removeOrder();
}