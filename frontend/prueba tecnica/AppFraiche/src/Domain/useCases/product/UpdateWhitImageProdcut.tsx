import { ProductRepositoryImpl } from "../../../Data/repositories/ProductRepository";
import { Product } from "../../entities/Product";
import * as ImagePicker from 'expo-image-picker';


const { updateWihtImage } = new ProductRepositoryImpl();

export const UpdateWhitImageProductUseCase = async(product: Product, files: ImagePicker.ImagePickerAsset[]) => {


    return await updateWihtImage (product, files);


}