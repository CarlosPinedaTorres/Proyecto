import React, { useContext, useEffect, useState, useRef} from "react";
import { Dialog, Transition } from '@headlessui/react';
import { useParams, NavLink ,useNavigate} from "react-router-dom";
import { Contexto } from "../Context/Contexto";
import { Fragment } from 'react';
import { Navbar } from "./Navbar";
import { Footer } from "./Footer/Footer";
import { Button as MuiButton,Modal} from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Scope } from "../Scope/Scope";

export const InfoGame = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  // console.log('aqui,infogames')
const navigate=useNavigate()
const [numLlavesSeleccionadas, setNumLlavesSeleccionadas] = useState(0);
const [precioPropuesto, setPrecioPropuesto] = useState(0);
  const id = useParams();
  const [id_real, setId] = useState([])
  const [confirmar, setConfirmar] = useState(false)
  const { user, logoutUser, obtain_money_wallet, myMoney, authTokens, obtain_Idiomas, idiomas ,obtain_Generos,generos,obtain_Plataformas,plataformas
    ,ObtainUserName, userName, ObtainAccount,account,handleMyGamesClick 
  } = useContext(Contexto);
  const num_llaves = useRef(null)
  const final_price = useRef(null)
  const llaves = useRef(null)
  const [gameLoaded, setGameLoaded] = useState(false);

const [compra, setComprar] = useState(true)
  const [game, setGame] = useState([])
  const goStripe=()=>{
    navigate("/createuserstripe")
  }
  
