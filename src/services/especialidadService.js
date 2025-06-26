import axios from 'axios';

export const listarEspecialidades = async () => {
  const res = await axios.get('http://localhost:8080/api/especialidades');
  return res.data;
};
