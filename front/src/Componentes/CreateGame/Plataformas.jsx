import React from 'react'
import { Contexto } from '../../Context/Contexto'
import { useContext,useEffect,useState } from 'react'
import { Form } from "react-bootstrap"
export const Plataformas = () => {
 const {obtain_Plataformas,plataformas}=useContext(Contexto)
    useEffect(() => {
        obtain_Plataformas()
        console.log(plataformas)
    }, [])
    
  return (
<>
<h1>hola</h1>
{/* <select class="form-select" multiple aria-label="multiple select example">
{
    plataformas.map((plataforma)=>{
        return <option key={plataforma.id}value="1">{plataforma.nombre}</option>
    })

        }

</select> */}
   

</>  
)
}
