import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './css/Form.module.css'; // Ajusta la ruta a tus estilos si es necesario
import Button from './Button';
import ContFormInput from './ContFormInput';
import Loader from './Loader';
import { CONFIG_BACKEND } from '../config/config';

function FormCreateMatter() {
    const navigate = useNavigate();
    const [cargando, setCargando] = useState(false);
    const [sports, setSports] = useState([]);
    const [disciplines, setDisciplines] = useState([]);
    
    const [form, setForm] = useState({
        id_sport: '',
        id_discip: '',
        name_matter: '',
        descript_matter: '',
        id_group: '0'
    });

    // Cargar deportes y disciplinas al montar el componente
    useEffect(() => {
        fetch(`${CONFIG_BACKEND.API_DIR}/loadSports`, { credentials: 'include' })
            .then(res => res.json())
            .then(data => {
                if (data.success) setSports(data.result);
            }).catch(err => console.error(err));

        fetch(`${CONFIG_BACKEND.API_DIR}/loadDisciplines?value=${sportId}`, { credentials: 'include' })
            .then(res => res.json())
            .then(data => {
                if (data.success) setDisciplines(data.result);
            }).catch(err => console.error(err));
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (sportId) => {
        e.preventDefault();
        setCargando(true);

        if (!sportId) {
            setDisciplines([])
            setMatters([])
            return
        }

        try {
            const response = await fetch(`${CONFIG_BACKEND.API_DIR}/loadDisciplines?value=${sportId}`, {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            });
            const data = await response.json();

            if (data.success) {
                alert("Materia creada con éxito");
                navigate(-1);
            } else {
                alert("Error: " + (data.error || "No se pudo crear la materia"));
            }
        } catch (error) {
            alert("Error de conexión al crear la materia");
            console.error(error);
        } finally {
            setCargando(false);
        }
    };

    return (
        <div className={styles.contForm}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <h2>Crear Nueva Materia</h2>

                <ContFormInput nameElm="Deporte :">
                    <select name="id_sport" value={form.id_sport} onChange={handleChange} required>
                        <option value="">Seleccione un deporte</option>
                        {sports.map(sport => (
                            <option key={sport.id_sport} value={sport.id_sport}>
                                {sport.name_sport}
                            </option>
                        ))}
                    </select>
                </ContFormInput>

                <ContFormInput nameElm="Disciplina :">
                    <select name="id_discip" value={form.id_discip} onChange={handleChange} required>
                        <option value="">Seleccione una disciplina</option>
                        {disciplines
                            .filter(d => !form.id_sport || String(d.id_sport) === String(form.id_sport))
                            .map(discip => (
                                <option key={discip.id_discip} value={discip.id_discip}>
                                    {discip.name_discip}
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

export default FormCreateMatter