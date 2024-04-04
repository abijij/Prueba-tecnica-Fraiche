import React, { useEffect, useState } from 'react'
import { User } from '../../Domain/entities/User';
import { GetUserLocalUseCase } from '../../Domain/useCases/userLocal/GetUserLocal';
import { Order } from '../../Domain/entities/Order';
import { GetOrderLocalUseCase } from '../../Domain/useCases/userLocal/GetOrderLocal';


/**
 * Hook personalizado para obtener el usuario local del dispositivo
 * @returns un objeto con el usuario y una función para obtenerlo
 */
export const useOrderLocal = () => {

  const [order, setOrder] = useState<Order>()

  // Se ejecuta al renderizar el componente por primera vez
  useEffect(() => {
    getOrderSession();
  }, [])


  /**
  * Obtiene el usuario local mediante el caso de uso "GetUserLocalUseCase"
  * y lo almacena en el estado "user"
  */
  const getOrderSession = async () => {
    const user = await GetOrderLocalUseCase();
    setOrder(order);
  }

  return {
    order,
    getOrderSession
  }
}
