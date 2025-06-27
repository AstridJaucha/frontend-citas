import React from 'react';
import './Sidebar.css';

const Sidebar = ({ tipo, vista, setVista, onLogout, isMobileVisible, isMobile = false, cerrarSidebar }) => {
  const handleClick = (view) => {
    setVista(view);
    if (isMobile && cerrarSidebar) {
      cerrarSidebar(); // Oculta el sidebar solo en móvil
    }
  };

  const renderLinks = () => {
    if (tipo === 'ADMIN') {
      return (
        <>
          <a
            href="#"
            className={vista === 'inicio' ? 'active' : ''}
            onClick={(e) => {
              e.preventDefault();
              handleClick('inicio');
            }}
          >
            Inicio
          </a>
          <a
            href="#"
            className={vista === 'registrar' ? 'active' : ''}
            onClick={(e) => {
              e.preventDefault();
              handleClick('registrar');
            }}
          >
            Registrar Cita
          </a>
          <a
            href="#"
            className={vista === 'resumen' ? 'active' : ''}
            onClick={(e) => {
              e.preventDefault();
              handleClick('resumen');
            }}
          >
            Resumen
          </a>
        </>
      );
    }

    if (tipo === 'PACIENTE') {
      return (
        <>
          <a
            href="#"
            className={vista === 'inicio' ? 'active' : ''}
            onClick={(e) => {
              e.preventDefault();
              handleClick('inicio');
            }}
          >
            Inicio
          </a>
          <a
            href="#"
            className={vista === 'citas' ? 'active' : ''}
            onClick={(e) => {
              e.preventDefault();
              handleClick('citas');
            }}
          >
            Citas
          </a>
        </>
      );
    }

    return null;
  };

  return (
    <nav className={`sidebar ${isMobile ? (isMobileVisible ? 'mobile-visible' : 'mobile-hidden') : ''}`}>
      <div>
        <h2>{tipo === 'ADMIN' ? 'SIS Admin' : 'SIS Paciente'}</h2>
        {renderLinks()}
      </div>
      <div className="logout">
        <button onClick={onLogout} className="logout-button">🔒 Cerrar sesión</button>
      </div>
    </nav>
  );
};

export default Sidebar;
