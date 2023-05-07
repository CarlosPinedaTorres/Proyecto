import {NavLink } from "react-router-dom";
import { Navbar } from "./Navbar";
import { useState,useContext } from "react";
import { Contexto } from "../Context/Contexto";
import { useNavigate} from "react-router-dom";
import Modal from 'react-modal'
export const SignIn=()=>{
  let {loginUser,user}=useContext(Contexto)
  // let navigate=useNavigate()
// const [modalIsOpen, setModalIsOpen] = useState(false)
console.log(user)
Modal.setAppElement('#root');

  return (
    <>
    <Navbar/>
    {/* <Modal isOpen={modalIsOpen}>
  <h2>Título del modal</h2>
  <p>Contenido del modal</p>
  <button onClick={() => setModalIsOpen(false)}>Cerrar modal</button>
</Modal> */}
    <div className=" vh-100 d-flex justify-content-center align-items-center">
  <div className="container">
    <div className="row d-flex justify-content-center">
      <div className="col-12 col-md-8 col-lg-6">
        <div className="border border-3 border-primary"></div>
        <div className="card bg-white shadow-lg">
          <div className="card-body p-5">
            <form  onSubmit={loginUser} className="mb-3 mt-md-4">
              <h2 className="fw-bold mb-2 text-uppercase ">Welcome to GamesMasters</h2>
              <p className=" mb-5">Please enter your login and password!</p>
              <div className="mb-3">
                <label htmlFor="email" className="form-label ">Username</label>
                <input type="text" className="form-control" name="username" placeholder="Username"/>
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label ">Password</label>
                <input type="password" className="form-control" name="password" placeholder="*******"/>
              </div>
              {/* <p className="small"><a className="text-primary" href="forget-password.html">Forgot password?</a></p> */}
              <div className="d-grid">
                <button className="btn btn-outline-dark" type="submit">Login</button>
                {/* onClick={()=>setModalIsOpen(true)} */}
              </div>
            </form>
            <div>
              <p className="mb-0  text-center">Don't have an account? 
              <NavLink to="/registrar"
                  className="text-primary fw-bold"> Sign
                  Up</NavLink></p>
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
