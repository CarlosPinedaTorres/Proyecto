import React from "react";
import { Contexto} from "../Context/Contexto";
import { useContext,useState } from "react";
import { NavLink } from "react-router-dom";
export const Registrar = () => {
  const {Registrar}=useContext(Contexto)
  const [passwords, setPasswords] = useState({
    password:'',
    confirmPassword:'',
    coincide: false
  })
  const handlePasswordChange = (event) => {
    const { name, value } = event.target;

    setPasswords((prevState) => ({
      ...prevState,
      [name]: value,
      coincide: prevState.password === value
    }));
  };
  return (
    <>
    
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
                <label htmlFor="email" className="form-label ">Username</label>
                <input type="text" className="form-control" name="username" placeholder="Username"/>
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label ">Password</label>
                <input type="password" className="form-control" value={passwords.password} name="password" placeholder="*******" onChange={handlePasswordChange} />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label ">ConfirmPassword</label>
                <input type="password" className="form-control" value={passwords.confirmPassword} name="confirmPassword" placeholder="*******" onChange={handlePasswordChange} />
              </div>
              {/* <p className="small"><a className="text-primary" href="forget-password.html">Forgot password?</a></p> */}
              <div className="d-grid">
                <button className="btn btn-outline-dark" type="submit" disabled={passwords.coincide}>Sing up</button>
              </div>
            </form>
            <div>
              <p className="mb-0  text-center">You have a account? 
              <NavLink to="/registrar"
                  className="text-primary fw-bold">Login</NavLink></p>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</div>
      {/* <form onSubmit={Registrar}>
        <label htmlFor="email">Email:</label>
        <input name='email' type="text" />
        <label htmlFor="username">Username:</label>
        <input name='username' type="text" />
        <label htmlFor="password">Password:</label>
        <input name='password' type="text" />
       <button>Enviar</button>
      </form> */}
    </>
  );
};
