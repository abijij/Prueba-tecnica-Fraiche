import React from 'react'

import { ProductRepositoryImpl } from '../../../Data/repositories/ProductRepository'

const { findById } = new ProductRepositoryImpl

const GetProductsByIdUseCase =async  (idProduct: string) => {
  return await findById (idProduct)
  
}


export { findById, GetProductsByIdUseCase }

