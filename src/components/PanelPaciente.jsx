// src/components/PanelPaciente.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PanelPaciente = ({ usuario, onLogout }) => {
  const [citas, setCitas] = useState([]);

  useEffect(() => {
    if (usuario?.pacienteId) {
      axios.get(`http://localhost:8080/api/citas/paciente/${usuario.pacienteId}`)
        .then(res => setCitas(res.data))
        .catch(err => console.error('Error al obtener citas:', err));
    }
  }, [usuario]);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Bienvenido, {usuario.username}</h2>
      <p>Estas son tus citas médicas registradas:</p>

      <table border="1" cellPadding="8" style={{ width: '100%', marginTop: '1rem' }}>
        <thead>
          <tr>
            <th>Especialidad</th>
            <th>Fecha</th>
            <th>Hora</th>
          </tr>
        </thead>
        <tbody>
          {citas.map((cita, index) => (
            <tr key={index}>
              <td>{cita.especialidad}</td>
              <td>{cita.fechaCita}</td>
              <td>{cita.horaCita}</td>
            </tr>
          ))}
          {citas.length === 0 && (
            <tr>
              <td colSpan="3">No tienes citas registradas</td>
            </tr>
          )}
        </tbody>
      </table>

      <button onClick={onLogout} style={{ marginTop: '2rem', background: '#005b96', color: '#fff', padding: '0.5rem 1rem', border: 'none', cursor: 'pointer' }}>
        Cerrar sesión
      </button>
    </div>
  );
};

export default PanelPaciente;
