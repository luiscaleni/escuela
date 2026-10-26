import { useEffect, useState, useContext } from 'react'
import { CONFIG_BACKEND, CONFIG_PATHS } from '../../../config/config'
import { UserContext } from '../../../components/UserProvider'
import { useNavigate } from 'react-router-dom'
import Modal from '../../../components/Modal'
import ContProfessor from '../../../components/ContProfessor'
import ProfessorRowItem from '../../../components/ProfessorRowItem' // El componente que creamos arriba

function ProfessorAssign() {
    const [loading, setLoading] = useState(true)
    const [professors, setProfessors] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [currentProfessor, setCurrentProfessor] = useState(null)

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

    if (user && user.rolId !== 1) {
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
        consultProf() // Recargamos la lista de profesores al cerrar el modal para actualizar el texto en vivo
    }

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ color: '#fff', marginBottom: '20px' }}>Asignación de Profesores</h2>
            
            {professors?.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {professors.map(prof => (
                        <ProfessorRowItem 
                            key={prof.id_professor} 
                            professor={prof} 
                            onOpenModal={handleOpenModal} 
                        />
                    ))}
                </div>
            ) : (
                <p style={{ color: '#aaa' }}>Sin profesores que mostrar</p>
            )}

            {showModal && currentProfessor && (
                <Modal
                    titleElm={`Asignar a: ${currentProfessor.name_professor}`}
                    onClickElm={handleCloseModal}
                >
                    <ContProfessor professor={currentProfessor} onSuccess={handleCloseModal} />
                </Modal>
            )}
        </div>
    )
}

export default ProfessorAssign