import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { buscarPorDni } from '../services/pacienteService';
import { listarEspecialidades } from '../services/especialidadService';
import { listarPorEspecialidad } from '../services/doctorService';
import './RegistrarCita.css';

const RegistrarCita = () => {
  const [dni, setDni] = useState('');
  const [paciente, setPaciente] = useState(null);
  const [especialidades, setEspecialidades] = useState([]);
  const [doctores, setDoctores] = useState([]);
  const [fechaValida, setFechaValida] = useState(true);

  const [formData, setFormData] = useState({
    especialidad: '',
    medico: '',
    fechaCita: '',
    horaCita: ''
  });

  const generarHoras = () => {
    const horas = [];
    for (let h = 8; h <= 17; h++) {
      for (let m = 0; m < 60; m += 15) {
        horas.push(`${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`);
      }
    }
    return horas;
  };
  const horasDisponibles = generarHoras();

  useEffect(() => {
    listarEspecialidades()
      .then(data => setEspecialidades(data))
      .catch(err => console.error('Error al cargar especialidades', err));
  }, []);

  const handleEspecialidadChange = async (e) => {
    const value = e.target.value;
    setFormData({ ...formData, especialidad: value, medico: '' });
    try {
      const lista = await listarPorEspecialidad(value);
      setDoctores(lista);
    } catch {
      alert('Error al cargar doctores');
    }
  };

  const handleFechaChange = (e) => {
    const fecha = e.target.value;
    setFormData({ ...formData, fechaCita: fecha });

    const fechaSeleccionada = new Date(fecha);
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    setFechaValida(fechaSeleccionada > hoy);
  };

  const buscarPaciente = async () => {
    if (dni.length < 8) {
      alert("⚠️ El DNI debe tener al menos 8 dígitos.");
      return;
    }

    try {
      const encontrado = await buscarPorDni(dni);
      setPaciente(encontrado);
    } catch (error) {
      if (error.response?.status === 404) {
        try {
          // 1. Buscar en RENIEC (simulado aquí como parte de la creación en backend)
          const res = await axios.post('http://localhost:8080/api/pacientes', {
            dni,
            nombres: '',
            apellidos: '',
            genero: '',
            fechaNacimiento: '2000-01-01',
            username: dni,
            password: dni
          });
          setPaciente(res.data);
        } catch (e) {
          alert("Error al registrar paciente desde RENIEC: " + e.message);
        }
      } else {
        const mensaje =
          error.response?.data?.error ||
          error.response?.data?.message ||
          error.message ||
          "Error desconocido";
        alert("Error: " + mensaje);
      }
    }
  };

  const registrar = async () => {
    if (!paciente) {
      alert("⚠️ Debes buscar primero un paciente.");
      return;
    }

    if (!fechaValida) {
      alert('⚠️ La fecha debe ser posterior a hoy.');
      return;
    }

    try {
      await axios.post('http://localhost:8080/api/citas', {
        pacienteId: paciente.id,
        especialidad: formData.especialidad,
        medico: formData.medico,
        fechaCita: formData.fechaCita,
        horaCita: formData.horaCita
      });
      alert('✅ Cita registrada con éxito');
      reiniciarFormulario();
    } catch (error) {
      console.error(error);
      alert('❌ Error al registrar la cita');
    }
  };

  const reiniciarFormulario = () => {
    setDni('');
    setPaciente(null);
    setFormData({
      especialidad: '',
      medico: '',
      fechaCita: '',
      horaCita: ''
    });
    setFechaValida(true);
    setDoctores([]);
  };

  return (
    <div className="form-container">
      <h3>Registrar Nueva Cita</h3>

      <div className="form-section">
        <h4>Datos del Paciente</h4>
        <div className="form-group">
          <label>DNI del Paciente</label>
          <div style={{ display: 'flex', gap: '10px' }}>
            <input
              type="text"
              value={dni}
              onChange={e => setDni(e.target.value)}
              placeholder="Ej. 12345678"
            />
            <button onClick={buscarPaciente}>Buscar en RENIEC</button>
          </div>
        </div>

        {paciente && (
          <>
            <div className="form-row">
              <div className="form-group">
                <label>Nombres</label>
                <input type="text" value={paciente.nombres} disabled />
              </div>
              <div className="form-group">
                <label>Apellidos</label>
                <input type="text" value={paciente.apellidos} disabled />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Fecha de Nacimiento</label>
                <input type="text" value={paciente.fechaNacimiento} disabled />
              </div>
              <div className="form-group">
                <label>Género</label>
                <input type="text" value={paciente.genero || ''} disabled />
              </div>
            </div>
          </>
        )}
      </div>

      {paciente && (
        <div className="form-section">
          <h4>Datos de la Cita</h4>

          <div className="form-row">
            <div className="form-group">
              <label>Especialidad</label>
              <select value={formData.especialidad} onChange={handleEspecialidadChange}>
                <option value="">Seleccione especialidad</option>
                {especialidades.map((esp) => (
                  <option key={esp.id} value={esp.nombre}>{esp.nombre}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Médico</label>
              <select
                value={formData.medico}
                onChange={e => setFormData({ ...formData, medico: e.target.value })}
              >
                <option value="">Seleccione médico</option>
                {doctores.map((doc) => (
                  <option key={doc.id} value={doc.nombre}>{doc.nombre}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Fecha</label>
              <input type="date" value={formData.fechaCita} onChange={handleFechaChange} />
              {!fechaValida && <p style={{ color: 'red' }}>⚠️ Fecha no válida.</p>}
            </div>

            <div className="form-group">
              <label>Hora</label>
              <select
                value={formData.horaCita}
                onChange={e => setFormData({ ...formData, horaCita: e.target.value })}
              >
                <option value="">Seleccione hora</option>
                {horasDisponibles.map((hora, i) => (
                  <option key={i} value={hora}>{hora}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group" style={{ marginTop: '20px' }}>
            <button onClick={registrar}>Registrar Cita</button>
            <button
              onClick={reiniciarFormulario}
              style={{ marginLeft: '10px', backgroundColor: 'gray' }}
            >
              Nueva Cita
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegistrarCita;
