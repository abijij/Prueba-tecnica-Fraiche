import React, { useContext, useState } from 'react'
import { ProductContext } from '../../../../context/ProductContext';
import { Product } from '../../../../../Domain/entities/Product';
import { GetProductsByCategoryUseCase } from '../../../../../Domain/useCases/product/GetProductsByCategory';
import { GetProductsByNameUseCase } from '../../../../../Domain/useCases/product/SearchProductByName';
import { GetTotalProductsByCategory } from '../../../../../Domain/useCases/product/GetTotalProductsByCategory';

const AdminProductListViewModel = () => {
    const {products, remove, getProducts, getProductsPagination } = useContext(ProductContext);
    const [responseMessage, setresponseMessage] = useState('');
    const [selectedPage, setSelectedPage] = useState(1);
  const [totalPages, setTotalPages] =useState<any>(0);

  const handlePageChange = (page: number) => {
    setSelectedPage(page);
  };

  const getTotalProducts = async (category_id: string) => {
    try {
      const result = await GetTotalProductsByCategory(category_id);
      
      if (Array.isArray(result) && result.length > 0) {
        const totalProducts = result[0].total_products;
  
        // Realizamos la división y redondeamos hacia arriba si hay un residuo decimal
        const totalPages = Math.ceil(totalProducts / 10);
  
        setTotalPages(totalPages);
      } else {
        console.log("No se encontraron resultados.");
      }
    } catch (error) {
      console.error("Error al obtener el total de productos:", error);
    }
  };

    const deleteProduct = async (product: Product) => {

        const result = await remove(product);
        setresponseMessage(result.message);

    }



    return {
        products,
        responseMessage,
        selectedPage,
        totalPages,
        deleteProduct,
        getProducts, 
        getProductsPagination,
        getTotalProducts,
        handlePageChange

    }
}

export default AdminProductListViewModel;