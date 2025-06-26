import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { buscarPorDni } from '../services/pacienteService';
import { listarEspecialidades } from '../services/especialidadService';


const RegistrarCita = () => {
  const [dni, setDni] = useState('');
  const [paciente, setPaciente] = useState(null);
  const [especialidades, setEspecialidades] = useState([]);
  const [formData, setFormData] = useState({
    especialidad: '',
    medico: '',
    fechaCita: '',
    horaCita: ''
  });

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

  const buscarPaciente = async () => {
    try {
      const encontrado = await buscarPorDni(dni);
      setPaciente(encontrado);
    } catch (error) {
      if (error.response?.status === 404) {
        try {
          const res = await axios.post('http://localhost:8080/api/pacientes', {
            dni,
            nombres: '',
            apellidos: '',
            genero: '',
            fechaNacimiento: '2000-01-01'
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
          <select onChange={e => setFormData({ ...formData, especialidad: e.target.value })}>
            <option value="">Seleccione</option>
            {especialidades.map((esp) => (
              <option key={esp.id} value={esp.nombre}>{esp.nombre}</option>
            ))}
          </select>

          <label>Médico:</label>
          <input type="text" onChange={e => setFormData({ ...formData, medico: e.target.value })} />

          <label>Fecha:</label>
          <input type="date" onChange={e => setFormData({ ...formData, fechaCita: e.target.value })} />

          <label>Hora:</label>
          <input type="time" onChange={e => setFormData({ ...formData, horaCita: e.target.value })} />

          <button onClick={registrar}>Registrar Cita</button>
        </>
      )}
    </div>
  );
};

export default RegistrarCita;
