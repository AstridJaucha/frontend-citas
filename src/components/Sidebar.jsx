// Sidebar.jsx
import React from 'react';
import './Sidebar.css';

const Sidebar = ({ tipo, vista, setVista, onLogout, isMobileVisible }) => {
  const handleClick = (view) => {
    setVista(view);
  };

  return (
    <nav className={`sidebar ${isMobileVisible ? 'mobile-visible' : 'mobile-hidden'}`}>
      <div>
        <h2>{tipo === 'PACIENTE' ? 'SIS Paciente' : 'SIS Admin'}</h2>

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

        {tipo === 'PACIENTE' && (
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
        )}

        {tipo === 'ADMIN' && (
          <>
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
        )}
      </div>

      <div className="logout">
        <button onClick={onLogout} className="logout-button">🔒 Cerrar sesión</button>
      </div>
    </nav>
  );
};

export default Sidebar;
