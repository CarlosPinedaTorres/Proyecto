import { useState,useContext } from 'react';
import axios from 'axios';
import { Footer } from '../Footer/Footer';
import { Contexto } from '../../Context/Contexto';
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
const {}=useContext(Contexto)
  return (
    
    <>
    
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
  <div className="mb-4">
    <label
      htmlFor="customer-email"
      className="block text-gray-700 text-sm font-bold mb-2"
    >
      Email del cliente:
    </label>
    <input
      id="customer-email"
      type="email"
      value={customerEmail}
      onChange={(event) => setCustomerEmail(event.target.value)}
      required
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    />
  </div>
  <div className="mb-4">
    <label
      htmlFor="product-name"
      className="block text-gray-700 text-sm font-bold mb-2"
    >
      Nombre del producto:
    </label>
    <input
      id="product-name"
      type="text"
      value={productName}
      onChange={(event) => setProductName(event.target.value)}
      required
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    />
  </div>
  <div className="mb-4">
    <label
      htmlFor="product-description"
      className="block text-gray-700 text-sm font-bold mb-2"
    >
      Descripción del producto:
    </label>
    <textarea
      id="product-description"
      value={productDescription}
      onChange={(event) => setProductDescription(event.target.value)}
      required
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-24"
    />
  </div>
  <div className="mb-6">
    <label
      htmlFor="product-price"
      className="block text-gray-700 text-sm font-bold mb-2"
    >
      Precio del producto:
    </label>
    <input
      id="product-price"
      type="number"
      value={productPrice}
      onChange={(event) => setProductPrice(event.target.value)}
      required
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    />
  </div>
  <div className="flex items-center justify-between">
    <button
      type="submit"
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    >
      Pagar
    </button>
  </div>

</form>

</>
  );
};
