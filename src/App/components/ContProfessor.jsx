import { useEffect, useState } from "react"
import { CONFIG_BACKEND } from "../config/config"
import styles from './css/ContProfessor.module.css'
import Button from './Button'

function ContProfessor({ professor, onSuccess }) {
    if (!professor || !professor.id_professor) {
        return <div className={styles.contProfessor}>Cargando datos del profesor...</div>
    }

    const [loading, setLoading] = useState(true)
    const [sports, setSports] = useState([])
    const [disciplines, setDisciplines] = useState([])
    const [matters, setMatters] = useState([])
    
    const [selectedSport, setSelectedSport] = useState("")
    const [selectedDiscipline, setSelectedDiscipline] = useState("")
    
    // Almacenamos las materias seleccionadas (precargaremos aquí las que ya tenga el profesor)
    const [selectedMatters, setSelectedMatters] = useState([])
    const [assignedSports, setAssignedSports] = useState([])
    const [assignedDisciplines, setAssignedDisciplines] = useState([])

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
        }
    }

    // 2. Precargar las materias que el profesor YA tiene asignadas al abrir el modal
    const consultInitialAssignedMatters = async () => {
        if (!professor.matters_assigned) {
            setSelectedMatters([]) // Limpiamos por si acaso
            setAssignedSports([])
            setAssignedDisciplines([])
            setLoading(false)
            return
        }
        try {
            // Limpiamos los estados previos antes de la petición para evitar residuos visuales
            setSelectedMatters([])
            setAssignedSports([])
            setAssignedDisciplines([])

            const response = await fetch(`${CONFIG_BACKEND.API_DIR}/loadProfessorsMatters?id=${professor.matters_assigned}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
            })
            const data = await response.json()
            if (data.success && data.result) {
                const preloaded = data.result.map(m => ({
                    ...m,
                    id_matter: m.id_matter || m.id,
                    sportName: m.name_sport || m.sportName || 'Deporte',
                    discName: m.name_discip || m.discName || 'Disciplina'
                }))
                setSelectedMatters(preloaded)

                const sportsIds = [...new Set(data.result.map(m => String(m.id_sport)).filter(Boolean))]
                const discIds = [...new Set(data.result.map(m => String(m.id_discip)).filter(Boolean))]
                
                setAssignedSports(sportsIds)
                setAssignedDisciplines(discIds)
            }
        } catch (errorCatch) {
            if (import.meta.env.DEV) { console.error(errorCatch.message) }
        } finally {
            setLoading(false)
        }
    }

    // 3. Cargar Disciplinas según el Deporte
    const consultDisciplines = async (sportId) => {
        if (!sportId) {
            setDisciplines([])
            setMatters([])
            return
        }
        try {
            const response = await fetch(`${CONFIG_BACKEND.API_DIR}/loadDisciplines?value=${sportId}`, {
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

    // 4. Cargar Materias según la Disciplina
    const consultMatters = async (disciplineId) => {
        if (!disciplineId) {
            setMatters([])
            return
        }
        try {
            const response = await fetch(`${CONFIG_BACKEND.API_DIR}/loadMatters?value=${disciplineId}`, {
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

    useEffect(() => { 
        consultSports()
        consultInitialAssignedMatters()
    }, [professor])

    const handleSportChange = (e) => {
        const sportId = e.target.value
        setSelectedSport(sportId)
        setSelectedDiscipline("")
        setMatters([])
        consultDisciplines(sportId)
    }

    const handleDisciplineChange = (e) => {
        const discId = e.target.value
        setSelectedDiscipline(discId)
        consultMatters(discId)
    }

    const handleMatterCheckboxChange = (e, matter) => {
        const matterId = String(matter.id_matter || matter.id)
        
        if (e.target.checked) {
            const currentSportObj = sports.find(s => String(s.id_sport) === String(selectedSport))
            // Buscamos la disciplina en el estado local o en la materia si ya lo trae
            const currentDiscObj = disciplines.find(d => String(d.id_discip) === String(selectedDiscipline))

            const newEntry = {
                ...matter,
                id_sport: selectedSport,
                sportName: currentSportObj ? currentSportObj.name_sport : (matter.name_sport || ''),
                id_discipline: selectedDiscipline,
                discName: currentDiscObj ? currentDiscObj.name_discip : (matter.name_discip || '')
            }

            setSelectedMatters(prev => [...prev, newEntry])
            
            if (selectedSport && !assignedSports.includes(selectedSport)) {
                setAssignedSports(prev => [...prev, selectedSport])
            }
            if (selectedDiscipline && !assignedDisciplines.includes(selectedDiscipline)) {
                setAssignedDisciplines(prev => [...prev, selectedDiscipline])
            }
        } else {
            setSelectedMatters(prev => prev.filter(item => String(item.id_matter || item.id) !== matterId))
        }
    }

    // Modificamos para que devuelva un arreglo de líneas en lugar de un texto plano unido con comas
    const getGroupedSummary = () => {
        const groups = {}
        selectedMatters.forEach(m => {
            const sportText = m.sportName || 'Deporte'
            const discText = m.discName ? ` (${m.discName})` : ''
            const key = `${sportText}${discText}`
            
            if (!groups[key]) {
                groups[key] = []
            }
            const matterName = m.name_matter || m.matter
            if (matterName && !groups[key].includes(matterName)) {
                groups[key].push(matterName)
            }
        })

        return Object.entries(groups).map(([groupName, matterList]) => {
            return `${groupName}: ${matterList.join(', ')}`
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const mattersString = selectedMatters.map(m => m.id_matter || m.id).join(",") 
        const sportsString = assignedSports.join(",")
        const disciplinesString = assignedDisciplines.join(",")

        try {
            const response = await fetch(`${CONFIG_BACKEND.API_DIR}/saveProfessorMatters`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify({
                    id_professor: professor.id_professor,
                    id_sport: sportsString || null,
                    id_discipline: disciplinesString || null,
                    matters: mattersString
                })
            })
            const data = await response.json()
            if (data.success) {
                alert(`Información actualizada con éxito para ${professor.name_professor}`)
                if (onSuccess) {
                    onSuccess()
                }
            } else {
                alert(data.errorMessage || data.message || "Error al guardar")
            }
        } catch (errorCatch) {
            if (import.meta.env.DEV) { console.error(errorCatch.message) }
        }
    }

    if (loading) {
        return <div className={styles.contProfessor}>Cargando asignaciones actuales...</div>
    }

    return (
        <form onSubmit={handleSubmit} className={styles.contProfessor}>
            <p className={styles.title}>{professor.name_professor}</p>
            
            {/* Select de Deportes */}
            <select className={styles.selectProf} onChange={handleSportChange} value={selectedSport}>
                <option value="">Seleccionar deporte</option>
                {sports.map(sport => (
                    <option key={sport.id_sport} value={sport.id_sport}>{sport.name_sport}</option>
                ))}
            </select>

            {/* Select de Disciplinas */}
            <select className={styles.selectProf} onChange={handleDisciplineChange} value={selectedDiscipline} disabled={!selectedSport}>
                <option value="">Seleccionar disciplina</option>
                {disciplines.map(disc => (
                    <option key={disc.id_discip} value={disc.id_discip}>{disc.name_discip}</option>
                ))}
            </select>

            {/* Checkboxes de Materias */}
            <div className={styles.message}>
                {matters.length > 0 ? (
                    <div>
                        {matters.map(matter => {
                            const matterId = matter.id_matter || matter.id
                            const isChecked = selectedMatters.some(m => String(m.id_matter || m.id) === String(matterId))
                            return (
                                <label key={matterId} className={styles.label}>
                                    <input 
                                        type="checkbox" 
                                        value={matterId}
                                        checked={isChecked}
                                        onChange={(e) => handleMatterCheckboxChange(e, matter)}
                                    />
                                    {matter.name_matter || matter.matter}
                                </label>
                            )
                        })}
                    </div>
                ) : (
                    <p style={{ fontSize: "0.9em", color: "#666" }}>Selecciona una disciplina para ver y sumar materias.</p>
                )}
            </div>

            {/* Cuadro de resumen en vivo en formato vertical */}
            <div style={{ 
                fontSize: '0.85rem', 
                background: selectedMatters.length > 0 ? '#155724' : '#721c24', 
                color: selectedMatters.length > 0 ? '#fff' : '#fff',
                padding: '10px', 
                borderRadius: '6px', 
                border: `1px solid ${selectedMatters.length > 0 ? '#c3e6cb' : '#f5c6cb'}`, 
                marginTop: '10px'
            }}>
                {selectedMatters.length > 0 ? (
                    <div>
                        <strong>Asignaciones actuales:</strong>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '6px' }}>
                            {getGroupedSummary().map((summaryLine, index) => (
                                <div key={index}>• {summaryLine}</div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <strong>⚠️ El profesor no tiene materias asignadas actualmente.</strong>
                )}
            </div>

            {/* Botón Submit */}
            <Button type="submit" disabled={selectedMatters.length === 0}>
                Asignar / Actualizar
            </Button>
        </form>
    )
}

export default ContProfessor