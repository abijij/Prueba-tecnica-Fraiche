import React from 'react'
import { useUserLocal } from '../../hooks/useUserLocal';


/**
 * `RolesViewModel` es un componente que se utiliza como un ViewModel para la pantalla de roles.
 * Este componente tiene como objetivo proveer los datos necesarios para la vista.
 * Este componente utiliza el hook `useUserLocal` para obtener el usuario actual almacenado en el dispositivo.
 * 
 * @returns Un objeto con la propiedad `user` que representa al usuario actual.
 */
const RolesViewModel = () => {

  // Obtener el usuario actual del hook useUserLocal.
  const { user } = useUserLocal();

  return {
    user
  }
}

export default RolesViewModel;
