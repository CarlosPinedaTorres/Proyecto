import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Contexto } from "../Context/Contexto";
export const InfoGame = () => {
  const id = useParams();

  const { games } = useContext(Contexto);

  const [juego, setJuego] = useState([]);

  // useEffect(() => {
  //   const listagames = games.filter((game) => game.id == id.id);

  //   setJuego(listagames);
  //   console.log(listagames);
  // }, [games]);

  return (
    <>
      {juego.map((game) => {
        return (
          <div class="container my-5 mx-auto " key={game.id}>
            <div>
              <img src={game.url_portada} alt="imagen" class="imagen" />
            </div>
          </div>
        );
      })}
    </>
  );
};
