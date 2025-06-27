import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ setUsuario }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const iniciarSesion = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/usuarios/login', {
        username,
        password
      });
      const usuario = response.data;
      setUsuario(usuario); // Guardamos el usuario en App.jsx
      if (usuario.rol === 'ADMIN') {
        navigate('/admin');
      } else {
        navigate('/paciente');
      }
    } catch (error) {
      alert('❌ Credenciales incorrectas');
    }
  };

  return (
    <div className="form-container">
      <h2>Iniciar Sesión</h2>
      <label>Usuario:</label>
      <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
      <label>Contraseña:</label>
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={iniciarSesion}>Ingresar</button>
    </div>
  );
};

export default Login;
