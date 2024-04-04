import React from 'react'
import { ProductRepositoryImpl } from '../../../Data/repositories/ProductRepository';
import { Product } from '../../entities/Product';
import * as ImagePicker from 'expo-image-picker';

const { create } = new ProductRepositoryImpl();

export const CreateProductUseCase = async(product: Product, files: ImagePicker.ImagePickerAsset[]) => {
  return await create(product, files);
}


