import { ProductRepositoryImpl } from "../../../Data/repositories/ProductRepository";
import { Product } from "../../entities/Product";
import * as ImagePicker from 'expo-image-picker';


const { updateWihtImage1and3 } = new ProductRepositoryImpl();

export const UpdateWhitImage1and3ProductUseCase = async(product: Product, files: ImagePicker.ImagePickerAsset[]) => {


    return await updateWihtImage1and3 (product, files);


}