import { ProductRepositoryImpl } from "../../../Data/repositories/ProductRepository";
import { Product } from "../../entities/Product";
import * as ImagePicker from 'expo-image-picker';


const { updateWihtImage1and2 } = new ProductRepositoryImpl();

export const UpdateWhitImage1and2ProductUseCase = async(product: Product, files: ImagePicker.ImagePickerAsset[]) => {


    return await updateWihtImage1and2 (product, files);


}