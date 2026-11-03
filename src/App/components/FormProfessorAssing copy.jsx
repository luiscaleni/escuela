import { useState, useEffect } from 'react'
import { CONFIG_BACKEND } from '../config/config'
import ContFormInput from './ContFormInput'
import Button from './Button'
import Loader from './Loader'

function FormProfessorAssing({ professor, onSuccess }) {
    const [sports, setSports] = useState([])
    const [disciplines, setDisciplines] = useState([])
    const [mattersList, setMattersList] = useState([])
    const [cargando, setCargando] = useState(false)

    // Estados inicializados con los datos actuales del profesor
    const [selectedSport, setSelectedSport] = useState(professor.id_sport ? String(professor.id_sport) : '')
    const [selectedDiscipline, setSelectedDiscipline] = useState(professor.id_discipline ? String(professor.id_discipline) : '')
    
    // Materias asignadas normalizadas como array de strings limpios
    const [mattersAssigned, setMattersAssigned] = useState(() => {
        if (!professor.matters_assigned) return []
        return String(professor.matters_assigned).split(',').map(m => m.trim()).filter(Boolean)
    })

    // 1. Cargar Deportes al montar el modal
    useEffect(() => {
        const fetchSports = async () => {
            setCargando(true)
            try {
                const resSports = await fetch(`${CONFIG_BACKEND.API_DIR}/loadSports`, {
                    method: 'POST', 
                    credentials: 'include', 
                    headers: { 'Content-Type': 'application/json' }, 
                    body: JSON.stringify({})
                })
                const dataSports = await resSports.json()
                if (dataSports.success) {
                    setSports(dataSports.result)
                }
            } catch (error) {
                console.error("Error al cargar deportes:", error)
            } finally {
                setCargando(false)
            }
        }
        fetchSports()
    }, [])

    // 2. Cargar disciplinas automáticamente cuando cambia el deporte seleccionado
    useEffect(() => {
        if (!selectedSport) {
            setDisciplines([])
            setMattersList([])
            return
        }

        const fetchDisciplines = async () => {
            try {
                const res = await fetch(`${CONFIG_BACKEND.API_DIR}/loadDisciplines?value=${selectedSport}`, {
                    method: 'GET', 
                    headers: { 'Accept': 'application/json' }, 
                    credentials: 'include'
                })
                const data = await res.json()
                if (data.success) {
                    setDisciplines(data.result)
                } else {
                    setDisciplines([])
                }
            } catch (error) {
                console.error("Error al cargar disciplinas:", error)
                setDisciplines([])
            }
        }
        fetchDisciplines()
    }, [selectedSport])

    // 3. Cargar TODAS las materias correspondientes a la disciplina seleccionada
    useEffect(() => {
        if (!selectedDiscipline) {
            setMattersList([])
            return
        }

        const fetchMatters = async () => {
            try {
                const res = await fetch(`${CONFIG_BACKEND.API_DIR}/loadMatters?value=${selectedDiscipline}`, {
                    method: 'GET',
                    headers: { 'Accept': 'application/json' },
                    credentials: 'include'
                })
                
                const text = await res.text()
                if (!text) {
                    setMattersList([])
                    return
                }

                const data = JSON.parse(text)
                if (data.success) {
                    setMattersList(data.result)
                } else {
                    setMattersList([])
                }
            } catch (error) {
                console.error("Error al cargar materias:", error)
                setMattersList([])
            }
        }
        fetchMatters()
    }, [selectedDiscipline])

    const handleMatterToggle = (matterId) => {
        const idStr = String(matterId).trim()
        if (mattersAssigned.includes(idStr)) {
            setMattersAssigned(mattersAssigned.filter(id => id !== idStr))
        } else {
            setMattersAssigned([...mattersAssigned, idStr])
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setCargando(true)

        try {
            const response = await fetch(`${CONFIG_BACKEND.API_DIR}/saveProfessorMatters`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({
                    id_professor: professor.id_professor,
                    id_sport: selectedSport,
                    id_discipline: selectedDiscipline,
                    matters: mattersAssigned.join(',')
                })
            })

            const data = await response.json()
            if (data.success) {
                alert("Asignación de materias guardada correctamente")
                if (onSuccess) onSuccess()
            } else {
                alert("Error: " + (data.message || "No se pudo actualizar"))
            }
        } catch (error) {
            console.error("Error de red:", error)
            alert("Error de red al intentar guardar")
        } finally {
            setCargando(false)
        }
    }

    if (cargando && sports.length === 0) return <Loader />

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', overflow:'hidden', gap: '18px', padding: '10px 0', width: '90%', margin: '0 auto', maxHeight: '75vh', overflowY: 'auto' }}>
            
            <h3 style={{ color: '#333', fontSize: '1.1rem', borderBottom: '1px solid #444', paddingBottom: '8px', margin: 0, width: '100%' }}>
                Asignación para: {professor.name_professor || 'Profesor'}
            </h3>

            {/* Selector de Deporte */}
            <div style={{ width: '100%' }}>
                <ContFormInput nameElm="Seleccionar Deporte:">
                    <select 
                        value={selectedSport} 
                        onChange={(e) => {
                            setSelectedSport(e.target.value)
                            setSelectedDiscipline('')
                            setDisciplines([])
                            setMattersList([])
                        }}
                    >
                        <option value="">Seleccione un deporte...</option>
                        {sports.map(sport => {
                            const sportId = String(sport.id_sport || sport.id)
                            return (
                                <option key={sportId} value={sportId}>
                                    {sport.name_sport || sport.name}
                                </option>
                            )
                        })}
                    </select>
                </ContFormInput>
            </div>

            {/* Selector de Disciplina */}
            <div style={{ width: '100%' }}>
                <ContFormInput nameElm="Seleccionar Disciplina:">
                    <select 
                        value={selectedDiscipline} 
                        onChange={(e) => {
                            setSelectedDiscipline(e.target.value)
                            setMattersList([])
                        }}
                        disabled={!selectedSport}
                        style={{ width: '100%', padding: '0.75rem', borderRadius: '0.7rem', backgroundColor: '#E1E1E1', color: '#000', opacity: !selectedSport ? 0.6 : 1 }}
                    >
                        <option value="">Seleccione una disciplina...</option>
                        {disciplines.map(disc => {
                            const discId = String(disc.id_discip || disc.id)
                            return (
                                <option key={discId} value={discId}>
                                    {disc.name_discip || disc.name}
                                </option>
                            )
                        })}
                    </select>
                </ContFormInput>
            </div>

            {/* Listado de Materias ocupando el 90% */}
            <div style={{ color: '#333', display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
                <label style={{ fontWeight: '600', fontSize: '0.95rem' }}>Materias Correspondientes:</label>
                {mattersList.length > 0 ? (
                    <div style={{ 
                        padding: '12px', 
                        borderRadius: '6px', 
                        gap: '8px', 
                        minHeight: '80px', 
                        overflowY: 'auto',
                        width: '100%',
                        boxSizing: 'border-box',
                        overflowX:'hidden',
                        display: 'flex', 
                        flexDirection: 'column', 
                    }}>
                        {mattersList.map(matter => {
                            const matterId = String(matter.id_matter || matter.id).trim()
                            const isChecked = mattersAssigned.includes(matterId)
                            return (
                                <label 
                                    key={matterId} 
                                    style={{ 
                                        display: 'flex', 
                                        alignItems: 'flex-start', 
                                        justifyContent: 'flex-start',
                                        flexDirection:'row',
                                        textAlign: 'left',
                                        gap: '12px', 
                                        cursor: 'pointer',
                                        fontSize: '0.9rem',
                                        background: '#e1e1e1',
                                        padding: '10px 14px',
                                        borderRadius: '4px',
                                        border: isChecked ? '1px solid #3b82f6' : '1px solid transparent',
                                        width: '100%',
                                        boxSizing: 'border-box',
                                        transition: 'background 0.2s'
                                    }}
                                >
                                    <input 
                                        type="checkbox" 
                                        checked={isChecked}
                                        onChange={() => handleMatterToggle(matterId)}
                                        style={{ accentColor: '#3b82f6', width: '18px', height: '18px', cursor: 'pointer', flexShrink: 0 }}
                                    />
                                    <span style={{ wordBreak: 'break-word', color: '#e5e7eb', width: 'auto' }}>
                                        {matter.name_matter || matter.name}
                                    </span>
                                </label>
                            )
                        })}
                    </div>
                ) : (
                    <p style={{ color: '#888', fontSize: '0.85rem', margin: '0', fontStyle: 'italic' }}>
                        {selectedDiscipline ? 'No hay materias cargadas para esta disciplina.' : 'Seleccione una disciplina para ver sus materias.'}
                    </p>
                )}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px', width: '100%' }}>
                <Button typeBtn="submit" styleBtn={2} disabled={cargando}>
                    {cargando ? 'Guardando...' : 'Guardar Cambios'}
                </Button>
            </div>
        </form>
    )
}

export default FormProfessorAssing