import React from 'react'

import { ProductRepositoryImpl } from '../../../Data/repositories/ProductRepository'

const { updatePriceByPercentage } = new ProductRepositoryImpl

export const UpdatePriceByPercentageUseCase = async (productId: string,  percentage: string) => {
  return await updatePriceByPercentage(productId,percentage);
  
}






