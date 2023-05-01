import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Registrar } from "./Registrar";
import { SignIn } from "./SignIn";
import { PaginaPrincipal } from "./PaginaPrincipal";
import { InfoGame } from "./InfoGame";
import { ProviderContext } from "../Context/ProviderContext";
import { Test } from "./Test";
import PrivateRoutes from "../Services/PrivateRoutes";
import { MyGames } from "./MyGames";
export const Rutas = () => {
  return (
    <>
      <ProviderContext>
        
        <Routes>
          <Route path="/registrar" element={<Registrar />} />
          <Route element= {<PrivateRoutes/>}>
              <Route element={<PaginaPrincipal/>} path="/home" exact/> 
          </Route>
          <Route path="/login" element={<SignIn/>} />
          <Route path="/infogame/:id" element={<InfoGame />} />
      
          <Route path="/test" element={<test/>} />
          <Route path="/myGames" element={<MyGames/>} />
      
      
          <Route path="/*" element={<Navigate to="/home" />} />
        </Routes>
      </ProviderContext>
    </>
  );
};
