import React from 'react'

import  { useState } from 'react';
import { useStripe,useElements,CardElement } from '@stripe/react-stripe-js';
// import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

export const Test = () => {  
    const [email, setEmail] = useState('');
  const [product, setProduct] = useState({
    name: 'Product Name',
    price: 100,
    currency: 'EUR',
  });
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Crea el token de Stripe
    const { error, token } = await stripe.createToken(elements.getElement(CardElement), {
      email,
    });

    if (error) {
      console.log(error);
    } else {
      console.log(token);

      // Enviar el token al backend
      try {
        const response = await fetch("http://localhost:8000/api/charge/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            product,
            stripeToken: token.id,
          }),
        });
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleProductChange = (event) => {
    setProduct({
      ...product,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input type="email" value={email} onChange={handleEmailChange} />
      </label>
      <br />
      <label>
        Product Name:
        <input type="text" name="name" value={product.name} onChange={handleProductChange} />
      </label>
      <br />
      <label>
        Price:
        <input type="number" name="price" value={product.price} onChange={handleProductChange} />
      </label>
      <br />
      <label>
        Currency:
        <select name="currency" value={product.currency} onChange={handleProductChange}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
        </select>
      </label>
      <br />
      
        <div>
        Card Details:
        <CardElement />
        </div>
      
      <br />
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
    </form>
  );

  }

