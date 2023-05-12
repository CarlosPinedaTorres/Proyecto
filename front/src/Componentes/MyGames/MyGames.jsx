import React from 'react'
import { Link } from 'react-router-dom'
import { useContext,useEffect } from 'react'
import { Contexto } from '../../Context/Contexto'
import { Card,Button,Container,Row,Col } from 'react-bootstrap'
// import '../../Estilos/Juegos.css'
import { Navbar } from '../Navbar'
export const MyGames = () => {
    const {myGamesUser,myGames}=useContext(Contexto)
    useEffect(() => {
        myGames()
        console.log(myGamesUser)
    }, [])
    
  return (
    <>
        <Navbar/>
       
      {/* <div className='mx-5 my-5mx-5 my-5 text-center'>
      <h2>Añadidos recientemente</h2> */}
    
      {myGamesUser &&
    
          myGamesUser.map((game) => {
            return <div class="container my-5 mx-auto bg-secondary " key={game.id}>
              <div class="row product-container">
                <div class="col-3">
                  <img
                    src={`http://localhost:8000/${game.url_portada}`}
                    class="mx-2 my-5 img-fluid"
                    alt="Descripción de la imagen"
                  />
                </div>
                <div className="col-9 ">
                  <h2 className="product-title my-4 text-center">{game.nombre}</h2>
                  <p className="product-description my-2 ">{game.descripcion}</p>
                  <p className="product-price text-center">
                    <strong>Numero de llaves:</strong> {game.num_llaves} 
                  </p>
                  <p class="product-price text-center">
                  <strong> Precio por llave:</strong> {game.precio} 
                  </p>
                  <div class="d-flex justify-content-end">
        <Link className="nav-link my-4" to={`/edit/${game.id}`}>
          <strong>Editar</strong>
        </Link>
      </div>
                </div>
              </div>
              </div>
       
      }
     
      
  )}
  </> 
  )}