// src/components/ResumenAdmin.jsx
import React, { useEffect, useState } from 'react';
import './ResumenAdmin.css';
import {
  getTotalCitas,
  getCitasPorEspecialidad,
  getCitasPorFecha
} from '../services/citaService';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const ResumenAdmin = () => {
  const [totalCitas, setTotalCitas] = useState(0);
  const [citasPorEspecialidad, setCitasPorEspecialidad] = useState([]);
  const [citasPorFecha, setCitasPorFecha] = useState([]);
  const [citas, setCitas] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const todasCitas = await getTotalCitas();
      setTotalCitas(todasCitas.length);
      setCitas(todasCitas);

      // Agrupar por especialidad
      const especialidadMap = {};
      todasCitas.forEach(cita => {
        especialidadMap[cita.especialidad] = (especialidadMap[cita.especialidad] || 0) + 1;
      });
      const especialidades = Object.entries(especialidadMap).map(([especialidad, cantidad]) => ({
        especialidad,
        cantidad
      }));
      setCitasPorEspecialidad(especialidades);

      // Agrupar por fecha
      const fechaMap = {};
      todasCitas.forEach(cita => {
        fechaMap[cita.fechaCita] = (fechaMap[cita.fechaCita] || 0) + 1;
      });
      const fechas = Object.entries(fechaMap).map(([fecha, cantidad]) => ({
        fecha,
        cantidad
      }));
      setCitasPorFecha(fechas);
    };

    fetchData();
  }, []);

  const pieData = {
    labels: citasPorEspecialidad.map(e => e.especialidad),
    datasets: [
      {
        data: citasPorEspecialidad.map(e => e.cantidad),
        backgroundColor: ['#007bff', '#3399ff', '#66b3ff', '#99ccff', '#cce6ff']
      }
    ]
  };

  const barData = {
    labels: citasPorFecha.map(f => f.fecha),
    datasets: [
      {
        label: 'Citas por Día',
        data: citasPorFecha.map(f => f.cantidad),
        backgroundColor: '#3399ff'
      }
    ]
  };

  return (
    <div className="resumen-admin">
      {/* Fila 1: 3 tarjetas */}
      <div className="cards-row">
        <div className="card card-1">
          <h4>Total de Citas</h4>
          <p>{totalCitas}</p>
          <small style={{ color: '#007bff' }}>Últimos 30 días</small>
        </div>

        <div className="card card-2">
          <h4>Citas por Especialidad</h4>
          <table className="tabla-limpia">
            <tbody>
              {citasPorEspecialidad.map((e, i) => (
                <tr key={i}>
                  <td>{e.especialidad}</td>
                  <td style={{ textAlign: 'right' }}>{e.cantidad}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="card card-3">
          <h4>Citas por Día</h4>
          <table className="tabla-limpia">
            <tbody>
              {citasPorFecha.map((f, i) => (
                <tr key={i}>
                  <td>{f.fecha}</td>
                  <td style={{ textAlign: 'right' }}>{f.cantidad}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Fila 2: Gráficos */}
      <div className="charts-row">
        <div className="card chart-card">
          <h4 style={{ textAlign: 'center' }}>Distribución por Especialidad</h4>
          <Pie data={pieData} />
        </div>
        <div className="card chart-card">
          <h4>Citas por Día</h4>
          <Bar data={barData} />
        </div>
      </div>

      {/* Fila 3: Tabla de citas */}
      <div className="tabla-citas">
        <h4 style={{ marginTop: '30px' }}>Listado de Citas</h4>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>DNI Paciente</th>
              <th>Especialidad</th>
              <th>Médico</th>
              <th>Fecha</th>
              <th>Hora</th>
            </tr>
          </thead>
          <tbody>
            {citas.map(cita => (
              <tr key={cita.id}>
                <td>{cita.id}</td>
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

export default ResumenAdmin;
