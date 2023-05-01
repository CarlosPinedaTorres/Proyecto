import React, { useEffect } from "react";
import { Navbar } from "./Navbar";
import axiosInstance from "../Services/axios";
import { useState,useContext } from "react";
import { Contexto } from "../Context/Contexto";
import { useNavigate} from "react-router-dom";

export const SignIn=()=>{
  let {loginUser,user}=useContext(Contexto)
  let navigate=useNavigate()
console.log(user)
  

  return (
    <>
    <Navbar/>
    {user ? (
  <p>Estas registrado</p>
  ):(<p>NO ESTAS AUTENTIFICADO</p>)}
    


    {user &&  <h2>Hello {user.username}</h2>}
        <form onSubmit={loginUser}>
        <label htmlFor="username">User Name:</label>
        <input name='username' type="text" />
        <label htmlFor="password">Password:</label>
        <input name='password' type="text" />
       <button>Enviar</button>
      </form>
    </>
  );
};
