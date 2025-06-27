import React, { useState } from 'react';
import Sidebar from './Sidebar';
import RegistrarCita from './RegistrarCita';

const PanelAdmin = ({ usuario, onLogout }) => {
  const [activeView, setActiveView] = useState('inicio');

  const handleNavigate = (view) => {
    setActiveView(view);
  };

  return (
    <div className="layout">
      <Sidebar onNavigate={handleNavigate} activeView={activeView} onLogout={onLogout} />
      <main className={`main ${window.innerWidth <= 768 ? 'full-width' : ''}`}>
        <button className="menu-toggle" onClick={() => {
          const sidebar = document.querySelector('.sidebar');
          sidebar.classList.toggle('mobile-visible');
        }}>
          ☰
        </button>

        {activeView === 'inicio' && (
          <section>
            <h2>Bienvenido, {usuario.username}</h2>
            <p>Seleccione una opción del menú para comenzar.</p>
          </section>
        )}
        {activeView === 'registrar' && <RegistrarCita />}
        {activeView === 'resumen' && (
          <section>
            <h2>Resumen (Próximamente)</h2>
            <p>Estadísticas y gráficos irán aquí.</p>
          </section>
        )}
      </main>
    </div>
  );
};

export default PanelAdmin;
