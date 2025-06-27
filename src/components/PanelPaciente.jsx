import React from 'react';

const PanelPaciente = ({ usuario, onLogout }) => {
  return (
    <div>
      <h2>Bienvenido {usuario.username}</h2>
      <p>En esta sección podrás revisar tus citas (por implementar)</p>
      <button onClick={onLogout}>Cerrar sesión</button>
    </div>
  );
};

export default PanelPaciente;
