
 import { ProductRepositoryImpl } from "../../../Data/repositories/ProductRepository";
import { Product } from "../../entities/Product";



const { updateStock } = new ProductRepositoryImpl();

export const UpdateStockUseCase = async(id: string, stock: number) => {


    return await updateStock (id, stock);
}