const goLogin=()=>{
  navigate("/login")
}
  const ObtainGame = async (idJuego) => {
    console.log('dentro', idJuego)
    let response = await fetch(`${apiUrl}juego/${idJuego}/`, {

      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }

    })
    let data = await response.json()
    console.log('onlyone', data)

    setGame(data)

  }
  const obtain_ventas = async (idJuego) => {
    try {
      const response = await fetch(`${apiUrl}ventas/${idJuego}/`);
      const data = await response.json();
      // Aquí puedes trabajar con los datos de las ventas
      console.log(data);
      setGameLoaded(false)
    } catch (error) {
      console.error('Error al obtener las ventas:', error);
    }
  };
  const comprar = async (price, vendedor, id_juego) => {
    // console.log(price)
    // console.log(vendedor)
    // console.log(id_juego)
    // console.log(num_llaves.current.value)
    if(game.precio *num_llaves.current.value>myMoney){
      console.log('noMoney')
      setComprar(false)}else if(game.num_llaves==0){
        toast.success('No hay llaves disponibles', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000, // Duración de la notificación en milisegundos
          hideProgressBar: true, // Ocultar barra de progreso
          className: 'bg-white-500 text-black font-medium rounded-md shadow-lg p-4',
          bodyClassName: 'text-sm',
          progressClassName: 'bg-green-200',
        });
      }else{
    console.log(final_price.current.value)
    let response = await fetch(`${apiUrl}update-wallets/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + String(authTokens.access)
      }, body: JSON.stringify({
        llaves: num_llaves.current.value,
        amount: num_llaves.current.value * price,
        id_comprador: user['user_id'],
        id_vendedor: vendedor,
        id_juego: id_juego,
        precio_venta_user: final_price.current.value
      })

    })
    let data = await response.json()
    await obtain_money_wallet(user['user_id']);
    if (response.ok) {
      toast.success('Compra realizada con exito', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000, // Duración de la notificación en milisegundos
        hideProgressBar: true, // Ocultar barra de progreso
        className: 'bg-green-500 text-white font-medium rounded-md shadow-lg p-4',
        bodyClassName: 'text-sm',
        progressClassName: 'bg-green-200',
      });
      navigate("/mygames")
    }
    await ObtainGame(id.id)
    
    console.log(data)
  }

  }

  useEffect(() => {
    obtain_Idiomas()
    obtain_Plataformas()
    obtain_Generos()





  }, [])



  useEffect(() => {
    console.log('Primero', id.id)

    ObtainGame(id.id)
    




  }, [])

  useEffect(() => {
    console.log('SEGUNDO', game)
    // console.log(user['user_id'])
    if(user){
    obtain_money_wallet(user['user_id'])
    }
    if(game!=''){
    ObtainUserName(game.vendedor)
    }
    console.log(game)
  }, [game])


  useEffect(() => {
    console.log('T', game)
    if (game.num_llaves == 0) {
      obtain_ventas(id.id)
    }


  }, [game])
  useEffect(() => {

  
      ObtainGame(id.id)
    


  }, [gameLoaded])
  useEffect(() => {
    if(user){
    ObtainAccount(user['user_id']);
    }
  }, []);
  const [modalOpen, setModalOpen] = useState(false);


  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
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
     <Navbar handleModalOpen={handleModalOpen} visto={visto} />
    

      {game !== null && (
  <div className="container mx-auto p-6">
    <div className="flex flex-col items-center">
      <div className="bg-gradient-to-r from-blue-600 to-green-600 shadow-lg rounded-xl p-6 w-full sm:w-4/5">
        <div className="flex flex-col sm:flex-row items-center justify-between mx-auto">
          <img
            src={game.image}
            className="w-full sm:w-1/3 rounded-xl mb-6 sm:mb-0"
            alt="Portada del juego"
          />
          <div className="text-gray-100 sm:ml-6">
            <div className="my-5">
              <h5 className="text-3xl font-bold">{game.nombre}</h5>
            </div>
            <div className="bg-gray-300 h-px my-5"></div>
            <div className="my-5">
              <p className="text-base sm:text-lg">{game.descripcion}</p>
            </div>
            <div className="bg-gray-300 h-px my-5"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {renderInfoCard('Plataformas', game.plataformas, plataformas)}
              {renderInfoCard('Idiomas', game.idiomas, idiomas)}
              {renderInfoCard('Llaves y Precio', [game.num_llaves, game.precio])}
              {renderInfoCard('Géneros', game.genero, generos)}
              {renderInfoCard('Desarrollador', userName)}
              {renderInfoCard('Fecha de Publicación', game.publicacion)}
              {renderInfoCard('Precio de Mercado', game.precio_mercado)}
              {renderInfoCard('Precio Venta Final', game.precio_venta_final)}
            </div>
            <div className="bg-gray-300 h-px my-5"></div>
            {user && user['username']!=userName &&
            <div>
            <label htmlFor="llavesInput" className="mb-3 block">
        Cuantas llaves quieres?: {numLlavesSeleccionadas}
      </label>
      <input
        className="form-control mb-3 custom-input w-full p-2 rounded-md border border-gray-300"
        id="llavesInput"
        type="range"
        min="0"
        max={game.num_llaves}
        step="1"
        ref={num_llaves}
        value={numLlavesSeleccionadas}
        onChange={(e) => setNumLlavesSeleccionadas(e.target.value)}
      />
            </div>}
           
            {user && user['username']!=userName && <div>
            <label htmlFor="final_price" className="mb-3 block">
        Indica el precio por el que la quieres vender, te recomiendo entre 1-5 euros: {precioPropuesto}
      </label>
      <input
        className="form-control custom-input w-full p-2 rounded-md border border-gray-300"
        id="final_price"
        type="range"
        min="0"
        max="5"
        step="0.01"
        ref={final_price}
        value={precioPropuesto}
        onChange={(e) => setPrecioPropuesto(e.target.value)}
      />
            </div>}
         
            {user ? (
  <div>
    {user && user['username'] == userName ? null : (
      <button
        onClick={() => comprar(game.precio, game.vendedor, game.id)}
        className="btn btn-primary mt-2 bg-blue-600 text-white rounded-md py-2 px-4 w-full"
      >
        Comprar
      </button>
    )}
  </div>
) : (
  <div className="mb-3">
    <p className="text-white">Si quieres comprar llaves de este juego debes de loguearte primero</p>
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-3"
      onClick={() => goLogin()}
    >
      Sign in
    </button>
  </div>
)}

            {!compra && (
              <Transition.Root show={!compra} as={Fragment}>
                <Dialog open={!compra} onClose={() => setConfirmar(false)}>
                  <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white shadow-xl p-6 rounded-xl w-auto sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5">
                      <Dialog.Title className="text-xl font-bold">
                        No tienes fondos suficientes
                      </Dialog.Title>
                      <div className="flex justify-center mt-4">
                        <NavLink className="nav-link text-dark px-4 py-2 rounded-lg bg-blue-600 text-white" to="/test1">
                          Ingresar dinero
                        </NavLink>
                        <button className="px-4 py-2 rounded-lg bg-gray-300" onClick={() => setComprar(true)}>
                          Más tarde
                        </button>
                      </div>
                    </div>
                  </div>
                </Dialog>
              </Transition.Root>
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
)}

       <div className="mb-5">
        <Scope id_juego={id.id} />
      </div> 
<Footer />
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
    </>
  );
};
function renderInfoCard(title, data, dataMap = null) {
  let content;

  if (title === 'Llaves y Precio') {
    content = `Llaves: ${data[0]}  Precio: ${data[1]}`;
  } else if (dataMap) {
    content = data ? data.map(id => dataMap.find(i => i.id === id)?.nombre).join(', ') : '';
  } else {
    content = Array.isArray(data) ? data.join(', ') : data;
  }

  return (
      <div className="bg-gradient-to-r from-blue-500 to-green-500 text-gray-100 rounded-lg p-4">
      <h5 className="text-xl font-bold ">{title}:</h5>
      <p className="text-lg">{content}</p>
    </div>
  );
}



