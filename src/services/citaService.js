import axios from 'axios';

const API_URL = 'http://localhost:8080/api/citas';

export const getCitasPorPaciente = async (pacienteId) => {
  try {
    const response = await axios.get(`${API_URL}/paciente/${pacienteId}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener citas:', error);
    return [];
  }
};
