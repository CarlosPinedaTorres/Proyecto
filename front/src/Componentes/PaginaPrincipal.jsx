
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

  const ObtainAllGames=async()=>{

 
    let response=await fetch("http://127.0.0.1:8000/allgames/",{
      method:'GET',
      headers:{
        'Content-Type':'application/json',
      }

    })
    let data = await response.json()
    let gamesWithImages = data.map(game => {
      if (game.image) {
        // Convertir la imagen en una URL utilizable
        const url_portada = URL.createObjectURL(game.url_portada)
        return {...game, url_portada}
      } else {
        return game
      }
    })
   
    setAllGames(gamesWithImages)

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
    navigate("/create-user-stripe")
  }
  

  useEffect(() => {
  
    obtain_money_wallet(user['user_id'])
    
  }, [])
  useEffect(() => {
    ObtainAccount(user['user_id']);
  }, []);
  useEffect(() => {
    // Este efecto se ejecuta cuando cambie la dependencia "wallet"
    if (account.wallet) {
      obtain_money_wallet(user['user_id']);
    }
  }, [myMoney]);
  useEffect(() => {
    ObtainAllGames();
  }, []);



  ////esto con tailwind
  const [sidebarOpen, setSidebarOpen] = useState(false);

const handleToggleSidebar = () => {
  // Actualizar el estado sidebarOpen
  setSidebarOpen(!sidebarOpen);

  // Toggle del estado showFilter
  setShowFilter(!showFilter);
};
  return (
    <>
    <div className="flex flex-col min-h-screen">
  <Navbar handleModalOpen={handleModalOpen} />
  
  <div className="mt-4">
        <div className="w-full flex justify-center">
          <button
            className="text-white bg-blue-600 px-4 py-2 rounded-md z-20"
            onClick={handleToggleSidebar}
          >
            {sidebarOpen ? "Cerrar menú" : "Abrir Filtros"}
          </button>
        </div>
        <div className={`relative ${sidebarOpen ? 'block' : 'hidden'} z-10`}>
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
            {juegos && <ImageCard imageInfo={juegos} />}
          </SidebarMenu>
        </div>
      </div>
      <div className="flex flex-col flex-grow">
      {!sidebarOpen && juegos.length>0 ? <ImageCard imageInfo={juegos} />:<h1>NO hay juegos con esas caracteristicas</h1>}
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
                My Account
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
                My Games
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

