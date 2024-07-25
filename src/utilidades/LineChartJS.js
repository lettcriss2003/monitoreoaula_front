import { Line } from 'react-chartjs-2';
import React, { useRef } from 'react';
import ExportOptions from './ExportOptions';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

export default function LineChartJS({ data, dispositivos, nombreFoto }) {
    const chartRef = useRef(null);
    const generarDatosYOptions = (dataDispositivo) => {
        const midata = {
            labels: dataDispositivo.listacolumna1.datos,
            datasets: [
                {
                    label: dataDispositivo.listacolumna2.nombreColumna,
                    data: dataDispositivo.listacolumna2.datos,
                    tension: 0.5,
                    fill: true,
                    borderColor: 'rgb(12, 35, 65)',

                    backgroundColor: 'rgba(12, 35, 65, 0.5)',
                    pointRadius: 5,
                    pointBorderColor: 'rgba(12, 35, 65)',
                    pointBackgroundColor: 'rgba(12, 35, 65)',
                }
            ],
        };

        const misoptions = {
            scales: {
                y: {
                    min: 0
                },
                x: {
                    ticks: { color: 'rgb(12, 35, 65)' }
                }
            }
        };

        return { midata, misoptions };
    };

    return (
        <div className="flex-fill w-100">
            <div className="shadow-lg flex-fill w-100 mb-2" ref={chartRef}>
                <h5 className="texto-primario-h3 mb-0">GRAFICAS DE DATOS DIARIAS Y SEMANALES</h5>
                {data.dataPorDispositivos && Object.values(data.dataPorDispositivos).map((dataDispositivo, index) => {
                    const { midata, misoptions } = generarDatosYOptions(dataDispositivo);
                    return (
                        <div className="w-100 mb-2">
                            <h5 className="texto-primario-h3 mb-0">{dataDispositivo.nombre.toUpperCase()}</h5>
                            <div className="card-body d-flex w-100 p-4">
                                <Line data={midata} options={misoptions} />
                            </div>
                        </div>
                    );
                })}
            </div>
            <h5 className="texto-primario-h3 mb-0">EXPORTAR DATOS SEMANALES</h5>
            <div className='p-4'>
                <div className="shadow-lg w-100 p-2 mb-2 ">
                    <ExportOptions chartRef={chartRef} nombreFoto={nombreFoto} />
                </div>
            </div>
        </div>
  );
}