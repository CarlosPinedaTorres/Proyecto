import React from 'react';
import { Contexto } from '../../Context/Contexto';
import { useContext,useEffect } from 'react';

const SidebarMenu = ({ children, sidebarOpen ,showFilter, handleOrderChange ,handleGenreSelection,selectedGenre,handleIdiomSelection,
  selectedIdiom,handlePlataformaSelection,selectedPlataforma}) => {

    const {obtain_Generos,generos, obtain_Idiomas,idiomas,obtain_Plataformas,plataformas}=useContext(Contexto)
    useEffect(() => {
      obtain_Generos()
      obtain_Idiomas()
      obtain_Plataformas()
    }, [])
  return (
    <div className="relative min-h-screen">
    <div
      className={`${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } fixed left-0 top-16 w-64 bg-white shadow-md transform transition-transform duration-300 ease-in-out z-20`}
      style={{ height: 'calc(100vh - 4rem)' }}
    >
      <div className="h-full flex flex-col items-center justify-center p-4">
        <div className="w-full">
          {showFilter && (
            <div
              className={`filter-options ${
                showFilter ? 'responsive-filter' : ''
              }`}
            >
              <div className="filter-section mb-4">
                <h3 className="text-lg font-semibold text-blue-600 mb-2 border-b border-blue-400 pb-1">Géneros:</h3>
                <ul className="filter-list space-y-1">
                  {generos.map((genre) => (
                    <li key={genre.id} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedGenre === genre.id}
                        onChange={() => handleGenreSelection(genre)}
                        className="form-checkbox mr-2"
                      />
                      <span className="">{genre.nombre}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="filter-section mb-4">
                <h3 className="text-lg font-semibold text-blue-600 mb-2 border-b border-blue-400 pb-1">Plataformas:</h3>
                <ul className="filter-list space-y-1">
                  {plataformas.map((plataforma) => (
                    <li key={plataforma.id} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedPlataforma === plataforma.id}
                        onChange={() => handlePlataformaSelection(plataforma)}
                        className="form-checkbox mr-2"
                      />
                      <span className="">{plataforma.nombre}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="filter-section mb-4">
                <h3 className="text-lg font-semibold text-blue-600 mb-2 border-b border-blue-400 pb-1">Idiomas:</h3>
                <ul className="filter-list space-y-1">
                  {idiomas.map((idioma) => (
                    <li key={idioma.id} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedIdiom === idioma.id}
                        onChange={() => handleIdiomSelection(idioma)}
                        className="form-checkbox mr-2"
                      />
                      <span className="">{idioma.nombre}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="filter-section mb-4">
                <h3 className="text-lg font-semibold text-blue-600 mb-2 border-b border-blue-400 pb-1">Precio:</h3>
                <ul className="filter-list space-y-1">
                  <li className="flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox mr-2"
                      onChange={(e) => {
                        if (e.target.checked) {
                          handleOrderChange('desc');
                        } else {
                          handleOrderChange('');
                        }
                      }}
                    />
                    <span className="">+ a -</span>
                  </li>
                  <li className="flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox mr-2"
                      onChange={(e) => {
                        if (e.target.checked) {
                          handleOrderChange('asc');
                        } else {
                          handleOrderChange('');
                        }
                      }}
                    />
                    <span className="">- a +</span>
                  </li>
                </ul>
              </div>
              <div className="filter-section mb-4">
                <h3 className="text-lg font-semibold text-blue-600 mb-2 border-b border-blue-400 pb-1">Alfabéticamente:</h3>
                <ul className="filter-list space-y-1">
                  <li className="flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox mr-2"
                      onChange={(e) => {
                        if (e.target.checked) {
                          handleOrderChange('az');
                        } else {
                          handleOrderChange('');
                        }
                      }}
                    />
                    <span className="">A - Z</span>
                  </li>
                  <li className="flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox mr-2"
                      onChange={(e) => {
                        if (e.target.checked) {
                          handleOrderChange('za');
                        } else {
                          handleOrderChange('');
                        }
                      }}
                    />
                    <span className="">Z - A</span>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
    <div className="ml-16 bg-gray min-h-screen ">{children}</div>
  </div>
  );
};

export default SidebarMenu;