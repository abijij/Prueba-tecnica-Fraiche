import React from 'react'
import { User } from '../../entities/User';
import { UserRepositoryImpl } from '../../../Data/repositories/UserRepository';


const { remove } = new UserRepositoryImpl();

export const DeleteUserUseCase = async (id: string) => {
  return await remove (id);
}

