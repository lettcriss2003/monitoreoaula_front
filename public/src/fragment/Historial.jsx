import React, { useState, useEffect } from 'react';
import BarraMenu from './BarraMenu';
import { PeticionGet } from '../hooks/Conexion';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal } from 'react-bootstrap';

const Historial = () => {
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await PeticionGet('', '/datos');
        // Agrupar datos por fecha y hora
        const historialAgrupado = agruparDatos(data.info);
        setDatos(historialAgrupado);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  // Función para agrupar datos por fecha y hora
  const agruparDatos = (datos) => {
    const historialAgrupado = {};
    datos.forEach((dato) => {
      const key = `${dato.fecha} ${dato.hora}`;
      if (historialAgrupado[key]) {
        historialAgrupado[key][dato.id_sensor - 1] = dato.dato;
      } else {
        historialAgrupado[key] = Array(3).fill('-');
        historialAgrupado[key][dato.id_sensor - 1] = dato.dato;
      }
    });

    // Convertir objeto a array para poder iterar en el render
    return Object.keys(historialAgrupado).map((key) => {
      return {
        fechaHora: key,
        temperatura: historialAgrupado[key][1],
        humedad: historialAgrupado[key][0],
        co2: historialAgrupado[key][2],
        estadoAula: 'Por definir', // Por definir el estado del aula
      };
    });
  };

  return (
    <div>
      <header>
        <BarraMenu />
      </header>
      <section>
        <h3 className="texto-primario-h3">HISTORIAL</h3>
        <div className="crud shadow-lg p-3 mb-5 bg-body rounded">
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Fecha y Hora</th>
                  <th>Temperatura (°C)</th>
                  <th>Humedad (%)</th>
                  <th>CO2 (ppm)</th>
                  <th>Estado del aula</th>
                </tr>
              </thead>
              <tbody>
                {datos.map((dato, index) => (
                  <tr key={index}>
                    <td>{dato.fechaHora}</td>
                    <td>{dato.temperatura}</td>
                    <td>{dato.humedad}</td>
                    <td>{dato.co2}</td>
                    <td>{dato.estadoAula}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Historial;
