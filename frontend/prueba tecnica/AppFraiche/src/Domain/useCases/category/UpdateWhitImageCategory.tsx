import React from 'react'
import { CategoryRepositoryImpl } from '../../../Data/repositories/CategoryRepository'
import { Category } from '../../entities/Category';
import * as ImagePicker from 'expo-image-picker';

const { updateWihtImage } = new CategoryRepositoryImpl();

export const UpdateWhitImageCategoryUseCase = async (Category: Category, file: ImagePicker.ImagePickerAsset) => {
  return await updateWihtImage (Category, file);
}
