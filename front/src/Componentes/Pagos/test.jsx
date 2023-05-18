import { useState } from 'react';
import axios from 'axios';

export const Test = () => {  
  const [customerEmail, setCustomerEmail] = useState('');
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const amount = parseInt(productPrice) * 100; // Convertir a centavos
    const currency = 'usd';
    const data = {
      customer_email: customerEmail,
      product_name: productName,
      product_description: productDescription,
      product_price: productPrice,
      amount: amount,
      currency: currency,
    };
    try {
      const response = await axios.post('/api/payment-intent/', data);
      const clientSecret = response.data.client_secret;
      // Aquí podrías utilizar Stripe.js para crear la sesión de pago personalizado
      // y redirigir al cliente a la página de pago.
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="customer-email">Email del cliente:</label>
        <input
          id="customer-email"
          type="email"
          value={customerEmail}
          onChange={(event) => setCustomerEmail(event.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="product-name">Nombre del producto:</label>
        <input
          id="product-name"
          type="text"
          value={productName}
          onChange={(event) => setProductName(event.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="product-description">Descripción del producto:</label>
        <textarea
          id="product-description"
          value={productDescription}
          onChange={(event) => setProductDescription(event.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="product-price">Precio del producto:</label>
        <input
          id="product-price"
          type="number"
          value={productPrice}
          onChange={(event) => setProductPrice(event.target.value)}
          required
        />
      </div>
      <button type="submit">Pagar</button>
    </form>
  );
};
