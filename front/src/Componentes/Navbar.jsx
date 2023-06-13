import {React,useContext,useState} from "react";
import { NavLink } from "react-router-dom";
import { Contexto } from "../Context/Contexto";
import '../Estilos/Navbar.css'
import { Popover, IconButton, Menu,MenuItem,Modal, ListItem, ListItemText,Button } from '@mui/material';
import { styled } from '@mui/system';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUserFriends, faUserNinja, faUserShield} from '@fortawesome/free-solid-svg-icons';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';




export const Navbar = ({handleModalOpen,visto}) => {
  const {user,logoutUser}=useContext(Contexto)
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <>
 <div className="bg-blue-900 px-4 py-2">
  <nav className="container mx-auto">
    <div className="flex items-center justify-between">
      <NavLink to="/" className="text-white font-bold text-xl">
        GAME MASTERS
      </NavLink>
      <div className="hidden md:flex items-center space-x-4">
        <NavLink
          to="/home"
          className="text-white"
          activeClassName="text-blue-400"
        >
          Inicio
        </NavLink>
       
        <NavLink
          to="/informacion"
          className="text-white"
          activeClassName="text-blue-400"
        >
         Información
        </NavLink>
        {!user &&
        <NavLink
          to="/login"
          className="text-white"
          activeClassName="text-blue-400"
        >
         Login
        </NavLink>}
        {user && (
           
          <IconButton
            onClick={handleModalOpen}
            className="text-white focus:outline-none"
          >
            <AccountCircleIcon fontSize="large" />
            {visto && (
              <span className="ml-2 bg-red-500 text-red-500 text-xs rounded-full h-4 w-4 flex items-center justify-center">
                ●
              </span>
            )}
          </IconButton>
        )}
      </div>

      <div className="right-0 mt-2 w-48 bg-blue-900 rounded-lg py-2 space-y-2 md:hidden">
        <button
          onClick={toggleMenu}
          className="text-white focus:outline-none"
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
        {isMenuOpen && (
          <div className="z-50 absolute left-0 mt-2 w-48 bg-blue-900 rounded-lg py-2 space-y-2">
      <NavLink
  to="/home"
  className="block text-white px-4 py-2"
  activeClassName="text-blue-400"
  onClick={toggleMenu}
>
  Inicio
</NavLink>
            <a
              href="#"
              className="block text-white px-4 py-2"
              onClick={toggleMenu}
            >
              Sobre Nosotros
            </a>
            {user && (
              <IconButton
                onClick={() => {
                  handleModalOpen();
                  toggleMenu();
                }}
                className="text-white focus:outline-none"
              >
                <AccountCircleIcon fontSize="large" />
              </IconButton>
            )}
            {!user && (
              <NavLink
                to="/login"
                className="block text-white px-4 py-2"
                activeClassName="text-blue-400"
                onClick={toggleMenu}
              >
                Login
              </NavLink>
            )}
            {!user && (
              <NavLink
                to="/registrar"
                className="block text-white px-4 py-2"
                activeClassName="text-blue-400"
                onClick={toggleMenu}
              >
                Sign up
              </NavLink>
            )}
          </div>
        )}
      </div>
    </div>
  </nav>
</div>
    </>
  );
};
