import { Navigate, Outlet ,Route,redirect} from 'react-router-dom'
import { SignIn } from '../Componentes/SignIn'
import { Context } from 'react'
import { useContext,useState ,useEffect} from 'react'
import { Contexto } from '../Context/Contexto'
const PrivateRoutes = () => {
  const {user} = useContext(Contexto)

  return (
    // Si no existe el usuario se se va a login , si existe sale de aqui y hace lo que debe hacer el route
    user? <Outlet/> : <Navigate to="/login" />
  )
}

export default PrivateRoutes