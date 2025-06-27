// src/components/CitasTabla.jsx
import React, { useEffect, useState } from 'react';
import { obtenerTodasLasCitas } from '../services/citaService';
import './CitasTabla.css';

const CitasTabla = () => {
  const [citas, setCitas] = useState([]);

  useEffect(() => {
    const fetchCitas = async () => {
      try {
        const data = await obtenerTodasLasCitas();
        setCitas(data);
      } catch (err) {
        console.error('Error al obtener citas:', err);
      }
    };
    fetchCitas();
  }, []);

  return (
    <div className="tabla-citas-container">
      <h2>Listado de Citas</h2>
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
          {citas.length === 0 ? (
            <tr>
              <td colSpan="6">No hay citas registradas.</td>
            </tr>
          ) : (
            citas.map((cita) => (
              <tr key={cita.id}>
                <td>{cita.id}</td>
                <td>{cita.dniPaciente}</td>
                <td>{cita.especialidad}</td>
                <td>{cita.medico}</td>
                <td>{cita.fechaCita}</td>
                <td>{cita.horaCita}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CitasTabla;
