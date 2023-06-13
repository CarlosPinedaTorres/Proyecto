import React from 'react'
import { useState,useContext,useEffect } from 'react'
import { Contexto } from '../../Context/Contexto'
import { Navbar } from '../Navbar'
import { Footer } from '../Footer/Footer'
import { Dialog, Transition } from '@headlessui/react';
import { useNavigate} from "react-router-dom";
import { Button as MuiButton,Modal} from '@mui/material';
import { NameGame } from './NameGame'
import { parseISO, compareAsc,compareDesc } from 'date-fns';
export const MisPagos = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  console.log('aqui,mis pagos')
    const {user,check_visto,ObtainAccount,account,handleMyGamesClick ,logoutUser,obtain_money_wallet, myMoney}=useContext(Contexto)

    const [pays, setPays] = useState([])
    const myPays=async()=>{
    let response = await fetch(`${apiUrl}getMyPays/${user['user_id']}/`, {

      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }

    })
    let data = await response.json()
   

    setPays(data)
    console.log('aqui',data)
    }

    useEffect(() => {
        myPays()
        check_visto(user['user_id'])
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
useEffect(() => {
  if(user){
    obtain_money_wallet(user['user_id'])
    }
}, [])

const determineStyle = (pago) => {
  if (pago.visto === false) {
    return "bg-white shadow-md rounded-lg px-6 py-4";
  } else {
    return "bg-gray-200 shadow-md rounded-lg px-6 py-4";
  }
};
const goPays = () => {
  navigate("/mypays")
}
  const goStripeMoney = () => {
    navigate("/test1")
  }
  const goStripe=()=>{
    navigate("/createuserstripe")
  }
  const navigate=useNavigate()

  const renderContent = (pago) => {
    if (pago.tipo === 'Recargar Wallet') {
      return (
        <>
          <div className="text-xl font-bold">{pago.tipo}</div>
          <p className="text-gray-700 text-base">Has ingresado dinero a tu wallet</p>
          <div className="mt-2">
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
              Monto: {pago.precio}
            </span>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
              Fecha: {pago.fecha}
            </span>

          </div>
        </>
      );
    } else if (pago.tipo==='Compra de llaves') {

      // Retorna el contenido alternativo cuando `pago.tipo` no es 'Recargar Wallet'
      return (
        <>
             <div className="text-xl font-bold">{pago.tipo}</div>
          <p className="text-gray-700 text-base">Has comprado llaves de un juego  </p>
          <div className="mt-2">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
              <NameGame id_juego={pago.id_juego} />
            </span>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
              Monto: {pago.precio}
            </span>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
              Fecha: {pago.fecha}
            </span>
           
          </div>
        </>
      );
    }else if(pago.tipo==='Venta llaves'){
      return (
        <>
        <div className="text-xl font-bold">{pago.tipo}</div>
     <p className="text-gray-700 text-base">Se han comprado llaves de tu juego</p>
     <div className="mt-2">
     <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
         <NameGame id_juego={pago.id_juego} />
       </span>
       <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
         Monto: {pago.precio}
       </span>
       <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
         Fecha: {pago.fecha}
       </span>
      
     </div>
   </>
        )
    }else if(pago.tipo==='Llaves vendidas'){
      return (
        <>
        <div className="text-xl font-bold">{pago.tipo}</div>
     <p className="text-gray-700 text-base">Se han vendido las llaves de un juego en el que invertiste</p>
     <div className="mt-2">
     <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
         <NameGame id_juego={pago.id_juego} />
       </span>
       <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
         Monto: {pago.precio}
       </span>
       <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
         Fecha: {pago.fecha}
       </span>
      
     </div>
   </>
        )
    }else if(pago.tipo==='Crear Juego'){
      return (
        <>
        <div className="text-xl font-bold">{pago.tipo}</div>
     <p className="text-gray-700 text-base">Has publicado llaves de un juego</p>
     <div className="mt-2">
       <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
         Monto: {pago.precio}
       </span>
       <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
         Fecha: {pago.fecha}
       </span>
      
     </div>
   </>)
    }
  };
  return (
    <>

<Navbar handleModalOpen={handleModalOpen} visto={visto} />
 <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
  <div className="w-full max-w-2xl">
    <h2 className="font-bold text-2xl mb-4">Tus Pagos</h2>
    <ul className="space-y-4">
    {pays.length>0 ?
    pays
    .sort((a, b) => {
      if (a.visto === b.visto) {
        if (a.visto === true && b.visto === true) {
          // Ordenar por fecha en orden descendente si ambos vistos son falsos
          const dateA = parseISO(a.fecha);
          const dateB = parseISO(b.fecha);
          return compareDesc(dateA, dateB);
        } else {
          return 0;
        }
      } else if (a.visto === false) {
        return -1;
      } else {
        return 1;
      }
    })
      .map((pago) => (
        <li key={pago.id} className={determineStyle(pago)}>
          {renderContent(pago)}
        </li>
      )):(
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-400 text-lg">No tienes pagos</p>
        </div>)}
    </ul>
  </div>
</div>
<Footer/>


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

{/* Llaves vendidas */}
    </>
  )
}
