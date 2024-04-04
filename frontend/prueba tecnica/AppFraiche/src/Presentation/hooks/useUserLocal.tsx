import React, { useEffect, useState } from 'react'
import { User } from '../../Domain/entities/User';
import { GetUserLocalUseCase } from '../../Domain/useCases/userLocal/GetUserLocal';


/**
 * Hook personalizado para obtener el usuario local del dispositivo
 * @returns un objeto con el usuario y una función para obtenerlo
 */
export const useUserLocal = () => {

  const [user, setUser] = useState<User>()

  // Se ejecuta al renderizar el componente por primera vez
  useEffect(() => {
    getUserSession();
  }, [])


  /**
  * Obtiene el usuario local mediante el caso de uso "GetUserLocalUseCase"
  * y lo almacena en el estado "user"
  */
  const getUserSession = async () => {
    const user = await GetUserLocalUseCase();
    setUser(user);
  }

  return {
    user,
    getUserSession
  }
}
