import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const ConfirmationNotification = ({ onConfirm, onCancel, closeToast }) => (
  
  <div className="p-4">
    <p className="mb-4">¿Estás seguro de que deseas eliminar este juego?</p>
    <div className="flex justify-center">
      <button
        className="mr-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={() => {
          onConfirm();
          closeToast();
        }}
      >
        Confirmar
      </button>
      <button
        className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
        onClick={() => {
          onCancel();
          closeToast();
        }}
      >
        Cancelar
      </button>
    </div>
  </div>
);

export const ImageCardMyGames = ({ imageInfo }) => {
  const apiUrl = import.meta.env.VITE_API_URL;
    const navigate=useNavigate()
    const goInfoGame=(id)=>{
      navigate(`/infogame/${id}`)
    }
    const goEditGame=(id)=>{
        navigate(`/edit/${id}`)
      }
      const deleteGame = async (id_game) => {
        try {
          const confirmDelete = await new Promise((resolve) => {
            toast.dismiss(); // Cerrar cualquier notificación existente
        
            toast.info(<ConfirmationNotification
              onConfirm={() => resolve(true)}
              onCancel={() => resolve(false)}
            />, {
              position: toast.POSITION.TOP_CENTER,
              autoClose: false,
              closeOnClick: false,
              draggable: false,
              pauseOnHover: false,
              closeButton: true,
              onClose: () => resolve(false), // El usuario ha cerrado la notificación sin confirmar o cancelar
              className: 'confirmation-toast', // Clase CSS personalizada para aplicar estilos a la notificación
            });
          });
        
          if (confirmDelete) {
            let response = await fetch(`${apiUrl}deleteGame/${id_game}/`, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
              },
            });
        
            if (response.ok) {
              let data = await response.json();
              toast.success('Se ha borrado correctamente el juego', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 3000, // Duración de la notificación en milisegundos
                hideProgressBar: true, // Ocultar barra de progreso
                className: 'bg-green-500 text-white font-medium rounded-md shadow-lg p-4',
                bodyClassName: 'text-sm',
                progressClassName: 'bg-green-200',
              });
              navigate("/mygames");
            } else {
              let data = await response.json();
              if (data.hasOwnProperty('error')) {
                toast.error(data['error'], {
                  position: toast.POSITION.TOP_CENTER,
                  autoClose: 3000, // Duración de la notificación en milisegundos
                  hideProgressBar: true, // Ocultar barra de progreso
                  className: 'bg-red-500 text-white font-medium rounded-md shadow-lg p-4',
                  bodyClassName: 'text-sm',
                  progressClassName: 'bg-red-200',
                });
              } else {
                toast.error('Ha ocurrido un error al eliminar el juego', {
                  position: toast.POSITION.TOP_CENTER,
                  autoClose: 3000, // Duración de la notificación en milisegundos
                  hideProgressBar: true, // Ocultar barra de progreso
                  className: 'bg-red-500 text-white font-medium rounded-md shadow-lg p-4',
                  bodyClassName: 'text-sm',
                  progressClassName: 'bg-red-200',
                });
              }
            }
          } else {
            toast.info('Cancelando...', {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 3000, // Duración de la notificación en milisegundos
              hideProgressBar: true, // Ocultar barra de progreso
              className: 'text-black font-medium rounded-md shadow-lg p-4',
              bodyClassName: 'text-sm',
              progressClassName: '',
            });
          }
        } catch (error) {
          console.log('Error en la solicitud:', error.message);
          toast.error('Ha ocurrido un error al eliminar el juego', {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000, // Duración de la notificación en milisegundos
            hideProgressBar: true, // Ocultar barra de progreso
            className: 'bg-red-500 text-white font-medium rounded-md shadow-lg p-4',
            bodyClassName: 'text-sm',
            progressClassName: 'bg-red-200',
          });
        }
      };
      
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
                src={`${image.image}`}
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
