import React from 'react';
import '../index.css';
import * as metricas from './constantes/metricas';
export const Indicadores = () => {
    return (
        <div className="d-flex flex-column justify-content-center">
            <h1 className='text-center'>Indicadores</h1>
            <p className="text-justify">En esta sección se muestran los diferentes niveles de los indicadores de temperatura, humedad y CO2. Los valores se clasifican en cuatro categorías: Óptimo, Aceptable, Deficiente y Crítico. Estos indicadores ayudan a monitorear y mantener las condiciones ambientales dentro de los rangos recomendados.</p>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Indicador</th>
                        <th>Temperatura</th>
                        <th>Humedad</th>
                        <th>CO2</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Óptimo</td>
                        <td>{metricas.TEMPERATURA_OPTIMA}°C</td>
                        <td>{metricas.HUMEDAD_OPTIMA}%</td>
                        <td>{metricas.CO2_OPTIMO} ppm </td>
                    </tr>
                    <tr>
                        <td>Aceptable</td>
                        <td>{metricas.TEMPERATURA_ACEPTABLE}°C</td>
                        <td>{metricas.HUMEDAD_ACEPTABLE}%</td>
                        <td>{metricas.CO2_ACEPTABLE} ppm</td>
                    </tr>
                    <tr>
                        <td>Deficiente</td>
                        <td>{metricas.TEMPERATURA_DEFICIENTE}°C</td>
                        <td>{metricas.HUMEDAD_DEFICIENTE}%</td>
                        <td>{metricas.CO2_DEFICIENTE} ppm</td>
                    </tr>
                    <tr>
                        <td>Crítico</td>
                        <td>{metricas.TEMPERATURA_CRITICA}°C</td>
                        <td>{metricas.HUMEDAD_CRITICA}%</td>
                        <td>{metricas.CO2_CRITICO} ppm</td>
                    </tr>
                </tbody>
            </table>
            <div className="mt-4">
                <h2 className='text-center'>Descripción de Indicadores</h2>
                <p className="text-justify"><strong>Óptimo:</strong> Los valores están dentro del rango ideal para un ambiente saludable y eficiente.</p>
                <p className="text-justify"><strong>Aceptable:</strong> Los valores están dentro de un rango tolerable, pero podrían mejorarse para alcanzar condiciones óptimas.</p>
                <p className="text-justify"><strong>Deficiente:</strong> Los valores están fuera del rango aceptable y pueden causar incomodidad o afectar el rendimiento.</p>
                <p className="text-justify"><strong>Crítico:</strong> Los valores están en niveles peligrosos y requieren atención inmediata para evitar riesgos significativos.</p>
            </div>
        </div>
    );
}