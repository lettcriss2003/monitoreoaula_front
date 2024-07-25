import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import GaugeChart from 'react-gauge-chart';
import { PeticionGetSinToken } from '../hooks/Conexion';
import { TIMEREFETCHING } from './constantes/refetching';
const ValoresSensores = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState({ temperatura: null, humedad: null, co2: null });

    useEffect(() => {
        const fetchData = () => {
            PeticionGetSinToken('/datos/ultimosDatos').then(response => {
                const { temperatura, humedad, co2 } = response.info;
                const newData = {
                    temperatura: parseFloat(temperatura.dato),
                    humedad: parseFloat(humedad.dato),
                    co2: parseFloat(co2.dato),
                };
                setData(newData);
                setIsLoading(false);
            });
        };

        fetchData();

        const interval = setInterval(fetchData, TIMEREFETCHING);

        return () => clearInterval(interval);
    }, []);

    const gaugeProps = {
        nrOfLevels: 20,
        arcsLength: [0.3, 0.5, 0.2],
        arcPadding: 0.02,
        cornerRadius: 3,
        textColor: '#000000',
    };

    const gaugeColors = {
        temperatura: ['#5BE12C', '#F5CD19', '#EA4228'], // Colores originales
        humedad: ['#2A93D5', '#2268A9', '#1A3C6D'],   // Azules para humedad
        co2: ['#FF7F50', '#FF6347', '#CD5C5C'],       // Rojos para CO2
    };

    return (
        <div className="d-flex flex-row justify-content-center align-items-center mb-4">
            {isLoading ? (
                <div className="text-center w-100">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (
                <div className="d-flex flex-wrap justify-content-center">
                    <div className="text-center m-2">
                        <p>TEMPERATURA</p>
                        <GaugeChart 
                            {...gaugeProps}
                            id="gauge-temperatura"
                            percent={data.temperatura}
                            colors={gaugeColors.temperatura}
                            formatTextValue={(value) => `${data.temperatura.toFixed(2)}°`}
                        />
                    </div>
                    <div className="text-center m-2">
                        <p>HUMEDAD</p>
                        <GaugeChart 
                            {...gaugeProps}
                            id="gauge-humedad"
                            percent={data.humedad}
                            colors={gaugeColors.humedad}
                            formatTextValue={(value) => `${data.humedad.toFixed(2)}%`}
                        />
                    </div>
                    <div className="text-center m-2">
                        <p>CO2</p>
                        <GaugeChart 
                            {...gaugeProps}
                            id="gauge-co2"
                            percent={data.co2}
                            colors={gaugeColors.co2}
                            formatTextValue={(value) => `${data.co2.toFixed(2)} ppm`}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default ValoresSensores;
