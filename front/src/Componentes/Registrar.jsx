import React from "react";
import { Contexto} from "../Context/Contexto";
import { useContext,useState ,useRef} from "react";
import { NavLink } from "react-router-dom";
import {Navbar} from "./Navbar"
export const Registrar = () => {
  const [nombreValido, setNombreValido] = useState(false);

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
  return (
    <>
    <Navbar/>
      <div className=" vh-100 d-flex justify-content-center align-items-center">
  <div className="container">
    <div className="row d-flex justify-content-center">
      <div className="col-12 col-md-8 col-lg-6">
        <div className="border border-3 border-primary"></div>
        <div className="card bg-white shadow-lg">
          <div className="card-body p-5">
            <form  onSubmit={Registrar} className="mb-3 mt-md-4">
              <h2 className="fw-bold mb-2 text-uppercase ">Welcome to GamesMasters</h2>
              <p className=" mb-5">Please enter your login,password and email!</p>
              <div className="mb-3">
                <label htmlFor="email" className="form-label ">Email</label>
                <input type="text" className="form-control" name="email" placeholder="Email" onChange={handleEmailChange} />
              </div>
              <div className="mb-3">
                <label htmlFor="username" className="form-label ">Username</label>
                <input type="text" className="form-control" name="username" placeholder="Username"  onChange={handleUsernameChange}/>
              </div>
              <div className="mb-3">
  <label htmlFor="password" className="form-label">Password</label>
  <input type="password" className="form-control" ref={password1} name="password" placeholder="*******" onChange={handlePasswordChange} onFocus={handlePasswordFocus} onBlur={handlePasswordBlur} />
  {campoTocado && !contraseñaSegura && (
    <p className="text-danger">La contraseña debe tener al menos 8 caracteres.</p>
  )}
</div>

<div className="mb-3">
  <label htmlFor="password" className="form-label">ConfirmPassword</label>
  <input
    type="password"
    className="form-control"
    ref={confirmPassword}
    name="password2"
    placeholder="*******"
    onChange={handlePasswordChange}
    onFocus={handlePassword2Focus} // Nuevo evento onFocus
    onBlur={handlePassword2Blur} // Nuevo evento onBlur
  />
  {campoTocado && coincide && (
    <p className="text-danger">Las contraseñas no coinciden.</p>
  )}
</div>
              {/* <p className="small"><a className="text-primary" href="forget-password.html">Forgot password?</a></p> */}
              <div className="d-grid">
              <button className="btn btn-outline-dark" type="submit" disabled={coincide  ||!contraseñaSegura || !nombreValido || !emailValido}>Sing up</button>
              </div>
            </form>
            <div>
              <p className="mb-0  text-center">You have a account? 
              <NavLink to="/login"
                  className="text-primary fw-bold">Login</NavLink></p>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</div>
     
    </>
  );
};
