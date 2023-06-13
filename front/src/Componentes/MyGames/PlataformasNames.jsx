import React from 'react'
import { useState ,useEffect} from 'react'
export const PlataformasNames = ({plataformas,selectedIds,onChange,id_juego,info}) => {
  console.log(info,'aqui222222222')
  const [pataformas, setPataformasNames] = useState('')
 
  // const obtainInfo=async(id)=>{
  //   const response=await fetch(`http://localhost:8000/getInfoGame/${id}/`)
  //     const data=await response.json()
  //     // setInfo(data)
  //     console.log(data)
    
  // }

  const namesP=()=>{
    const plataformasSeleccionadas = info.plataformas;
   console.log(plataformasSeleccionadas)
    const nombresPlataformasSeleccionadas = plataformas
    .filter(p => plataformasSeleccionadas.includes(p.id))
    .map(p => p.nombre);
    setPataformasNames(nombresPlataformasSeleccionadas)
    
   
}
  useEffect(() => {
  //  obtainInfo(id_juego)
 
  }, [])
  useEffect(() => {
  
      namesP()
    
    console.log(plataformas,'aqui')
  
 
    
  }, [])
  

  return (
    <div>
    <label
      htmlFor="plataformas"
      className="block mb-1 font-semibold text-dark"
    >
      Plataformas:
    </label>
    <select
      value={selectedIds}
      onChange={onChange}
      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      multiple
      aria-label="multiple select example"
      name="plataformas"
    >
      {plataformas.map((plataforma) => (
        <option key={plataforma.id} value={plataforma.id}>
          {plataforma.nombre}
        </option>
      ))}
    </select>
  </div>
  )
}

