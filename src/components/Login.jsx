// src/components/Login.jsx
import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';

const Login = ({ onLogin }) => {
  const [form, setForm] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const login = async () => {
    try {
      const res = await axios.post('http://localhost:8080/api/auth/login', form);
      const usuario = res.data;
      localStorage.setItem('usuario', JSON.stringify(usuario));
      onLogin(usuario);
    } catch (error) {
      alert('Credenciales incorrectas');
    }
  };

  return (
    <div className="login-page">
      <div className="login-wrapper">
        
        <div className="login-container">
          <h1 className="login-title">Sistema Integral de Salud</h1>
        <h2 className="login-subtitle">Citas Médicas</h2>
        <h3>Iniciar Sesión</h3>
          <input
            type="text"
            name="username"
            placeholder="Usuario"
            value={form.username}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={form.password}
            onChange={handleChange}
          />
          <button onClick={login}>Ingresar</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
