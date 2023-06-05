import React from 'react'
import { Contexto } from '../../Context/Contexto'
import { useContext, useEffect, useState } from 'react'
import { Navbar } from '../Navbar'
import { Card, Row, Col, Button, ButtonGroup } from "react-bootstrap";
import '../../Estilos/PaginaPrincipal.css'
import { GameFilter } from '../Filtros/GameFilter';
import { Footer } from '../Footer/Footer';
import { Link, useNavigate } from 'react-router-dom';
import { Button as MuiButton, Modal } from '@mui/material';
import SidebarMenu from '../PaginaP, MYgames/SidebarMenu';
import { Dialog, Transition } from '@headlessui/react';
// import { motion } from "framer-motion";
import { ImageCardMyGames } from '../PaginaP, MYgames/ImageCardMyGames';
export const MyGames = () => {
  const navigate = useNavigate()
  const [filasDeJuegos, setFilasDeJuegos] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [wallet, setWallet] = useState()
  const [selectedOrder, setSelectedOrder] = useState('');
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [selectedIdiom, setSelectedIdiom] = useState(null);
  const [selectedPlataforma, setSelectedPlataforma] = useState(null)

  const createGame = () => {
    navigate("/createGame")
  }


  const handleOrderChange = (order) => {
    console.log('hola')
    setSelectedOrder(order);
  };

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

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };
  const { myGames, myGamesUser, myMoney, logoutUser, user, obtain_money_wallet, handleMyGamesClick, ObtainAccount, account } = useContext(Contexto)
  const [showFilter, setShowFilter] = useState(false);
  useEffect(() => {
    ObtainAccount(user['user_id']);

  }, []);

  const [juegos, setJuegos] = useState([]);
  const [visto, setVisto] = useState(false);
  const ObtainInfoLog = async (id_user) => {
    try {
      let response = await fetch(`http://127.0.0.1:8000/getInfoLogueado/${id_user}/`, {
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
    // Este efecto se ejecuta cuando cambie la dependencia "wallet"
    if (wallet) {
      obtain_money_wallet(user['user_id']);

    }
  }, [wallet]);

  useEffect(() => {
    // Este efecto se ejecuta cuando cambien las dependencias "account" y "wallet"
    if (account && account.wallet) {
      setWallet(account.wallet);
      myGames();
      console.log('visto', visto)
    }
  }, [account, wallet]);
  const colWidth = showFilter ? 'w-90' : 'w-100';
  const handleToggleFilter = () => {
    setShowFilter(!showFilter);
  };

  useEffect(() => {
    if (selectedOrder !== null && selectedOrder !== undefined) {
      const sortedGames = [...myGamesUser];
  
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
  }, [selectedOrder, myGamesUser, selectedGenre, selectedIdiom, selectedPlataforma]);

  useEffect(() => {
    ObtainInfoLog(user['user_id']);

  }, []);
  // useEffect(() => {
  //   console.log('visto', visto);
  // }, [visto]);

  const goPays = () => {
    navigate("/mypays")
  }


  const goStripe = () => {
    navigate("/create-user-stripe")
  }
  const goStripeMoney = () => {
    navigate("/test1")
  }
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleToggleSidebar = () => {
    // Actualizar el estado sidebarOpen
    setSidebarOpen(!sidebarOpen);
  
    // Toggle del estado showFilter
    setShowFilter(!showFilter);
  };
  return (
    <>
      {/* <Navbar handleModalOpen={handleModalOpen} />
      
      
      <div >
        
      
      <Modal open={modalOpen} onClose={handleModalClose} className="custom-modal">
        <div className="modal-content">
          <h3 className="modal-title text-center">Mi Modal</h3>
      
            <MuiButton style={{ fontSize: '18px' }} className="form-control">
              Wallet: {myMoney}
            </MuiButton>
            <MuiButton  onClick={logoutUser}style={{ fontSize: '18px' }} className="form-control">
              Logout
            </MuiButton>
            <MuiButton
              style={{ fontSize: '18px' }}
              onClick={handleMyGamesClick}
              className="form-control"
            >
              My Games 
            </MuiButton>
            <MuiButton
              style={{ fontSize: '18px' }}
              onClick={goPays}
              className="form-control"
            >
              Mis Pagos {visto && <span className="nuevo-indicador">●</span>}
            </MuiButton>
            <MuiButton
              style={{ fontSize: '18px' }}
              onClick={handleModalClose}
              className="form-control"
            >
              Cerrar Modal
            </MuiButton>
          
        </div>
      </Modal>

      </div>
      {!account.account ? 
  <div className="text-center d-flex flex-column align-items-center">
  <p className="text-white mt-5 mb-0">Debes proporcionarnos información adicional para poder crear juegos.</p>
  <div className="d-flex justify-content-center">
    <Button className="filter-toggle text-white mt-3" onClick={goStripe} variant="danger">
      Crear cuenta de Stripe
    </Button>
  </div>
  
</div>: (
    <div className='d-flex justify-content-center w-10 ' >
    {myGamesUser.length>0&&
      <Button className="filter-toggle d-flex justify-content-center text-white" variant="danger" onClick={handleToggleFilter}>
        {showFilter? 'Ocultar filtros' : 'Mostrar filtros'}
      </Button>
}
      <Button className="filter-toggle d-flex justify-content-center text-white mx-4" variant="danger" onClick={createGame}>
        Crear Juego
      </Button>
      <Button className="filter-toggle d-flex justify-content-center text-white " variant="danger" onClick={goStripeMoney}>
        Ingresar dinero
      </Button>
      </div>)}

      {!account.account? null : (
  <div className="container py-5 text-white d-flex align-items-center justify-content-center">
  <Row>
    {showFilter && (
      <Col md={2} className={`${showFilter ? 'filter-color' : ''} vh-100 w-10`}>
        <div style={{ overflow: 'auto', maxHeight: '100%' }}>
        <GameFilter showFilter={showFilter} handleOrderChange={handleOrderChange}
        handleGenreSelection={handleGenreSelection}
        selectedGenre={selectedGenre} handleIdiomSelection={handleIdiomSelection}
        selectedIdiom={selectedIdiom} handlePlataformaSelection={handlePlataformaSelection} selectedPlataforma={selectedPlataforma}/>
        </div>
      </Col>
    )}
    <Col md={9} className={`align-items-center ${colWidth}`}>
      {filasDeJuegos.map((fila, index) => (
        <Row xs={1} md={2} lg={3} xl={4} xxl={5} className="g-4 align-items-center  ">
          {fila.map((imagen) => (
            <Col xs={12} md={4} key={imagen.nombre}>
              <Card className="mb-3 h-100 game-card">
                <Card.Img
                  variant="top"
                  src={`http://localhost:8000/${imagen.url_portada}`}
                  className="game-image"
                />
                <Card.Body>
                  <Card.Title className="game-name">{imagen.nombre}</Card.Title>
                  <Card.Text className="game-price">{imagen.precio}</Card.Text>
                  <Link to={`http://localhost:5173/edit/${imagen.id}`}>
                    Editar ||
                  </Link>  <Link to={`http://localhost:5173/edit/${imagen.id}`}>
                    Eliminar Oferta
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ))}
    </Col>
  </Row>
</div>)}
      

  
  <Footer /> */}

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
          {!account.account ? (
        <div className="text-center  ml-4">
          <button
            className="bg-red-600 text-white px-4 py-2 rounded-md"
            onClick={goStripe}
          >
            Crear cuenta de Stripe
          </button>
        </div>
      ) : (
        <div className="ml-4">
          <div className="flex space-x-4">
            {myGamesUser.length > 0 && (
              <button
                className="bg-red-600 text-white px-4 py-2 rounded-md"
                onClick={handleToggleFilter}
              >
                {showFilter ? "Ocultar filtros" : "Mostrar filtros"}
              </button>
            )}
            <button
              className="bg-red-600 text-white px-4 py-2 rounded-md"
              onClick={createGame}
            >
              Crear Juego
            </button>
            <button
              className="bg-red-600 text-white px-4 py-2 rounded-md"
              onClick={goStripeMoney}
            >
              Ingresar dinero
            </button>
          </div>
        </div>)
}
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
            {juegos && <ImageCardMyGames imageInfo={juegos} />}
          </SidebarMenu>
        </div>
      </div>
      <div className="flex flex-col flex-grow"> 
      
      {!sidebarOpen && juegos && <ImageCardMyGames imageInfo={juegos} />}
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
              <MuiButton onClick={()=>goPays()} className="w-full mb-2 text-lg" style={{ fontSize: '18px' }}>
                Mis pagos
              </MuiButton>
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
   
      
      <Footer />
      
      </div>
      {/* {!account.account ? (
        <div className="text-center d-flex flex-column align-items-center">
          <p className="text-white mt-5 mb-0">Debes proporcionarnos información adicional para poder crear juegos.</p>
          <div className="d-flex justify-content-center">
            <button className="btn btn-danger text-white mt-3" onClick={goStripe}>
              Crear cuenta de Stripe
            </button>
          </div>
        </div>
      ) : (

        <div className="button-container mx-auto mt-4 pt-3" style={{ maxWidth: '600px' }}>
          <ButtonGroup className="d-flex justify-content-center w-100">
            {myGamesUser.length > 0 && (
              <Button variant="danger" className="filter-toggle text-white" onClick={handleToggleFilter}>
                {showFilter ? 'Ocultar filtros' : 'Mostrar filtros'}
              </Button>
            )}
            <Button variant="danger" className="filter-toggle text-white mx-4" onClick={createGame}>
              Crear Juego
            </Button>
            <Button variant="danger" className="filter-toggle text-white" onClick={goStripeMoney}>
              Ingresar dinero
            </Button>
          </ButtonGroup>
        </div>

      )}

      {!account.account ? null : (
        <div className="container py-5 text-white d-flex align-items-center justify-content-center">
        <Row>
          {showFilter && (
            <Col md={2} className={`${showFilter ? "filter-color" : ""} vh-100 w-10`}>
              <div style={{ overflow: "auto", maxHeight: "100%" }}>
                <GameFilter
                  showFilter={showFilter}
                  handleOrderChange={handleOrderChange}
                  handleGenreSelection={handleGenreSelection}
                  selectedGenre={selectedGenre}
                  handleIdiomSelection={handleIdiomSelection}
                  selectedIdiom={selectedIdiom}
                  handlePlataformaSelection={handlePlataformaSelection}
                  selectedPlataforma={selectedPlataforma}
                />
              </div>
            </Col>
          )}
          <Col md={9} className={`align-items-center`}>
            {filasDeJuegos.map((fila, index) => (
              <Row xs={1} md={2} lg={3} xl={4} xxl={5} className="g-4 align-items-stretch" key={index}>
                {fila.map((imagen) => (
                  <Col xs={12} sm={6} md={4} lg={3} key={imagen.nombre} className="mb-4">
                    <motion.div whileHover={{ scale: 1.1 }} className="card h-100 game-card">
                      <div className="card-horizontal">
                        <div className="img-square-wrapper">
                          <motion.img
                            src={`http://localhost:8000/${imagen.url_portada}`}
                            className="img-fluid game-image"
                            alt={imagen.nombre}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                          />
                        </div>
                        <div className="card-body d-flex flex-column justify-content-between">
                          <h5 className="card-title game-name custom-title">{imagen.nombre}</h5>
                          <div className="d-flex justify-content-between">
                            <p className="card-text game-price custom-price">{imagen.precio}</p>
                            <div className="text-right">
                              <div className="card-buttons">
                                <Link to={`http://localhost:5173/edit/${imagen.id}`} className="btn custom-button">
                                  Editar
                                </Link>
                                <Link to={`http://localhost:5173/edit/${imagen.id}`} className="btn custom-button">
                                  Eliminar
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </Col>
                ))}
              </Row>
            ))}
          </Col>
        </Row>
      </div>
      )} */} 


    </>



  )
}

