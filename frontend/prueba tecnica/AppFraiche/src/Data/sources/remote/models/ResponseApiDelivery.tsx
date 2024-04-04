
/**
 * Interfaz que define la estructura de la respuesta de la API Delivery.
 */

export interface ResponseApiDelivery {
    success: boolean;  // Indica si la petición fue exitosa o no.
    message: string;    // Mensaje asociado a la respuesta.
    data?:     any;   // Información adicional asociada a la respuesta (opcional).
    error?:    any;     // Información sobre el error en caso de que la petición haya fallado (opcional).
}