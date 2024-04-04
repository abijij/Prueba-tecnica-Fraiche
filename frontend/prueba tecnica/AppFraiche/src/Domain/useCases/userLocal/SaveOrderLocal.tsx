import { UserLocalRepositoryImpl } from "../../../Data/repositories/UserLocalRepository";
import { Order } from "../../entities/Order";
import { User } from "../../entities/User";

// Obtiene la implementación de UserLocalRepository
const { saveOrder } = new UserLocalRepositoryImpl();

/**
 * Guarda la información de un usuario en el almacenamiento local.
 * 
 * @param user Objeto User que contiene la información del usuario a guardar.
 * @returns Una promesa que se resuelve cuando se ha guardado la información del usuario.
 */
export const SaveOrderLocalUseCase = async (order: Order) => {
    return await saveOrder(order);
}