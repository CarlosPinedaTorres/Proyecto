import React, { useState } from "react";
import { useRef } from "react";
export const FormPost = () => {
  const form = useRef();
  const [archivo, setArchivo] = useState(null);
  const ObtenerImagen = (e) => {
    setArchivo(e.target.files[0]);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("imagen", archivo);
    console.log(formData.get("imagen"));

    // formData.append("nombre", form.current.name.value);

    // formData.append("descripcion", form.current.des.value);
    // formData.append("publicacion", form.current.date_push.value);
    // formData.append("num_llaves", form.current.llaves.value);
    // formData.append("precio", form.current.precio.value);
    // console.log(form.current.precio.value)
    // formData.append("desarrollador", form.current.desa.value);
    // formData.append("plataformas", form.current.plata.value);
    // formData.append("genero", form.current.genero.value);
    // formData.append("idiomas", form.current.idioma.value);

    try {
      const respuesta = await fetch("http://localhost:8000/api/guardar/", {
        method: "POST",
        body: formData,
      });

      if (!respuesta.ok) {
        throw new Error("Hubo un error al enviar la imagen");
      }

      const datos = await respuesta.json();
      console.log(datos);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} key={form}>
      <input type="file" name="imagen" onChange={ObtenerImagen} />
      <button type="submit">Enviar</button>
    </form>
    //     <form ref={form}>
    //   <label htmlFor="image-input">Seleccione una imagen:</label>
    //   <input id="image-input" type="file" onChange={ObtenerImagen} />

    //   <label htmlFor="name">Nombre:</label>
    //   <input id="name" type="text"  />

    //   <label htmlFor="des">Descripcion:</label>
    //   <textarea id="des" name='des'  />

    //   <label htmlFor="date_push">Fecha publicacion:</label>
    //   <input id="date_push" type='date'  />

    //   <label htmlFor="llaves">Numero de llaves:</label>
    //   <input id="llaves" type="number"  />

    //   <label htmlFor="precio">Precio:</label>
    //   <input id="precio" type="number"  />

    //   <label htmlFor="desa">desarrollador:</label>
    //   <input id="desa" type="number"  />

    //  <label htmlFor="plata">Plataforma:</label>
    //   <input id="plata" type="number"  />

    //   <label htmlFor="genero">Genero:</label>
    //   <input id="genero" type="number"  />

    //   <label htmlFor="idioma">Idiomas:</label>
    //   <input id="idioma" type="number"  />1

    //   <button type="submit" onClick={handleSubmit}>Enviar</button>
    // </form>
  );
};
