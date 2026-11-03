import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './css/Form.module.css';
import Button from './Button';
import ContFormInput from './ContFormInput';
import Loader from './Loader';
import { CONFIG_BACKEND } from '../config/config';

function FormCreateMatter() {
    const navigate = useNavigate();
    const [cargando, setCargando] = useState(false);
    const [sports, setSports] = useState([]);
    const [disciplines, setDisciplines] = useState([]);
    const [errorMessage, setErrorMessage] = useState(''); // Estado para mostrar el error arriba del form
    
    const [form, setForm] = useState({
        id_sport: '',
        id_discip: '',
        name_matter: '',
        descript_matter: '',
        id_group: '0'
    });

    // 1. Cargar la lista de deportes al montar el componente
    useEffect(() => {
        fetch(`${CONFIG_BACKEND.API_DIR}/loadSports`, { method: 'POST', credentials: 'include' })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setSports(data.result || data.deportes || []);
                }
            })
            .catch(err => console.error("Error al cargar deportes:", err));
    }, []);

    // 2. Cargar dinámicamente las disciplinas cada vez que cambie el deporte seleccionado
    useEffect(() => {
        if (!form.id_sport) {
            setDisciplines([]);
            return;
        }

        fetch(`${CONFIG_BACKEND.API_DIR}/loadDisciplines?value=${form.id_sport}`, { method: 'GET', credentials: 'include' })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setDisciplines(data.result || data.disciplinas || []);
                } else {
                    setDisciplines([]);
                }
            })
            .catch(err => {
                console.error("Error al cargar disciplinas:", err);
                setDisciplines([]);
            });
    }, [form.id_sport]);

    // Manejar cambios en los inputs y selects
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => {
            const updated = { ...prev, [name]: value };
            // Si cambia el deporte, reseteamos la disciplina seleccionada
            if (name === 'id_sport') {
                updated.id_discip = '';
            }
            return updated;
        });
        // Limpiamos el error al escribir o modificar campos
        if (errorMessage) setErrorMessage('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setCargando(true);
        setErrorMessage(''); // Limpiar errores previos

        try {
            const response = await fetch(`${CONFIG_BACKEND.API_DIR}/createMatter`, {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            });
            const data = await response.json();

            if (data.success) {
                // Vaciar formulario por completo
                setForm({
                    id_sport: '',
                    id_discip: '',
                    name_matter: '',
                    descript_matter: '',
                    id_group: '0'
                });
                setDisciplines([]);

                alert(data.message || "Materia creada con éxito");
                navigate('/campus/gestion-materias');
            } else {
                setErrorMessage(data.error || "No se pudo crear la materia");
            }
        } catch (error) {
            setErrorMessage("Error de conexión al crear la materia");
            console.error(error);
        } finally {
            setCargando(false);
        }
    };

    return (
        <div className={styles.contForm}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <h2>Crear Nueva Materia</h2>

                {/* Cartel de error en la parte superior si ocurre un fallo */}
                {errorMessage && (
                    <div style={{ background: '#f8d7da', color: '#721c24', padding: '10px', borderRadius: '4px', marginBottom: '15px', border: '1px solid #f5c6cb', fontSize: '14px', textAlign: 'center' }}>
                        {errorMessage}
                    </div>
                )}

                <ContFormInput nameElm="Deporte :">
                    <select name="id_sport" value={form.id_sport} onChange={handleChange} required>
                        <option value="">Seleccione un deporte</option>
                        {sports.map(sport => (
                            <option key={sport.id_sport || sport.id} value={sport.id_sport || sport.id}>
                                {sport.name_sport || sport.nombre}
                            </option>
                        ))}
                    </select>
                </ContFormInput>

                <ContFormInput nameElm="Disciplina :">
                    <select 
                        name="id_discip" 
                        value={form.id_discip} 
                        onChange={handleChange} 
                        required
                        disabled={!form.id_sport}
                    >
                        <option value="">Seleccione una disciplina</option>
                        {disciplines.map(discip => (
                            <option key={discip.id_discip || discip.id} value={discip.id_discip || discip.id}>
                                {discip.name_discip || discip.nombre}
                            </option>
                        ))}
                    </select>
                </ContFormInput>

                <ContFormInput nameElm="Nombre de la Materia :">
                    <input 
                        type="text" 
                        name="name_matter" 
                        value={form.name_matter} 
                        onChange={handleChange} 
                        placeholder="Ej: Reglas de Juego Avanzadas" 
                        required 
                    />
                </ContFormInput>

                <ContFormInput nameElm="Descripción :">
                    <textarea 
                        name="descript_matter" 
                        value={form.descript_matter} 
                        onChange={handleChange} 
                        placeholder="Descripción de la materia..."
                    />
                </ContFormInput>

                <ContFormInput>
                    <Button typeBtn='submit' disabled={cargando}>
                        {cargando ? <Loader mini={true} /> : "Guardar Materia"}
                    </Button>
                </ContFormInput>
            </form>
        </div>
    );
}

export default FormCreateMatter;