import axios from 'axios';

const API_URL = 'http://localhost:8080/api/citas';

export const listarCitasPorPaciente = async (pacienteId) => {
  const response = await axios.get(`${API_URL}/paciente/${pacienteId}`);
  return response.data;
};
