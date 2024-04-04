import React from 'react'

import { ProductRepositoryImpl } from '../../../Data/repositories/ProductRepository'

const { searchByName } = new ProductRepositoryImpl

 export const GetProductsByNameUseCase =async  (name: string) => {
  return await searchByName (name)
  
}



