// src/components/InicioAdmin.jsx
import React, { useEffect, useState } from 'react';
import './InicioAdmin.css';
import {
  obtenerTodasLasCitas,
  obtenerCitasDeHoy,
  obtenerCitasPorEspecialidad,
  obtenerCitasPorFecha,
  obtenerProximasCitas
} from '../services/citaService';
import { getTotalPacientes } from '../services/pacienteService';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const InicioAdmin = () => {
  const [totales, setTotales] = useState({ citas: 0, hoy: 0, pacientes: 0 });
  const [especialidades, setEspecialidades] = useState([]);
  const [fechas, setFechas] = useState([]);
  const [proximas, setProximas] = useState([]);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const citasTotales = await obtenerTodasLasCitas();
        const citasHoy = await obtenerCitasDeHoy();
        const pacientes = await getTotalPacientes();
        const especialidades = await obtenerCitasPorEspecialidad();
        const fechas = await obtenerCitasPorFecha();
        const proximas = await obtenerProximasCitas();

        setTotales({
          citas: citasTotales.length,
          hoy: citasHoy.length,
          pacientes: pacientes.length
        });
        setEspecialidades(especialidades);
        setFechas(fechas);
        setProximas(proximas);
      } catch (err) {
        console.error('Error al cargar los datos del dashboard', err);
      }
    };

    cargarDatos();
  }, []);

  const dataPorDia = {
    labels: fechas.map(f => f.fecha),
    datasets: [
      {
        label: 'Citas por Día',
        data: fechas.map(f => f.cantidad),
        backgroundColor: '#3399ff'
      }
    ]
  };

  const dataPorEspecialidad = {
    labels: especialidades.map(e => e.especialidad),
    datasets: [
      {
        label: 'Citas por Especialidad',
        data: especialidades.map(e => e.cantidad),
        backgroundColor: '#66bb6a'
      }
    ]
  };

  return (
    <div className="inicio-admin">
      <div className="cards">
        <div className="card">
          <h4>Citas Hoy</h4>
          <p>{totales.hoy}</p>
        </div>
        <div className="card">
          <h4>Total Citas</h4>
          <p>{totales.citas}</p>
        </div>
        <div className="card">
          <h4>Total Pacientes</h4>
          <p>{totales.pacientes}</p>
        </div>
      </div>

      <div className="charts">
        <div className="chart">
          <h4>Citas por Día</h4>
          <Bar data={dataPorDia} />
        </div>
        <div className="chart">
          <h4>Citas por Especialidad</h4>
          <Bar data={dataPorEspecialidad} />
        </div>
      </div>

      <div className="table-container">
        <h4>Próximas Citas</h4>
        <table>
          <thead>
            <tr>
              <th>DNI</th>
              <th>Especialidad</th>
              <th>Médico</th>
              <th>Fecha</th>
              <th>Hora</th>
            </tr>
          </thead>
          <tbody>
            {proximas.map((cita) => (
              <tr key={cita.id}>
                <td>{cita.dniPaciente}</td>
                <td>{cita.especialidad}</td>
                <td>{cita.medico}</td>
                <td>{cita.fechaCita}</td>
                <td>{cita.horaCita}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InicioAdmin;
