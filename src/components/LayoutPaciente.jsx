import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import './LayoutAdmin.css';

const LayoutPaciente = ({ vista, setVista, usuario, onLogout }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [sidebarVisible, setSidebarVisible] = useState(window.innerWidth > 768);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      setSidebarVisible(!mobile);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setSidebarVisible((prev) => !prev);
  };

  const renderVista = () => {
    if (vista === 'inicio') {
      return (
        <section>
          <h2>Recomendaciones para tu cita</h2>
          <p>Llega 15 minutos antes. Lleva tu DNI.</p>
        </section>
      );
    }

    if (vista === 'citas') {
      return (
        <section>
          <h2>Mis Citas</h2>
          <p>Aquí irán tus citas registradas.</p>
        </section>
      );
    }

    return null;
  };

  return (
    <div style={{ display: 'flex' }}>
      {isMobile && (
        <button className="menu-toggle" onClick={toggleSidebar}>☰</button>
      )}
      <Sidebar
        tipo="PACIENTE"
        vista={vista}
        setVista={setVista}
        onLogout={onLogout}
        isMobileVisible={sidebarVisible}
      />
      <main className={`main ${isMobile && !sidebarVisible ? 'full-width' : ''}`}>
        {renderVista()}
      </main>
    </div>
  );
};

export default LayoutPaciente;
