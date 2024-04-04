import React from 'react'

import { ProductRepositoryImpl } from '../../../Data/repositories/ProductRepository'

const { findByCategoryPagination } = new ProductRepositoryImpl

export const GetProductsByCategoryPagination = async (idCategory: string, page: number, ) => {
  return await findByCategoryPagination(idCategory, page);
  
}






