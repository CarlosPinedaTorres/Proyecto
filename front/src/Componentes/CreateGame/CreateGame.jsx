import { useEffect ,useContext,useState} from "react"
import React from 'react'
import { Contexto } from "../../Context/Contexto"
import { Form} from "react-bootstrap"
import { Navbar } from "../Navbar"
import '../../Estilos/CreateGame.css'
import { useNavigate } from "react-router-dom"
import { Dialog, Transition } from '@headlessui/react';
import { Button as MuiButton, Modal } from '@mui/material';
import { Footer } from "../Footer/Footer"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
export const CreateGame= () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [comprar, setComprar] = useState(true)
  const [valor,setValor]=useState(null)
  const [id, setId] = useState(null)
  const {obtain_Plataformas,plataformas,obtain_Generos,generos,obtain_Idiomas,idiomas,user,obtain_money_wallet,myMoney,ObtainAccount, account,logoutUser,handleMyGamesClick }=useContext(Contexto)
  const navigate=useNavigate()
  const [modalOpen, setModalOpen] = useState(false);
  useEffect(() => {
    ObtainAccount(user['user_id']);

  }, []);

const goIngresar=()=>{
  navigate("/test1")
}
const handleModalOpen = () => {
  setModalOpen(true);
};

const handleModalClose = () => {
  setModalOpen(false);
};
const goPays = () => {
  navigate("/mypays")
}


