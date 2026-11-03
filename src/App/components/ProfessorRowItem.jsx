import { useEffect, useState } from 'react'
import styles from './css/ProfessorRowItem.module.css'
import { CONFIG_BACKEND } from '../config/config'

function ProfessorRowItem({ professor, onOpenModal, onDisable }) {
    const [assignedDetails, setAssignedDetails] = useState("Cargando asignaciones...")

    const fetchAssignedSummary = async () => {
        if (!professor.matters_assigned) {
            setAssignedDetails("Sin materias asignadas")
            return
        }

        try {
            const response = await fetch(`${CONFIG_BACKEND.API_DIR}/loadProfessorsMatters?id=${professor.matters_assigned}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                credentials: 'include'
            })
            const data = await response.json()
            if (data.success && data.result) {
                const groups = {}
                data.result.forEach(m => {
                    const sportText = m.name_sport || 'Deporte: '
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

    // Validamos si está activo (status 1 o undefined por defecto) o inactivo (0)
    const isActive = professor.status !== 0;

    return (
        <div className={styles.professorCard}>
            <div className={styles.infoContainer}>
                <span className={styles.professorName}>
                    {professor.name_professor} {professor.status === 0 && <span style={{ color: '#ef4444', fontSize: '12px' }}>(Inhabilitado)</span>}
                </span>
                <span className={styles.assignedDetails}>
                    ✔ {assignedDetails}
                </span>
            </div>

            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
                {isActive && (
                    <button 
                        type="button"
                        onClick={() => onOpenModal(professor)}
                        className={styles.assignButton}
                    >
                        Asignar materias y comisión
                    </button>
                )}

                {/* Botón dinámico: Verde si está inactivo, Rojo si está activo */}
                <button 
                    type="button"
                    onClick={() => onDisable(professor)}
                    className={styles.assignButton}
                    style={{ 
                        background: isActive ? '#dc2626' : '#16a34a', 
                    }}
                >
                    {isActive ? 'Deshabilitar' : 'Habilitar'}
                </button>
            </div>
        </div>
    )
}

export default ProfessorRowItem