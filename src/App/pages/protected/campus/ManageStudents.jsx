import { useEffect, useState, useContext } from 'react'
import { CONFIG_BACKEND, CONFIG_PATHS } from '../../../config/config'
import { UserContext } from '../../../components/UserProvider'
import { useNavigate } from 'react-router-dom'
import Modal from '../../../components/Modal'

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
            // Reutiliza o adapta tu endpoint de cambio de estado enviando el id del usuario
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
                consultStudents(); // Recarga la lista para actualizar los estados
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
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', color: '#fff' }}>
            <h2>Gestión de Alumnos</h2>
            
            {/* Buscador local */}
            <div style={{ margin: '20px 0' }}>
                <input 
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Buscar alumno por nombre, apellido o email..."
                    style={{
                        width: '100%',
                        minWidth: '24rem',
                        padding: '10px',
                        borderRadius: '6px',
                        border: '1px solid #4b5563',
                        background: '#1d1d1d',
                        color: '#fff',
                        outline: 'none'
                    }}
                />
            </div>

            {loading ? (
                <p style={{ color: '#aaa' }}>Cargando alumnos...</p>
            ) : filteredStudents.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {filteredStudents.map(student => {
                        const active = student.status !== 0;
                        return (
                            <div 
                                key={student.id} 
                                style={{ background: '#fff', padding: '15px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                            >
                                <div>
                                    <h4 style={{ margin: 0, color: '#000' }}>
                                        {student.names} {student.last_names} 
                                        {!active && <span style={{ color: '#ef4444', fontSize: '12px', marginLeft: '8px' }}>(Inhabilitado)</span>}
                                    </h4>
                                    <p style={{ margin: '5px 0 0 0', fontSize: '13px', color: '#505050' }}>{student.email}</p>
                                </div>

                                <button 
                                    type="button"
                                    onClick={() => handleOpenConfirmModal(student)}
                                    style={{ 
                                        padding: '8px 14px', 
                                        background: active ? '#dc2626' : '#16a34a', 
                                        color: '#fff', 
                                        border: 'none', 
                                        borderRadius: '6px', 
                                        cursor: 'pointer', 
                                        fontWeight: 'bold',
                                        fontSize: '13px'
                                    }}
                                >
                                    {active ? 'Deshabilitar' : 'Habilitar'}
                                </button>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <p style={{ color: '#aaa' }}>No se encontraron alumnos.</p>
            )}

            {/* Modal de confirmación por escritura */}
            {showConfirmModal && studentToToggle && (
                <Modal
                    titleElm={`${isCurrentlyActive ? 'Deshabilitar' : 'Habilitar'} a: ${studentFullName}`}
                    onClickElm={() => setShowConfirmModal(false)}
                >
                    <div style={{ padding: '10px 0', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        <p style={{ margin: 0, fontSize: '14px', color:'#000'}}>
                            Para confirmar la acción, escribe el nombre exacto y completo: <strong style={{ color: 'red' }}>{studentFullName}</strong>
                        </p>
                        
                        <input 
                            type="text" 
                            value={confirmationInput}
                            onChange={(e) => setConfirmationInput(e.target.value)}
                            placeholder="Escribe el nombre aquí..."
                            style={{
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
                                // Comparamos de forma estricta (carácter por carácter, sin limpiar espacios con trim)
                                disabled={confirmationInput !== studentFullName}
                                onClick={handleExecuteToggleStatus}
                                style={{
                                    padding: '8px 16px',
                                    background: confirmationInput === studentFullName ? (isCurrentlyActive ? '#dc2626' : '#16a34a') : '#9ca3af',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '6px',
                                    cursor: confirmationInput === studentFullName ? 'pointer' : 'not-allowed',
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

export default ManageStudents