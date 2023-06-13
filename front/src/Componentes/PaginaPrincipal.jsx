
import React from 'react'
import { Contexto } from '../Context/Contexto'
import { useContext ,useEffect,useState} from 'react'
import { Navbar } from './Navbar'
import '../Estilos/PaginaPrincipal.css'
import { Footer } from './Footer/Footer';
import { Button as MuiButton,Modal} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ImageCard from './PaginaP, MYgames/ImageCard';
import SidebarMenu from './PaginaP, MYgames/SidebarMenu';
import { Dialog, Transition } from '@headlessui/react';
export const PaginaPrincipal = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  // console.log(apiUrl)
  const [selectedOrder, setSelectedOrder] = useState('');
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [selectedIdiom, setSelectedIdiom] = useState(null);
  const [selectedPlataforma, setSelectedPlataforma] = useState(null)

  const [allGames, setAllGames] = useState([])

  const navigate=useNavigate()
  


  const handlePlataformaSelection = (plataforma) => {
    if (selectedPlataforma === plataforma.id) {
      setSelectedPlataforma(null); // Deseleccionar el género si ya estaba seleccionado
    } else {
      setSelectedPlataforma(plataforma.id); // Seleccionar el género si no estaba seleccionado previamente
    }
  };

  const handleIdiomSelection = (idioma) => {
    if (selectedIdiom === idioma.id) {
      setSelectedIdiom(null); // Deseleccionar el género si ya estaba seleccionado
    } else {
      setSelectedIdiom(idioma.id); // Seleccionar el género si no estaba seleccionado previamente
    }
  };


  const handleGenreSelection = (genre) => {
    if (selectedGenre === genre.id) {
      setSelectedGenre(null); // Deseleccionar el género si ya estaba seleccionado
    } else {
      setSelectedGenre(genre.id); // Seleccionar el género si no estaba seleccionado previamente
    }
  };

  const ObtainAllGames=async(id_user=0)=>{

 
    let response=await fetch(`${apiUrl}allgames/${id_user}`,{
      method:'GET',
      headers:{
        'Content-Type':'application/json',
      }

    })
    let data = await response.json()

   
    setAllGames(data)

  }

  const handleOrderChange = (order) => {
    console.log('hola')
  setSelectedOrder(order);
  };

  const [modalOpen, setModalOpen] = useState(false);
 
  
  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const [juegos, setJuegos] = useState([]);
  const {myMoney,logoutUser,user,obtain_money_wallet, handleMyGamesClick ,ObtainAccount,account}=useContext(Contexto)
  const [showFilter, setShowFilter] = useState(false);



  // Resto de tu código...

  useEffect(() => {
    if (selectedOrder !== null && selectedOrder !== undefined) {
      const sortedGames = [...allGames];
  
      if (selectedOrder === 'asc') {
        sortedGames.sort((a, b) => a.precio - b.precio);
      } else if (selectedOrder === 'desc') {
        sortedGames.sort((a, b) => b.precio - a.precio);
      } else if (selectedOrder === 'az') {
        sortedGames.sort((a, b) => a.nombre.localeCompare(b.nombre));
      } else if (selectedOrder === 'za') {
        sortedGames.sort((a, b) => b.nombre.localeCompare(a.nombre));
      }
  
      let filteredGames = sortedGames;
      if (selectedGenre) {
        filteredGames = filteredGames.filter((game) =>
          game.genero.includes(selectedGenre)
        );
      }
      if (selectedIdiom) {
        filteredGames = filteredGames.filter((game) =>
          game.idiomas.includes(selectedIdiom)
        );
      }
      if (selectedPlataforma) {
        filteredGames = filteredGames.filter((game) =>
          game.plataformas.includes(selectedPlataforma)
        );
      }
  
      console.log('entra', filteredGames);
  
      setJuegos(filteredGames);
    }
  }, [selectedOrder, allGames, selectedGenre, selectedIdiom, selectedPlataforma]);


 

 
  
  const goStripe=()=>{
    navigate("/createuserstripe")
  }
  

  useEffect(() => {
  if(user){
    obtain_money_wallet(user['user_id'])
  }
  }, [])
  useEffect(() => {
    if(user){
    ObtainAccount(user['user_id']);
    }
  }, []);
  useEffect(() => {
    // Este efecto se ejecuta cuando cambie la dependencia "wallet"
    if ( user && account.wallet) {
      obtain_money_wallet(user['user_id']);
    }
  }, [myMoney]);
  useEffect(() => {
    if(user){

    
    ObtainAllGames(user['user_id']);
    }else{
      ObtainAllGames();
    }
  }, []);



  ////esto con tailwind
  const [sidebarOpen, setSidebarOpen] = useState(false);

