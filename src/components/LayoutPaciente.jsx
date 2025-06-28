import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import './LayoutAdmin.css';
import axios from 'axios';

const LayoutPaciente = ({ vista, setVista, usuario, onLogout }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [sidebarVisible, setSidebarVisible] = useState(window.innerWidth > 768);
  const [citas, setCitas] = useState([]);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      setSidebarVisible(!mobile);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (vista === 'citas') {
      axios
        .get(`http://localhost:8080/api/citas/paciente/${usuario.pacienteId}`)
        .then(res => setCitas(res.data))
        .catch(err => {
          console.error('Error al cargar citas', err);
          setCitas([]);
        });
    }
  }, [vista, usuario.pacienteId]);

  const toggleSidebar = () => {
    setSidebarVisible(prev => !prev);
  };

  const handleNavigate = (view) => {
    setVista(view);
    if (isMobile) {
      setSidebarVisible(false); // Oculta el sidebar al hacer clic
    }
  };

  const renderVista = () => {
    if (vista === 'inicio') {
      return (
        <section>
          <h2>Recomendaciones para tu cita</h2>
          <ul>
            <li>Llega 15 minutos antes de tu cita.</li>
            <li>Lleva tu DNI.</li>
            <li>Si no puedes asistir, comunícate con anticipación.</li>
          </ul>
        </section>
      );
    }

    if (vista === 'citas') {
      return (
        <section>
          <h2>Mis Citas</h2>
          {citas.length === 0 ? (
            <p>No tienes citas registradas.</p>
          ) : (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
              {citas.map((cita) => (
                <div
                  key={cita.id}
                  style={{
                    background: 'white',
                    padding: '15px',
                    borderRadius: '8px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    width: '100%',
                    maxWidth: '300px',
                  }}
                >
                  <h4>{cita.especialidad}</h4>
                  <p><strong>Médico:</strong> {cita.medico}</p>
                  <p><strong>Fecha:</strong> {cita.fechaCita}</p>
                  <p><strong>Hora:</strong> {cita.horaCita}</p>
                </div>
              ))}
            </div>
          )}
        </section>
      );
    }

    return null;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {isMobile && !sidebarVisible && (
        <button
          className={`menu-toggle`}
          onClick={toggleSidebar}
        >
          ☰
        </button>
      )}

      <div style={{ display: 'flex', flex: 1 }}>
        <Sidebar
          tipo="PACIENTE"
          vista={vista}
          setVista={handleNavigate}
          onLogout={onLogout}
          isMobileVisible={sidebarVisible}
        />

        <main className={`main ${isMobile && !sidebarVisible ? 'full-width' : ''}`}>
          {renderVista()}
        </main>
      </div>
    </div>
  );
};

export default LayoutPaciente;
