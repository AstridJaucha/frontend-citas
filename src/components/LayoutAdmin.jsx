import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import RegistrarCita from './RegistrarCita';
import CitasTabla from './CitasTabla';
import './LayoutAdmin.css';

const LayoutAdmin = ({ vista, setVista, usuario, onLogout }) => {
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
    if (vista === 'inicio') return <h2>Bienvenido, {usuario.username}</h2>;
    if (vista === 'registrar') return <RegistrarCita />;
    if (vista === 'resumen') return <CitasTabla />;
    return null;
  };

  return (
    <div style={{ display: 'flex' }}>
      {isMobile && (
        <button className="menu-toggle" onClick={toggleSidebar}>☰</button>
      )}
      <Sidebar
        tipo="ADMIN"
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

export default LayoutAdmin;
