//Inplementacion de metodos

import { ResponseApiDelivery } from '../../Data/sources/remote/models/ResponseApiDelivery';
import { Category } from '../entities/Category';
import * as ImagePicker from 'expo-image-picker';
export interface CategoryRepository{

    getAll(): Promise<Category[]>;//Regresamos una lista

    create(Category: Category, file: ImagePicker.ImagePickerAsset): Promise<ResponseApiDelivery>;

    update(category: Category): Promise<ResponseApiDelivery>;

    updateWihtImage(Category: Category, file: ImagePicker.ImagePickerAsset): Promise<ResponseApiDelivery>;

    remove(id: string): Promise<ResponseApiDelivery>;


}