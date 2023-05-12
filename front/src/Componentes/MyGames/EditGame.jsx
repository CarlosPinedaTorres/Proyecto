import React from 'react'
import { Edit } from './Edit'
import { Navbar } from '../Navbar'
import { useContext } from 'react';
import { Contexto } from '../../Context/Contexto';
export const EditGame = () => {
const{user}=use
const {info,plataformasNames,GenerosNames,IdiomasNames,imageChange}=Edit
  return (
    <>
    <Navbar/>
    <div className="row d-flex justify-content-center mt-3">
      <div className="col-12 col-md-8 col-lg-6">
        <div className="border border-3 border-primary"></div>
        <div className=" bg-white card text-dark shadow-lg">
          <div className="card-body p-5">
            <form className=" mb-3 mt-md-4 row" encType="multipart/form-data" >
              <h2 className="fw-bold mb-2 text-uppercase ">AñadirJuego</h2>
              <p className=" mb-5">Rellena todos los campos para crearlo</p>
              <div className="mb-3">
                <label htmlFor="vendedor" className="form-label rounded text-dark border-dark text-decoration-underline">Nombre vendedor:</label>
                <input type="text"className="form-control bg-secondary border-dark" value={user.username}name="vendedor" placeholder="Nombre del vendedor"/>
              </div>
              <div className="mb-3">
                
                <label htmlFor="url_portada" className="form-label rounded text-dark border-dark text-decoration-underline">Escoge una imagen de portada para tu juego:</label>
                <input type="file" className="form-control bg-secondary border-dark" onChange={imageChange} name="url_portada" />
              </div>
              <div className="mb-3">
                <label htmlFor="nombre" className="form-label rounded text-dark border-dark text-decoration-underline">Introduce el nombre del juego:</label>
                <input type="text"  className="form-control bg-secondary border-dark" name="nombre" placeholder="Nombre del juego"/>
              </div>
              <div className="mb-3">
                <label htmlFor="descripcion" className="form-label rounded text-dark border-dark text-decoration-underline">Descripcion:</label>
                <textarea type="text-field"  className="form-control bg-secondary border-dark" name="descripcion" placeholder="Introduce una breve descripcion del juego"/>
              </div>
              <div className="mb-3">
              <label htmlFor="plataformas" className="form-label rounded text-dark border-dark text-decoration-underline">Plataformas:</label>
              <select  value={plataformasNames} className="form-select"  multiple aria-label="multiple select example" name="plataformas" >
                  {
                  plataformas.map((plataforma)=>{
                  return <option key={plataforma.id}>{plataforma.nombre}</option>})}
              </select>
              </div>
              <div className="mb-3">
              <label htmlFor="generos" className="form-label rounded text-dark border-dark text-decoration-underline">Generos:</label>
              <select className="form-select" value={GenerosNames}multiple aria-label="multiple select example" name="generos" >
                  {
                  generos.map((genero)=>{
                  return <option key={genero.id}>{genero.nombre}</option>})}
              </select>
              </div>     
              <div className="mb-3">
              <label htmlFor="idiomas" className="form-label rounded text-dark border-dark text-decoration-underline">Idiomas:</label>
              <select className="form-select" value={IdiomasNames}multiple aria-label="multiple select example" name="idiomas" >
                  {
                  idiomas.map((idioma)=>{
                  return <option key={idioma.id}>{idioma.nombre}</option>})}
              </select>
              </div>
              <div className="mb-3">
                <label htmlFor="publicacion" className="form-label rounded text-dark border-dark text-decoration-underline">publicacion:</label>
                <input type="date" value={info[0].publicacion}className="form-control bg-secondary border-dark" name="publicacion" />
              </div>
              <div className="mb-3">
                <label htmlFor="num_llaves" className="form-label rounded text-dark border-dark text-decoration-underline">num_llaves:</label>
                <input type="text"value={info[0].num_llaves} className="form-control bg-secondary border-dark" name="num_llaves" />
              </div>
              <div className="mb-3">
                <label htmlFor="publicado" className="form-label rounded text-dark border-dark text-decoration-underline">publicado:</label>
                <input type="date" value={info[0].publicado} className="form-control bg-secondary border-dark" name="publicado" />
              </div>
              <div className="mb-3">
                <label htmlFor="precio_venta_final" className="form-label rounded text-dark border-dark text-decoration-underline"> precio_venta_final:</label>
                <input type="text" value={info[0].precio_venta_final} className="form-control bg-secondary border-dark" name="precio_venta_final" />
              </div>
              <div className="mb-3">
                <label htmlFor="precio" className="form-label rounded text-dark border-dark text-decoration-underline">precio :</label>
                <input type="text" value={info[0].precio} className="form-control bg-secondary border-dark" name="precio" />
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
