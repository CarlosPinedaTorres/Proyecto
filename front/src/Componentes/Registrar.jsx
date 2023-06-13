import React from "react";
import { Contexto} from "../Context/Contexto";
import { useContext,useState ,useRef} from "react";
import { NavLink } from "react-router-dom";
import {Navbar} from "./Navbar"
import { Footer } from "./Footer/Footer";
export const Registrar = () => {
  const [nombreValido, setNombreValido] = useState(false);
  const [mensajeError, setMensajeError] = useState('');
  const password1=useRef()
  const confirmPassword=useRef()
  const {Registrar}=useContext(Contexto)
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [coincide, setCoincide] = useState(true)
  const [contraseñaSegura, setContraseñaSegura] = useState(false)
  const [campoTocado, setCampoTocado] = useState(false)
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
const [emailValido, setEmailValido] = useState(false)
const [emailTocado, setEmailTocado] = useState(false);

  const handleUsernameChange = (event) => {
    const value = event.target.value;
    setUsername(value);
    const nombreValido = value.trim() !== ''; // Verifica si el campo de nombre no está vacío
    setNombreValido(nombreValido);
  };

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
    const email_valido = value.trim() !== ''; // Verifica si el campo de nombre no está vacío
    setEmailValido(email_valido);
    setEmailTocado(true); // Establece el estado emailTocado directamente
  };
  const handlePasswordChange = (event) => {
    if (event.target.name === 'password') {
      setPassword(password1.current.value);
      if (password2 === password1.current.value) {
        setCoincide(false);
      } else {
        setCoincide(true);
      }
      // Validar seguridad de la contraseña
      if (password1.current.value.length < 8) {
        // La contraseña es demasiado corta
        setContraseñaSegura(false);
      } else {
        // La contraseña es lo suficientemente larga
        setContraseñaSegura(true);
      }
    }
  
    if (event.target.name === 'password2') {
      setPassword2(confirmPassword.current.value);
      if (confirmPassword.current.value === password) {
        setCoincide(false);
      } else {
        setCoincide(true);
      }
    }
    
  };


  const handlePasswordFocus = () => {
    setCampoTocado(true);
  };
  
  const handlePasswordBlur = () => {
    setCampoTocado(false);
  };
  
  const handlePassword2Focus = () => {
    setCampoTocado(true);
  };
  
  const handlePassword2Blur = () => {
    setCampoTocado(false);
  };

  const handleRegistrar = (e) => {
    e.preventDefault();
  
    // Verifica si todos los campos están vacíos
    if (!nombreValido || !emailValido || !contraseñaSegura || coincide) {
      setMensajeError('Por favor, asegúrate de que todos los campos estén completados correctamente.');
    } else {
      // Llama a la función Registrar del proveedor si todos los campos están completados correctamente
      Registrar(e);
      setMensajeError(''); // Limpia el mensaje de error si todo está bien
    }
  };
  return (
    <>
    <Navbar/>
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
  <div className="max-w-md w-full space-y-8">
    <div>
      <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Bienvenido a GamesMasters</h2>
      <p className="mt-2 text-center text-sm text-gray-600">¡Por favor introduce tu correo, nombre de usuario y contraseña!</p>
    </div>
    <form onSubmit={handleRegistrar} className="mt-8 space-y-6">
      <div className="rounded-md shadow-sm -space-y-px">
        <div>
          <label htmlFor="email" className="sr-only">Email</label>
          <input
  type="text"
  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
  name="email"
  placeholder="Email"
  onChange={handleEmailChange}

/>{emailTocado && !emailValido && (
  <p className="text-red-600 text-sm">El campo de email no puede estar vacío.</p>
)}        </div>
        <div>
          <label htmlFor="username" className="sr-only">Username</label>
          <input type="text" className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" name="username" placeholder="Username" onChange={handleUsernameChange} />
        </div>
        <div>
          <label htmlFor="password" className="sr-only">Password</label>
          <input type="password" className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" ref={password1} name="password" placeholder="*******" onChange={handlePasswordChange} onFocus={handlePasswordFocus} onBlur={handlePasswordBlur} />
          {campoTocado && !contraseñaSegura && (
            <p className="text-red-600 text-sm">La contraseña debe tener al menos 8 caracteres.</p>
          )}
        </div>
        <div>
          <label htmlFor="password" className="sr-only">ConfirmPassword</label>
          <input
            type="password"
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            ref={confirmPassword}
            name="password2"
            placeholder="*******"
            onChange={handlePasswordChange}
            onFocus={handlePassword2Focus}
            onBlur={handlePassword2Blur}
          />
          {campoTocado && coincide && (
            <p className="text-red-600 text-sm">Las contraseñas no coinciden.</p>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm">
          <NavLink to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
            ¿Ya tienes una cuenta? Login
          </NavLink>
        </div>
      </div>

      <div>
  <button
    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    type="submit"
  >
    Sing up
  </button>
  {mensajeError && (
    <p className="text-red-600 text-sm mt-2">{mensajeError}</p>
  )}
</div>
    </form>
  </div>
</div>
    <Footer/>
    </>
  );
};
