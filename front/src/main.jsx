import React from "react";
import ReactDOM from "react-dom/client";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { BrowserRouter } from "react-router-dom";
import { Rutas } from "./Componentes/Rutas";
import './index.css'
ReactDOM.createRoot(document.getElementById("root")).render(
    <div>

    <Rutas />
    <ToastContainer />
    </div>
);
