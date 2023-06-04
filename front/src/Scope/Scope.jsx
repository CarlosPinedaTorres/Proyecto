import React from 'react'
import "../Estilos/test.css"
import { useEffect, useRef,useContext } from 'react';
import Chart from 'chart.js/auto';
import { useState } from 'react';
import { Contexto } from '../Context/Contexto';
export const Scope = ({id_juego}) => {
  const{authTokens}=useContext(Contexto)
  const [prices, setPrices] = useState([])
  let myChart = null;
  const chartRef = useRef();
  const obtain_Price_History=async(id_juego)=>{
    console.log('juego',id_juego)
    let response=await fetch(`http://127.0.0.1:8000/prices/${id_juego}/`,{
    method:'GET',
    headers:{
      'Content-Type':'application/json',
    }
    
  })
    let data=await response.json()
 
    console.log(data)
    setPrices(data)
    
  }


  useEffect(() => {
   obtain_Price_History(id_juego)
  }, [])
  
  useEffect(() => {
    // if (prices!=[]){
    //   buildChart();
    // }
    // return () => {
    //   destroyChart();
    // };
    
   
  }, [prices]);

  useEffect(() => {
    buildChart();
   if (prices!=[]){
      buildChart();
    }
 
    // Función para manejar el evento de cambio de tamaño de la ventana
    const handleResize = () => {
      destroyChart();
      buildChart();
    };

    // Asignar el controlador de eventos al evento de cambio de tamaño de la ventana
    window.addEventListener('resize', handleResize);

    return () => {
      // Eliminar el controlador de eventos al desmontar el componente
      destroyChart();
      window.removeEventListener('resize', handleResize);
    };
  }, [prices]);

  const buildChart = () => {
    const myChartRef = chartRef.current.getContext('2d');
    console.log('aqui',prices)
    // Obtén los datos de precios de tu API de Django REST Framework y guárdalos en un arreglo
    const data =prices
    if (myChart) {
      // Destruir el gráfico existente si ya está creado
      myChart.destroy();
    }
    myChart=new Chart(myChartRef, {
      type: 'line',
      data: {
        labels: data.map(row => row.hora),
        datasets: [
          {
            label: 'Acquisitions by month',
            data: data.map(row => row.precio)
          }
        ],
      },
      options: {
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: 'Fechas' // Personaliza el título del eje X
            }
          },
          y: {
            display: true,
            title: {
              display: true,
              text: 'Precio' // Personaliza el título del eje Y
            }
          }
        }
      },
    });
  };
  const destroyChart = () => {
    if (myChart) {
      myChart.destroy();
      myChart = null;
    }
  };
  return <canvas  ref={chartRef} />;
}
