import React from 'react'
import { UserRepositoryImpl } from '../../../Data/repositories/UserRepository'

const {getClient} = new UserRepositoryImpl ();



export const GetClientUserUseCase = async() => {
  return await getClient();
}

