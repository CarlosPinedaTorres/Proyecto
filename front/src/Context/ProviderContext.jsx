import { Contexto } from "./Contexto";
import React, { useEffect, useState } from "react";
import { getGames } from "../Services/Apiservices";
import jwt_decode from "jwt-decode"
import { json, useNavigate } from "react-router-dom";
import io from 'socket.io-client';
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
    navigate("/login")
  }
  

useEffect(()=>{
  console.log('up')
  let cuatroMinuts=1000*60*4
  let intervalo=setInterval(()=>{
    if(authTokens){
      updateTokens()
    }
  },60000)
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
      
    
      
      const formData = new FormData();

      formData.append("vendedor",e.target.id.value);
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
      // formData.append("publicado", e.target.publicado.value);
      formData.append("precio", e.target.precio.value);
    console.log(user.user_id)
    
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


//Obtain ALl GAMES

const [allGames, setAllGames] = useState([])
    const ObtainAllGames=async(order_by='')=>{
      let response=await fetch("http://127.0.0.1:8000/allgames/",{
        method:'GET',
        headers:{
          'Content-Type':'application/json',
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
     
      setAllGames(gamesWithImages)

    }
  
    
    
    


//////////////

// Obtain_Countries
const [countries, setCountries] = useState([])
    const obtain_countries=async()=>{
      let response=await fetch('https://restcountries.com/v2/all')
      let data=await response.json()
      let data1=data.map((country)=>
      
      ({
     
        value:country.name,
        label:country.name,
        currency:country.currencies ? country.currencies[0].code:''
    
      }))
      console.log(data1)
      setCountries(data1)
    }
///////////// MoneyWallet
const [myMoney, setMyMoney] = useState([])
const obtain_money_wallet=async(id_user)=>{
console.log('AQUIIII',id_user)
  let response=await fetch(`http://127.0.0.1:8000/wallet/${id_user}/`,{
    method:'GET',
    headers:{
      'Content-Type':'application/json',
    }
    
  })
    let data=await response.json()
 
    console.log(data['balance'])
    setMyMoney(data['balance'])

}


/////// Comprobar juegos
const updatedPrices=async()=>{

  let response=await fetch(`http://127.0.0.1:8000/priceUpdate/`,{
    method:'POST',
    headers:{
      'Content-Type':'application/json',
    }
    
  })
    let data=await response.json()
 
   
   

}

// ////////Actualizar precios (Comentar hasta tener claro el tiempo)
// useEffect(() => {
  
//   const interval = setInterval(() => {
//     updatedPrices()
//     console.log('prices')
//   }, 12000);
//   return () => {
//     clearInterval(interval);
//   };
// }, [])

//////////
// Comprobar ventas
const obtain_vendidos=async()=>{
try{
  let response=await fetch(`http://127.0.0.1:8000/active-games/`,{
    method:'POST',
    headers:{
      'Content-Type':'application/json',
    }
    
  })
  const data = await response.json();
    
  if (data.success) {
    // La wallet se actualizó correctamente
    // Realiza las operaciones necesarias en el frontend
    alert('Tienes un nuevo pago')
    console.log('La wallet se actualizó correctamente.');
    console.log(data.data); // Datos adicionales devueltos por la API
  } else {
    // No se pudo actualizar la wallet
    // Realiza las operaciones necesarias en el frontend
    console.log('No se pudo actualizar la wallet.');
    console.log(data.message); // Mensaje de error devuelto por la API
  }
  
} catch (error) {
  // Manejo de errores de la petición
  console.error('Ocurrió un error:', error);
}
   
   
}
useEffect(() => {
  
  const interval = setInterval(() => {
    obtain_vendidos()
    console.log('vender')
  }, 12000);
  return () => {
    clearInterval(interval);
  };
}, [])



///// Get Ventas

const [ventas, setVentas] = useState([])
const obtain_ventas = async (idJuego) => {
  try {
    const response = await fetch(`http://127.0.0.1:8000/ventas/${idJuego}/`);
    const data = await response.json();
    // Aquí puedes trabajar con los datos de las ventas
    console.log(data);
  } catch (error) {
    console.error('Error al obtener las ventas:', error);
  }
};



/////GET a game

const [game, setGame] = useState([])
    const ObtainGame=async(idJuego)=>{
      let response=await fetch(`http://127.0.0.1:8000/juego/${idJuego}/`,{
        method:'GET',
        headers:{
          'Content-Type':'application/json',
        }

      })
      let data = await response.json()
 
      console.log('onlyone',data)
  
      setGame(()=>{
        const url_portada = URL.createObjectURL(data.url_portada)
        return {...game, url_portada}})

    }
/////////
// To my games

const handleMyGamesClick = () => {
  // Redirige al usuario a la página "My Games"
  navigate('/mygames');
};



////////////////////// obtainNameUSer
const [userName, setUserName] = useState([])
    const ObtainUserName=async(id_user)=>{
      let response=await fetch(`http://127.0.0.1:8000/getLogueados/${id_user}/`,{
        method:'GET',
        headers:{
          'Content-Type':'application/json',
        }

      })
      let data = await response.json()
 
      console.log('onlyone',data)
  
      setUserName(data.nombre_usuario)
      console.log(data.nombre_usuario)
    }

//////////////////////InfoLog
const [account, setAccount] = useState({ account: '', wallet: '' });
    const ObtainAccount=async(id_user)=>{
      let response=await fetch(`http://127.0.0.1:8000/getInfoLogueado/${id_user}/`,{
        method:'GET',
        headers:{
          'Content-Type':'application/json',
        }

      })
      let data = await response.json()

  
      setAccount({ account: data.account, wallet: data.wallet });
      console.log('hola',data.account,'aqii',data.wallet)
    }
    const [visto, setVisto] = useState({ noVisto: false });
    const ObtainInfoLog = async (id_user) => {
      try {
        let response = await fetch(`http://127.0.0.1:8000/getInfoLogueado/${id_user}/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
    
        let data = await response.json();
    
        console.log(data.noVisto); // Verifica que el valor de data.noVisto sea correcto
    
      
          setVisto({ noVisto: data.noVisto });
        
      } catch (error) {
        console.log('Error en la solicitud:', error);
      }
    };

    const check_visto=async(id_user)=>{
      try{
      let response=await fetch(`http://127.0.0.1:8000/checkVisto/${id_user}/`,{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        }

      })
      if (response.ok) {
        // El código de estado es exitoso (por ejemplo, 200)
        console.log('Visto actualizado correctamente');
      } else {
        console.log('Error al actualizar el visto');
      }
    } catch (error) {
      console.log('Error en la solicitud:', error);
    }
    }

//////////////7

  let contextData={
    loginUser:loginUser,
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
    ObtainAllGames:ObtainAllGames,
    allGames:allGames,
    obtain_money_wallet:obtain_money_wallet,
    myMoney:myMoney,
    obtain_ventas:obtain_ventas,
    ventas:ventas,
    ObtainGame:ObtainGame,
    game:game,
    handleMyGamesClick: handleMyGamesClick,
    ObtainUserName:ObtainUserName,
    userName:userName,
    ObtainAccount:ObtainAccount,
    account:account,
    ObtainInfoLog:ObtainInfoLog,
    visto:visto,
    check_visto:check_visto,
  }
  return <Contexto.Provider value={contextData}>{children}</Contexto.Provider>;

}
