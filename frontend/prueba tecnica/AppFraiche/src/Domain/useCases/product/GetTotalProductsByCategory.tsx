import React from 'react'

import { ProductRepositoryImpl } from '../../../Data/repositories/ProductRepository'

const { findTotalProductsByCategory } = new ProductRepositoryImpl

export const GetTotalProductsByCategory = async (category_id: string) => {
  return await findTotalProductsByCategory(category_id);
  
}






