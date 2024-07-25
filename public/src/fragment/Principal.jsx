import React, { useState } from 'react';
import BarraMenu from "./BarraMenu";
import 'bootstrap/dist/css/bootstrap.min.css';
import ValoresSensores from '../components/ValoresSensores';
import ChartComponent from '../components/Chart';
// import { tempData, humidityData, co2Data } from '../components/data';
import { Tooltip, IconButton, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import DrawerIndicador from '../components/DrawerIndicator';
import { Indicadores } from '../components/TablaIndicadores';
import { Indicador } from '../components/Indicador';

const Principal = () => {

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [selectedChart, setSelectedChart] = useState('temperatura');

    const toggleDrawer = (open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setIsDrawerOpen(open);
    };

    const handleChartChange = (event) => {
        setSelectedChart(event.target.value);
    };

    const getChartData = () => {
        switch (selectedChart) {
            case 'temperatura':
                return { title: "TEMPERATURA" , color: "#FFD800", uri: "datos/temperaturaDia" };
            case 'humedad':
                return { title: "HUMEDAD", color: "#0070FF", uri: "datos/humedadDia"};
            case 'co2':
                return { title: "CO2", color: "#1300FF", uri: "datos/co2Dia"};
            default:
                return { title: "TEMPERATURA", color: "#FFD800", uri: "datos/temperaturaDia"};
        }
    };


    return (
        <div>
            <header>
                <BarraMenu />
            </header>
            <section className="container d-flex flex-column align-items-center">
                <div className="row mt-4 w-100">
                   <div className="col-md-12 d-flex justify-content-center">
                        <div className="position-relative d-inline-flex align-items-center">
                            <h1 className="text-center mb-0 mx-2">Monitoreo del aire en el Aula Magna</h1>
                            <Tooltip title="Ver métricas">
                                <IconButton
                                    onClick={toggleDrawer(true)}
                                    style={{
                                        position: 'absolute',
                                        top: '-10px',
                                        right: '-40px',
                                        backgroundColor: '#f0f0f0',
                                        boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
                                    }}
                                >
                                    <InfoOutlinedIcon />
                                </IconButton>
                            </Tooltip>
                        </div>
                    </div>
                </div>
                <div className="d-flex flex-column align-items-center mt-5">
                    <strong className="mb-3">Indicador actual de la calidad del aire:</strong>
                    <Indicador/>
                </div>
                <div className="row mt-4 w-100 justify-content-center">
                    <ValoresSensores />
                </div>
                <div className="row mt-4 w-100">
                    <div className="col-md-12">
                        <h3 className="text-center mb-4">Promedio por día</h3>
                        <FormControl fullWidth className="mb-4">
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
                        <div className="d-flex flex-column justify-content-center w-100">
                            <ChartComponent {...getChartData()} />
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
}

export default Principal;