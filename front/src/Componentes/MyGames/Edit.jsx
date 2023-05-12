import React, { useLayoutEffect,useEffect,useState } from 'react'
import { useParams,useNavigate } from "react-router-dom";
import { Navbar } from '../Navbar';
import { useContext } from 'react';
import { Contexto } from '../../Context/Contexto';
export const Edit = () => {
  const navigate=useNavigate()
  const [selectedFile, setSelectedFile] = useState(null)
  const [nombreChange, setNameChange] = useState(null)
  const [descripcion, setDescripcion] = useState(null)
  const [publicacion, setPublicacion] = useState(null)
  const [numLlaves, setnumLlaves] = useState(null)
  const [publicado, setpublicado] = useState(null)
  const [pVentaFinal, setpVentaFinal] = useState(null)
  const [precio, setprecio] = useState(null)
  const [plataformasChange, setplataformas] = useState(null)
  const [generosChange, setGenerosChange] = useState(null)
  const [idiomasChange, setIdiomasChange] = useState(null)
  const [fectAll, setfectAll] = useState({
    'gen':false,
    'plata':false,
    'idioma':false
  })
    const {myGames,myGamesUser,user,authTokens
  
    }=useContext(Contexto)
    
    const [plataformas, setPlataformas] = useState([])
    
    const obtain_Plataformas=async()=>{
    const response=await fetch("http://localhost:8000/plataformas/")
    const data=await response.json()
    console.log('dentro de obtainPlataformas')
    setPlataformas(data)
    console.log('dentro de oP', )
    setfectAll(prevState => ({ ...prevState, plata: true }))
    console.log(fectAll)
    }
    const [generos, setGeneros] = useState([])
    const obtain_Generos=async()=>{
      const response=await fetch("http://localhost:8000/generos/")
      const data=await response.json()
      setGeneros(data)
      setfectAll(prevState => ({ ...prevState, gen: true }))
      console.log(fectAll)
    }
    
    const [idiomas, setIdiomas] = useState([])
    const obtain_Idiomas=async()=>{
        const response=await fetch("http://localhost:8000/idiomas/")
        const data=await response.json()
        setIdiomas(data)
        setfectAll(prevState => ({ ...prevState, idioma: true }))
        console.log(fectAll)
      }
    
    const {id}=useParams()
    const [info, setInfo] = useState(localStorage.getItem('infoGame') ? (localStorage.getItem('infoGame')):[])
    const [plataformasNames, setPataformasNames] = useState([])
    const [GenerosNames, setGenerosNames] = useState([])    
    const [IdiomasNames, setIdiomasNames] = useState([])    
    const [loading, setLoading] = useState(true)
    const obtainInfo=()=>{
        const infoGame=myGamesUser.filter((game)=>game.id==id)
        localStorage.setItem('infoGame', JSON.stringify(infoGame))
        setInfo(infoGame)
        console.log('entraO_INFO',infoGame)
        
        
    }
   
        
    const namesP=()=>{
        const plataformasSeleccionadas = JSON.parse(localStorage.getItem('infoGame'));
       console.log(plataformasSeleccionadas)
        const nombresPlataformasSeleccionadas = plataformas
        .filter(p => plataformasSeleccionadas[0].plataformas.includes(p.id))
        .map(p => p.nombre);
        console.log('nombreP',nombresPlataformasSeleccionadas)
        console.log('plataformas',plataformas)
        setPataformasNames(nombresPlataformasSeleccionadas)
        localStorage.setItem('plataformas', JSON.stringify(nombresPlataformasSeleccionadas))
       
    }
    const namesG=()=>{
        const generosSeleccionadas = JSON.parse(localStorage.getItem('infoGame'));
       
        console.log(generosSeleccionadas)
        const nombresGenerosSeleccionadas = generos
        .filter(g => generosSeleccionadas[0].genero.includes(g.id))
        .map(g => g.nombre);
        setGenerosNames(nombresGenerosSeleccionadas)
        localStorage.setItem('generos', JSON.stringify(nombresGenerosSeleccionadas))

    }
    const namesI=()=>{
        const idiomasSeleccionadas = JSON.parse(localStorage.getItem('infoGame'));
       
        const nombresIdiomasSeleccionadas = idiomas
        .filter(i => idiomasSeleccionadas[0].idiomas.includes(i.id))
        .map(i=> i.nombre);
        setIdiomasNames(nombresIdiomasSeleccionadas)
        console.log(nombresIdiomasSeleccionadas)
        localStorage.setItem('idiomas', JSON.stringify(nombresIdiomasSeleccionadas))

        
    }
 
    useEffect(() => {
      obtain_Plataformas()
      obtain_Generos()
      obtain_Idiomas()
        const storedInfoGame = localStorage.getItem('infoGame')
        if (storedInfoGame) {
          setInfo(JSON.parse(storedInfoGame))
          
          
        } else {
          obtainInfo()
          console.log(storedInfoGame)
        }
        
      setLoading(false)
    }, [])

   
   
    useEffect(() => {
    
      console.log('2_useffect')
   
        if(info!=null){
          console.log('dentro_genero')
          namesG()
          namesI()
          namesP()
        }
      console.log('hola2')

    }, [fectAll])
    

    const nameChange=(event)=>{
      // console.log(event.target.value)
      setNameChange(event.target.value)
      info[0].nombre=event.target.value

    }
    const descriptionChange =(event)=>{
      // console.log(event.target.value)
      setDescripcion(event.target.value)
      info[0].descripcion=event.target.value
    }
    const publicacionChange=(event)=>{
      // console.log(event.target.value)
      setPublicacion(event.target.value)
      info[0].publicacion=event.target.value
    }
    const numLlavesChange=(event)=>{
      // console.log(event.target.value)
      setnumLlaves(event.target.value)
      info[0].num_llaves=event.target.value
    }
    
    const publicadoChange=(event)=>{
      // console.log(event.target.value)
      setpublicado(event.target.value)
      info[0].publicado=event.target.value
    }
    const pVentaFinalChange=(event)=>{
      // console.log(event.target.value)
      setpVentaFinal(event.target.value)
      info[0].precio_venta_final=event.target.value
    }
    const precioChange=(event)=>{
      // console.log(event.target.value)
      setprecio(event.target.value)
      info[0].precio=event.target.value
    }
    
    const PlataformasChange=(event)=>{
      const plataformasSeleccionadas = Array.from(event.target.selectedOptions).map((option) => option.value);
     
      
      const ids_plataformas= plataformas.filter((plataforma)=>plataformasSeleccionadas.includes(plataforma.nombre)).map((plataforma) => plataforma.id);
     
      // console.log(ids_plataformas)
      setplataformas(ids_plataformas)
      const nombresPlataformasSeleccionadas = plataformas
      .filter(p => ids_plataformas.includes(p.id))
      .map(p => p.nombre);
      setPataformasNames(nombresPlataformasSeleccionadas)
      // console.log(nombresPlataformasSeleccionadas)
      
    }


    const GenerosChange=(event)=>{
      const generosSeleccionadas = Array.from(event.target.selectedOptions).map((option) => option.value);
     
      
      const ids_generos= generos.filter((genero)=>generosSeleccionadas.includes(genero.nombre)).map((genero) => genero.id);
     
      // console.log(ids_generos)
      setGenerosChange(ids_generos)
      const nombresGenerosSeleccionadas = generos
      .filter(g => ids_generos.includes(g.id))
      .map(g => g.nombre);
      setGenerosNames(nombresGenerosSeleccionadas)
      // console.log(nombresGenerosSeleccionadas)
      
    }
    const IdiomasChange=(event)=>{
      const idiomasSeleccionadas = Array.from(event.target.selectedOptions).map((option) => option.value);
     
      
      const ids_idiomas= idiomas.filter((idioma)=>idiomasSeleccionadas.includes(idioma.nombre)).map((idioma) => idioma.id);
     
      // console.log(ids_idiomas)
      setGenerosChange(ids_idiomas)
      const nombresIdiomasSeleccionadas = idiomas
      .filter(i => ids_idiomas.includes(i.id))
      .map(i => i.nombre);
      setIdiomasNames(nombresIdiomasSeleccionadas)
      // console.log(nombresIdiomasSeleccionadas)
      
    }
    const imageChange=(event)=>{
      console.log(event.target.files[0])
      setSelectedFile(event.target.files[0])
    }
    const updateGame = async (e) => {
      e.preventDefault();
      const formData = new FormData();
      if(selectedFile!=null){
        console.log(selectedFile)
        formData.append('url_portada',selectedFile,selectedFile.name)
      }
      if(nombreChange!=null){
        console.log(nombreChange)
        formData.append('nombre',nombreChange)
      }
      if(descripcion!=null){
        console.log(descripcion)
        formData.append('descripcion',descripcion)
      }
      if(plataformasChange!=null){
        console.log(plataformasChange)
        plataformasChange.map((id)=>{
          formData.append("plataformas", id);
        })
      }
      if(generosChange!=null){
        console.log(generosChange)
          generosChange.map((id)=>{
          formData.append("genero", id);
        })
      }
      if(idiomasChange!=null){
        console.log(idiomasChange)
          idiomasChange.map((id)=>{
          formData.append("idioma", id);
        })
      }
      if(descripcion!=null){
        console.log(descripcion)
        formData.append('descripcion',descripcion)
      }
      if(publicacion!=null){
        console.log(publicacion)
        formData.append('publicacion',publicacion)
      }
      if(numLlaves!=null){
        console.log(numLlaves)
        formData.append('num_llaves',numLlaves)
      }
      if(publicado!=null){
        console.log(publicado)
        formData.append('publicado',publicado)
      }
      if(pVentaFinal!=null){
        console.log(pVentaFinal)
        formData.append('precio_venta_final',idiomas)
      }
      if(precio!=null){
        console.log(precio)
        formData.append('precio',precio)
      }
      
      setfectAll({
        'gen':false,
        'plata':false,
        'idioma':false
      })
      
      try {
        const response = await fetch("http://127.0.0.1:8000/games/24/", {
          method:"PUT",
          body: formData,
          headers:{
             Accept: "application/json",
            'Authorization':'Bearer '+ String(authTokens.access)
          }
        });
        const data = await response.json();
        console.log(data);
        navigate("/mygames")
        localStorage.removeItem('plataformas')
        localStorage.removeItem('generos')
        localStorage.removeItem('idiomas')
        localStorage.removeItem('infoGame')
      } catch (error) {
        console.error(error);
      }
    
    }
    
  return (
    <>
    <Navbar/>
    {!loading ?
    <div className="row d-flex justify-content-center mt-3">
      <div className="col-12 col-md-8 col-lg-6">
        <div className="border border-3 border-primary"></div>
        <div className=" bg-white card text-dark shadow-lg">
          <div className="card-body p-5">
            <form className=" mb-3 mt-md-4 row" encType="multipart/form-data" onSubmit={updateGame} >
              <h2 className="fw-bold mb-2 text-uppercase ">AñadirJuego</h2>
              <p className=" mb-5">Rellena todos los campos para crearlo</p>
              <div className="mb-3">
                <label htmlFor="vendedor" className="form-label rounded text-dark border-dark text-decoration-underline">Nombre vendedor:</label>
                <input type="text"className="form-control bg-secondary border-dark" value={user.username}name="vendedor" placeholder="Nombre del vendedor"/>
              </div>
              <div className="mb-3">
                
                <label htmlFor="url_portada" className="form-label rounded text-dark border-dark text-decoration-underline">Escoge una imagen de portada para tu juego:</label>
                <input type="file" className="form-control bg-secondary border-dark" onChange={imageChange} name="url_portada" />
              </div>
              <div className="mb-3">
                <label htmlFor="nombre" className="form-label rounded text-dark border-dark text-decoration-underline">Introduce el nombre del juego:</label>
                <input type="text"  className="form-control bg-secondary border-dark" value={info[0].nombre} onChange={nameChange}  name="nombre" placeholder="Nombre del juego"/>
              </div>
              <div className="mb-3">
                <label htmlFor="descripcion" className="form-label rounded text-dark border-dark text-decoration-underline">Descripcion:</label>
                <textarea type="text-field"  className="form-control bg-secondary border-dark" value={info[0].descripcion} onChange={descriptionChange} name="descripcion" placeholder="Introduce una breve descripcion del juego"/>
              </div>
              <div className="mb-3">
              <label htmlFor="plataformas" className="form-label rounded text-dark border-dark text-decoration-underline">Plataformas:</label>
              <select  value={plataformasNames} onChange={PlataformasChange} className="form-select"  multiple aria-label="multiple select example" name="plataformas" >
                  {
                  plataformas.map((plataforma)=>{
                  return <option key={plataforma.id}>{plataforma.nombre}</option>})}
              </select>
              </div>
              <div className="mb-3">
              <label htmlFor="generos" className="form-label rounded text-dark border-dark text-decoration-underline">Generos:</label>
              <select className="form-select" value={GenerosNames} onChange={GenerosChange} multiple aria-label="multiple select example" name="generos" >
                  {
                  generos.map((genero)=>{
                  return <option key={genero.id}>{genero.nombre}</option>})}
              </select>
              </div>     
              <div className="mb-3">
              <label htmlFor="idiomas" className="form-label rounded text-dark border-dark text-decoration-underline">Idiomas:</label>
              <select className="form-select" value={IdiomasNames} onChange={IdiomasChange} multiple aria-label="multiple select example" name="idiomas" >
                  {
                  idiomas.map((idioma)=>{
                  return <option key={idioma.id}>{idioma.nombre}</option>})}
              </select>
              </div>
              <div className="mb-3">
                <label htmlFor="publicacion" className="form-label rounded text-dark border-dark text-decoration-underline">publicacion:</label>
                <input type="date" value={info[0].publicacion}className="form-control bg-secondary border-dark" onChange={publicacionChange} name="publicacion" />
              </div>
              <div className="mb-3">
                <label htmlFor="num_llaves" className="form-label rounded text-dark border-dark text-decoration-underline">num_llaves:</label>
                <input type="text"value={info[0].num_llaves} className="form-control bg-secondary border-dark" onChange={numLlavesChange} name="num_llaves" />
              </div>
              <div className="mb-3">
                <label htmlFor="publicado" className="form-label rounded text-dark border-dark text-decoration-underline">publicado:</label>
                <input type="date" value={info[0].publicado} className="form-control bg-secondary border-dark" onChange={publicadoChange}  name="publicado" />
              </div>
              <div className="mb-3">
                <label htmlFor="precio_venta_final" className="form-label rounded text-dark border-dark text-decoration-underline"> precio_venta_final:</label>
                <input type="text" value={info[0].precio_venta_final} className="form-control bg-secondary border-dark"  onChange={pVentaFinalChange} name="precio_venta_final" />
              </div>
              <div className="mb-3">
                <label htmlFor="precio" className="form-label rounded text-dark border-dark text-decoration-underline">precio :</label>
                <input type="text" value={info[0].precio} className="form-control bg-secondary border-dark" onChange={precioChange}  name="precio" />
              </div>
              <div className="d-grid">
                <button className="btn btn-outline-dark" type="submit">Editar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div> : <p>Cargando</p>}
    </>
  )
}
