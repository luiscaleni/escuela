import { useState, useEffect } from 'react';
import { CONFIG_BACKEND } from '../config/config';
import styles from './css/FormManageSports.module.css';
import Button from './Button';

function FormManageSports() {
  const [deportes, setDeportes] = useState([]);
  const [disciplinas, setDisciplinas] = useState([]);
  const [nuevoDeporte, setNuevoDeporte] = useState('');
  const [selectedSport, setSelectedSport] = useState('');
  const [nuevaDisciplina, setNuevaDisciplina] = useState('');
  const [imagenDisciplina, setImagenDisciplina] = useState(null);
  const [imagenNuevoDeporte, setImagenNuevoDeporte] = useState(null); // Nuevo estado para la imagen del nuevo deporte
  const [status, setStatus] = useState({ loading: false, success: null, error: null });

  const deporteActual = deportes.find(d => d.id == selectedSport);
  const esInactivo = deporteActual && Number(deporteActual.activo) === 0;

  const disciplinasDelDeporteSeleccionado = disciplinas.filter(
    d => Number(d.deporte_id) === Number(selectedSport)
  );

  const fetchDeportes = async () => {
    try {
      const res = await fetch(`${CONFIG_BACKEND.API_DIR}/showSportsDisciplines`, {
        method: 'GET',
        credentials: 'include'
      });
      const data = await res.json();
      
      if (data.success) {
        setDeportes(data.deportes || []);
        setDisciplinas(data.disciplinas || []);
      }
    } catch (err) {
      console.error('Error cargando datos:', err);
    }
  };

  useEffect(() => {
    fetchDeportes();
  }, []);

  const handleToggleEstadoDeporte = async (idSport, estadoActual) => {
    const nuevoEstado = Number(estadoActual) === 0 ? true : false;
    try {
      const res = await fetch(`${CONFIG_BACKEND.API_DIR}/createSportDiscipline`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          deporte_id: idSport,
          activar_deporte: nuevoEstado
        })
      });
      const data = await res.json();
      if (data.success) {
        fetchDeportes();
      } else {
        alert(data.error || 'Error al cambiar el estado del deporte.');
      }
    } catch (err) {
      console.error('Error al cambiar el estado del deporte:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: null, error: null });

    if (esInactivo && nuevaDisciplina.trim()) {
      setStatus({ loading: false, success: null, error: 'No se pueden crear disciplinas para un deporte inactivo. Habilítalo primero.' });
      return;
    }

    try {
      const formData = new FormData();
      formData.append('deporte_id', selectedSport);
      formData.append('nuevo_deporte', nuevoDeporte);
      formData.append('nueva_disciplina', nuevaDisciplina);

      // Adjuntamos la imagen correspondiente según el flujo que esté activo
      if (nuevoDeporte.trim() && imagenNuevoDeporte) {
        formData.append('img_discip', imagenNuevoDeporte);
      } else if (selectedSport && imagenDisciplina) {
        formData.append('img_discip', imagenDisciplina);
      }

      const response = await fetch(`${CONFIG_BACKEND.API_DIR}/createSportDiscipline`, {
        method: 'POST',
        credentials: 'include',
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setNuevoDeporte('');
        setSelectedSport('');
        setNuevaDisciplina('');
        setImagenDisciplina(null);
        setImagenNuevoDeporte(null);
        
        // Limpiar inputs de tipo file en el DOM
        const fileInputs = document.querySelectorAll('input[type="file"]');
        fileInputs.forEach(input => input.value = '');

        setStatus({ loading: false, success: 'Registro guardado correctamente.', error: null });
        fetchDeportes();

        setTimeout(() => {
          setStatus(prev => ({ ...prev, success: null }));
        }, 3000);

      } else {
        setStatus({ loading: false, success: null, error: data.error || 'Error al procesar la solicitud.' });
      }

    } catch (err) {
      console.error('Error de conexión:', err);
      setStatus({ loading: false, success: null, error: 'Error de conexión con el servidor.' });
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Gestión de Deportes y Disciplinas</h2>

      <div className={styles.gridContainer}>
        
        {/* COLUMNA IZQUIERDA: Formulario */}
        <form onSubmit={handleSubmit} className={styles.formColumn}>
          <h3 className={styles.subtitle}>Formulario de Edición</h3>
          
          <div className={styles.formGroup}>
            <label className={styles.label}>Deporte Existente</label>
            <select 
              className={styles.select}
              value={selectedSport} 
              onChange={(e) => {
                setSelectedSport(e.target.value);
                setNuevaDisciplina('');
                if (e.target.value) {
                  setNuevoDeporte('');
                  setImagenNuevoDeporte(null);
                }
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

          {/* Muestra las disciplinas ya creadas para el deporte seleccionado */}
          {selectedSport && disciplinasDelDeporteSeleccionado.length > 0 && (
            <div style={{ marginBottom: '15px', padding: '10px', backgroundColor: '#f9f9f9', borderRadius: '6px', border: '1px solid #e0e0e0' }}>
              <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#555', display: 'block', marginBottom: '5px' }}>
                📌 Disciplinas ya registradas en este deporte (evita duplicar):
              </span>
              <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '13px', color: '#333' }}>
                {disciplinasDelDeporteSeleccionado.map((disc) => (
                  <li key={disc.id}>{disc.nombre}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Campo de Nueva Disciplina */}
          <div className={`${styles.disciplineBox} ${(!selectedSport || esInactivo) ? styles.disabledBox : ''}`}>
            <label className={`${styles.label} ${(!selectedSport || esInactivo) ? styles.disabledLabel : ''}`}>
              Nueva Disciplina para este Deporte
            </label>
            <input
              type="text"
              className={styles.input}
              placeholder={!selectedSport ? "Seleccione un deporte primero..." : esInactivo ? "Deporte inactivo (no disponible)" : "Ej: Futsal, Táctica, etc."}
              value={nuevaDisciplina}
              onChange={(e) => setNuevaDisciplina(e.target.value)}
              disabled={!selectedSport || esInactivo}
            />

            {/* Selector de Imagen para img_discip de la disciplina */}
            <div style={{ marginTop: '12px' }}>
              <label className={`${styles.label} ${(!selectedSport || esInactivo) ? styles.disabledLabel : ''}`}>
                Imagen de Fondo para la Card (`img_discip`)
              </label>
              <input
                type="file"
                accept="image/*"
                className={styles.input}
                onChange={(e) => setImagenDisciplina(e.target.files[0])}
                disabled={!selectedSport || esInactivo}
              />
            </div>

            <div className={styles.warningMessageWrapper}>
              {esInactivo && (
                <span className={styles.warningText}>
                  ⚠️ Habilítalo en el listado de la derecha para poder agregar disciplinas.
                </span>
              )}
            </div>
          </div>

          <div className={styles.divider}>— O crear nuevo deporte —</div>

          {/* Sección de Nuevo Deporte */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Nuevo Deporte</label>
            <input
              type="text"
              className={styles.input}
              placeholder="Ej: Fútbol, Básquet..."
              value={nuevoDeporte}
              onChange={(e) => {
                setNuevoDeporte(e.target.value);
                if (e.target.value.trim()) {
                  setSelectedSport('');
                  setNuevaDisciplina('');
                  setImagenDisciplina(null);
                }
              }}
              disabled={Boolean(selectedSport)}
            />

            {/* Selector de Imagen y Aviso para el Nuevo Deporte */}
            {nuevoDeporte.trim() && (
              <div style={{ marginTop: '12px', padding: '10px', backgroundColor: '#eef6fc', borderRadius: '6px', border: '1px solid #bce8f1' }}>
                <label className={styles.label} style={{ color: '#31708f' }}>
                  Imagen inicial para este Deporte (`img_discip`) *
                </label>
                <p style={{ fontSize: '11px', color: '#31708f', margin: '4px 0 8px 0' }}>
                  ℹ️ Al crear un deporte nuevo, se generará su disciplina base con este nombre e imagen. Podrás agregar más disciplinas después.
                </p>
                <input
                  type="file"
                  accept="image/*"
                  className={styles.input}
                  onChange={(e) => setImagenNuevoDeporte(e.target.files[0])}
                />
              </div>
            )}
          </div>

          <Button type="submit" className={styles.submitBtn} styleBtn={2} disabled={status.loading || (esInactivo && Boolean(nuevaDisciplina))}>
            {status.loading ? 'Guardando...' : 'Guardar Cambios'}
          </Button>

          {status.success && <div className={styles.successMsg}>✔ {status.success}</div>}
          {status.error && <div className={styles.errorMsg}>❌ {status.error}</div>}
        </form>

        {/* COLUMNA DERECHA: Listado de Deportes */}
        <div className={styles.listColumn}>
          <h3 className={styles.subtitle}>Listado de Deportes</h3>
          <p className={styles.listDescription}>Estado actual y disciplinas en el sistema.</p>
          
          <div className={styles.sportsListScroll}>
            {deportes.length === 0 ? (
              <p className={styles.emptyText}>No hay deportes registrados.</p>
            ) : (
              deportes.map((dep) => {
                const isInactivo = Number(dep.activo) === 0;
                const disciplinasDelDep = disciplinas.filter(d => Number(d.deporte_id) === Number(dep.id));

                return (
                  <div 
                    key={dep.id} 
                    className={`${styles.sportCard} ${isInactivo ? styles.inactiveCard : styles.activeCard}`}
                    style={{ flexDirection: 'column', alignItems: 'stretch' }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <span className={styles.sportName}>{dep.nombre}</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span className={`${styles.statusBadge} ${isInactivo ? styles.inactiveText : styles.activeText}`}>
                          {isInactivo ? '🔴 Inactivo' : '🟢 Activo'}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleToggleEstadoDeporte(dep.id, dep.activo)}
                          className={isInactivo ? styles.enableBtn : styles.disableBtn}
                        >
                          {isInactivo ? 'Habilitar ✅' : 'Deshabilitar ❌'}
                        </button>
                      </div>
                    </div>

                    {disciplinasDelDep.length > 0 && (
                      <div style={{ fontSize: '12px', color: '#666', borderTop: '1px dashed #ddd', paddingTop: '6px', marginTop: '4px' }}>
                        <strong>Disciplinas:</strong> {disciplinasDelDep.map(d => d.nombre).join(', ')}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

export default FormManageSports;