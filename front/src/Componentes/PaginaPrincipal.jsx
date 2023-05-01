import { Navbar } from "./Navbar";
import { NavLink, Link } from "react-router-dom";
import "../Estilos/Juegos.css";
import { useContext,useState,useEffect } from "react";
import { Contexto } from "../Context/Contexto";
import { FormPost } from "./FormPost";
import jwt_decode from "jwt-decode"
import { Test } from "./Test";
export const PaginaPrincipal = () => {
  const { games ,user,logoutUser,authTokens} = useContext(Contexto);
  // const tokens = JSON.parse(localStorage.getItem('authTokens'));
  // const accessToken = tokens.access;
  const [myGames, setmyGames] = useState([])


  useEffect(() => {
      ObtainMyGames()
    
  }, [])

  const ObtainMyGames=async()=>{
      let response= await fetch('http://localhost:8000/games/',{
        method:'GET',
        headers:{
            'Content-Type':'application/json',
            'Authorization':'Bearer ' + String(authTokens.access)
        }
    })
      let data= await response.json()
      console.log(data)
      setmyGames(data)
    
     }

  return (
    <>
      <Navbar />
      <Test/>
    <h1>PAgina principal</h1>
    <h1>hola {user.username}</h1>
  {user ?(
    <>
    <p onClick={logoutUser}>Logout</p>
    { myGames &&
      myGames.map((game)=>{
        return <li key ={game.nombre}>{game.nombre}</li>
      })
      
    }
    
  </>
  ):(
  
  <NavLink to="/login">Login</NavLink>)}
  
      {/* <div className='mx-5 my-5mx-5 my-5 text-center'>
      <h2>Añadidos recientemente</h2>
      {games.map((game) => {
        return <div class="container my-5 mx-auto bg-secondary " key={game.id}>
          <div class="row product-container">
            <div class="col-3">
              <img
                src={game.url_portada}
                class="mx-2 my-5 img-fluid"
                alt="Descripción de la imagen"
              />
            </div>
            <div class="col-9 text-center ">
              <h3 class="product-title my-4">{game.nombre}</h3>
              <p class="product-description my-2">{game.descripcion}</p>
              <p class="product-price">
                Numero de llaves: {game.num_llaves} precio: {game.precio}
              </p>
              <Link className="nav-link my-4" to={`/infogame/${game.id}`}>
                Comprar
              </Link>
            </div>
          </div>
        </div>
        Separar
        //   return <div class="mx-5 my-5mx-5 my-5">

        // <img src={game.url_portada} class="card-img-top" className="imagen" alt="imagen" />

        // <div class="card-body bg-secondary">
        //   <h5 class="card-title">{game.nombre}</h5>
        //   <p class="card-text">{game.descripcion}</p>
        //   <p class="card-text"><big>Numero de llaves disponibles: {game.num_llaves}</big></p>
        //   <Link className="nav-link" to={`/infogame/${game.id}`}>Ver mas</Link>
        // </div>
        // </div>
      })}

      {/* <FormPost /> */}
      {/* </div> */}
    </>
  );
};
