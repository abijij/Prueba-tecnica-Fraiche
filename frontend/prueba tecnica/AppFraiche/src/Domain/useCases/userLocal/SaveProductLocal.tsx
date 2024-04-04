import { UserLocalRepositoryImpl } from "../../../Data/repositories/UserLocalRepository";
import { Product } from "../../entities/Product";


// Obtiene la implementación de UserLocalRepository
const { saveProduct } = new UserLocalRepositoryImpl();
export const SaveProductLocalUseCase = async (product: Product) => {
    return await saveProduct(product);
}