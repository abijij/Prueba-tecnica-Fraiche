import React from 'react'

import { ProductRepositoryImpl } from '../../../Data/repositories/ProductRepository'

const { findByCategory } = new ProductRepositoryImpl

const GetProductsByCategoryUseCase =async  (idCategory: string) => {
  return await findByCategory (idCategory)
  
}


export { findByCategory, GetProductsByCategoryUseCase }

