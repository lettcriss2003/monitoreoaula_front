import React, { useState, useEffect } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { PeticionGetSinToken } from '../hooks/Conexion';
import * as metricas from './constantes/metricas';
import { TIMEREFETCHING } from './constantes/refetching';
export const Indicador = () => {
    const [nivelGeneral, setNivelGeneral] = useState();

    useEffect(() => {
        const fetchData = () => {
            PeticionGetSinToken('/datos/ultimosDatos').then(response => {
                const { temperatura, humedad, co2 } = response.info;
                const tempValue = parseFloat(temperatura.dato);
                const humedadValue = parseFloat(humedad.dato);
                const co2Value = parseFloat(co2.dato);

                const nivel = determinarNivelGeneral(tempValue, humedadValue, co2Value);
                setNivelGeneral(nivel);
            });
        };

        fetchData();

        const interval = setInterval(fetchData, TIMEREFETCHING);
        return () => clearInterval(interval);
    }, []);

    const determinarNivelGeneral = (temperatura, humedad, co2) => {
        if (temperatura > metricas.TEMPERATURA_CRITICA || humedad > metricas.HUMEDAD_CRITICA || co2 > metricas.CO2_CRITICO) {
            return 'Crítico';
        } else if (temperatura > metricas.TEMPERATURA_DEFICIENTE || humedad > metricas.HUMEDAD_DEFICIENTE || co2 > metricas.CO2_DEFICIENTE) {
            return 'Deficiente';
        } else if (temperatura > metricas.TEMPERATURA_ACEPTABLE || humedad > metricas.HUMEDAD_ACEPTABLE || co2 > metricas.CO2_ACEPTABLE) {
            return 'Aceptable';
        } else {
            return 'Óptimo';
        }
    };

    return (
        <div className="p-2 mb-2 rounded">
            <ToggleButtonGroup
                value={nivelGeneral}
                exclusive
                aria-label="Indicador General"
            >
                <ToggleButton
                    value="Óptimo"
                    disabled={nivelGeneral !== 'Óptimo'}
                    className={`btn ${nivelGeneral === 'Óptimo' ? 'bg-success text-white' : ''}`}
                >
                    Óptimo
                </ToggleButton>
                <ToggleButton
                    value="Aceptable"
                    disabled={nivelGeneral !== 'Aceptable'}
                    className={`btn ${nivelGeneral === 'Aceptable' ? 'bg-info text-white' : ''}`}
                >
                    Aceptable
                </ToggleButton>
                <ToggleButton
                    value="Deficiente"
                    disabled={nivelGeneral !== 'Deficiente'}
                    className={`btn ${nivelGeneral === 'Deficiente' ? 'bg-warning text-dark' : ''}`}
                >
                    Deficiente
                </ToggleButton>
                <ToggleButton
                    value="Crítico"
                    disabled={nivelGeneral !== 'Crítico'}
                    className={`btn ${nivelGeneral === 'Crítico' ? 'bg-danger text-white' : ''}`}
                >
                    Crítico
                </ToggleButton>
            </ToggleButtonGroup>
        </div>
    );
};
