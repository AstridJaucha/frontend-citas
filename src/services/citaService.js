// src/services/citaService.js
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/citas';

export const registrarCita = async (cita) => {
  const res = await axios.post(API_URL, cita);
  return res.data;
};

export const obtenerCitasPorPaciente = async (pacienteId) => {
  const res = await axios.get(`${API_URL}/paciente/${pacienteId}`);
  return res.data;
};

export const obtenerTodasLasCitas = async () => {
  const res = await axios.get(`${API_URL}/detallado`);
  return res.data;
};

// FUNCIONES ADICIONALES para estadísticas del administrador
export const obtenerCitasDeHoy = async () => {
  const hoy = new Date().toISOString().split('T')[0];
  const res = await axios.get(`${API_URL}/fecha?fecha=${hoy}`);
  return res.data;
};

export const getCitasPorFecha = async () => {
  const res = await axios.get(`http://localhost:8080/api/citas`);
  return res.data;
};

export const getTotalCitas = async () => {
  const res = await axios.get('http://localhost:8080/api/citas');
  return res.data;
};

export const getCitasPorEspecialidad = async () => {
  const res = await axios.get(`${API_URL}`);
  return res.data;
};


export const obtenerCitasPorEspecialidad = async () => {
  const res = await axios.get(API_URL);
  const agrupadas = {};

  res.data.forEach(cita => {
    agrupadas[cita.especialidad] = (agrupadas[cita.especialidad] || 0) + 1;
  });

  return Object.entries(agrupadas).map(([especialidad, cantidad]) => ({ especialidad, cantidad }));
};

export const obtenerCitasPorFecha = async () => {
  const res = await axios.get(API_URL);
  const agrupadas = {};

  res.data.forEach(cita => {
    agrupadas[cita.fechaCita] = (agrupadas[cita.fechaCita] || 0) + 1;
  });

  return Object.entries(agrupadas).map(([fecha, cantidad]) => ({ fecha, cantidad }));
};

export const obtenerProximasCitas = async () => {
  const res = await axios.get(API_URL);
  const hoy = new Date();
  return res.data
    .filter(cita => new Date(cita.fechaCita) >= hoy)
    .sort((a, b) => new Date(a.fechaCita) - new Date(b.fechaCita))
    .slice(0, 5);
};
