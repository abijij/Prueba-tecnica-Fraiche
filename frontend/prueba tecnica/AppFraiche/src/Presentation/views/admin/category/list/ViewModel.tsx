import React, { useState, useContext } from 'react'
import { Category } from '../../../../../Domain/entities/Category';
import { GetAllCategoryUseCase } from '../../../../../Domain/useCases/category/GetAllCategory';
import { DeleteCategoryUseCase } from '../../../../../Domain/useCases/category/DeleteCategory';
import { CategoryContext } from '../../../../context/CategoryContext';

const AdminCategoryListViewModel = () => {


  const [responseMessage, setresponseMessage] = useState('');
  const { categories, getCategories, remove } = useContext(CategoryContext)


  const deleteCategory = async (idCategory: string) => {
    const result = await remove(idCategory);
    setresponseMessage(result.message);
  }

  return {
    categories,
    responseMessage,
    getCategories,
    deleteCategory
  }
}
export default AdminCategoryListViewModel;

