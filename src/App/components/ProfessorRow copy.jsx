import { useEffect, useState } from "react"
import { CONFIG_BACKEND } from "../config/config"
import styles from './css/ProfessorRow.module.css'
import Container from "./Container"

function ProfessorRow({ professor = {} }) {
    const [loading, setLoading] = useState(true)
    const [sports, setSports] = useState([])
    const [disciplines, setDisciplines] = useState([])
    const [matters, setMatters] = useState([]) // Materias disponibles según la disciplina
    const [deporteSeleccionado, setDeporteSeleccionado] = useState(null)
    
    const [selectedSport, setSelectedSport] = useState("")
    const [selectedDiscipline, setSelectedDiscipline] = useState("")
    const [selectedMatters, setSelectedMatters] = useState([]) // Array con los IDs de materias seleccionadas

    // 1. Cargar Deportes
    const consultSports = async () => {
        try {
            const response = await fetch(`${CONFIG_BACKEND.API_DIR}/loadSports`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
            })
            const data = await response.json()
            if (data.success) setSports(data.result)
        } catch (errorCatch) {
            if (import.meta.env.DEV) { console.error(errorCatch.message) }
        } finally {
            setLoading(false)
        }
    }

    // 2. Cargar Disciplinas según el Deporte
    const consultDisciplines = async () => {
        if (!selectedSport) {
            setDisciplines([])
            setMatters([])
            return
        }
        try {
            const response = await fetch(`${CONFIG_BACKEND.API_DIR}/loadDisciplines?value=${selectedSport}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
            })
            const data = await response.json()
            if (data.success) {
                setDisciplines(data.result)
            } else {
                setDisciplines([])
            }
        } catch (errorCatch) {
            if (import.meta.env.DEV) { console.error(errorCatch.message) }
        }
    }

    // 3. Cargar Materias según la Disciplina
    const consultMatters = async () => {
        if (!selectedDiscipline) {
            setMatters([])
            return
        }
        try {
            const response = await fetch(`${CONFIG_BACKEND.API_DIR}/loadMatters?value=${selectedDiscipline}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
            })
            const data = await response.json()
            if (data.success) {
                setMatters(data.result)
            } else {
                setMatters([])
            }
        } catch (errorCatch) {
            if (import.meta.env.DEV) { console.error(errorCatch.message) }
        }
    }

    useEffect(() => { consultSports() }, [])
    useEffect(() => { consultDisciplines(); setSelectedDiscipline(""); setSelectedMatters([]); }, [selectedSport])
    useEffect(() => { consultMatters(); setSelectedMatters([]); }, [selectedDiscipline])

    // Manejador del cambio de deporte
    const handleSportChange = (e) => {
        const idSeleccionado = e.target.value;
        handleChange(e); // Guarda el id en el form principal

        // Buscamos el deporte completo para extraer su estado 'activo'
        const deporteEncontrado = sportsList.find(s => String(s.id_sport) === String(idSeleccionado));
        setDeporteSeleccionado(deporteEncontrado || null);
    }

    // Manejador del cambio de disciplina
    const handleDisciplineChange = (e) => {
        setSelectedDiscipline(e.target.value)
    }

    // Manejador para marcar/desmarcar materias múltiples
    const handleMatterCheckboxChange = (e) => {
        const value = e.target.value
        let updatedMatters = [...selectedMatters]

        if (e.target.checked) {
            updatedMatters.push(value) // Agrega si fue marcado
        } else {
            updatedMatters = updatedMatters.filter(item => item !== value) // Remueve si fue desmarcado
        }

        setSelectedMatters(updatedMatters)
        
        // Convertimos a string separado por comas para guardar fácilmente en la BD (ej: "1,3,4")
        const mattersString = updatedMatters.join(",")
        console.log("Materias habilitadas:", mattersString)
    }

    return ( 
        <>
        <div className={styles.container}>
            <div className={styles.headers}>
                <p className={styles.title}><strong>Profesor</strong></p>
                <p>Deportes</p>
                <p>Disciplinas</p>
                <p><strong>Materias habilitadas:</strong></p>
            </div>
            <div className={styles.contentProfessors}>
                <div className={styles.contProfessor}>
                    <p className={styles.title}>{professor.name_professor}</p>
                    
                    {/* Select de Deportes */}
                    <select name="id_sport" onChange={handleChange} required className={styles.selectInput}>
                        <option value="">Seleccione un deporte...</option>
                        {sportsList.map((sport) => (
                            <option key={sport.id_sport} value={sport.id_sport}>
                                {sport.name_sport} {sport.activo === 1 ? '🟢 [Activo]' : '🔴 [Inactivo]'}
                            </option>
                        ))}
                    </select>

                    {/* Select de Disciplinas */}
                    <select className={styles.selectProf} onChange={handleDisciplineChange} value={selectedDiscipline} disabled={!selectedSport}>
                        <option value="">Seleccionar disciplina</option>
                        {disciplines.map(disc => (
                            <option key={disc.id_discip} value={disc.id_discip}>{disc.name_discip}</option>
                        ))}
                    </select>

                    {/* Checkboxes de Materias (Múltiples) */}
                    <div className={styles.message}>
                        <label><strong>Materias:</strong></label>
                        {matters.length > 0 ? (
                            <div>
                                {matters.map(matter => (
                                    <label key={matter.id_matter} className={styles.label}>
                                        <input 
                                            type="checkbox" 
                                            value={matter.id_matter}
                                            checked={selectedMatters.includes(String(matter.id_matter))}
                                            onChange={handleMatterCheckboxChange}
                                        />
                                        {matter.name_matter || matter.matter}
                                    </label>
                                ))}
                            </div>
                        ) : (
                            <p style={{ fontSize: "0.9em", color: "#666" }}>Selecciona una disciplina para ver las materias.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default ProfessorRow