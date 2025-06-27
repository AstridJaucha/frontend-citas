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
