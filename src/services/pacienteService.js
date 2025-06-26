import axios from 'axios';

const API_URL = 'http://localhost:8080/api/pacientes';

export const buscarPorDni = async (dni) => {
  try {
    const res = await axios.get(`${API_URL}/dni/${dni}`);
    return res.data;
  } catch (error) {
  console.error(error.response?.data || error.message);
  throw error;

  }
};
