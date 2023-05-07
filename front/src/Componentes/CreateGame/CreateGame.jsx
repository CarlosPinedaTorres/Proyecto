import { useEffect ,useContext,useState} from "react"
import React from 'react'
import { Contexto } from "../../Context/Contexto"
import { Form} from "react-bootstrap"
import { Navbar } from "../Navbar"
export const CreateGame= () => {

  const {obtain_Plataformas,plataformas,obtain_Generos,generos,obtain_Idiomas,idiomas,user,uploadGame,handlePlataformasChange,handleIdiomasChange,handleGenerosChange}=useContext(Contexto)
  useEffect(() => {
      obtain_Plataformas()
      obtain_Generos()
      obtain_Idiomas()
    
  }, [])

    // const {authTokens}=useContext(Contexto)
    // const [myGames,setmyGames,setAuthTokens] = useState([])
    
    // useEffect(() => {
    //     ObtainMyGames()
    //     setAuthTokens()
    // }, [])
    
    // const ObtainMyGames=async()=>{
    //     console.log(authTokens.access)
    //     let response= await fetch('http://localhost:8000/games/',{
    //       method:'GET',
    //       headers:{
    //         'Content-Type':'application/json',
    //         'Authorization':'Bearer ' + String(authTokens.access)
    //       }
    //     })
    //     let data= await response.json()
    //     console.log(data)
    //     setmyGames(data)
      
    //   }
  return (
    <>
    
    {/* <div className=" vh-100 d-flex justify-content-center align-items-center"> */}
  {/* <div className="container"> */}
  <Navbar/>
    <div className="row d-flex justify-content-center mt-3">
      <div className="col-12 col-md-8 col-lg-6">
        <div className="border border-3 border-primary"></div>
        <div className=" bg-white card text-dark shadow-lg">
          <div className="card-body p-5">
            <form className=" mb-3 mt-md-4 row" encType="multipart/form-data" onSubmit={uploadGame}>
              <h2 className="fw-bold mb-2 text-uppercase ">AñadirJuego</h2>
              <p className=" mb-5">Rellena todos los campos para crearlo</p>
              {/* <div className="bg-secondary"> */}
              <div className="mb-3">
                <label htmlFor="vendedor" className="form-label rounded text-dark border-dark text-decoration-underline">Nombre vendedor:</label>
                <input type="text" className="form-control bg-secondary border-dark" value={user.username}name="vendedor" placeholder="Nombre del vendedor"/>
              </div>
              <div className="mb-3">
                
                <label htmlFor="url_portada" className="form-label rounded text-dark border-dark text-decoration-underline">Escoge una imagen de portada para tu juego:</label>
                <input type="file" className="form-control bg-secondary border-dark" name="url_portada" />
              </div>
              <div className="mb-3">
                <label htmlFor="nombre" className="form-label rounded text-dark border-dark text-decoration-underline">Introduce el nombre del juego:</label>
                <input type="text" className="form-control bg-secondary border-dark" name="nombre" placeholder="Nombre del juego"/>
              </div>
              <div className="mb-3">
                <label htmlFor="descripcion" className="form-label rounded text-dark border-dark text-decoration-underline">Descripcion:</label>
                <textarea type="text-field" className="form-control bg-secondary border-dark" name="descripcion" placeholder="Introduce una breve descripcion del juego"/>
              </div>
              <div className="mb-3">
                <label htmlFor="juego" className="form-label rounded text-dark border-dark text-decoration-underline">Introduce el nombre de desarrollador:</label>
                <input type="text" className="form-control bg-secondary border-dark" name="juego" placeholder="Nombre del juego"/>
              </div>
              <div className="mb-3">
              <label htmlFor="plataformas" className="form-label rounded text-dark border-dark text-decoration-underline">Plataformas:</label>
              <select className="form-select" multiple aria-label="multiple select example" name="plataformas" onChange={handlePlataformasChange}>
                  {
                  plataformas.map((plataforma)=>{
                  return <option key={plataforma.id}>{plataforma.nombre}</option>})}
              </select>
              </div>
              <div className="mb-3">
              <label htmlFor="generos" className="form-label rounded text-dark border-dark text-decoration-underline">Generos:</label>
              <select className="form-select" multiple aria-label="multiple select example" name="generos" onChange={handleGenerosChange}>
                  {
                  generos.map((genero)=>{
                  return <option key={genero.id}>{genero.nombre}</option>})}
              </select>
              </div>     
              <div className="mb-3">
              <label htmlFor="idiomas" className="form-label rounded text-dark border-dark text-decoration-underline">Idiomas:</label>
              <select className="form-select" multiple aria-label="multiple select example" name="idiomas" onChange={handleIdiomasChange}>
                  {
                  idiomas.map((idioma)=>{
                  return <option key={idioma.id}>{idioma.nombre}</option>})}
              </select>
              </div>
              <div className="mb-3">
                <label htmlFor="publicacion" className="form-label rounded text-dark border-dark text-decoration-underline">publicacion:</label>
                <input type="date" className="form-control bg-secondary border-dark" name="publicacion" />
              </div>
              <div className="mb-3">
                <label htmlFor="num_llaves" className="form-label rounded text-dark border-dark text-decoration-underline">num_llaves:</label>
                <input type="text" className="form-control bg-secondary border-dark" name="num_llaves" />
              </div>
              <div className="mb-3">
                <label htmlFor="publicado" className="form-label rounded text-dark border-dark text-decoration-underline">publicado:</label>
                <input type="date" className="form-control bg-secondary border-dark" name="publicado" />
              </div>
              <div className="mb-3">
                <label htmlFor="precio_venta_final" className="form-label rounded text-dark border-dark text-decoration-underline"> precio_venta_final:</label>
                <input type="text" className="form-control bg-secondary border-dark" name="precio_venta_final" />
              </div>
              <div className="mb-3">
                <label htmlFor="precio" className="form-label rounded text-dark border-dark text-decoration-underline">precio :</label>
                <input type="text" className="form-control bg-secondary border-dark" name="precio" />
              </div>
              <div className="d-grid">
                <button className="btn btn-outline-dark" type="submit">Crear</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>



  
    </>
  )
}
