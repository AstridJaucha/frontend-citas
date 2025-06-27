import axios from 'axios';

const API_URL = 'http://localhost:8080/api/doctores';

export const listarPorEspecialidad = async (especialidad) => {
  const res = await axios.get(`${API_URL}/especialidad/${especialidad}`);
  return res.data;
};
