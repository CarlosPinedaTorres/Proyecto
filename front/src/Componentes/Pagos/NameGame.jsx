import React, { useEffect } from 'react'
import { useState } from 'react';

export const NameGame = ({id_juego}) => {
const [nombre, setNombre] = useState('')
    const ObtainName = async (id_juego) => {
        try {
          let response = await fetch(`http://127.0.0.1:8000/getNameGame/${id_juego}/`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
      
          let data = await response.json();
      
          console.log(data); // Verifica que el valor de data.noVisto sea correcto
          setNombre(data)
      
          
      
        } catch (error) {
          console.log('Error en la solicitud:', error);
        }
      };
      useEffect(() => {
        ObtainName(id_juego)
      }, [])
      
  return (
    <p>Juego: {nombre.nombre}</p>
  )
}
