import { Contexto } from "./Contexto";
import React, { useEffect, useState } from "react";
import { getGames } from "../Services/Apiservices";
import jwt_decode from "jwt-decode"
import { useNavigate } from "react-router-dom";
export const ProviderContext = ({ children }) => {


  //USER

  const [user, setUser] = useState(()=>localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')):null)
  console.log(user)
  const [authTokens, setAuthTokens] = useState(()=>localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')):null)
  const [loading, setLoading] = useState('false')

  const navigate=useNavigate()
  
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
        navigate("/")
    }else{
      alert('Algo ha salido mal(login)')
    }
 
  }
  //logout
  const logoutUser=()=>{
    setAuthTokens(null)
    setUser(null)
    localStorage.removeItem('authTokens')
    navigate("/login")
  }
  
//refresh tokens
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

//MYGAMES




  //


  // const [games, setGames] = useState([]);
  // const [uno,setuni]=useState([''])
  // useEffect(() => {
  //   let mount = true;
  //   getGames().then((res) => {
  //     console.log("res", res);
  //     setGames(res);
  //     return () => (mount = false);
  //   });
  // }, [uno]);
  let contextData={
    loginUser:loginUser,
    // games:games,
    user:user,
    logoutUser:logoutUser,
    test:test,
    authTokens:authTokens,
    Registrar:Registrar,

  
  }
  return <Contexto.Provider value={contextData}>{children}</Contexto.Provider>;

}
