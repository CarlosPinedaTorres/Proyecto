import React, { useLayoutEffect,useEffect,useState } from 'react'
import { useParams,useNavigate } from "react-router-dom";
import { Navbar } from '../Navbar';
import { useContext } from 'react';
import { Contexto } from '../../Context/Contexto';
import { Footer } from '../Footer/Footer';
import { Dialog, Transition } from '@headlessui/react';
import { Button as MuiButton,Modal} from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PlataformasNames } from './PlataformasNames';
export const Edit = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  console.log('aqui,editar juego')
  const navigate=useNavigate()
  const [selectedFile, setSelectedFile] = useState(null)
  const [nombreChange, setNameChange] = useState(null)
  const [descripcion, setDescripcion] = useState(null)

  const [numLlaves, setnumLlaves] = useState(null)
  
  const [pVentaFinal, setpVentaFinal] = useState(null)
  const [precio, setprecio] = useState(null)
  const [plataformasChange, setplataformas] = useState(null)
  const [generosChange, setGenerosChange] = useState(null)
  const [idiomasChange, setIdiomasChange] = useState(null)
  const goStripe=()=>{
    navigate("/createuserstripe")
  }
  
  const [fectAll, setfectAll] = useState({
    'gen':false,
    'plata':false,
    'idioma':false
  })
    const {authTokens, ObtainAccount,account,logoutUser,handleMyGamesClick,user,myMoney,obtain_money_wallet}=useContext(Contexto)
    const [modalOpen, setModalOpen] = useState(false);
 
  
    const handleModalOpen = () => {
      setModalOpen(true);
    };
  
    const handleModalClose = () => {
      setModalOpen(false);
    };
    const [plataformas, setPlataformas] = useState([])
    
    const obtain_Plataformas=async()=>{
    const response=await fetch(`${apiUrl}plataformas/`)
    const data=await response.json()
    console.log('dentro de obtainPlataformas')
    setPlataformas(data)
    console.log('dentro de oP', )
    setfectAll(prevState => ({ ...prevState, plata: true }))
    console.log(fectAll)
    }
    const [generos, setGeneros] = useState([])
    const obtain_Generos=async()=>{
      const response=await fetch(`${apiUrl}generos/`)
      const data=await response.json()
      setGeneros(data)
      setfectAll(prevState => ({ ...prevState, gen: true }))
      console.log(fectAll)
    }
    
    const [idiomas, setIdiomas] = useState([])
    const obtain_Idiomas=async()=>{
        const response=await fetch(`${apiUrl}idiomas/`)
        const data=await response.json()
        setIdiomas(data)
        setfectAll(prevState => ({ ...prevState, idioma: true }))
        console.log(fectAll)
      }
    
    const {id}=useParams()
    const [info, setInfo] = useState([])
    const [plataformasNames, setPataformasNames] = useState([])
    const [GenerosNames, setGenerosNames] = useState([])    
    const [IdiomasNames, setIdiomasNames] = useState([])    
    const [loading, setLoading] = useState(true)
      const [vendedor, setVendedor] = useState('')
    const obtainInfo=async()=>{
      const response=await fetch(`${apiUrl}getInfoGame/${id}/`)
        const data=await response.json()
        setInfo(data)
        console.log(data)
      
    }
    const obtainVendedor=async()=>{
      const response=await fetch(`${apiUrl}getNameVendedor/${info.vendedor}/`)
        const data=await response.json()
        setVendedor(data.nombre_usuario)
        console.log(data.nombre_usuario)
      
    }
   
        
    const namesP=()=>{
        const plataformasSeleccionadas = info.plataformas;
       console.log(plataformasSeleccionadas)
        const nombresPlataformasSeleccionadas = plataformas
        .filter(p => plataformasSeleccionadas.includes(p.id))
        .map(p => p.nombre);
        setPataformasNames(nombresPlataformasSeleccionadas)
        
       
    }
    const namesG=()=>{
        const generosSeleccionadas = info.genero;
        console.log(generosSeleccionadas)
        const nombresGenerosSeleccionadas = generos
        .filter(g => generosSeleccionadas.includes(g.id))
        .map(g => g.nombre);
        setGenerosNames(nombresGenerosSeleccionadas)
       

    }
    const namesI=()=>{
        const idiomasSeleccionadas = info.idiomas
       
        const nombresIdiomasSeleccionadas = idiomas
        .filter(i => idiomasSeleccionadas.includes(i.id))
        .map(i=> i.nombre);
        setIdiomasNames(nombresIdiomasSeleccionadas)
   

        
    }


    const nameChange=(event)=>{
      // console.log(event.target.value)
      setNameChange(event.target.value)
      info.nombre=event.target.value

    }
    const descriptionChange =(event)=>{
      // console.log(event.target.value)
      setDescripcion(event.target.value)
      info.descripcion=event.target.value
    }
  
    
    const PlataformasChange=(event)=>{
      const plataformasSeleccionadas = Array.from(event.target.selectedOptions).map((option) => option.value);
     
      
      const ids_plataformas= plataformas.filter((plataforma)=>plataformasSeleccionadas.includes(plataforma.nombre)).map((plataforma) => plataforma.id);
     
      // console.log(ids_plataformas)
      setplataformas(ids_plataformas)
      const nombresPlataformasSeleccionadas = plataformas
      .filter(p => ids_plataformas.includes(p.id))
      .map(p => p.nombre);
      setPataformasNames(nombresPlataformasSeleccionadas)
      console.log(nombresPlataformasSeleccionadas)
      
    }


    const GenerosChange=(event)=>{
      const generosSeleccionadas = Array.from(event.target.selectedOptions).map((option) => option.value);
     
      
      const ids_generos= generos.filter((genero)=>generosSeleccionadas.includes(genero.nombre)).map((genero) => genero.id);
     
      // console.log(ids_generos)
      setGenerosChange(ids_generos)
      const nombresGenerosSeleccionadas = generos
      .filter(g => ids_generos.includes(g.id))
      .map(g => g.nombre);
      setGenerosNames(nombresGenerosSeleccionadas)
      console.log(nombresGenerosSeleccionadas)
      
    }
    const IdiomasChange=(event)=>{
      const idiomasSeleccionadas = Array.from(event.target.selectedOptions).map((option) => option.value);
     
      
      const ids_idiomas= idiomas.filter((idioma)=>idiomasSeleccionadas.includes(idioma.nombre)).map((idioma) => idioma.id);
     
      // console.log(ids_idiomas)
      setIdiomasChange(ids_idiomas)
      const nombresIdiomasSeleccionadas = idiomas
      .filter(i => ids_idiomas.includes(i.id))
      .map(i => i.nombre);
      setIdiomasNames(nombresIdiomasSeleccionadas)
      console.log(nombresIdiomasSeleccionadas)
      
    }
    const imageChange=(event)=>{
      console.log(event.target.files[0])
      setSelectedFile(event.target.files[0])
    }


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
    const updateGame = async (e) => {
      e.preventDefault();
      const formData = new FormData();
      if (e.target.url_portada.files[0]) {
        const maxWidth = 800;
        const maxHeight = 800;
        const resizedImageDataUrl = await resizeImage(e.target.url_portada.files[0], maxWidth, maxHeight);
          formData.append('image', resizedImageDataUrl);
        }
      if(nombreChange!=null){
        console.log(nombreChange)
        formData.append('nombre',nombreChange)
      }
      if(descripcion!=null){
        console.log(descripcion)
        formData.append('descripcion',descripcion)
      }
      if(plataformasChange!=null){
        console.log(plataformasChange)
        plataformasChange.map((id)=>{
          formData.append("plataformas", id);
        })
      }
      if(generosChange!=null){
        console.log(generosChange)
          generosChange.map((id)=>{
          formData.append("genero", id);
        })
      }
      if(idiomasChange!=null){
        console.log(idiomasChange)
          idiomasChange.map((id)=>{
          formData.append("idiomas", id);
        })
      }
      if(descripcion!=null){
        console.log(descripcion)
        formData.append('descripcion',descripcion)
      }
    
   
     
      
      
      setfectAll({
        'gen':false,
        'plata':false,
        'idioma':false
      })
      
      try {
        const response = await fetch(`${apiUrl}games/${id}/`, {
          method:"PUT",
          body: formData,
          headers:{
             Accept: "application/json",
            'Authorization':'Bearer '+ String(authTokens.access)
          }
        });
        const data = await response.json();
        console.log(data);
        navigate("/mygames")
        localStorage.removeItem('plataformas')
        localStorage.removeItem('generos')
        localStorage.removeItem('idiomas')
        localStorage.removeItem('infoGame')
        toast.success('Se ha editado correctamente la informacion', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000, // Duración de la notificación en milisegundos
          hideProgressBar: true, // Ocultar barra de progreso
          className: 'bg-green-500 text-white font-medium rounded-md shadow-lg p-4',
          bodyClassName: 'text-sm',
          progressClassName: 'bg-green-200',
        });
      } catch (error) {
        console.error(error);
      }
    
    }
     
    useEffect(() => {
      obtain_Plataformas()
      obtain_Generos()
      obtain_Idiomas()

      obtainInfo()
      console.log(info)
        
        
      setLoading(false)
    }, [])
    useEffect(() => {
      if (info!=""){
        obtainVendedor()
      }
   

      
      console.log(info)
        
        
     
    }, [info])

    useEffect(() => {
     
      namesG()
      namesI()
      namesP()

      
     
        
        
     
    }, [info])

    useEffect(() => {
      ObtainAccount(user['user_id']);
    }, []);   
 
    
    useEffect(() => {
  if(info!=""){
      obtain_money_wallet(user['user_id'])
  }
    }, [])
  return (
    <>
    <div className="flex flex-col min-h-screen">
      
    <Navbar handleModalOpen={handleModalOpen} />

      {!loading ? (
        <div className="flex flex-col items-center mt-3 space-y-5">
         
          <div className="bg-white text-dark shadow-lg rounded-md p-5 w-full max-w-2xl mb-5">
            <form
              className="space-y-5"
              encType="multipart/form-data"
              onSubmit={updateGame}
            >
              <h2 className="text-2xl font-bold mb-2 text-uppercase">
                Editar Juego
              </h2>
              <p className="mb-5">
                Cambia los campos que desees editar
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="vendedor"
                    className="block mb-1 font-semibold text-dark"
                  >
                    Nombre vendedor:
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    value={vendedor}
                    name="vendedor"
                    placeholder="Nombre del vendedor"
                  />
                </div>
                <div>
                  <label
                    htmlFor="url_portada"
                    className="block mb-1 font-semibold text-dark"
                  >
                    Imagen de portada:
                  </label>
                  <input
                    type="file"
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    onChange={imageChange}
                    name="url_portada"
                  />
                </div>
                <div>
                  <label
                    htmlFor="nombre"
                    className="block mb-1 font-semibold text-dark"
                  >
                    Nombre del juego:
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    value={info.nombre}
                    onChange={nameChange}
                    name="nombre"
                    placeholder="Nombre del juego"
                  />
                </div>
                <div>
                  <label
                    htmlFor="descripcion"
                    className="block mb-1 font-semibold text-dark"
                  >
                    Descripción:
                  </label>
                  <textarea
                    type="text-field"
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    value={info.descripcion}
                    onChange={descriptionChange}
                    name="descripcion"
                    placeholder="Breve descripción del juego"
                  />
                </div>
              </div>

              <div className="space-y-5">
                
            
                <div>
                  <label
                    htmlFor="plataformas"
                    className="block mb-1 font-semibold text-dark"
                  >
                    Plataformas:
                  </label>
                  <select
                    value={plataformasNames}
                    onChange={PlataformasChange}
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    multiple
                    aria-label="multiple select example"
                    name="plataformas"
                  >
                    {plataformas.map((plataforma) => (
                      <option key={plataforma.id}>{plataforma.nombre}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="generos"
                    className="block mb-1 font-semibold text-dark"
                  >
                    Géneros:
                  </label>
                  <select
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    value={GenerosNames}
                    onChange={GenerosChange}
                    multiple
                    aria-label="multiple select example"
                    name="generos"
                  >
                    {generos.map((genero) => (
                      <option key={genero.id}>{genero.nombre}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="idiomas"
                    className="block mb-1 font-semibold text-dark"
                  >
                    Idiomas:
                  </label>
                  <select
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    value={IdiomasNames}
                    onChange={IdiomasChange}
                    multiple
                    aria-label="multiple select example"
                    name="idiomas"
                  >
                    {idiomas.map((idioma) => (
                      <option key={idioma.id}>{idioma.nombre}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
             
               
              
              </div>
              <div className="flex justify-end">
            <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" type="submit">Editar</button>
          </div>
            </form>
          </div>
        </div>
      ) : (
        <p>Cargando</p>
      )}

      <div className="mb-5 mt-auto">
        <Footer />
      </div>
    </div>
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
              <MuiButton onClick={logoutUser} className="w-full mb-2 text-lg" style={{ fontSize: '18px' }}>
                Logout
              </MuiButton>
              <MuiButton onClick={handleMyGamesClick} className="w-full mb-2 text-lg" style={{ fontSize: '18px' }}>
                Mis juegos
              </MuiButton>
              <MuiButton onClick={handleModalClose} className="w-full mb-2 text-lg" style={{ fontSize: '18px' }}>
                Cerrar Modal
              </MuiButton>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
    </>
  )
}
