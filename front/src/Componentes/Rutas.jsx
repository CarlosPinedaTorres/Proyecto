import React from "react";
import { HashRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { Registrar } from "./Registrar";
import { SignIn } from "./SignIn";
import { PaginaPrincipal } from "./PaginaPrincipal";
import { InfoGame } from "./InfoGame";
import { ProviderContext } from "../Context/ProviderContext";
import { Test } from "./Pagos/test";

import PrivateRoutes from "../Services/PrivateRoutes";
import { CreateGame } from "./CreateGame/CreateGame";
import { Plataformas } from "./CreateGame/Plataformas";
import { MyGames } from "./MyGames/MyGames";
import { Edit } from "./MyGames/Edit";
// import { EditGame } from "./MyGames/EditGame";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from "@stripe/stripe-js";
import RechargeForm from "./Pagos/RechargeForm";
import { TestCreateUser } from "./Pagos/TestCreateUser";
import { Scope } from "../Scope/Scope"
import { MisPagos } from "./Pagos/MisPagos";
import { Home11 } from "./UpdateGame/Home11";
import { Informacion } from "./Informacion/Informacion";
import { ResetPassword } from "./Reset Password/ResetPassword";
import ResetPasswordConfirm from "./Reset Password/ResetPasswordConfirm";
export const Rutas = () => {
  const stripePromise = loadStripe('pk_test_51N6e2ZLomp5j2gtnuPLFhR6cQ8uLeFlTQvjtRll6xUyZoDFHQUw7aHtWsDaZQMmOyriBKEGcLtMcqhQpJXGY8cna00AQpIlIrm');
  return (
    <>
      <Elements stripe={stripePromise}>
      <Router>
        <ProviderContext>

         

            <Routes>
            <Route element={<SignIn />} path="/login" exact> </Route>
            <Route path="/hom11" element={<Home11 />} ></Route>
              <Route path="/registrar" element={<Registrar />} ></Route>
              <Route element={<PaginaPrincipal />} path="/home" exact> </Route>
              <Route path="/infogame/:id" element={<InfoGame />} ></Route>
              <Route path="/informacion/" element={<Informacion />} ></Route>
              <Route path="/createuserstripe" element={<TestCreateUser />} ></Route>
              <Route path="/resetPassword" element={<ResetPassword />} ></Route>
              <Route path="/reset-password/confirm/:uidb64/:token/" element={<ResetPasswordConfirm/>} ></Route>
              <Route element={<PrivateRoutes />}>
        <Route element={<PaginaPrincipal />} path="/home" exact />
       
       
        <Route path="/edit/:id" element={<Edit />} ></Route>
        <Route path="/test1" element={<RechargeForm />} ></Route>
        <Route path="/CreateGame" element={<CreateGame />} ></Route>
        <Route path="/mypays" element={<MisPagos />} ></Route>
        <Route path="/mygames" element={<MyGames />} ></Route>
      </Route>
              <Route path="/*" element={<Navigate to="/home" />} > </Route>
              
            </Routes>
          
        </ProviderContext>
        </Router>
      </Elements>
    </>
  );
};
