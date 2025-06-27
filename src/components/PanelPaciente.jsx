import React, { useState } from 'react';

const PanelPaciente = ({ usuario, onLogout }) => {
  const [activeView, setActiveView] = useState('inicio');

  return (
    <div className="layout">
      <nav className="sidebar">
        <div>
          <h2>SIS Paciente</h2>
          <a
            href="#"
            className={activeView === 'inicio' ? 'active' : ''}
            onClick={(e) => {
              e.preventDefault();
              setActiveView('inicio');
            }}
          >
            Inicio
          </a>
          <a
            href="#"
            className={activeView === 'citas' ? 'active' : ''}
            onClick={(e) => {
              e.preventDefault();
              setActiveView('citas');
            }}
          >
            Citas
          </a>
        </div>
        <div className="logout">
          <button onClick={onLogout} className="logout-button">🔒 Cerrar sesión</button>
        </div>
      </nav>
      <main className={`main ${window.innerWidth <= 768 ? 'full-width' : ''}`}>
        <button className="menu-toggle" onClick={() => {
          const sidebar = document.querySelector('.sidebar');
          sidebar.classList.toggle('mobile-visible');
        }}>
          ☰
        </button>

        {activeView === 'inicio' && (
          <section>
            <h2>Recomendaciones para tu cita</h2>
            <p>Llega 15 minutos antes. Lleva tu DNI.</p>
          </section>
        )}
        {activeView === 'citas' && (
          <section>
            <h2>Mis Citas</h2>
            <p>Aquí irán tus citas registradas.</p>
          </section>
        )}
      </main>
    </div>
  );
};

export default PanelPaciente;
