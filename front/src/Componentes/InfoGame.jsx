import React, { useContext, useEffect, useState, useRef, useReducer } from "react";
import { Dialog, Transition } from '@headlessui/react';
import { useParams, NavLink } from "react-router-dom";
import { Contexto } from "../Context/Contexto";
import { Fragment } from 'react';
import { Navbar } from "./Navbar";
import { Footer } from "./Footer/Footer";

import { Modal, Button } from '@mui/material';
import { Scope } from "../Scope/Scope";

export const InfoGame = () => {
const [numLlavesSeleccionadas, setNumLlavesSeleccionadas] = useState(0);
const [precioPropuesto, setPrecioPropuesto] = useState(0);
  const id = useParams();
  const [id_real, setId] = useState([])
  const [confirmar, setConfirmar] = useState(false)
  const { user, logoutUser, obtain_money_wallet, myMoney, authTokens, obtain_Idiomas, idiomas ,obtain_Generos,generos,obtain_Plataformas,plataformas
    ,ObtainUserName, userName
  } = useContext(Contexto);
  const num_llaves = useRef(null)
  const final_price = useRef(null)
  const llaves = useRef(null)
  const [gameLoaded, setGameLoaded] = useState(false);

const [compra, setComprar] = useState(true)
  const [game, setGame] = useState([])
  const ObtainGame = async (idJuego) => {
    console.log('dentro', idJuego)
    let response = await fetch(`http://127.0.0.1:8000/juego/${idJuego}/`, {

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
      const response = await fetch(`http://127.0.0.1:8000/ventas/${idJuego}/`);
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
      setComprar(false)}else{
    console.log(final_price.current.value)
    let response = await fetch("http://127.0.0.1:8000/update-wallets/", {
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
    await obtain_money_wallet();
    await ObtainGame(id_real)
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
    console.log(user['user_id'])
    obtain_money_wallet(user['user_id'])
    if(game!=[]){
    ObtainUserName(game.vendedor)
    }
  }, [game])

  useEffect(() => {
    console.log('T', game)
    if (game.num_llaves == 0) {
      obtain_ventas(id.id)
    }


  }, [game])
  useEffect(() => {

    if (gameLoaded) {
      ObtainGame(id.id)
    }


  }, [gameLoaded])

  const [modalOpen, setModalOpen] = useState(false);


  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };
  return (
    <>
      <Navbar handleModalOpen={handleModalOpen} />
      <div >


        <Modal open={modalOpen} onClose={handleModalClose} className="custom-modal">
          <div className="modal-content">
            <h3 className="modal-title text-center">Mi Modal</h3>

            <Button style={{ fontSize: '18px' }} className="form-control">
              Wallet: {myMoney}
            </Button>
            <Button onClick={logoutUser} style={{ fontSize: '18px' }} className="form-control">
              Logout
            </Button>
            <Button
              style={{ fontSize: '18px' }}
              onClick={handleModalClose}
              className="form-control"
            >
              Cerrar Modal
            </Button>

          </div>
        </Modal>

      </div>

      {game !== null && (
  <div className="container mx-auto p-6">
    <div className="flex flex-col items-center">
      <div className="bg-gradient-to-r from-blue-600 to-green-600 shadow-lg rounded-xl p-6 w-full sm:w-4/5">
        <div className="flex flex-col sm:flex-row items-center justify-between mx-auto">
          <img
            src={game.url_portada ? `http://localhost:8000/${game.url_portada}` : ''}
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
              {renderInfoCard('Precio Venta Final', game.precio_venta_final)}
            </div>
            <div className="bg-gray-300 h-px my-5"></div>
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
            </div>
            <div>
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
            </div>
            <button
              onClick={() => comprar(game.precio, game.vendedor, game.id)}
              className="btn btn-primary mt-2 bg-blue-600 text-white rounded-md py-2 px-4 w-full"
            >
              Comprar
            </button>
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

<Footer />

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


      {/* <div>
        <Scope id_juego={id.id} />
      </div> */}

