import { UserLocalRepositoryImpl } from "../../../Data/repositories/UserLocalRepository";
// Se instancia la clase UserLocalRepositoryImpl y se obtiene la función getUser
const { getProduct } = new UserLocalRepositoryImpl();
export const GetProductLocalUseCase = async () => {
    return await getProduct();
}