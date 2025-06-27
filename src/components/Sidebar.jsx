import React from 'react';
import './Sidebar.css';

const Sidebar = ({ tipo, vista, setVista, onLogout, isMobileVisible }) => {
  const isMobile = window.innerWidth <= 768;
  const sidebarClass = `sidebar ${isMobile ? (isMobileVisible ? 'mobile-visible' : 'mobile-hidden') : ''}`;

  const menuItems = tipo === 'ADMIN'
    ? [
        { label: 'Inicio', key: 'inicio' },
        { label: 'Registrar Cita', key: 'registrar' },
        { label: 'Resumen', key: 'resumen' },
      ]
    : [
        { label: 'Inicio', key: 'inicio' },
        { label: 'Citas', key: 'citas' },
      ];

  return (
    <nav className={sidebarClass}>
      <div>
        <h2>{tipo === 'ADMIN' ? 'SIS Admin' : 'SIS Paciente'}</h2>
        {menuItems.map((item) => (
          <a
            href="#"
            key={item.key}
            className={vista === item.key ? 'active' : ''}
            onClick={(e) => {
              e.preventDefault();
              setVista(item.key);
            }}
          >
            {item.label}
          </a>
        ))}
      </div>
      <div className="logout">
        <button onClick={onLogout} className="logout-button">🔒 Cerrar sesión</button>
      </div>
    </nav>
  );
};

export default Sidebar;
