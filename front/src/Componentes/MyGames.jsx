import { useEffect ,useContext,useState} from "react"
import React from 'react'
import { Contexto } from "../Context/Contexto"
export const MyGames = () => {
    const {authTokens}=useContext(Contexto)
    const [myGames,setmyGames,setAuthTokens] = useState([])
    
    useEffect(() => {
        ObtainMyGames()
        setAuthTokens()
    }, [])
    
    const ObtainMyGames=async()=>{
        console.log(authTokens.access)
        let response= await fetch('http://localhost:8000/games/',{
          method:'GET',
          headers:{
            'Content-Type':'application/json',
            'Authorization':'Bearer ' + String(authTokens.access)
          }
        })
        let data= await response.json()
        console.log(data)
        setmyGames(data)
      
      }
  return (
    <>
    <div>MyGames</div>
    {
        // myGames.map((game)=>{
        //     return <li key={game.nombre}>{game.nombre}</li>
        // })
    }
    </>
  )
}
