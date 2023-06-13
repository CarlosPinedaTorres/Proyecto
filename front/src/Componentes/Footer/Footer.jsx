import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faHome, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';

export const Footer = () => {
  return (
    <div className="flex flex-col w-full bg-blue-900 min-h-0">
    <div className="flex-grow" />
    <footer className="text-blue-200 font-sans w-full">
      <div className="container mx-auto px-4 pb-0 w-full">
        <section className="w-full">
          <div className="flex flex-wrap justify-between">
            <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3 px-4">
              <h6 className="text-uppercase mb-4 font-bold">Game Masters</h6>
              <p>
                Nos dedicamos a la compra-venta de juegos, funcionamos como
                acciones, tu inviertes, fijas un precio y nosotros nos
                encargamos de vender tu producto, ¿sabes cómo funcionan las
                acciones? Si tienes alguna pregunta ve a nuestro apartado de mas información donde podras descubrir
                como funcionamos.
              </p>
            </div>
            <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3 px-4">
              <h6 className="text-uppercase mb-4 font-bold">Síguenos</h6>
              <p>
                Instagram: @GameMasters
              </p>
              <p>
                Discord: GameMasters#4352
              </p>
              <p>
                Twitter: @GameMasters_GM
              </p>
            </div>
            <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3 px-4">
              <h6 className="text-uppercase mb-4 font-bold">Contáctanos</h6>
              <p>
                <FontAwesomeIcon icon={faHome} className="mr-3" />
                Murcia, San Javier, EU
              </p>
              <p>
                <FontAwesomeIcon icon={faEnvelope} className="mr-3" />
                GameMaster@gmail.com
              </p>
              <p>
                <FontAwesomeIcon icon={faPhone} className="mr-3" />
                +32 657176777
              </p>
            </div>
          </div>
        </section>
      </div>
      <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        © 2023 GameMasters.com
      </div>
    </footer>
  </div>
  )
}
