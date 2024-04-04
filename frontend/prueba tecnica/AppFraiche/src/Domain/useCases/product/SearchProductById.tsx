import React from 'react'

import { ProductRepositoryImpl } from '../../../Data/repositories/ProductRepository'

const { searchId } = new ProductRepositoryImpl

 export const GetProductsByIdUseCase =async  (id: string) => {
  return await searchId (id)
  
}



