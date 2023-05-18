import React, { useState } from 'react';
import { LinkAuthenticationElement,CardElement, useStripe, useElements,Elements,PaymentElement,CardNumberElement,CardCvcElement,CardExpiryElement} from '@stripe/react-stripe-js';
import { useContext} from "react";
import { Contexto } from "../../Context/Contexto";
import { loadStripe } from '@stripe/stripe-js';
import "../../Estilos/Juegos.css"
import {Navbar} from "../Navbar"
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
 <div className=" vh-100 d-flex justify-content-center align-items-center">
      
    <form onSubmit={handleSubmit} className='payment-form formPay'>
    <div className="form-group mb-3">
      <h1>RECHARGE WALLET</h1>
    </div>
      <div className="form-group">
      <label>Bienvenido YIblack</label>
    </div>
    <div className="form-group mb-3">
    <label htmlFor="amount">Amount to send: </label>
    <input type="number" id="amount" value={amount} onChange={(e) => setAmount(e.target.value)}  className='form-control'/>
  </div>
  <div className="form-group mb-3">
  <label htmlFor="card-number">Card Number:</label>
  <div className="input-group d-flex justify-content-center">
    <div className="input-group-prepend mb-3">
      <span className="input-group-text mb-3">
        METHOD OF PAY: 
        <img src="https://img.icons8.com/color/48/000000/visa.png" alt="Visa"  />
      </span>
    </div>
    </div>
    <div id="card-number" className="form-control mb-3">
    <CardNumberElement options={{ style: { base: { fontSize: '16px' } } }} />
    </div>
  
</div>
  <div className="form-group mb-3">
    <label htmlFor="expiry">Expiry Date:</label>
    <div id="expiry" className="card-expiry form-control" >
      <CardExpiryElement />
    </div>
  </div>
  <div className="form-group mb-3">
    <label htmlFor="cvc">CVC:</label>
    <div id="cvc" className="card-cvc form-control">
      <CardCvcElement />
    </div>
  </div>
  <button type="submit" className="pay-button buttonPay">
    Pay
  </button>
    </form>
    </div>
    
    {/* este */}
  {/* <CardNumberElement />


  <CardExpiryElement />


  <CardCvcElement /> */}

      {/* <box   css={{
  stack: 'x',
  gap: 'medium',
  alignX: 'start',
  }}>
      <CardElement  options={{
    iconStyle: "solid",
    style: {
      base: {
        fontSize: '16px',
        color: '#424770',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#9e2146',
      },
    },
    placeholder: 'Número de tarjeta',
  }
    
    
       } /></box> */}

 
  {/* </form> */}

      
  
     
  
    {/* <button id="submit-payment" className="btn btn-primary">Pagar</button> */}
 
  </>
       
  );
};

export default RechargeForm;
