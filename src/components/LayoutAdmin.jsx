import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import './LayoutAdmin.css';
import CitasTabla from './CitasTabla';
import RegistrarCita from './RegistrarCita';

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
    if (vista === 'inicio') return <section><h2>Bienvenido, {usuario.username}</h2></section>;
    if (vista === 'registrar') return <RegistrarCita />;
    if (vista === 'resumen') return <CitasTabla />;
    return null;
  };

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar
        tipo="ADMIN"
        vista={vista}
        setVista={(vistaSeleccionada) => {
          setVista(vistaSeleccionada);
          if (isMobile) setSidebarVisible(false); // Cerrar en móvil tras click
        }}
        onLogout={onLogout}
        isMobileVisible={sidebarVisible}
      />

      <main className={`main ${isMobile && !sidebarVisible ? 'full-width' : ''}`}>
        {isMobile && (
          <button className="menu-toggle" onClick={toggleSidebar}>
            ☰
          </button>
        )}
        {renderVista()}
      </main>
    </div>
  );
};

export default LayoutAdmin;
