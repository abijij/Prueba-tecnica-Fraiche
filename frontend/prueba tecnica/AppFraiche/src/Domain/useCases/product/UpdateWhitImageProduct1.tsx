import { ProductRepositoryImpl } from "../../../Data/repositories/ProductRepository";
import { Product } from "../../entities/Product";
import * as ImagePicker from 'expo-image-picker';


const { updateWihtImage1 } = new ProductRepositoryImpl();

export const UpdateWhitImage1ProductUseCase = async(product: Product, files: ImagePicker.ImagePickerAsset[]) => {


    return await updateWihtImage1 (product, files);


}