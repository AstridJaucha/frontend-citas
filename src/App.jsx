import React, { useState } from 'react';
import Login from './components/Login';
import LayoutAdmin from './components/LayoutAdmin';
import LayoutPaciente from './components/LayoutPaciente';

function App() {
  const [usuario, setUsuario] = useState(null);
  const [vista, setVista] = useState('inicio');

  const handleLogin = (userData) => {
    setUsuario(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('usuario');
    setUsuario(null);
    setVista('inicio');
  };

  if (!usuario) {
    return <Login onLogin={handleLogin} />;
  }

  if (usuario.rol === 'ADMIN') {
    return (
      <LayoutAdmin vista={vista} setVista={setVista} usuario={usuario} onLogout={handleLogout} />
    );
  }

  if (usuario.rol === 'PACIENTE') {
    return (
      <LayoutPaciente vista={vista} setVista={setVista} usuario={usuario} onLogout={handleLogout} />
    );
  }

  return <div>Rol no reconocido</div>;
}

export default App;
