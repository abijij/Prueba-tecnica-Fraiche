import { Product } from '../../Domain/entities/Product';
import React, { useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { ResponseApiDelivery } from '../../Data/sources/remote/models/ResponseApiDelivery';
import { createContext, useState } from 'react';
import { CreateProductUseCase } from '../../Domain/useCases/product/CreateProduct';
import { DeleteProductUseCase } from '../../Domain/useCases/product/DeleteProduct'
import { GetProductsByCategoryUseCase } from '../../Domain/useCases/product/GetProductsByCategory';
import { GetProductsByIdUseCase } from '../../Domain/useCases/product/GetProductsById';
import { UpdateProductUseCase } from '../../Domain/useCases/product/UpdateProduct';
import { UpdateWhitImageProductUseCase } from '../../Domain/useCases/product/UpdateWhitImageProdcut';
import { UpdateWhitImage1ProductUseCase } from '../../Domain/useCases/product/UpdateWhitImageProduct1';
import { UpdateWhitImage2ProductUseCase } from '../../Domain/useCases/product/UpdateWhitImageProduct2';
import { UpdateWhitImage3ProductUseCase } from '../../Domain/useCases/product/UpdateWhitImageProduct3';
import { UpdateWhitImage1and2ProductUseCase } from '../../Domain/useCases/product/updateWihtImageProduct1and2';
import { UpdateWhitImage1and3ProductUseCase } from '../../Domain/useCases/product/updateWihtImageProduct1and3';
import { UpdateWhitImage2and3ProductUseCase } from '../../Domain/useCases/product/updateWihtImageProduct2and3';
import { SaveProductLocalUseCase } from '../../Domain/useCases/userLocal/SaveProductLocal';
import { GetProductLocalUseCase } from '../../Domain/useCases/userLocal/GetProductLocal';
import { RemoveProductLocalUseCase } from '../../Domain/useCases/userLocal/RemoveProductLocal';
import { GetProductsByCategoryPagination } from '../../Domain/useCases/product/GetProductsByCategoryPagination';


export const productInitialState: Product = {
    id: '',
    name: '',
    description: '',
    image1: '',
    image2: '',
    image3: '',
    price: 0,
    id_category: '',
    sku: '',
    sku_alt:'',
    purchase_department: '',
    promo_price: 0,
    stock: 0,
    promo_quantity:0,
    tax: 0,
    price3: 0
    
}

export interface ProductContextProps {

    products: Product[],

    product: Product,
    
    

    saveProductSession: (product: Product) => Promise<void>;

    getProductSession: () => Promise<void>;

    removeProductSession: () => Promise<void>;

    getProducts(idCategory: string): Promise<void>,

    getProductbyId(idProduct: string): Promise<void>,

    getProductsPagination(idCategory: string, page: number): Promise<void>,

    create(product: Product, files: ImagePicker.ImagePickerAsset[]): Promise<ResponseApiDelivery>,

    updateWihtImage(product: Product, files: ImagePicker.ImagePickerAsset[]): Promise<ResponseApiDelivery>,

    updateWihtImage3(product: Product, files: ImagePicker.ImagePickerAsset[]): Promise<ResponseApiDelivery>,

    updateWihtImage2(product: Product, files: ImagePicker.ImagePickerAsset[]): Promise<ResponseApiDelivery>,

    updateWihtImage1(product: Product, files: ImagePicker.ImagePickerAsset[]): Promise<ResponseApiDelivery>,

    updateWihtImage1and2(product: Product, files: ImagePicker.ImagePickerAsset[]): Promise<ResponseApiDelivery>,

    updateWihtImage1and3(product: Product, files: ImagePicker.ImagePickerAsset[]): Promise<ResponseApiDelivery>,

    updateWihtImage2and3(product: Product, files: ImagePicker.ImagePickerAsset[]): Promise<ResponseApiDelivery>,

    update(product: Product): Promise<ResponseApiDelivery>,

    remove(product: Product): Promise<ResponseApiDelivery>,
    

}

export const ProductContext = createContext({} as ProductContextProps);

export const ProductProvider = ({ children }: any) => {


    const [product, setProduct] = useState(productInitialState)

    const [products, seTProducts] = useState<Product[]>([])



    useEffect(() => {
        getProductSession();
    }, [])

    const saveProductSession = async (product: Product) => {
        await SaveProductLocalUseCase(product);
        setProduct(product);
    }

    const getProducts = async (idCategory: string): Promise<void> => {

        const result = await GetProductsByCategoryUseCase(idCategory);
        seTProducts(result);

    }

    const getProductbyId = async (idProduct: string): Promise<void> => {

        const result = await GetProductsByIdUseCase(idProduct);
        seTProducts(result);

    }

    const getProductsPagination = async (idCategory: string, page: number): Promise<void> => {

        const result = await GetProductsByCategoryPagination(idCategory, page);
        seTProducts(result);

    }

    const getProductSession = async () => {
        const product = await GetProductLocalUseCase();
        setProduct(product);

    }

    const removeProductSession = async () => {

        await RemoveProductLocalUseCase();
        setProduct(productInitialState);

    }

   

    const create = async (product: Product, file: ImagePicker.ImagePickerAsset[]): Promise<ResponseApiDelivery> => {

        const response = await CreateProductUseCase(product, file);

        getProducts(product.id_category!);
        return response;
    }

  
    const update = async (product: Product): Promise<ResponseApiDelivery> => {

        const response = await UpdateProductUseCase(product);
        getProducts(product.id_category!);
        return response;

    }

    const updateWihtImage = async (product: Product, files: ImagePicker.ImagePickerAsset[]): Promise<ResponseApiDelivery> => {

        const response = await UpdateWhitImageProductUseCase(product, files);
        getProducts(product.id_category!);
        return response;

    }

    const updateWihtImage3 = async (product: Product, files: ImagePicker.ImagePickerAsset[]): Promise<ResponseApiDelivery> => {

        const response = await UpdateWhitImage3ProductUseCase(product, files);
        getProducts(product.id_category!);
        return response;

    }

    const updateWihtImage2 = async (product: Product, files: ImagePicker.ImagePickerAsset[]): Promise<ResponseApiDelivery> => {

        const response = await UpdateWhitImage2ProductUseCase(product, files);
        getProducts(product.id_category!);
        return response;

    }

    const updateWihtImage1 = async (product: Product, files: ImagePicker.ImagePickerAsset[]): Promise<ResponseApiDelivery> => {

        const response = await UpdateWhitImage1ProductUseCase(product, files);
        getProducts(product.id_category!);
        return response;

    }

    const updateWihtImage1and2 = async (product: Product, files: ImagePicker.ImagePickerAsset[]): Promise<ResponseApiDelivery> => {

        const response = await UpdateWhitImage1and2ProductUseCase(product, files);
        getProducts(product.id_category!);
        return response;

    }

    const updateWihtImage1and3 = async (product: Product, files: ImagePicker.ImagePickerAsset[]): Promise<ResponseApiDelivery> => {

        const response = await UpdateWhitImage1and3ProductUseCase(product, files);
        getProducts(product.id_category!);
        return response;

    }

    const updateWihtImage2and3 = async (product: Product, files: ImagePicker.ImagePickerAsset[]): Promise<ResponseApiDelivery> => {

        const response = await UpdateWhitImage2and3ProductUseCase(product, files);
        getProducts(product.id_category!);
        return response;

    }


    const remove = async (product: Product): Promise<ResponseApiDelivery> => {
        const response = await DeleteProductUseCase(product);
        getProducts(product.id_category!);
        return response;
    }


    return (
        <ProductContext.Provider value={{
            products,
            product,
            getProducts,
            getProductbyId,
            getProductsPagination,
            create,
            saveProductSession,
            getProductSession,
            removeProductSession,
            update,
            updateWihtImage,
            updateWihtImage3,
            updateWihtImage2,
            updateWihtImage1,
            updateWihtImage1and2,
            updateWihtImage1and3,
            updateWihtImage2and3,
            remove,


        }}>

            {/*Sin este children no renderiza ninguna pantalla */}
            {children}

        </ProductContext.Provider>
    )
}







