import { useEffect ,useContext,useState} from "react"
import React from 'react'
import { Contexto } from "../../Context/Contexto"
import { Form} from "react-bootstrap"
import { Navbar } from "../Navbar"
import '../../Estilos/CreateGame.css'
import { useNavigate } from "react-router-dom"
export const CreateGame= () => {
  const [comprar, setComprar] = useState(true)
  const [valor,setValor]=useState(null)
  const [id, setId] = useState(null)
  const {obtain_Plataformas,plataformas,obtain_Generos,generos,obtain_Idiomas,idiomas,user,obtain_money_wallet,myMoney}=useContext(Contexto)
  const navigate=useNavigate()

const goIngresar=()=>{
  navigate("/test1")
}



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
      const data = {
        media:(e.target.precio.value *e.target.num_llaves.value) *0.10,
        id_user:user['user_id'],
      };
      formData.append("data", JSON.stringify(data));
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
    // console.log(myMoney)
    if(e.target.precio.value *e.target.num_llaves.value>myMoney){
      console.log('noMoney')
      setComprar(false)
      setValor((e.target.precio.value *e.target.num_llaves.value) *0.10)
    }else{
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
        // navigate("/mygames")
      } catch (error) {
        console.error(error);
      }
    }
    
    
       }


  useEffect(() => {
      obtain_Plataformas()
      obtain_Generos()
      obtain_Idiomas()
      obtain_money_wallet(user['user_id'])
      const idLogueado=async()=>{
    
        let response=await fetch(`http://127.0.0.1:8000/getIdLogueado/${user['user_id']}/`,{
          method: 'GET',
          headers:{
            'Content-Type':'application/json'
        }})
        let data=await response.json()
        let data2=await data.id
        setId(data2)
      } 
      idLogueado() 
    
  }, [])

  
  return (
    <>
    
  <Navbar/>
  <div className="flex justify-center mt-3">
  <div className="w-full max-w-2xl">
    <div className="bg-white text-gray-900 shadow-lg rounded-lg">
      <div className="p-5">
        <form encType="multipart/form-data" onSubmit={uploadGame} className="space-y-6">
          <h2 className="text-2xl font-bold mb-2 text-uppercase">Añadir Juego</h2>
          <p>Rellena todos los campos para crearlo</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="mb-3">
              <label htmlFor="vendedor" className="block text-sm font-medium text-gray-700">Nombre vendedor:</label>
              <input type="text" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" value={user.username} name="vendedor" placeholder="Nombre del vendedor" />
            </div>
            <div className="mb-3">
              <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">Introduce el nombre del juego:</label>
              <input type="text" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" name="nombre" placeholder="Nombre del juego" />
            </div>
            <div className="mb-3">
              <label htmlFor="url_portada" className="block text-sm font-medium text-gray-700">Escoge una imagen de portada para tu juego:</label>
              <input type="file" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" name="url_portada" />
            </div>
            <div className="mb-3">
              <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700">Descripcion:</label>
              <textarea className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" name="descripcion" placeholder="Introduce una breve descripcion del juego"></textarea>
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="plataformas" className="block text-sm font-medium text-gray-700">Plataformas:</label>
            <select className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" multiple aria-label="multiple select example" name="plataformas" onChange={handlePlataformasChange}>
              {plataformas.map((plataforma) => (
                <option key={plataforma.id}>{plataforma.nombre}</option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="generos" className="block text-sm font-medium text-gray-700">Generos:</label>
            <select className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" multiple aria-label="multiple select example" name="generos" onChange={handleGenerosChange}>
              {generos.map((genero) => (
                <option key={genero.id}>{genero.nombre}</option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="idiomas" className="block text-sm font-medium text-gray-700">Idiomas:</label>
            <select className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" multiple aria-label="multiple select example" name="idiomas" onChange={handleIdiomasChange}>
              {idiomas.map((idioma) => (
                <option key={idioma.id}>{idioma.nombre}</option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="mb-3">
              <label htmlFor="publicacion" className="block text-sm font-medium text-gray-700">Publicación:</label>
              <input type="date" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" name="publicacion" />
            </div>
            <div className="mb-3">
              <label htmlFor="num_llaves" className="block text-sm font-medium text-gray-700">Número de llaves:</label>
              <input type="text" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" name="num_llaves" />
            </div>
            <div className="mb-3">
              <label htmlFor="precio" className="block text-sm font-medium text-gray-700">Precio:</label>
              <input type="text" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" name="precio" />
            </div>
          </div>

          <div className="flex justify-end">
            <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" type="submit">Crear</button>
          </div>

          <input type="text" value={id} name='id' className="hidden-input" />
        </form>
      </div>
    </div>
  </div>
</div>
    {/* <div className="row d-flex justify-content-center mt-3">
      <div className="col-12 col-md-8 col-lg-6">
        <div className="border border-3 border-primary"></div>
        <div className=" bg-white card text-dark shadow-lg">
          <div className="card-body p-5">
            <form className=" mb-3 mt-md-4 row" encType="multipart/form-data" onSubmit={uploadGame}>
              <h2 className="fw-bold mb-2 text-uppercase ">Añadir Juego </h2>
              <p className=" mb-5">Rellena todos los campos para crearlo</p>

              <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="vendedor" className="form-label rounded text-dark border-dark text-decoration-underline">Nombre vendedor:</label>
                <input type="text" className="form-control bg-secondary border-dark" value={user.username}name="vendedor" placeholder="Nombre del vendedor"/>
              </div>
              <div className="mb-3">
                
                <label htmlFor="url_portada" className="form-label rounded text-dark border-dark text-decoration-underline">Escoge una imagen de portada para tu juego:</label>
                <input type="file" className="form-control bg-secondary border-dark" name="url_portada" />
              </div>
              </div>
              <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="nombre" className="form-label rounded text-dark border-dark text-decoration-underline">Introduce el nombre del juego:</label>
                <input type="text" className="form-control bg-secondary border-dark" name="nombre" placeholder="Nombre del juego"/>
              </div>
              <div className="mb-3">
                <label htmlFor="descripcion" className="form-label rounded text-dark border-dark text-decoration-underline">Descripcion:</label>
                <textarea type="text-field" className="form-control bg-secondary border-dark" name="descripcion" placeholder="Introduce una breve descripcion del juego"/>
              </div>
              </div>
              
            
              <div className="mb-3">
              <label htmlFor="plataformas" className="form-label rounded text-dark border-dark text-decoration-underline">Plataformas:</label>
              <select className="form-select" multiple aria-label="multiple select example" name="plataformas" onChange={handlePlataformasChange}>
                  {
                  plataformas.map((plataforma)=>{
                  return <option key={plataforma.id}>{plataforma.nombre}</option>})}
              </select>
              </div>
              <div className="mb-3">
              <label htmlFor="generos" className="form-label rounded text-dark border-dark text-decoration-underline">Generos:</label>
              <select className="form-select" multiple aria-label="multiple select example" name="generos" onChange={handleGenerosChange}>
                  {
                  generos.map((genero)=>{
                  return <option key={genero.id}>{genero.nombre}</option>})}
              </select>
              </div>     
              <div className="mb-3">
              <label htmlFor="idiomas" className="form-label rounded text-dark border-dark text-decoration-underline">Idiomas:</label>
              <select className="form-select" multiple aria-label="multiple select example" name="idiomas" onChange={handleIdiomasChange}>
                  {
                  idiomas.map((idioma)=>{
                  return <option key={idioma.id}>{idioma.nombre}</option>})}
              </select>
              </div>
              <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="publicacion" className="form-label rounded text-dark border-dark text-decoration-underline">publicacion:</label>
                <input type="date" className="form-control bg-secondary border-dark" name="publicacion" />
              </div>
              
              <div className="mb-3">
                <label htmlFor="num_llaves" className="form-label rounded text-dark border-dark text-decoration-underline">num_llaves:</label>
                <input type="text" className="form-control bg-secondary border-dark" name="num_llaves" />
              </div>
              </div>
              <div className="col-md-6">
             
              <div className="mb-3">
                <label htmlFor="precio" className="form-label rounded text-dark border-dark text-decoration-underline">precio :</label>
                <input type="text" className="form-control bg-secondary border-dark" name="precio" />
              </div>
                <div className="d-grid my-5">
             
                <button className="btn btn-outline-dark" type="submit">Crear</button>
              </div>
             
             
              <input type="text" value={id} name='id' className="hidden-input" />
             
              </div>
            
              
            </form>
          </div>
        </div>
      </div>
    </div> */}
    {/* {!comprar &&
      <>
         <div className="mb-3">
                
                <p>NO tienes fondos suficientes,minimo necesitas{valor}</p>
                 <button onClick={goIngresar}>Ingresar Dinero</button>
              </div>
      </>

    } */}
    </>
  )
}
