import { Contexto } from "./Contexto";
import React, { useEffect, useState } from "react";
import { getGames } from "../Services/Apiservices";
import jwt_decode from "jwt-decode"
import { json, useNavigate } from "react-router-dom";
export const ProviderContext = ({ children }) => {


  //USER

  const [user, setUser] = useState(()=>localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')):null)
  console.log(user)
  const [authTokens, setAuthTokens] = useState(()=>localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')):null)
  const [loading, setLoading] = useState('false')

  const navigate=useNavigate()
  const updateTokens=async ()=>{
    console.log('update')
    let response= await fetch('http://localhost:8000/api/token/refresh/',{
      method: 'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({'refresh':authTokens?.refresh})
    })
    let data= await response.json()
    if(response.status===200){
      setAuthTokens(data)
      setUser(jwt_decode(data.access))
      localStorage.setItem('authTokens',JSON.stringify(data))
    }else{
      logoutUser()
    }
  }
  const loginUser =async(e)=>{
    e.preventDefault()
    
    let response= await fetch('http://localhost:8000/api/token/',{
      method: 'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({'username':e.target.username.value,'password':e.target.password.value})
    })
    let data= await response.json()
    if(response.status === 200){
        setAuthTokens(data)
        setUser(jwt_decode(data.access))
        localStorage.setItem('authTokens',JSON.stringify(data))
        navigate("/mygames")
    }else{
      alert('Algo ha salido mal(login)')
    }
 
  }
  //logout
  const logoutUser=()=>{
    setAuthTokens(null)
    setUser(null)
    localStorage.removeItem('authTokens')
    navigate("/registrar")
  }
  

useEffect(()=>{
  console.log('up')
  let cuatroMinuts=1000*60*4
  let intervalo=setInterval(()=>{
    if(authTokens){
      updateTokens()
    }
  },cuatroMinuts)
  return ()=>clearInterval(intervalo)
},[authTokens,loading])


//Registrar
const Registrar=async(e)=>{
  e.preventDefault()
  let response=await fetch('http://127.0.0.1:8000/api/user/register/',{
    method: 'POST',
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify({'email':e.target.email.value,'username':e.target.username.value,'password':e.target.password.value})
  })
  let data=await response.json()
  console.log(data)

}
  //testImage

  const test = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("imagen", e.target.image.files[0], e.target.image.files[0].name);
  
    try {
      const response = await fetch("http://localhost:8000/api/upload/", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

//Create_GAMES
  const [plataformas, setPlataformas] = useState([])
  const obtain_Plataformas=async()=>{
    const response=await fetch("http://localhost:8000/plataformas/")
    const data=await response.json()
    setPlataformas(data)}

  const [generos, setGeneros] = useState([])
  const obtain_Generos=async()=>{
    const response=await fetch("http://localhost:8000/generos/")
    const data=await response.json()
    setGeneros(data)}
  
  const [idiomas, setIdiomas] = useState([])
  const obtain_Idiomas=async()=>{
      const response=await fetch("http://localhost:8000/idiomas/")
      const data=await response.json()
      setIdiomas(data)}
  

    const handleGenerosChange = (event) => {
        const opcionesSeleccionadas = Array.from(event.target.selectedOptions).map((option) => option.value);
        setGenerosSeleccionadas(opcionesSeleccionadas);
      };

      const handleIdiomasChange = (event) => {
        const opcionesSeleccionadas = Array.from(event.target.selectedOptions).map((option) => option.value);
        setIdiomasSeleccionadas(opcionesSeleccionadas);
      };

      const handlePlataformasChange = (event) => {
        const opcionesSeleccionadas = Array.from(event.target.selectedOptions).map((option) => option.value);
        setPlataformasSeleccionadas(opcionesSeleccionadas);
      };

    const [plataformasSeleccionadas, setPlataformasSeleccionadas] = useState([]);  
    const [generosSeleccionadas, setGenerosSeleccionadas] = useState([]);  
    const [idiomasSeleccionadas, setIdiomasSeleccionadas] = useState([]);  
    
    
const uploadGame = async (e) => {
      e.preventDefault();
      const ids_plataformas= plataformas.filter((plataforma)=>plataformasSeleccionadas.includes(plataforma.nombre)).map((plataforma) => plataforma.id);
      const ids_generos= generos.filter((genero)=>generosSeleccionadas.includes(genero.nombre)).map((genero) => genero.id);
      const ids_idiomas= idiomas.filter((idioma)=>idiomasSeleccionadas.includes(idioma.nombre)).map((idioma) => idioma.id);
  

     
      console.log(ids_generos)
      const formData = new FormData();

      formData.append("vendedor",user.user_id);
      formData.append("url_portada", e.target.url_portada.files[0], e.target.url_portada.files[0].name);
      formData.append("nombre", e.target.nombre.value);
      formData.append("descripcion", e.target.descripcion.value);
      ids_plataformas.map((id)=>{
        formData.append("plataformas", id);
      })
      ids_generos.map((id)=>{
          formData.append("genero", id);
      })
      ids_idiomas.map((id)=>{
        formData.append("idiomas", id);
      })
      formData.append("publicacion", e.target.publicacion.value);
      formData.append("num_llaves", e.target.num_llaves.value);
      formData.append("publicado", e.target.publicado.value);
      formData.append("precio_venta_final", e.target.precio_venta_final.value);
      formData.append("precio", e.target.precio.value);
    // console.log(user.user_id)
    
      try {
        const response = await fetch("http://127.0.0.1:8000/game/upload/", {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json",
          },
        });
        const data = await response.json();
        console.log(data);
        navigate("/mygames")
      } catch (error) {
        console.error(error);
      }
       }

//
///MYGAMES
const [myGamesUser, setmyGamesUser] = useState([])
      const myGames=async()=>{
        let response=await fetch("http://127.0.0.1:8000/myGames/",{
          method:'GET',
          headers:{
            'Content-Type':'application/json',
            'Authorization':'Bearer '+ String(authTokens.access)
          }

        })
        let data = await response.json()
        let gamesWithImages = data.map(game => {
          if (game.image) {
            // Convertir la imagen en una URL utilizable
            const url_portada = URL.createObjectURL(game.url_portada)
            return {...game, url_portada}
          } else {
            return game
          }
        })
       
        setmyGamesUser(gamesWithImages)

      }








/////////


  let contextData={
    loginUser:loginUser,
    // games:games,
    user:user,
    logoutUser:logoutUser,
    test:test,
    authTokens:authTokens,
    Registrar:Registrar,
    plataformas:plataformas,
    obtain_Plataformas:obtain_Plataformas,
    generos:generos,
    obtain_Generos:obtain_Generos,
    idiomas:idiomas,
    obtain_Idiomas:obtain_Idiomas,
    uploadGame:uploadGame,
    handlePlataformasChange:handlePlataformasChange,
    handleGenerosChange:handleGenerosChange,
    handleIdiomasChange:handleIdiomasChange,
    myGames:myGames,
    myGamesUser:myGamesUser,

  }
  return <Contexto.Provider value={contextData}>{children}</Contexto.Provider>;

}
