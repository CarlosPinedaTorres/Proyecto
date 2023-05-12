import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Registrar } from "./Registrar";
import { SignIn } from "./SignIn";
import { PaginaPrincipal } from "./PaginaPrincipal";
import { InfoGame } from "./InfoGame";
import { ProviderContext } from "../Context/ProviderContext";
import {Test } from "./Pagos/test";
import PrivateRoutes from "../Services/PrivateRoutes";
import { CreateGame} from "./CreateGame/CreateGame";
import { Plataformas } from "./CreateGame/Plataformas";
import { MyGames } from "./MyGames/MyGames";
import { Edit } from "./MyGames/Edit";
import { EditGame } from "./MyGames/EditGame";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from "@stripe/stripe-js";
import RechargeForm from "./Pagos/RechargeForm";
export const Rutas = () => {
  const stripePromise = loadStripe('pk_test_51N6e2ZLomp5j2gtnuPLFhR6cQ8uLeFlTQvjtRll6xUyZoDFHQUw7aHtWsDaZQMmOyriBKEGcLtMcqhQpJXGY8cna00AQpIlIrm');
  return (
    <>
     <Elements stripe={stripePromise}>
      <ProviderContext>
        
        <Routes>
          <Route path="/registrar" element={<Registrar />} />
          <Route element= {<PrivateRoutes/>}>
              <Route element={<PaginaPrincipal/>} path="/home" exact/> 
          </Route>
          <Route path="/login" element={<SignIn/>} />
          <Route path="/infogame/:id" element={<InfoGame />} />
          <Route path="/edit/:id" element={<Edit/>} />
      
          <Route path="/test" element={<Test/>} />
          <Route path="/test1" element={<RechargeForm/>} />
          <Route path="/CreateGame" element={<CreateGame/>} />
          <Route path="/forma" element={<Plataformas/>} />
          <Route path="/mygames" element={<MyGames/>} />
      
          <Route path="/*" element={<Navigate to="/home" />} />
        </Routes>
      </ProviderContext>
      </Elements>
    </>
  );
};
