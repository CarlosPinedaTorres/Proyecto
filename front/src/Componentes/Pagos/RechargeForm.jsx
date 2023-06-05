import React, { useState } from 'react';
import { LinkAuthenticationElement,CardElement, useStripe, useElements,Elements,PaymentElement,CardNumberElement,CardCvcElement,CardExpiryElement} from '@stripe/react-stripe-js';
import { useContext} from "react";
import { Contexto } from "../../Context/Contexto";
import { loadStripe } from '@stripe/stripe-js';
import "../../Estilos/Juegos.css"
import {Navbar} from "../Navbar"
import { Footer } from '../Footer/Footer';
const stripePromise = loadStripe('pk_test_51N6e2ZLomp5j2gtnuPLFhR6cQ8uLeFlTQvjtRll6xUyZoDFHQUw7aHtWsDaZQMmOyriBKEGcLtMcqhQpJXGY8cna00AQpIlIrm');

const RechargeForm = () => {

    const {user} = useContext(Contexto);
    const onRechargeSuccess=(response)=> {
        console.log(response); // Aquí puedes hacer lo que quieras con la respuesta del servidor
       
        alert('Recarga exitosa');
      }
     const  onRechargeError=(error) =>{
        console.log(amount)
        console.log(error); // Aquí puedes hacer lo que quieras con el error
        alert('Hubo un error en la recarga.Revisa que todos los campos esten rellenados correctamente, y de mandar una cantidad valida');
      }
  const stripe = useStripe();
  const elements = useElements();

  const [amount, setAmount] = useState(0);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardNumberElement),
    });

    if (error) {
      alert( error.message);
    } else {
      console.log('[PaymentMethod]', paymentMethod);
    }
 
    const response = await fetch('http://localhost:8000/api/recharge_wallet/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({ amount: amount, 
        paymentMethodId: paymentMethod.id, 
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
  
         <>

 <Navbar/>
 <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
  <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
    <div className="mb-4">
      <h1 className="font-bold text-xl mb-2">RECHARGE WALLET</h1>
    </div>
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        Bienvenido YIblack
      </label>
    </div>
    <div className="mb-4">
      <label htmlFor="amount" className="block text-gray-700 text-sm font-bold mb-2">
        Amount to send:
      </label>
      <input
        type="number"
        id="amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>
    <div className="mb-4">
      <label htmlFor="card-number" className="block text-gray-700 text-sm font-bold mb-2">
        Card Number:
      </label>
      <div className="flex items-center justify-center mb-2">
        <span className="mr-2">METHOD OF PAY:</span>
        <img src="https://img.icons8.com/color/48/000000/visa.png" alt="Visa" />
      </div>
      <div id="card-number" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
        <CardNumberElement options={{ style: { base: { fontSize: '16px' } } }} />
      </div>
    </div>
    <div className="mb-4">
      <label htmlFor="expiry" className="block text-gray-700 text-sm font-bold mb-2">
        Expiry Date:
      </label>
      <div id="expiry" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
        <CardExpiryElement />
      </div>
    </div>
    <div className="mb-6">
      <label htmlFor="cvc" className="block text-gray-700 text-sm font-bold mb-2">
        CVC:
      </label>
      <div id="cvc" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
        <CardCvcElement />
      </div>
    </div>
    <div className="flex items-center justify-center">
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Recargar Wallet
      </button>
    </div>
  </form>
</div>
  
 <Footer/>
  </>
       
  );
};

export default RechargeForm;
