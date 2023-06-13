import React from 'react'
import { useContext, useEffect, useState } from "react";
import Select from 'react-select';
import { Contexto } from "../../Context/Contexto";
import { Navbar } from '../Navbar';
import { Footer } from '../Footer/Footer';
import { Dialog, Transition } from '@headlessui/react';
import { Button as MuiButton,Modal} from '@mui/material';
import { useNavigate} from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const TestCreateUser = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const { user,ObtainAccount,account,handleMyGamesClick ,logoutUser } = useContext(Contexto);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedCurrency, setSelectedCurrency] = useState('');
  const clientSecret = 'sk_test_51N6e2ZLomp5j2gtn09duzxYVkrz9mkuct9TaAzzzhT1PvlQoltWoAu6ny50GmqMZL6GsR8fYY5AuI0b2ONH0vYfV00Ph9vKMyL'
  

  const handleCountryChange = (selectedOption) => {
    setSelectedCountry(selectedOption);
    setSelectedCurrency(selectedOption.currency);
  };

  const countries = [
    { value: 'es', label: 'España', currency: 'EUR' },
    { value: 'us', label: 'Estados Unidos', currency: 'USD' },

  ];
  const [email, setEmail] = useState('')
  const emailUser = async (id_user) => {

    const response = await fetch(`${apiUrl}getEmailUser/${id_user}/`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await response.json();
    console.log(data)
    setEmail(data)
  }
  const handleSubmit = async (event) => {
    event.preventDefault()
    const response = await fetch(`${apiUrl}api/userStripe/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user: user,
        'name': event.target.name.value,
        'email': event.target.email.value,
        'phone': event.target.phone.value,
        'pais': event.target.pais.value,
        'ciudad': event.target.city.value,
        'calle': event.target.calle.value,
        'cp': event.target.CP.value,
        'currency': selectedCurrency,
      }),
    });

    const data = await response.json();
    if (response.status === 200) {
      toast.success('Se ha creado correctamente tu cuenta de stripe', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000, // Duración de la notificación en milisegundos
        hideProgressBar: true, // Ocultar barra de progreso
        className: 'bg-white-500 text-black font-medium rounded-md shadow-lg p-4',
        bodyClassName: 'text-sm',
        progressClassName: 'bg-green-200',
      });
      navigate("/mygames")
    } else {
      toast.error('Ocurrio un error al crear la cuenta', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000, // Duración de la notificación en milisegundos
        hideProgressBar: true, // Ocultar barra de progreso
        className: 'bg-red-500 text-white font-medium rounded-md shadow-lg p-4',
        bodyClassName: 'text-sm',
        progressClassName: 'bg-red-200',
      });
    }
    console.log(data)
  }
  useEffect(() => {
    emailUser(user['user_id'])
  
 
  }, [])
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


  
const goPays = () => {
  navigate("/mypays")
}
  const goStripeMoney = () => {
    navigate("/test1")
  }
  const goStripe=()=>{
    navigate("/create-user-stripe")
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
                Mi cuenta
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
            </MuiButton>
              }
              {account.wallet &&
                <MuiButton onClick={()=>goStripeMoney()} className="w-full mb-2 text-lg" style={{ fontSize: '18px' }}>
               Ingresar Dinero
            </MuiButton>
              }
           
              <MuiButton onClick={handleMyGamesClick} className="w-full mb-2 text-lg" style={{ fontSize: '18px' }}>
                Mis juegos
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
  <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-2xl">
    <form onSubmit={handleSubmit} className="mb-3 mt-4">
      <h2 className="font-bold text-2xl mb-2 text-uppercase">Crear Cuenta en Stripe</h2>
      <p className="mb-5">Please enter your information here!</p>
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
          Introduce tu nombre:
        </label>
        <input
          type="text"
          name="name"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        
          value={user['username'] ? user['username'] : ''
          }

        />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
          Email
        </label>
        <input
          type="text"
          name="email"
          value={email.email}
          placeholder="Email"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">
          Telefono
        </label>
        <input

          type="text"
          required
          name="phone"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <Select
          options={countries}
          value={selectedCountry}
          onChange={handleCountryChange}
          placeholder="Selecciona un país"
          name="pais"
          required
          className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        {selectedCurrency && <p>Moneda seleccionada: {selectedCurrency}</p>}
      </div>
      <div className="mb-4">
        <label htmlFor="city" className="block text-gray-700 text-sm font-bold mb-2">
          Ciudad
        </label>
        <input
          type="text"
          required
          name="city"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="calle" className="block text-gray-700 text-sm font-bold mb-2">
          Calle:
        </label>
        <input
          required
          type="text"
          name="calle"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="CP" className="block text-gray-700 text-sm font-bold mb-2">
          Codigo Postal:
        </label>
        <input
          required
          type="text"
          name="CP"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="flex items-center justify-center">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Crear Usuario
        </button>
      </div>
    </form>
  </div>
</div>
     

     <Footer/>
    </>
  )
}
