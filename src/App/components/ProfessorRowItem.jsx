import { useEffect, useState } from 'react'

import styles from './css/ProfessorRowItem.module.css' // Ajusta la ruta según tu estructura de carpetas
import { CONFIG_BACKEND } from '../config/config'

function ProfessorRowItem({ professor, onOpenModal }) {
    const [assignedDetails, setAssignedDetails] = useState("Cargando asignaciones...")

    const fetchAssignedSummary = async () => {
        if (!professor.matters_assigned) {
            setAssignedDetails("Sin materias asignadas")
            return
        }

        try {
            const response = await fetch(`${CONFIG_BACKEND.API_DIR}/loadProfessorsMatters?id=${professor.matters_assigned}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
            })
            const data = await response.json()
            if (data.success && data.result) {
                const groups = {}
                data.result.forEach(m => {
                    const sportText = m.name_sport || 'Deporte'
                    const discText = m.name_discip ? ` (${m.name_discip})` : ''
                    const key = `${sportText}${discText}`
                    
                    if (!groups[key]) groups[key] = []
                    const matterName = m.name_matter || m.matter
                    if (matterName && !groups[key].includes(matterName)) {
                        groups[key].push(matterName)
                    }
                })

                const summaryText = Object.entries(groups).map(([groupName, matterList]) => {
                    return `${groupName}: ${matterList.join(', ')}`
                }).join(' | ')

                setAssignedDetails(summaryText || "Sin materias asignadas")
            } else {
                setAssignedDetails("Sin materias asignadas")
            }
        } catch (error) {
            setAssignedDetails("Error al cargar asignaciones")
        }
    }

    useEffect(() => {
        fetchAssignedSummary()
    }, [professor.matters_assigned])

    return (
        <div className={styles.professorCard}>
            <div className={styles.infoContainer}>
                <span className={styles.professorName}>{professor.name_professor}</span>
                <span className={styles.assignedDetails}>
                    📋 {assignedDetails}
                </span>
            </div>
            <button 
                type="button"
                onClick={() => onOpenModal(professor)}
                className={styles.assignButton}
            >
                Asignar Materias / Deportes
            </button>
        </div>
    )
}

export default ProfessorRowItem