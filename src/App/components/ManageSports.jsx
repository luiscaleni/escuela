import React, { useState, useEffect } from 'react';
import styles from './css/ManageSports.module.css';
import { CONFIG_BACKEND } from '../config/config';

export default function ManageSports() {
  const [deportes, setDeportes] = useState([]);
  const [selectedDeporte, setSelectedDeporte] = useState('');
  const [nuevoDeporte, setNuevoDeporte] = useState('');
  const [nuevaDisciplina, setNuevaDisciplina] = useState('');
  const [selectedSport, setSelectedSport] = useState('');
  const [activarCheck, setActivarCheck] = useState(false);

    // Buscamos el objeto completo del deporte que el usuario seleccionó
  const deporteActual = deportes.find(d => d.id == selectedSport);
  const esInactivo = deporteActual && Number(deporteActual.activo) === 0;
  
  const [status, setStatus] = useState({ loading: false, success: null, error: null });

  // Cargar deportes existentes usando tu endpoint GET
  const fetchDeportes = async () => {
    try {
        const res = await fetch(`${CONFIG_BACKEND.API_DIR}/showSportsDisciplines`,{
            method: 'GET',
            credentials: 'include' // <-- Esto es obligatorio para que viaje la sesión
        });
        const data = await res.json();
        console.log("Datos recibidos de la API:", data);
        
        if (data.success) {
            setDeportes(data.deportes || []);
        }
    } catch (err) {
        console.error('Error cargando deportes:', err);
    }
    };
    // 2. Función para activar el deporte seleccionado si está inactivo
    const handleActivarDeporte = async (idSport) => {
    try {
        const res = await fetch(`${CONFIG_BACKEND.API_DIR}/api/activeSports`, { // O el nombre de tu ruta POST para actualizar
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ id_sport: idSport })
        });
        const data = await res.json();
        if (data.success) {
        // Recargar la lista o actualizar el estado local
        fetchDeportes();
        }
    } catch (err) {
        console.error('Error al activar el deporte:', err);
    }
    };

  useEffect(() => {
    fetchDeportes();
    handleActivarDeporte()
  }, []);

    const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await fetch(`${CONFIG_BACKEND.API_DIR}/createSportDiscipline`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
            deporte_id: selectedSport,       // Debe llamarse igual que en PHP
            nuevo_deporte: nuevoDeporte,     // Debe llamarse igual que en PHP
            nueva_disciplina: nuevaDisciplina, // Debe llamarse igual que en PHP
            activar_deporte: activarCheck    // Debe llamarse igual que en PHP
        })
        });

        const data = await response.json();

        if (data.success) {
        // Limpiamos los campos y recargamos la lista sin bucles
        setNuevoDeporte('');
        setNuevaDisciplina('');
        setSelectedSport('');
        setActivarCheck(false);
        fetchDeportes();
        } else {
        alert(data.error || 'Error al crear el nuevo deporte');
        }

    } catch (err) {
        console.error('Error de conexión:', err);
        alert('Error de conexión con el servidor.');
    }
    };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Gestión de Deportes y Disciplinas</h2>

      <form onSubmit={handleSubmit}>
        {/* Selección o Creación de Deporte */}
        <div className="form-group">
  <label>Deporte Existente</label>
  <select 
    value={selectedSport} 
    onChange={(e) => {
      setSelectedSport(e.target.value);
      setActivarCheck(false); // Reseteamos el checkbox al cambiar de deporte
    }}
  >
    <option value="">-- Seleccionar Deporte --</option>
    {deportes.map((dep) => (
      <option key={dep.id} value={dep.id}>
        {dep.nombre} {Number(dep.activo) === 0 ? ' (Inactivo)' : ''}
      </option>
    ))}
  </select>
</div>

{/* Casilla que aparece abajo solo si el deporte seleccionado está inactivo */}
{esInactivo && (
  <div className="activar-container" style={{ marginTop: '10px', padding: '8px', background: '#fff3cd', borderRadius: '4px' }}>
    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: '#856404', flexDirection:'row' }}>
      <input 
        type="checkbox" 
        checked={activarCheck} 
        onChange={(e) => setActivarCheck(e.target.checked)} 
      />
      Habilitar este deporte
    </label>
  </div>
)}

        <div className={styles.divider}>— O crear nuevo —</div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Nuevo Deporte</label>
          <input
            type="text"
            className={styles.input}
            placeholder="Ej: Fútbol, Básquet..."
            value={nuevoDeporte}
            onChange={(e) => {
              setNuevoDeporte(e.target.value);
              if (e.target.value.trim()) setSelectedDeporte(''); // Limpiar selector
            }}
            disabled={Boolean(selectedDeporte)}
          />
        </div>

        <hr style={{ margin: '1.5rem 0', borderColor: '#edf2f7' }} />

        {/* Creación de Disciplina */}
        <div className={styles.formGroup}>
          <label className={styles.label}>Nueva Disciplina (Opcional)</label>
          <input
            type="text"
            className={styles.input}
            placeholder="Ej: Táctica y Estrategia, Reglamento..."
            value={nuevaDisciplina}
            onChange={(e) => setNuevaDisciplina(e.target.value)}
          />
        </div>

        <button type="submit" className={styles.submitBtn} disabled={status.loading}>
          {status.loading ? 'Guardando...' : 'Guardar'}
        </button>
      </form>

      {status.success && (
        <div className={`${styles.message} ${styles.success}`}>
            {status.success}
        </div>
        )}

        {status.error && (
        <div className={`${styles.message} ${styles.error}`}>
            {status.error}
        </div>
        )}
    </div>
  );
}