const goStripe = () => {
  navigate("/create-user-stripe")
}
const goStripeMoney = () => {
  navigate("/test1")
}

    const handleGenerosChange = (event) => {
      const opcionesSeleccionadas = Array.from(event.target.selectedOptions).map((option) => option.value);
      setGenerosSeleccionadas(opcionesSeleccionadas);
    };

    const handleIdiomasChange = (event) => {
      const opcionesSeleccionadas = Array.from(event.target.selectedOptions).map((option) => option.value);
      setIdiomasSeleccionadas(opcionesSeleccionadas);
    };

    const handlePlataformasChange = (event) => {
      const opcionesSeleccionadas = Array.from(event.target.selectedOptions).map((option) => option.value);
      setPlataformasSeleccionadas(opcionesSeleccionadas);
    };

    const [plataformasSeleccionadas, setPlataformasSeleccionadas] = useState([]);  
    const [generosSeleccionadas, setGenerosSeleccionadas] = useState([]);  
    const [idiomasSeleccionadas, setIdiomasSeleccionadas] = useState([]);  


    function resizeImage(file, maxWidth, maxHeight) {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const img = new Image();
          img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            let width = img.width;
            let height = img.height;
    
            if (width > height) {
              if (width > maxWidth) {
                height *= maxWidth / width;
                width = maxWidth;
              }
            } else {
              if (height > maxHeight) {
                width *= maxHeight / height;
                height = maxHeight;
              }
            }
    
            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(img, 0, 0, width, height);
            const resizedImageDataUrl = canvas.toDataURL('image/jpeg', 0.75);
            resolve(resizedImageDataUrl);
          };
          img.src = e.target.result;
        };
        reader.readAsDataURL(file);
      });
    }
    const uploadGame = async (e) => {
      e.preventDefault();
      const ids_plataformas= plataformas.filter((plataforma)=>plataformasSeleccionadas.includes(plataforma.nombre)).map((plataforma) => plataforma.id);
      const ids_generos= generos.filter((genero)=>generosSeleccionadas.includes(genero.nombre)).map((genero) => genero.id);
      const ids_idiomas= idiomas.filter((idioma)=>idiomasSeleccionadas.includes(idioma.nombre)).map((idioma) => idioma.id);
     
      const formData = new FormData();
      formData.append("vendedor",e.target.id.value);
          formData.append("nombre", e.target.nombre.value);
          formData.append("descripcion", e.target.descripcion.value);
          ids_plataformas.map((id)=>{
            formData.append("plataformas", id);
          })
          ids_generos.map((id)=>{
              formData.append("genero", id);
          })
          ids_idiomas.map((id)=>{
            formData.append("idiomas", id);
          })
          
          formData.append("num_llaves", e.target.num_llaves.value);
          
          formData.append("precio", e.target.precio.value);
      if (e.target.url_portada.files[0]) {
        const maxWidth = 800;
        const maxHeight = 800;
        const resizedImageDataUrl = await resizeImage(e.target.url_portada.files[0], maxWidth, maxHeight);
          formData.append('image', resizedImageDataUrl);
        }
  
      const config = {
          headers: {
              'Content-Type': 'multipart/form-data',
             
          }
      };
      try {
          await axios.post(`${apiUrl}game/upload/`, formData, config);
          toast.success('Se ha creado el juego correctamente', {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000, // Duración de la notificación en milisegundos
            hideProgressBar: true, // Ocultar barra de progreso
            className: 'bg-green-500 text-white font-medium rounded-md shadow-lg p-4',
            bodyClassName: 'text-sm',
            progressClassName: 'bg-green-200',
          });
      } catch (error) {
          console.log(error);
      }
  }

  
  
       


  useEffect(() => {
      obtain_Plataformas()
      obtain_Generos()
      obtain_Idiomas()
      obtain_money_wallet(user['user_id'])
      const idLogueado=async()=>{
    
        let response=await fetch(`${apiUrl}getIdLogueado/${user['user_id']}/`,{
          method: 'GET',
          headers:{
            'Content-Type':'application/json'
        }})
        let data=await response.json()
        let data2=await data.id
        setId(data2)
      } 
      idLogueado() 
    
  }, [])

  
  return (
    <>
    <Transition appear show={modalOpen} as={React.Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={handleModalClose}
      >
        <div className="min-h-screen px-4 text-center">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-lg rounded-md">
            <div className="modal-content">
              <h3 className="modal-title text-center text-2xl font-semibold mb-4">
                Mi cuenta
              </h3>
              {account.wallet ? (
                <MuiButton className="w-full mb-2 text-lg" style={{ fontSize: '18px' }}>
                  Wallet: {myMoney}
                </MuiButton>
              ) : (
                <MuiButton className="w-full mb-2 text-lg" style={{ fontSize: '18px' }} onClick={goStripe}>
                  Crear user en stripe
                </MuiButton>
              )}
              <MuiButton onClick={()=>goPays()} className="w-full mb-2 text-lg" style={{ fontSize: '18px' }}>
                Mis pagos
              </MuiButton>
            
              <MuiButton onClick={handleMyGamesClick} className="w-full mb-2 text-lg" style={{ fontSize: '18px' }}>
                Mis juegos
              </MuiButton>
              <MuiButton onClick={logoutUser} className="w-full mb-2 text-lg" style={{ fontSize: '18px' }}>
                Logout
              </MuiButton>
              <MuiButton onClick={handleModalClose} className="w-full mb-2 text-lg" style={{ fontSize: '18px' }}>
                Cerrar Modal
              </MuiButton>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
   
    
    <Navbar handleModalOpen={handleModalOpen} />
  <div className="flex justify-center mt-5 mb-5">
  <div className="w-full max-w-2xl">
    <div className="bg-white text-gray-900 shadow-lg rounded-lg">
      <div className="p-5">
        <form encType="multipart/form-data" onSubmit={uploadGame} className="space-y-6">
          <h2 className="text-2xl font-bold mb-2 text-uppercase">Añadir Juego</h2>
          <p>Rellena todos los campos para crearlo</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="mb-3">
              <label htmlFor="vendedor" className="block text-sm font-medium text-gray-700">Nombre vendedor:</label>
              <input type="text" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" value={user.username} name="vendedor" placeholder="Nombre del vendedor" />
            </div>
            <div className="mb-3">
              <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">Introduce el nombre del juego:</label>
              <input type="text" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" name="nombre" placeholder="Nombre del juego" />
            </div>
            <div className="mb-3">
              <label htmlFor="url_portada" className="block text-sm font-medium text-gray-700">Escoge una imagen de portada para tu juego:</label>
              <input type="file" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" name="url_portada" />
            </div>
            <div className="mb-3">
              <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700">Descripcion:</label>
              <textarea className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" name="descripcion" placeholder="Introduce una breve descripcion del juego"></textarea>
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="plataformas" className="block text-sm font-medium text-gray-700">Plataformas:</label>
            <select className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" multiple aria-label="multiple select example" name="plataformas" onChange={handlePlataformasChange}>
              {plataformas.map((plataforma) => (
                <option key={plataforma.id}>{plataforma.nombre}</option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="generos" className="block text-sm font-medium text-gray-700">Generos:</label>
            <select className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" multiple aria-label="multiple select example" name="generos" onChange={handleGenerosChange}>
              {generos.map((genero) => (
                <option key={genero.id}>{genero.nombre}</option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="idiomas" className="block text-sm font-medium text-gray-700">Idiomas:</label>
            <select className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" multiple aria-label="multiple select example" name="idiomas" onChange={handleIdiomasChange}>
              {idiomas.map((idioma) => (
                <option key={idioma.id}>{idioma.nombre}</option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         
            <div className="mb-3">
              <label htmlFor="num_llaves" className="block text-sm font-medium text-gray-700">Número de llaves:</label>
              <input type="text" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" name="num_llaves" />
            </div>
            <div className="mb-3">
              <label htmlFor="precio" className="block text-sm font-medium text-gray-700">Precio:</label>
              <input type="text" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" name="precio" />
            </div>
          </div>

          <div className="flex justify-end">
            <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" type="submit">Crear</button>
          </div>

          <input type="text" value={id} name='id' className="hidden-input" />
        </form>
        {!comprar && (
  <div className="mb-3">
    <p className="text-red-500">No tienes fondos suficientes, mínimo necesitas {valor}</p>
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-3"
      onClick={goIngresar}
    >
      Ingresar Dinero
    </button>
  </div>
)}
      </div>
    </div>
  </div>
</div>
<Footer/>
    </>
  )
}
