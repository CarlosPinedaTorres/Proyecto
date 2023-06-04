import React from 'react'
import { useState,useContext,useEffect } from 'react'
import { Contexto } from '../../Context/Contexto'
export const MisPagos = () => {
    const {user,check_visto}=useContext(Contexto)

    const [pays, setPays] = useState(null)
    const myPays=async()=>{
    let response = await fetch(`http://127.0.0.1:8000/getMyPays/${user['user_id']}/`, {

      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }

    })
    let data = await response.json()
   

    setPays(data)
    console.log(data)
    }

    useEffect(() => {
        myPays()
        check_visto(user['user_id'])
    }, [])
    
  return (
    <>
    <div>MisPagos</div>
    {pays &&
        pays.map((pago)=>{
            return <li key={pago.id}>{pago.tipo}</li>
        })
    }
    </>
  )
}
