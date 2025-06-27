import React, { useState } from 'react';
import Login from './components/Login';
import PanelAdmin from './components/PanelAdmin';
import PanelPaciente from './components/PanelPaciente';

function App() {
  const [usuario, setUsuario] = useState(null);

  const handleLogin = (userData) => {
    setUsuario(userData);
  };

  const handleLogout = () => {
    setUsuario(null);
    localStorage.removeItem('usuario');
  };

  if (!usuario) {
    return <Login onLogin={handleLogin} />;
  }

  if (usuario.rol === 'ADMIN') {
    return <PanelAdmin usuario={usuario} onLogout={handleLogout} />;
  } else if (usuario.rol === 'PACIENTE') {
    return <PanelPaciente usuario={usuario} onLogout={handleLogout} />;
  }

  return <div>Rol no reconocido</div>;
}

export default App;
