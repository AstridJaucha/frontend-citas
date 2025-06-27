import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { buscarPorDni } from '../services/pacienteService';
import { listarEspecialidades } from '../services/especialidadService';
import { listarPorEspecialidad } from '../services/doctorService';

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
    const cargarEspecialidades = async () => {
      try {
        const data = await listarEspecialidades();
        setEspecialidades(data);
      } catch (error) {
        console.error('Error al cargar especialidades:', error);
      }
    };
    cargarEspecialidades();
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
    try {
      const encontrado = await buscarPorDni(dni);
      setPaciente(encontrado);
    } catch (error) {
      if (error.response?.status === 404) {
        try {
          const res = await axios.post('http://localhost:8080/api/pacientes', {
            dni, nombres: '', apellidos: '', genero: '', fechaNacimiento: '2000-01-01'
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
    if (!fechaValida) {
      alert('La fecha debe ser posterior a hoy.');
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
      <h2>Registrar Nueva Cita</h2>

      <div>
        <label>DNI del Paciente:</label>
        <input type="text" value={dni} onChange={e => setDni(e.target.value)} />
        <button onClick={buscarPaciente}>Buscar en RENIEC</button>
      </div>

      {paciente && (
        <>
          <h3>Datos del Paciente</h3>
          <p><strong>DNI:</strong> {paciente.dni}</p>
          <p><strong>Nombres:</strong> {paciente.nombres}</p>
          <p><strong>Apellidos:</strong> {paciente.apellidos}</p>
          <p><strong>Fecha de Nacimiento:</strong> {paciente.fechaNacimiento}</p>
          <p><strong>Género:</strong> {paciente.genero}</p>

          <h3>Datos de la Cita</h3>

          <label>Especialidad:</label>
          <select value={formData.especialidad} onChange={handleEspecialidadChange}>
            <option value="">Seleccione una especialidad</option>
            {especialidades.map((esp) => (
              <option key={esp.id} value={esp.nombre}>{esp.nombre}</option>
            ))}
          </select>

          <label>Médico:</label>
          <select value={formData.medico} onChange={e => setFormData({ ...formData, medico: e.target.value })}>
            <option value="">Seleccione un médico</option>
            {doctores.map((doc) => (
              <option key={doc.id} value={doc.nombre}>{doc.nombre}</option>
            ))}
          </select>

          <label>Fecha:</label>
          <input type="date" value={formData.fechaCita} onChange={handleFechaChange} />
          {!fechaValida && <p style={{ color: 'red' }}>⚠️ La fecha debe ser posterior a hoy.</p>}

          <label>Hora:</label>
          <select value={formData.horaCita} onChange={e => setFormData({ ...formData, horaCita: e.target.value })}>
            <option value="">Seleccione una hora</option>
            {horasDisponibles.map((hora, i) => (
              <option key={i} value={hora}>{hora}</option>
            ))}
          </select>

          <button onClick={registrar}>Registrar Cita</button>
          <button onClick={reiniciarFormulario} style={{ marginLeft: '10px', backgroundColor: 'gray' }}>Nueva Cita</button>
        </>
      )}
    </div>
  );
};

export default RegistrarCita;
