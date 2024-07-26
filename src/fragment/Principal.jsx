import React, { useState, useEffect } from 'react';
import BarraMenu from './BarraMenu';
import 'bootstrap/dist/css/bootstrap.min.css';
import ValoresSensores from '../fragment/ValoresSensores';
import DailyCharts from '../utilidades/DailyCharts';
import { Tooltip, IconButton, FormControl, InputLabel, Select, MenuItem, Card, CardContent, Typography } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import DrawerIndicador from '../fragment/DrawerIndicator';
import { Indicadores } from '../fragment/TablaIndicadores';
import { Indicador } from '../fragment/Indicador';
import { PeticionGet } from '../hooks/Conexion';
import * as metricas from '../utilidades/constantes/metricas';
import '../components/css/style.css';

const Principal = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [selectedChart, setSelectedChart] = useState('temperatura');
    const [promedio, setPromedio] = useState({
        temperatura: 0,
        humedad: 0,
        co2: 0,
    });

    const toggleDrawer = (open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setIsDrawerOpen(open);
    };

    const handleChartChange = (event) => {
        setSelectedChart(event.target.value);
    };

    useEffect(() => {
        const fetchPromedio = async () => {
            try {
                const response = await PeticionGet('', 'datos/promedio'); // Llama a la función con la ruta y el token vacío
                if (response.code === 200) {
                    // Redondea los valores a 3 decimales
                    setPromedio({
                        temperatura: parseFloat(response.info.temperatura).toFixed(3),
                        humedad: parseFloat(response.info.humedad).toFixed(3),
                        co2: parseFloat(response.info.co2).toFixed(3),
                    });
                }
            } catch (error) {
                console.error('Error fetching average data:', error);
            }
        };

        fetchPromedio();
    }, []);

    return (
        <div>
            <header>
                <BarraMenu />
            </header>
            <section className="container-fluid d-flex flex-column align-items-center">
                <div className="row mt-4 w-100">
                    <div className="col-md-12 d-flex justify-content-center">
                        <div className="position-relative d-inline-flex align-items-center">
                            <h1 className="text-center mb-0 mx-2">Monitoreo del aire en el Aula Magna</h1>
                        </div>
                    </div>
                </div>

                <div className="row mt-4 w-100 justify-content-center">
                    <div className="row">
                        <div className="col-md-4 d-flex flex-column justify-content-center">
                            <div className="table-responsive">
                                <table className="table table-striped ">
                                    <thead>
                                        <tr>
                                            <th>Indicador</th>
                                            <th>Temperatura</th>
                                            <th>Humedad</th>
                                            <th>CO2 </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className='text-center'>Óptimo</td>
                                            <td className='text-center'>{metricas.TEMPERATURA_OPTIMA}°C</td>
                                            <td className='text-center'>{metricas.HUMEDAD_OPTIMA}%</td>
                                            <td className='text-center'>{metricas.CO2_OPTIMO} ppm </td>
                                        </tr>
                                        <tr>
                                            <td className='text-center'>Aceptable</td>
                                            <td className='text-center'>{metricas.TEMPERATURA_ACEPTABLE}°C</td>
                                            <td className='text-center'>{metricas.HUMEDAD_ACEPTABLE}%</td>
                                            <td className='text-center'>{metricas.CO2_ACEPTABLE} ppm</td>
                                        </tr>
                                        <tr>
                                            <td className='text-center'>Deficiente</td>
                                            <td className='text-center'>{metricas.TEMPERATURA_DEFICIENTE}°C</td>
                                            <td className='text-center'>{metricas.HUMEDAD_DEFICIENTE}%</td>
                                            <td className='text-center'>{metricas.CO2_DEFICIENTE} ppm</td>
                                        </tr>
                                        <tr>
                                            <td className='text-center'>Crítico</td>
                                            <td className='text-center'>{metricas.TEMPERATURA_CRITICA}°C</td>
                                            <td className='text-center'>{metricas.HUMEDAD_CRITICA}%</td>
                                            <td className='text-center'>{metricas.CO2_CRITICO} ppm</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="position-relative d-inline-flex">
                                <p className="text-center">Ver info: </p>
                                <Tooltip
    title="Ver métricas"
>
    <IconButton
        onClick={toggleDrawer(true)}
        style={{
            position: 'absolute',
            top: '-10px',
            left: '80px',
            backgroundColor: '#f0f0f0',
            boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
        }}
    >
        <InfoOutlinedIcon />
    </IconButton>
</Tooltip>

                            </div>
                        </div>
                        <div className="col-md-8 mx-auto">
                            <div className="d-flex flex-column align-items-center">
                                <strong className="mb-3">Indicador actual de la calidad del aire:</strong>
                                <Indicador />
                            </div>
                            <ValoresSensores />
                        </div>
                    </div>
                </div>
                <div className="row mt-4 w-100">
                    <h3 className="text-center mb-4">Gráfica de datos del día</h3>
                    <div className="col-md-8 mb-4" style={{ padding: '25px', marginLeft: '300px' }}>
                        <FormControl fullWidth className="mb-8">
                            <InputLabel id="chart-select-label">Tipo de Gráfica</InputLabel>
                            <Select
                                labelId="chart-select-label"
                                id="chart-select"
                                value={selectedChart}
                                label="Tipo de Gráfica"
                                onChange={handleChartChange}
                            >
                                <MenuItem value="temperatura">Temperatura</MenuItem>
                                <MenuItem value="humedad">Humedad</MenuItem>
                                <MenuItem value="co2">CO2</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div className="d-flex justify-content-center">
                        <div style={{ width: '325px', marginTop: '100px', marginRight: '50px' }}>
                            <Card
                                variant="outlined"
                                style={{
                                    border: '1px solid #ddd',
                                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                                    margin: '1rem',
                                }}
                            >
                                <CardContent>
                                    <Typography
                                        variant="h4"
                                        component="div"
                                        gutterBottom
                                        style={{ marginBottom: '2.5rem' }}
                                    >
                                        Promedio Diario
                                    </Typography>
                                    <Typography
                                        variant="h5"
                                        style={{ marginBottom: '1rem' }}
                                    >
                                        <strong>Temperatura:</strong> {promedio.temperatura} °C
                                    </Typography>
                                    <Typography
                                        variant="h5"
                                        style={{ marginBottom: '1rem' }}
                                    >
                                        <strong>Humedad:</strong> {promedio.humedad} %
                                    </Typography>
                                    <Typography
                                        variant="h5"
                                        style={{ marginBottom: '1rem' }}
                                    >
                                        <strong>CO2:</strong> {promedio.co2} ppm
                                    </Typography>
                                </CardContent>
                            </Card>
                        </div>
                        <div style={{ width: '65%', height: '400px', marginRight: '20px' }}>
                            <DailyCharts selectedChart={selectedChart} />
                        </div>
                    </div>
                </div>
                <DrawerIndicador
                    anchor="right"
                    open={isDrawerOpen}
                    toggleDrawer={toggleDrawer}
                    content={<Indicadores />}
                />
            </section>
        </div>
    );
};

export default Principal;