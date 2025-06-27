// src/components/Login.jsx
import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ onLogin }) => {
  const [form, setForm] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const login = async () => {
    try {
      const res = await axios.post('http://localhost:8080/api/auth/login', form);
      const usuario = res.data;

      // Guardar en localStorage si quieres mantener sesión
      localStorage.setItem('usuario', JSON.stringify(usuario));

      // Ejecutar el login
      onLogin(usuario);
    } catch (error) {
      alert('Credenciales incorrectas');
    }
  };

  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>
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
  );
};

export default Login;
