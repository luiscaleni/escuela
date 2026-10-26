import { useState, useEffect, Fragment } from 'react'
import { CONFIG_BACKEND } from '../../../config/config'

function ProfessorAssing() {
    const [loading, setLoading] = useState(true)
    const [professors, setProfessors] = useState([])
    
    // Catálogos completos traídos de la BD
    const [sports, setSports] = useState([])
    const [disciplines, setDisciplines] = useState([])
    const [matters, setMatters] = useState([])

    // Estado para manejar las selecciones de cada profesor
    const [assignments, setAssignments] = useState({})

    useEffect(() => {
        const safeFetch = async (url) => {
            const res = await fetch(url)
            const text = await res.text()
            try {
                return JSON.parse(text)
            } catch (e) {
                console.error(`Error en ${url}:`, text)
                return { success: false, result: [] }
            }
        }

        Promise.all([
            safeFetch(`${CONFIG_BACKEND.API_DIR}/loadProfessors`, { method: 'POST', credentials: 'include' }),
            safeFetch(`${CONFIG_BACKEND.API_DIR}/loadSports`),
            safeFetch(`${CONFIG_BACKEND.API_DIR}/loadDisciplines`),
            safeFetch(`${CONFIG_BACKEND.API_DIR}/loadMatters`)
        ])
        .then(([profData, sportsData, discData, mattersData]) => {
            if (profData.success) {
                setProfessors(profData.result)
                const initial = {}
                profData.result.forEach(prof => {
                    initial[prof.id_professor] = {
                        id_sport: prof.id_sport || '',
                        id_discipline: prof.id_discipline || '',
                        id_matter: prof.id_matter || '',
                        group_class: prof.group_class || ''
                    }
                })
                setAssignments(initial)
            }
            if (sportsData.success) setSports(sportsData.result)
            if (discData.success) setDisciplines(discData.result)
            if (mattersData.success) setMatters(mattersData.result)
        })
        .finally(() => setLoading(false))
    }, [])

    const handleSelectChange = (profId, field, value) => {
        setAssignments(prev => {
            const updatedProf = { ...prev[profId], [field]: value }

            // Si cambia el Deporte, reseteamos la Disciplina y la Materia
            if (field === 'id_sport') {
                updatedProf.id_discipline = ''
                updatedProf.id_matter = ''
            }
            // Si cambia la Disciplina, reseteamos la Materia
            if (field === 'id_discipline') {
                updatedProf.id_matter = ''
            }

            return { ...prev, [profId]: updatedProf }
        })
    }

    const handleAssign = (e, profId) => {
        e.preventDefault()
        const profData = assignments[profId]

        fetch(`${CONFIG_BACKEND.API_DIR}/saveProfessorAssignment`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ id_professor: profId, ...profData })
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) alert('Asignación guardada con éxito')
            else alert('Error: ' + data.message)
        })
    }

    if (loading) return <p>Cargando datos ...</p>

    return ( 
        <div style={{ padding: '20px' }}>
            <h2>Asignación de Profesores en Cascada</h2>
            
            {professors.map(prof => {
                const current = assignments[prof.id_professor] || {}

                // FILTRAR DISCIPLINAS en función del deporte seleccionado por este profesor
                const filteredDisciplines = disciplines.filter(
                    d => String(d.id_sport) === String(current.id_sport)
                )

                // FILTRAR MATERIAS en función de la disciplina seleccionada por este profesor
                const filteredMatters = matters.filter(
                    m => String(m.id_disc) === String(current.id_discipline) // Cambia 'id_disc' por el nombre de tu columna en matters que apunta a discipline
                )

                return (
                    <Fragment key={prof.id_professor}>
                        <form onSubmit={(e) => handleAssign(e, prof.id_professor)} style={{ display: 'flex', gap: '10px', marginBottom: '15px', alignItems: 'center', flexWrap: 'wrap' }}>
                            <span style={{ minWidth: '150px' }}><strong>{prof.name_professor}</strong></span>
                            
                            {/* 1. Select Deporte */}
                            {/* Deporte */}
                            <select 
                                value={current.id_sport || ''} 
                                onChange={(e) => handleSelectChange(prof.id_professor, 'id_sport', e.target.value)}
                            >
                                <option value="">-- Deporte --</option>
                                {Array.isArray(sports) && sports.map(s => (
                                    <option key={s.id_sport} value={s.id_sport}>{s.name_sport}</option>
                                ))}
                            </select>

                            {/* Disciplina */}
                            <select 
                                value={current.id_discipline || ''} 
                                onChange={(e) => handleSelectChange(prof.id_professor, 'id_discipline', e.target.value)}
                                disabled={!current.id_sport}
                            >
                                <option value="">-- Disciplina --</option>
                                {Array.isArray(filteredDisciplines) && filteredDisciplines.map(d => (
                                    <option key={d.id_discipline} value={d.id_discipline}>{d.name_discipline}</option>
                                ))}
                            </select>

                            {/* Materia */}
                            <select 
                                value={current.id_matter || ''} 
                                onChange={(e) => handleSelectChange(prof.id_professor, 'id_matter', e.target.value)}
                                disabled={!current.id_discipline}
                            >
                                <option value="">-- Materia --</option>
                                {Array.isArray(filteredMatters) && filteredMatters.map(m => (
                                    <option key={m.id_matter} value={m.id_matter}>{m.title_matter}</option>
                                ))}
                            </select>
                            <button type="submit">Guardar</button>
                        </form>
                    </Fragment>
                )
            })}
        </div>
    )
}

export default ProfessorAssing