const handleToggleSidebar = () => {
  // Actualizar el estado sidebarOpen
  setSidebarOpen(!sidebarOpen);

  // Toggle del estado showFilter
  setShowFilter(!showFilter);



};
const goPays = () => {
  navigate("/mypays")
}
const [visto, setVisto] = useState(false);
const ObtainInfoLog = async (id_user) => {
  try {
    let response = await fetch(`${apiUrl}getInfoLogueado/${id_user}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    let data = await response.json();

    console.log(data.noVisto); // Verifica que el valor de data.noVisto sea correcto


    setVisto(data.noVisto);

  } catch (error) {
    console.log('Error en la solicitud:', error);
  }
};
useEffect(() => {
  if(user){
    ObtainInfoLog(user['user_id'])
  }

}, [])
const goStripeMoney = () => {
  navigate("/test1")
}
  return (
    <>
    <div className="flex flex-col min-h-screen">
    <Navbar handleModalOpen={handleModalOpen} visto={visto} />
  
  <div className="mt-4">
        <div className="w-full flex justify-center">
          <button
            className="text-white bg-blue-600 px-4 py-2 rounded-md z-20"
            onClick={handleToggleSidebar}
          >
            {sidebarOpen ? "Cerrar menú" : "Abrir Filtros"}
          </button>
        </div>
        <div className={`relative ${sidebarOpen ? 'block' : 'hidden'} z-10 `}>
        <SidebarMenu
          sidebarOpen={sidebarOpen}
          showFilter={showFilter}
          handleOrderChange={handleOrderChange}
          handleGenreSelection={handleGenreSelection}
          selectedGenre={selectedGenre}
          handleIdiomSelection={handleIdiomSelection}
          selectedIdiom={selectedIdiom}
          handlePlataformaSelection={handlePlataformaSelection}
          selectedPlataforma={selectedPlataforma}
        >
          {juegos.length>0 ? <ImageCard imageInfo={juegos} />:    <div className="min-h-screen flex items-center justify-center">
  <div className="w-full max-w-sm mx-auto bg-white shadow-md rounded-lg p-6">
    <div className="flex items-center justify-center text-red-500">
      <i className="fas fa-exclamation-circle text-3xl"></i>
    </div>
    <h1 className="mt-4 text-center font-semibold text-xl text-gray-800">No hay juegos disponibles</h1>
  </div>
</div>}
          </SidebarMenu>
        </div>
      </div>
      <div className="flex flex-col flex-grow">
{!sidebarOpen && (
  juegos.length > 0 ? (
    <ImageCard imageInfo={juegos} />
  ) : (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-sm mx-auto bg-white shadow-md rounded-lg p-6">
        <div className="flex items-center justify-center text-red-500">
          <i className="fas fa-exclamation-circle text-3xl"></i>
        </div>
        <h1 className="mt-4 text-center font-semibold text-xl text-gray-800">No hay juegos disponibles</h1>
      </div>
    </div>
  )
)}
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
              {account.wallet &&
                <MuiButton onClick={()=>goPays()} className="w-full mb-2 text-lg" style={{ fontSize: '18px' }}>
                Mis pagos
                {visto && (
                  <span className="ml-2 bg-red-500 text-red-500 text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    ●
                  </span>
                )}
            </MuiButton>
              }
               {account.wallet &&
                <MuiButton onClick={()=>goStripeMoney()} className="w-full mb-2 text-lg" style={{ fontSize: '18px' }}>
               Ingresar Dinero
            </MuiButton>
              }
           
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
  <div className='min-h-0'>
        <Footer/>
        </div>
        </div>
  </>
  )
}

