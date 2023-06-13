import React, { useState,useEffect } from 'react';
import {  useStripe, useElements,CardNumberElement,CardCvcElement,CardExpiryElement} from '@stripe/react-stripe-js';
import { useContext} from "react";
import { Contexto } from "../../Context/Contexto";
import { loadStripe } from '@stripe/stripe-js';
import { Dialog, Transition } from '@headlessui/react';
import {Navbar} from "../Navbar"
import { Footer } from '../Footer/Footer';
import { Button as MuiButton,Modal} from '@mui/material';
import {useNavigate} from "react-router-dom";
const stripePromise = loadStripe('pk_test_51N6e2ZLomp5j2gtnuPLFhR6cQ8uLeFlTQvjtRll6xUyZoDFHQUw7aHtWsDaZQMmOyriBKEGcLtMcqhQpJXGY8cna00AQpIlIrm');
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const RechargeForm = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
    const {user,ObtainAccount,account,handleMyGamesClick ,logoutUser,obtain_money_wallet, myMoney} = useContext(Contexto);
    const onRechargeSuccess=(response)=> {
        console.log(response); // Aquí puedes hacer lo que quieras con la respuesta del servidor
       
        toast.success('Se ha recargado correctamente tu wallet', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000, // Duración de la notificación en milisegundos
          hideProgressBar: true, // Ocultar barra de progreso
          className: 'bg-green-500 text-white font-medium rounded-md shadow-lg p-4',
          bodyClassName: 'text-sm',
          progressClassName: 'bg-green-200',
        });
        navigate("/mygames")
      }
     const  onRechargeError=(error) =>{
     
        toast.error('Debes introducir un importe válido', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000, // Duración de la notificación en milisegundos
          hideProgressBar: true, // Ocultar barra de progreso
          className: 'bg-red-500 text-white font-medium rounded-md shadow-lg p-4',
          bodyClassName: 'text-sm',
          progressClassName: 'bg-red-200',
        });
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
      toast.error(error.message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000, // Duración de la notificación en milisegundos
        hideProgressBar: true, // Ocultar barra de progreso
        className: 'bg-red-500 text-white font-medium rounded-md shadow-lg p-4',
        bodyClassName: 'text-sm',
        progressClassName: 'bg-red-200',
      });
    } else {
      console.log('[PaymentMethod]', paymentMethod);
    }
 
    const response = await fetch(`${apiUrl}api/recharge_wallet/`, {
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

  const [modalOpen, setModalOpen] = useState(false);


  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };
  const [visto, setVisto] = useState(false);
  const ObtainInfoLog = async (id_user) => {
    try {
      let response = await fetch(`${apiUrl}getInfoLogueado/${id_user}/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      let data = await response.json();
  
      console.log(data.noVisto); // Verifica que el valor de data.noVisto sea correcto
  
  
      setVisto(data.noVisto);
  
    } catch (error) {
      console.log('Error en la solicitud:', error);
    }
  };
  useEffect(() => {
    if(user){
      ObtainInfoLog(user['user_id'])
    }
  
  }, [])
  useEffect(() => {
    if(user){
      ObtainAccount(user['user_id']);
    }
  }, [])
useEffect(() => {
  if(user){
    obtain_money_wallet(user['user_id'])
    }
}, [])

  
  
  const goStripeMoney = () => {
    navigate("/test1")
  }
  const goStripe=()=>{
    navigate("/create-user-stripe")
  }
  const goPays = () => {
    navigate("/mypays")
  }
  const navigate=useNavigate()
  return (
  
         <>
<Transition appear show={modalOpen} as={React.Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={handleModalClose}
      >
        <div className="min-h-screen px-4 text-center">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-lg rounded-md">
            <div className="modal-content">
              <h3 className="modal-title text-center text-2xl font-semibold mb-4">
                My Account
              </h3>
              {account.wallet ? (
                <MuiButton className="w-full mb-2 text-lg" style={{ fontSize: '18px' }}>
                  Wallet: {myMoney}
                </MuiButton>
              ) : (
                <MuiButton className="w-full mb-2 text-lg" style={{ fontSize: '18px' }} onClick={goStripe}>
                  Crear user en stripe
                </MuiButton>
              )}
               {account.wallet &&
                <MuiButton onClick={()=>goPays()} className="w-full mb-2 text-lg" style={{ fontSize: '18px' }}>
                Mis pagos
                {visto && (
                  <span className="ml-2 bg-red-500 text-red-500 text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    ●
                  </span>
                )}
            </MuiButton>
              }
              {account.wallet &&
                <MuiButton onClick={()=>goStripeMoney()} className="w-full mb-2 text-lg" style={{ fontSize: '18px' }}>
               Ingresar Dinero
            </MuiButton>
              }
           
              <MuiButton onClick={handleMyGamesClick} className="w-full mb-2 text-lg" style={{ fontSize: '18px' }}>
                My Games
              </MuiButton>
              <MuiButton onClick={logoutUser} className="w-full mb-2 text-lg" style={{ fontSize: '18px' }}>
                Logout
              </MuiButton>
              <MuiButton onClick={handleModalClose} className="w-full mb-2 text-lg" style={{ fontSize: '18px' }}>
                Cerrar Modal
              </MuiButton>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
    <Navbar handleModalOpen={handleModalOpen} visto={visto} />
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
