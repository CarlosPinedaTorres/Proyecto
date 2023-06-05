import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion';

export const ImageCardMyGames = ({ imageInfo }) => {
    const navigate=useNavigate()
    const goInfoGame=(id)=>{
      navigate(`/infogame/${id}`)
    }
    const goEditGame=(id)=>{
        navigate(`/edit/${id}`)
      }
   
      return (
        <div className="container mx-auto py-5 ">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {imageInfo.map((image) => (
            <motion.div
              key={image.id}
              className="bg-gray-200 rounded-lg p-4 shadow-md bg-card"
              whileHover={{ scale: 1.1 }}
            >
              <img
                src={`http://localhost:8000/${image.url_portada}`}
                alt={image.descripcion}
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <div className="flex flex-col justify-between">
                <h2 className="text-xl font-semibold mb-4 text-white">{image.nombre}</h2>
                <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center">
                  <div className="flex items-center mb-2 md:mb-0">
                    <span className="text-blue-300 mr-2">Precio:</span>
                    <span className="text-lg font-bold text-white">${image.precio}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-blue-300 mr-2">Nº de llaves:</span>
                    <span className="text-lg font-bold text-white">{image.num_llaves}</span>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <button onClick={() => goInfoGame(image.id)} className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded">
                    Más información
                  </button>
                  <button onClick={() => goEditGame(image.id)} className="bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded">
                    Modificar
                  </button>
                  <button onClick={() => deleteGame(image.id)} className="bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded">
                    Borrar
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
        );
}
