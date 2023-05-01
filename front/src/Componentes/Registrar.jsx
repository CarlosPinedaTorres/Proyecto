import React from "react";
import { Contexto } from "../Context/Contexto";
import { useContext } from "react";
export const Registrar = () => {
  const {Registrar}=useContext(Contexto)
  return (
    <>
      <form onSubmit={Registrar}>
        <label htmlFor="email">Email:</label>
        <input name='email' type="text" />
        <label htmlFor="username">Username:</label>
        <input name='username' type="text" />
        <label htmlFor="password">Password:</label>
        <input name='password' type="text" />
       <button>Enviar</button>
      </form>
    </>
  );
};
