
import { Rol } from "./Rol";

export interface User {
    id?:             string;        // Identificador único del usuario (opcional)
    name:            string;        // Nombre del usuario
    lastname:        string;        // Apellido del usuario
    phone:           string;        // Número de teléfono del usuario
    email:           string;        // Correo electrónico del usuario
    image?:          string;
    password:        string;        // Contraseña del usuario
    confirmPassword: string;        // Confirmación de la contraseña del usuario
    session_token?:  string; // Token de sesión del usuario (opcional)
    token_notification?: string;       
    roles?:          Rol[];        // Lista de roles del usuario (opcional)
  
    verify?:         number;
    permissions?:    number;
}
