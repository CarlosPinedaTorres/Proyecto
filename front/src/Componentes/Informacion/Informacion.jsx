import React from 'react'
import { useContext,useEffect,useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Navbar } from '../Navbar'
import { Footer } from '../Footer/Footer'
import { Dialog, Transition } from '@headlessui/react';
import { Button as MuiButton,Modal} from '@mui/material';
import { Contexto } from '../../Context/Contexto'
export const Informacion = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  console.log('aqui,info')
    const {user,ObtainAccount,account,handleMyGamesClick ,logoutUser,obtain_money_wallet, myMoney} = useContext(Contexto);

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
      navigate("/createuserstripe")
    }
    const goPays = () => {
      navigate("/mypays")
    }
    const navigate=useNavigate()
  return (
    <>
    <Navbar handleModalOpen={handleModalOpen} visto={visto} />
    <div className="container mx-auto p-4 h-screen flex flex-col justify-center">
    <div className="bg-gray-100 rounded-lg shadow-lg p-6 mb-4">
            <h1 className="text-2xl font-bold mb-4 ">¿Cómo poder crear un juego?</h1>
            <p className="text-gray-800">
                En primer lugar deberas crearte una cuenta como cliente nuestro en Stripe, relleneando el formulario correspondiente con los datos que se requieren.
                Una vez crees una cuenta en stripe ya podremos gestionar tus pagos, y se te creara en nuestra pagina una wallet a la cual podras añadir dinero.
            </p>
        </div>
        <div className="bg-gray-100 rounded-lg shadow-lg p-6 mb-4">
            <h1 className="text-2xl font-bold mb-4 ">¿Cómo ingresar dinero?</h1>
            <p className="text-gray-800">
                Una vez hayas creado tu cuenta en stripe y tengas una wallet, podras realizar un ingreso, desde nuestro funcion 'ingresar dinero', donde una vez hagas un ingreso,
                lo veremos reflejado en tu cuenta de stripe, y tu podras verlo reflejado en tu wallet, ademas de verlo reflejado en el apartado de "Mis pagos" en tu cuenta.
            </p>
        </div>
        <div className="bg-gray-100 rounded-lg shadow-lg p-6">
            <h1 className="text-2xl font-bold mb-4 ">¿Como crear venta de llaves de juegos?</h1>
            <p className="text-gray-800">
                Al momento de crear un juego, como empresa que te proporciona nuestra plataforma de publicación, nos quedaremos con el
                10% del total ganado por el total de la venta. Por ejemplo, si vendes 100 llaves a $1 cada una, nos quedaremos con $10 de esos 100$.
            </p>
        </div>

        <div className="bg-gray-100 rounded-lg shadow-lg p-6 mt-4">
            <h1 className="text-2xl font-bold mb-4">¿Como funciona la venta de llaves de juegos?</h1>
            <p className="text-gray-800">
                Si compras llaves de juegos, debes tener en cuenta los siguientes puntos:
            </p>
            <ul className="list-disc ml-6 mt-2 text-gray-800">
                <li>El proceso de venta de llaves no se llevará a cabo hasta que todas las llaves vendidas de dicho juego hayan alcanzado 0.</li>
                <li>El precio de venta será determinado por todos los participantes en la compra, mediante una media proporcional basada en la
                    cantidad comprada. Quien compre mas llaves tendrá mas poder de decisión sobre el precio mínimo de venta</li>
               
                    
            </ul>
            <p>Las llaves se venderán al precio de mercado:</p>
                   
            <ul className='list-disc ml-6 mt-2 text-gray-800'>
                  <li> Se venderan una vez el precio de mercado sea igual o mayor al precio minimo de venta calculado anterioremente.</li>
                  <li>En caso de que en un un máximo de 6 meses no se hayan conseguido vender a dicho precio deseado se venderan por el precio de mercado actual, obtengas o no beneficios.</li>
          </ul>
          <p>Una vez se vendan las llaves se ingresara el dinero correspondiente de las ventas a tu wallet.</p>
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
</>
  )
}
