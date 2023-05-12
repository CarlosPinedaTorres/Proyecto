import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useContext} from "react";
import { Contexto } from "../../Context/Contexto";

const RechargeForm = () => {
    const {user} = useContext(Contexto);
    const onRechargeSuccess=(response)=> {
        console.log('hola',response); // Aquí puedes hacer lo que quieras con la respuesta del servidor
       
        alert('Recarga exitosa');
      }
     const  onRechargeError=(error) =>{
        console.log(amount)
        console.log('hola2',error); // Aquí puedes hacer lo que quieras con el error
        alert('Hubo un error en la recarga');
      }
  const stripe = useStripe();
  const elements = useElements();

  const [amount, setAmount] = useState(0);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { token, error } = await stripe.createToken(cardElement);

    if (error) {
      onRechargeError(error.message);
      return;
    }
    // headers:{
    //     'Content-Type':'application/json',
    //     'Authorization':'Bearer '+ String(authTokens.access)
    //   }
    const response = await fetch('http://localhost:8000/api/recharge_wallet/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({ amount: amount, stripeToken: token.id, 
    user:user}),
    });

    const data = await response.json();

    if (data.success) {
      onRechargeSuccess(data);
    } else {
      onRechargeError(data.error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
      <CardElement />
      <button type="submit">Recharge</button>
    </form>
  );
};

export default RechargeForm;
