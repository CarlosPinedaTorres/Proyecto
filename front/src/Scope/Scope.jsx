import React from 'react'
// import "../Estilos/test.css"
import { useEffect, useRef,useContext } from 'react';
import Chart from 'chart.js/auto';
import { useState } from 'react';
import { Contexto } from '../Context/Contexto';
export const Scope = ({id_juego}) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  // console.log('aqui,scope')
  const{authTokens}=useContext(Contexto)
  const [prices, setPrices] = useState([])
  let myChart = null;
  const chartRef = useRef();
  const obtain_Price_History=async(id_juego)=>{
    console.log('juego',id_juego)
    let response=await fetch(`${apiUrl}prices/${id_juego}/`,{
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
    myChart = new Chart(myChartRef, {
      type: 'line',
      data: {
        labels: data.map(row => row.hora),
        datasets: [
          {
            label: 'Precios del mercado',
            data: data.map(row => row.precio),
            backgroundColor: 'rgba(75, 192, 192, 0.2)', // Personaliza el color de fondo del área bajo la línea
            borderColor: 'rgba(75, 192, 192, 1)', // Personaliza el color de la línea
            borderWidth: 2, // Personaliza el ancho de la línea
            pointRadius: 4, // Personaliza el tamaño de los puntos en la línea
            pointBackgroundColor: 'rgba(255, 255, 255, 1)', // Personaliza el color de fondo de los puntos
            pointBorderColor: 'rgba(75, 192, 192, 1)', // Personaliza el color del borde de los puntos
            tension: 0.4, // Personaliza la suavidad de la línea (0 = recta, 1 = curva suave)
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: 'Meses', // Personaliza el título del eje X
              color: 'rgba(255, 255, 255, 1)', // Personaliza el color del título del eje X
              font: {
                size: 16, // Personaliza el tamaño de fuente del título del eje X
              },
            },
            ticks: {
              color: 'rgba(255, 255, 255, 0.8)', // Personaliza el color de las marcas del eje X
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.1)', // Personaliza el color de las líneas de cuadrícula del eje X
            },
          },
          y: {
            display: true,
            title: {
              display: true,
              text: 'Precio', // Personaliza el título del eje Y
              color: 'rgba(255, 255, 255, 1)', // Personaliza el color del título del eje Y
              font: {
                size: 16, // Personaliza el tamaño de fuente del título del eje Y
              },
            },
            ticks: {
              color: 'rgba(255, 255, 255, 0.8)', // Personaliza el color de las marcas del eje Y
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.1)', // Personaliza el color de las líneas de cuadrícula del eje Y
            },
          },
        },
        plugins: {
          // Personaliza la leyenda del gráfico
          legend: {
            display: true,
            labels: {
              color: 'rgba(255, 255, 255, 1)', // Personaliza el color del texto de la leyenda
              boxWidth: 20, // Personaliza el ancho del cuadro de color en la leyenda
              padding: 20, // Personaliza el espacio entre los elementos de la leyenda
            },
          },
        },
      },
    });
  };

  const destroyChart = () => {
    if (myChart) {
      myChart.destroy();
      myChart = null;
    }
  };
  return (
    <div className="bg-gray-800 p-4 rounded-md shadow-md">
      <h2 className="text-white text-xl font-semibold mb-4">Precios por mes</h2>
      <div className="relative h-96">
        <canvas ref={chartRef} />
      </div>
    </div>
  );
};