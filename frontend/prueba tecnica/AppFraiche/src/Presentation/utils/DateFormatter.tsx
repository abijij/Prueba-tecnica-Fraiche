import React from 'react'

export const DateFormatter = (timestamp: number): string => {
    const date = new Date(timestamp);
    const year = date.getFullYear().toString(); // Aseguramos que el año sea una cadena
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Aseguramos que el mes tenga siempre dos dígitos
    const day = ('0' + date.getDate()).slice(-2); // Aseguramos que el día tenga siempre dos dígitos
    const hours = ('0' + date.getHours()).slice(-2); // Aseguramos que las horas tengan siempre dos dígitos
    const minutes = ('0' + date.getMinutes()).slice(-2); // Aseguramos que los minutos tengan siempre dos dígitos
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };
  


