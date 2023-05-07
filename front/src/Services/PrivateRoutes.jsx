import { Navigate, Outlet } from 'react-router-dom'
import { SignIn } from '../Componentes/SignIn'
import { Context } from 'react'
import { useContext,useState ,useEffect} from 'react'
import { Contexto } from '../Context/Contexto'
const PrivateRoutes = () => {
  const {user} = useContext(Contexto)
  const [isVerified, setIsVerified] = useState('')
  const verified=()=>{
    if(user){
      setIsVerified(user.is_verified)
    }else{
      setIsVerified(false)
    }
  }
  useEffect(() => {
    verified()
  }, [])
  
  return (
    // Si no existe el usuario se se va a login , si existe sale de aqui y hace lo que debe hacer el route
    isVerified==true ? <Outlet/> : <Navigate to="/login" />
  )
}

export default PrivateRoutes