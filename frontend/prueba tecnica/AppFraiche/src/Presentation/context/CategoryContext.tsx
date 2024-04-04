import React from 'react';
import { Category } from "../../Domain/entities/Category";
import * as ImagePicker from 'expo-image-picker';
import { ResponseApiDelivery } from "../../Data/sources/remote/models/ResponseApiDelivery";
import { createContext, useEffect, useState } from 'react';
import { GetAllCategoryUseCase } from "../../Domain/useCases/category/GetAllCategory";
import { CreateCategoryUseCase } from "../../Domain/useCases/category/CreateCategory";
import { UpdateCategoryUseCase } from "../../Domain/useCases/category/UpdateCategoy";
import { UpdateWhitImageCategoryUseCase } from "../../Domain/useCases/category/UpdateWhitImageCategory";
import { DeleteCategoryUseCase } from "../../Domain/useCases/category/DeleteCategory";

export interface CategoryContextProps {

    categories: Category[],

    getCategories(): Promise<void>,//Regresamos una lista

    create(category: Category, file: ImagePicker.ImagePickerAsset): Promise<ResponseApiDelivery>,

    update(category: Category): Promise<ResponseApiDelivery>,

    updateWihtImage(Category: Category, file: ImagePicker.ImagePickerAsset): Promise<ResponseApiDelivery>,

    remove(id: string): Promise<ResponseApiDelivery>

}

export const CategoryContext = createContext({} as CategoryContextProps);

export const CategoryProvider = ({ children }: any) => {

    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {// Cuando sea llamada esta pantalla muestre el siguiente metodo para ver la lista de categorías
        if (categories.length === 0) {
            getCategories();// metodo que trae las categorías a renderizar
        }
    }, [])

    const getCategories = async (): Promise<void> => {
        const result = await GetAllCategoryUseCase();
        setCategories(result);
    }

    const create = async (category: Category, file: ImagePicker.ImagePickerAsset): Promise<ResponseApiDelivery> => {

        const response = await CreateCategoryUseCase(category, file!);
        getCategories();
        return response;
    }

    const update = async (category: Category): Promise<ResponseApiDelivery> => {

        const response = await UpdateCategoryUseCase(category);
        getCategories();
        return response;
    }


    const updateWihtImage = async (category: Category, file: ImagePicker.ImagePickerAsset): Promise<ResponseApiDelivery> => {

        const response = await UpdateWhitImageCategoryUseCase(category, file);
        getCategories();
        return response;
    }


    const remove = async (id: string): Promise<ResponseApiDelivery> => {
        const response = await DeleteCategoryUseCase(id);
        getCategories();
        return response;
    }
    return (
        <CategoryContext.Provider value={{
            categories,
            getCategories,
            create,
            update,
            updateWihtImage,
            remove
        }}>
            {/*Sin este children no renderiza ninguna pantalla */}
            {children}
        </CategoryContext.Provider>
    )

}