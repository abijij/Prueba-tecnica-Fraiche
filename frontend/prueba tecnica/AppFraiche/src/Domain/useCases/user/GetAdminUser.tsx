import React from 'react'
import { UserRepositoryImpl } from '../../../Data/repositories/UserRepository'

const {getAdmin} = new UserRepositoryImpl (); 



export const GetAdminUserUseCase = async() => {
  return await getAdmin();
}

