import React from 'react'
import { Contexto } from '../Context/Contexto'
import { useContext } from 'react'
export const Test = () => {
    const {test}=useContext(Contexto)
  return (
    <form onSubmit={test} encType="multipart/form-data">
    <input  name ='image' type="file" />
    <button>Enviar</button>
    </form>
  )
}
