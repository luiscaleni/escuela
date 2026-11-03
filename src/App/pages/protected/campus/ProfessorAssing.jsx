import { useEffect, useState, useContext } from 'react'
import { CONFIG_BACKEND, CONFIG_PATHS } from '../../../config/config'
import { UserContext } from '../../../components/UserProvider'
import { useNavigate } from 'react-router-dom'
import Modal from '../../../components/Modal'
import FormProfessorAssing from '../../../components/FormProfessorAssing'
import ProfessorRowItem from '../../../components/ProfessorRowItem'

function ProfessorAssign() {
    const [loading, setLoading] = useState(true)
    const [professors, setProfessors] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [currentProfessor, setCurrentProfessor] = useState(null)

    // Estados para el Modal personalizado de confirmación por escritura
    const [showConfirmModal, setShowConfirmModal] = useState(false)
    const [professorToToggle, setProfessorToToggle] = useState(null)
    const [confirmationInput, setConfirmationInput] = useState("")

    const { user } = useContext(UserContext)
    const navigate = useNavigate()

    const consultProf = async () => {
        try {
            const response = await fetch(`${CONFIG_BACKEND.API_DIR}/loadProfessors`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                credentials: 'include'
            })
            const data = await response.json()
            if (data.success) {
                setProfessors(data.result)
            }
        } catch (errorCatch) {
            if (import.meta.env.DEV) { console.error(errorCatch) }
        } finally {
            setLoading(false)
        }
    }

    if (user && user.roleId !== 1) {
        navigate(CONFIG_PATHS.ROOT_PATH)
    }
    
    useEffect(() => {
        consultProf()
    }, [])

    const handleOpenModal = (professor) => {
        setCurrentProfessor(professor)
        setShowModal(true)
    }

    const handleCloseModal = () => {
        setShowModal(false)
        setCurrentProfessor(null)
        consultProf()
    }

    const handleOpenConfirmModal = (professor) => {
        setProfessorToToggle(professor)
        setConfirmationInput("") 
        setShowConfirmModal(true)
    }

    const handleExecuteToggleStatus = async () => {
        if (!professorToToggle) return

        const professorId = professorToToggle.id_professor;
        const currentStatus = professorToToggle.status !== undefined ? professorToToggle.status : 1;
        const newStatus = currentStatus === 1 ? 0 : 1; 

        try {
            const response = await fetch(`${CONFIG_BACKEND.API_DIR}/disableProfessor`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify({ 
                    id_professor: professorId,
                    status: newStatus 
                }),
                credentials: 'include'
            });
            const data = await response.json();
            if (data.success) {
                setShowConfirmModal(false)
                setProfessorToToggle(null)
                consultProf();
            } else {
                alert("Error al actualizar el estado: " + (data.message || "Error desconocido"));
            }
        } catch (error) {
            console.error("Error de red:", error);
        }
    };

    const isCurrentlyActive = professorToToggle?.status !== 0;

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ color: '#fff', marginBottom: '20px' }}>Gestión y asignación de Profesores</h2>
            
            {professors?.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {professors.map(prof => (
                        <ProfessorRowItem 
                            key={prof.id_professor || prof.id} 
                            professor={prof} 
                            onOpenModal={handleOpenModal} 
                            onDisable={handleOpenConfirmModal} 
                        />
                    ))}
                </div>
            ) : (
                <p style={{ color: '#ccc' }}>Sin profesores que mostrar</p>
            )}

            {showModal && currentProfessor && (
                <Modal
                    titleElm={`Asignar a: ${currentProfessor.name_professor}`}
                    onClickElm={handleCloseModal}
                >
                    <FormProfessorAssing professor={currentProfessor} onSuccess={handleCloseModal} />
                </Modal>
            )}

            {/* Modal Estilizado para Confirmar Escribiendo el Nombre */}
            {showConfirmModal && professorToToggle && (
                <Modal
                    titleElm={`${isCurrentlyActive ? 'Deshabilitar' : 'Habilitar'} a: ${professorToToggle.name_professor}`}
                    onClickElm={() => setShowConfirmModal(false)}
                >
                    <div style={{ color: '#fff', padding: '10px 0', display: 'flex', flexDirection: 'column', gap: '15px', width:'90%' }}>
                        <p style={{ margin: 0, fontSize: '14px', color: '#ccc'}}>
                            Para confirmar que deseas {isCurrentlyActive ? 'deshabilitar' : 'habilitar'} a este profesor, escribe su nombre exacto: <strong style={{ color: 'red' }}>{professorToToggle.name_professor}</strong>
                        </p>
                        
                        <input 
                            type="text" 
                            value={confirmationInput}
                            onChange={(e) => setConfirmationInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && confirmationInput.trim() === professorToToggle.name_professor.trim()) {
                                    handleExecuteToggleStatus();
                                }
                            }}
                            placeholder="Escribe el nombre aquí..."
                            style={{
                                width:'100%',
                                padding: '10px',
                                borderRadius: '6px',
                                border: '1px solid #4b5563',
                                background: '#ccc',
                                color: '#000',
                                outline: 'none',
                                fontSize: '15px'
                            }}
                        />

                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                            <button
                                type="button"
                                onClick={() => setShowConfirmModal(false)}
                                style={{
                                    padding: '8px 16px',
                                    background: '#4b5563',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '6px',
                                    cursor: 'pointer'
                                }}
                            >
                                Cancelar
                            </button>

                            <button
                                type="button"
                                disabled={confirmationInput.trim() !== professorToToggle.name_professor.trim()}
                                onClick={handleExecuteToggleStatus}
                                style={{
                                    padding: '8px 16px',
                                    background: confirmationInput.trim() === professorToToggle.name_professor.trim() ? (isCurrentlyActive ? '#dc2626' : '#16a34a') : '#9ca3af',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '6px',
                                    cursor: confirmationInput.trim() === professorToToggle.name_professor.trim() ? 'pointer' : 'not-allowed',
                                    fontWeight: 'bold'
                                }}
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

export default ProfessorAssign