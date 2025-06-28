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
  const citasProximas = citas.filter(cita =>
    new Date(`${cita.fechaCita}T${cita.horaCita}`) > new Date()
  ).slice(0, 3); // máximo 3

  return (
    <section>
      <h2>Bienvenido, {usuario.username}</h2>

      <div style={{ margin: '20px 0' }}>
        <h3>Recomendaciones</h3>
        <ul>
          <li>Llega 15 minutos antes de tu cita.</li>
          <li>Lleva tu DNI o documento de identidad.</li>
          <li>No olvides tus recetas o informes médicos si tienes.</li>
        </ul>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>Campañas de Salud</h3>
        <ul>
          <li>🩺 Vacunación gratuita contra la influenza hasta el 15 de julio.</li>
          <li>👁️ Campaña de despistaje de glaucoma - todos los viernes.</li>
        </ul>
      </div>

      {citasProximas.length > 0 && (
        <div>
          <h3>Tus próximas citas</h3>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            {citasProximas.map((cita) => (
              <div key={cita.id} style={{
                background: '#fff',
                borderRadius: '8px',
                padding: '15px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                maxWidth: '300px',
                width: '100%',
              }}>
                <h4>{cita.especialidad}</h4>
                <p><strong>Fecha:</strong> {cita.fechaCita}</p>
                <p><strong>Hora:</strong> {cita.horaCita}</p>
                <p><strong>Médico:</strong> {cita.medico}</p>
              </div>
            ))}
          </div>
        </div>
      )}
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
