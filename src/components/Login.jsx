import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ onLogin }) => {
  const [form, setForm] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:8080/api/auth/login', form);
      onLogin(res.data); // usuario con id, username, rol...
    } catch (err) {
      alert('Usuario o contraseña incorrectos');
    }
  };

  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>
      <input type="text" name="username" placeholder="Usuario" onChange={handleChange} />
      <input type="password" name="password" placeholder="Contraseña" onChange={handleChange} />
      <button onClick={handleLogin}>Ingresar</button>
    </div>
  );
};

export default Login;
