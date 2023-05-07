import {React,useContext} from "react";
import { NavLink } from "react-router-dom";
import { Contexto } from "../Context/Contexto";
export const Navbar = () => {
  const {user,logoutUser}=useContext(Contexto)
  return (
    <div className="w-100">
      <nav className="navbar navbar-expand-sm bg-secondary navbar-secondary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            GameMasters
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapsibleNavbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="collapsibleNavbar">
            <ul className="navbar-nav">
              <li className="nav-item">
              <NavLink className="nav-link" to="/home">
                Inicio
              </NavLink>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Sobre Nostros
                </a>
              </li>

            </ul>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {!user &&
          <li className="nav-item">
            
            <NavLink className="nav-link" to="/login">
              Login
            </NavLink>
           
          </li>
          }
        {!user  &&
          <li className="nav-item">
            <NavLink className="nav-link" to="/registrar">
                Sign up
            </NavLink>
          </li> 
          }
          {user &&
          <li className="nav-item">
            <NavLink onClick={logoutUser} className="nav-link" to="/login">
              Logout
            </NavLink>
          </li>}
          {user &&
          <li>
          
          <span className="nav-link text-white">Bienvenido, {user.username}!</span>

          </li>
        }
        </ul>

          </div>
         
            
          
        </div>
      </nav>
    </div>
  );
};
