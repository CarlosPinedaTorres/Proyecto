import React from "react";
import { Contexto} from "../Context/Contexto";
import { useContext,useState ,useRef} from "react";
import { NavLink } from "react-router-dom";
import {Navbar} from "./Navbar"
export const Registrar = () => {
  const password1=useRef()
  const confirmPassword=useRef()
  const {Registrar}=useContext(Contexto)
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [coincide, setCoincide] = useState(true)
 
  const handlePasswordChange = (event) => {
   
    if(event.target.name=='password'){
     
        setPassword(password1.current.value)
        if(password2==password1.current.value){
          setCoincide(false)
        }else{
          setCoincide(true)
        }
    }
  
    if(event.target.name=='password2'){
      setPassword2(confirmPassword.current.value)
   
      if(confirmPassword.current.value==password){
        setCoincide(false)
      }else{
        setCoincide(true)
      }
  }

  }
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
                <input type="text" className="form-control" name="email" placeholder="Email"/>
              </div>
              <div className="mb-3">
                <label htmlFor="username" className="form-label ">Username</label>
                <input type="text" className="form-control" name="username" placeholder="Username"/>
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label ">Password</label>
                <input type="password" className="form-control" ref={password1} name="password" placeholder="*******" onChange={handlePasswordChange} />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label ">ConfirmPassword</label>
                <input type="password" className="form-control" ref={confirmPassword}name="password2" placeholder="*******" onChange={handlePasswordChange} />
              </div>
              {/* <p className="small"><a className="text-primary" href="forget-password.html">Forgot password?</a></p> */}
              <div className="d-grid">
                <button className="btn btn-outline-dark" type="submit" disabled={coincide}>Sing up</button>
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
