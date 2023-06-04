import React, { useEffect } from 'react'
import { useState,useContext } from 'react';
import '../../Estilos/GameFilter.css'
import { Contexto } from '../../Context/Contexto';

export const GameFilter = ({showFilter, handleOrderChange ,handleGenreSelection,selectedGenre,handleIdiomSelection,
  selectedIdiom,handlePlataformaSelection,selectedPlataforma
}) => {
  // const [showFilter, setShowFilter] = useState(false);
  const {obtain_Generos,generos, obtain_Idiomas,idiomas,obtain_Plataformas,plataformas}=useContext(Contexto)
  
  



  


  useEffect(() => {
    obtain_Generos()
    obtain_Idiomas()
    obtain_Plataformas()
  }, [])
  

  return (
    <div className="">
      {showFilter && (
        <div className={`filter-options ${showFilter ? 'responsive-filter' : ''}`}>
          <div className="filter-section">
            <h3>Géneros:</h3>
            <ul className="filter-list">
              {generos.map((genre) => (
                <li key={genre.id}>
                  <input
                   type='checkbox'
                   checked={selectedGenre === genre.id}
                   onChange={() => handleGenreSelection(genre)}
                  />
                  {genre.nombre}
                </li>
              ))}
            </ul>
          </div>
          <div className="filter-section">
            <h3>Idiomas:</h3>
            <ul className="filter-list">
              {idiomas.map((language) => (
                <li key={language.id}>
                  <input
                    type="checkbox"
                    checked={selectedIdiom === language.id}
                    onChange={() => handleIdiomSelection(language)}
                  />
                  {language.nombre}
                </li>
              ))}
            </ul>
          </div>
          <div className="filter-section">
            <h3>Plataformas:</h3>
            <ul className="filter-list">
              {plataformas.map((platform) => (
                <li key={platform.id}>
                  <input
                    type="checkbox"
                    checked={selectedPlataforma === platform.id}
                    onChange={() => handlePlataformaSelection(platform)}
                    
                  />
                  {platform.nombre}
                </li>
              ))}
            </ul>
          </div>
          <div className="filter-section">
            <h3>Precio:</h3>
            <ul className="filter-list">
              
                <li>
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      if (e.target.checked) {
                        // Seleccionar el filtro
                        handleOrderChange('desc'); // O el valor correspondiente al filtro seleccionado
                      } else {
                        // Desmarcar el filtro
                        handleOrderChange('');
                      }
                    }}
                   />
                 +  a -
                </li>
                <li>
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      if (e.target.checked) {
                        handleOrderChange('asc');
                      } else {
                        handleOrderChange('');
                      }
                    }}
                  
                   />
                 - a +
                </li>
              
            </ul>
          </div>
          <div className="filter-section">
            <h3>Alfaneticamente:</h3>
            <ul className="filter-list">
              
            <li>
            <input
                    type="checkbox"
                    onChange={e => {
                      if (e.target.checked) {
                        // Seleccionar el filtro
                        handleOrderChange('az'); // O el valor correspondiente al filtro seleccionado
                      } else {
                        // Desmarcar el filtro
                        handleOrderChange(''); // Establecer el estado en vacío
                      }
                    }}
                   />
                   A - Z
              </li>
                <li>
                  <input
                    type="checkbox"
                    onChange={e => {
                      if (e.target.checked) {
                        // Seleccionar el filtro
                        handleOrderChange('za'); // O el valor correspondiente al filtro seleccionado
                      } else {
                        // Desmarcar el filtro
                        handleOrderChange(''); // Establecer el estado en vacío
                      }
                    }}
                   />
                        Z - A
                </li>
              
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}
