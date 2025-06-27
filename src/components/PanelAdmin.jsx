import React from 'react';
import RegistrarCita from './RegistrarCita';

const PanelAdmin = ({ usuario, onLogout }) => {
  return (
    <div>
      <h2>Bienvenido Administrador {usuario.username}</h2>
      <button onClick={onLogout}>Cerrar sesión</button>

      <hr />
      <RegistrarCita />
      {/* Luego aquí podrías agregar: <ResumenCitas />, <Estadisticas /> etc. */}
    </div>
  );
};

export default PanelAdmin;
