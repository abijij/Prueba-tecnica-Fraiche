import * as ImagePicker from 'expo-image-picker';
import { ResponseApiDelivery } from '../../Data/sources/remote/models/ResponseApiDelivery';
import { Product } from '../entities/Product';

export interface ProductRepository {


   create(product: Product, files: ImagePicker.ImagePickerAsset[]): Promise<ResponseApiDelivery>;

   findByCategory(idCategory: string): Promise<Product[]>;

   findById(idProduct: string): Promise<Product[]>;

   findByCategoryPagination(idCategory: string, page: number): Promise<Product[]>;

   update(product: Product): Promise<ResponseApiDelivery>;

   updateWihtImage(product: Product, files: ImagePicker.ImagePickerAsset[]): Promise<ResponseApiDelivery>;

   updateWihtImage3(product: Product, files: ImagePicker.ImagePickerAsset[]): Promise<ResponseApiDelivery>;

   updateWihtImage2(product: Product, files: ImagePicker.ImagePickerAsset[]): Promise<ResponseApiDelivery>;

   updateWihtImage1(product: Product, files: ImagePicker.ImagePickerAsset[]): Promise<ResponseApiDelivery>;

   updateWihtImage1and2(product: Product, files: ImagePicker.ImagePickerAsset[]): Promise<ResponseApiDelivery>;

   updateWihtImage1and3(product: Product, files: ImagePicker.ImagePickerAsset[]): Promise<ResponseApiDelivery>;

   updateWihtImage2and3(product: Product, files: ImagePicker.ImagePickerAsset[]): Promise<ResponseApiDelivery>;

   remove(product: Product): Promise<ResponseApiDelivery>;

   updateStock(id: string, stock: number): Promise<ResponseApiDelivery>;

   searchByName(name: string): Promise<Product[]>;

   searchId(id: string): Promise<Product[]>;

   findTotalProductsByCategory(category_id: string): Promise<ResponseApiDelivery>;

   updatePriceByPercentage(productId: string,  percentage: string): Promise<ResponseApiDelivery>;




}