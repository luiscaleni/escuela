import { useEffect, useState, useContext } from 'react'
import { CONFIG_BACKEND, CONFIG_PATHS } from '../../../config/config'
import { UserContext } from '../../../components/UserProvider'
import { useNavigate } from 'react-router-dom'
import Modal from '../../../components/Modal'
import styles from './css/ManageStudents.module.css'

function ManageStudents() {
    const [loading, setLoading] = useState(true)
    const [students, setStudents] = useState([])
    const [searchTerm, setSearchTerm] = useState("")

    // Estados para el Modal de Confirmación por escritura
    const [showConfirmModal, setShowConfirmModal] = useState(false)
    const [studentToToggle, setStudentToToggle] = useState(null)
    const [confirmationInput, setConfirmationInput] = useState("")

    const { user } = useContext(UserContext)
    const navigate = useNavigate()

    const consultStudents = async () => {
        try {
            const response = await fetch(`${CONFIG_BACKEND.API_DIR}/loadStudents`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                credentials: 'include'
            })
            const data = await response.json()
            if (data.success) {
                setStudents(data.result)
            }
        } catch (error) {
            if (import.meta.env.DEV) { console.error(error) }
        } finally {
            setLoading(false)
        }
    }

    if (user && user.roleId !== 1) {
        navigate(CONFIG_PATHS.ROOT_PATH)
    }
    
    useEffect(() => {
        consultStudents()
    }, [])

    // Filtrado en memoria (sin consultas SQL adicionales)
    const filteredStudents = students.filter(student => {
        const fullName = `${student.names || ''} ${student.last_names || ''}`.toLowerCase();
        const email = (student.email || '').toLowerCase();
        const term = searchTerm.toLowerCase();
        return fullName.includes(term) || email.includes(term);
    });

    const handleOpenConfirmModal = (student) => {
        setStudentToToggle(student)
        setConfirmationInput("") 
        setShowConfirmModal(true)
    }

    const handleExecuteToggleStatus = async () => {
        if (!studentToToggle) return

        const currentStatus = studentToToggle.status !== undefined ? studentToToggle.status : 1;
        const newStatus = currentStatus === 1 ? 0 : 1; 

        try {
            const response = await fetch(`${CONFIG_BACKEND.API_DIR}/disableStudent`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify({ 
                    id_user: studentToToggle.id,
                    status: newStatus 
                }),
                credentials: 'include'
            });
            const data = await response.json();
            if (data.success) {
                setShowConfirmModal(false)
                setStudentToToggle(null)
                consultStudents();
            } else {
                alert("Error al actualizar el estado: " + (data.message || "Error desconocido"));
            }
        } catch (error) {
            console.error("Error de red:", error);
        }
    };

    const isCurrentlyActive = studentToToggle?.status !== 0;
    const studentFullName = `${studentToToggle?.names || ''} ${studentToToggle?.last_names || ''}`.trim();

    return (
        <div className={styles.container}>
            <h2>Gestión de Alumnos</h2>
            
            {/* Buscador local */}
            <div className={styles.searchContainer}>
                <input 
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Buscar alumno por nombre, apellido o email..."
                    className={styles.searchInput}
                />
            </div>

            {loading ? (
                <p className={styles.loadingText}>Cargando alumnos...</p>
            ) : filteredStudents.length > 0 ? (
                <div className={styles.studentsList}>
                    {filteredStudents.map(student => {
                        const active = student.status !== 0;
                        return (
                            <div 
                                key={student.id} 
                                className={styles.studentCard}
                            >
                                <div>
                                    <h4 className={styles.studentName}>
                                        {student.names} {student.last_names} 
                                        {!active && <span className={styles.disabledTag}>(Inhabilitado)</span>}
                                    </h4>
                                    <p className={styles.studentEmail}>{student.email}</p>
                                </div>

                                <button 
                                    type="button"
                                    onClick={() => handleOpenConfirmModal(student)}
                                    className={`${styles.actionButton} ${active ? styles.btnDanger : styles.btnSuccess}`}
                                >
                                    {active ? 'Deshabilitar' : 'Habilitar'}
                                </button>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <p className={styles.noResultsText}>No se encontraron alumnos.</p>
            )}

            {/* Modal de confirmación por escritura */}
            {showConfirmModal && studentToToggle && (
                <Modal
                    titleElm={`${isCurrentlyActive ? 'Deshabilitar' : 'Habilitar'} a: ${studentFullName}`}
                    onClickElm={() => setShowConfirmModal(false)}
                >
                    <div className={styles.modalContent}>
                        <p className={styles.modalInstruction}>
                            Para confirmar la acción, escribe el nombre exacto y completo: <strong className={styles.modalTargetName}>{studentFullName}</strong>
                        </p>
                        
                        <input 
                            type="text" 
                            value={confirmationInput}
                            onChange={(e) => setConfirmationInput(e.target.value)}
                            placeholder="Escribe el nombre aquí..."
                            className={styles.modalInput}
                        />

                        <div className={styles.modalActions}>
                            <button
                                type="button"
                                onClick={() => setShowConfirmModal(false)}
                                className={styles.btnCancel}
                            >
                                Cancelar
                            </button>

                            <button
                                type="button"
                                disabled={confirmationInput !== studentFullName}
                                onClick={handleExecuteToggleStatus}
                                className={`${styles.btnConfirm} ${
                                    confirmationInput === studentFullName 
                                        ? `${styles.btnConfirmEnabled} ${isCurrentlyActive ? styles.btnDanger : styles.btnSuccess}`
                                        : styles.btnConfirmDisabled
                                }`}
                            >
                                Aceptar / Confirmar
                            </button>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    )
}

export default ManageStudents