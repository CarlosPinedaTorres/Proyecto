import React from 'react'
import { useContext} from "react";
import { Contexto } from "../../Context/Contexto";

export const TestCreateUser = () => {
    const {user} = useContext(Contexto);
    const clientSecret='sk_test_51N6e2ZLomp5j2gtn09duzxYVkrz9mkuct9TaAzzzhT1PvlQoltWoAu6ny50GmqMZL6GsR8fYY5AuI0b2ONH0vYfV00Ph9vKMyL'
    const crear=async()=>{
    const response = await fetch('http://localhost:8000/api/createUserStripe/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({ user:user}),
    });

    const data = await response.json();
    console.log(data)
  ;

    }
  return (
<>  

<button onClick={crear}>Crear</button>
</>
  )
}
