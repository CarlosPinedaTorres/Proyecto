import React from 'react'
import { useState,useContext,useEffect } from 'react'
import { Contexto } from '../../Context/Contexto'
import { Navbar } from '../Navbar'
import { Footer } from '../Footer/Footer'
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
    console.log('aqui',data)
    }

    useEffect(() => {
        myPays()
        check_visto(user['user_id'])
    }, [])
    
  return (
    <>
    <Navbar/>
 <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
  <div className="w-full max-w-2xl">
    <h2 className="font-bold text-2xl mb-4">Tus Pagos</h2>
    <ul className="space-y-4">
      {pays &&
        pays.map((pago) => (
          <li
            key={pago.id}
            className="bg-white shadow-md rounded-lg px-6 py-4"
          >
            <div className="text-xl font-bold">{pago.tipo}</div>
            {/* Asume que el objeto 'pago' tiene una propiedad 'description' */}
            <p className="text-gray-700 text-base">{pago.description}</p>
            <div className="mt-2">
              {/* Asume que el objeto 'pago' tiene una propiedad 'amount' */}
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                Monto: {pago.amount}
              </span>
              {/* Asume que el objeto 'pago' tiene una propiedad 'date' */}
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                Fecha: {pago.date}
              </span>
            </div>
          </li>
        ))}
    </ul>
  </div>
</div>
<Footer/>
    </>
  )
}
