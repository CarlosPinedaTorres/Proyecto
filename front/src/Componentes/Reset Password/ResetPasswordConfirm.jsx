
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
const ResetPasswordConfirm = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate=useNavigate()
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const { uidb64, token } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 8) {
      setMessage("Password must be at least 8 characters long.");
        toast.error('La contraseña debe de ser mínimo de 8 digitos', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000, // Duración de la notificación en milisegundos
        hideProgressBar: true, // Ocultar barra de progreso
        className: 'bg-red-500 text-white font-medium rounded-md shadow-lg p-4',
        bodyClassName: 'text-sm',
        progressClassName: 'bg-red-200',
      });
    }

    else if (password !== confirmPassword) {
      setMessage("Las contraseñas no coinciden");
    
      toast.error('Las contraseñas no coinciden.', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000, // Duración de la notificación en milisegundos
      hideProgressBar: true, // Ocultar barra de progreso
      className: 'bg-red-500 text-white font-medium rounded-md shadow-lg p-4',
      bodyClassName: 'text-sm',
      progressClassName: 'bg-red-200',
    });
    }else{

    try {
      const response = await axios.post(
        `${apiUrl}reset-password/confirm/${uidb64}/${token}/`,
        { password, confirm_password: confirmPassword }
      );
      setMessage(response.data.message);
      console.log('data',uidb64,token)
      toast.success('Contraseña cambiada correctamente', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000, 
        hideProgressBar: true, 
        className: 'bg-white-500 text-black font-medium rounded-md shadow-lg p-4',
        bodyClassName: 'text-sm',
        progressClassName: 'bg-green-200',
      });
      navigate('/login')
    } catch (err) {
      console.log(err);
      toast.error('Ha ocurrido un problema al realizar el proceso de reseteo de contraseña, por favor vuelva a introducir su correo.', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000, 
        hideProgressBar: true, 
        className: 'bg-red-500 text-black font-medium rounded-md shadow-lg p-4',
        bodyClassName: 'text-sm',
        progressClassName: 'bg-red-200',
      });
      navigate('/resetPassword')
      
    }
  };
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-md w-full space-y-8">
      <div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Cambiar contraseña
        </h2>
      </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="password" className="sr-only">
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Nueva contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="confirm-password" className="sr-only">
                Confirmar contraseña
              </label>
              <input
                id="confirm-password"
                name="confirm-password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Confirma la nueva contraseña"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>
       
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M2.293 7.293a1 1 0 011.414 0L10 13.586l6.293-6.293a1 1 0 011.414 1.414l-7 7a1 1 0 01-1.414 0l-7-7a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </span>
              Cambiar contraseña
            </button>
          </div>
        </form>
      
    </div>
  </div>
  );
};

export default ResetPasswordConfirm;