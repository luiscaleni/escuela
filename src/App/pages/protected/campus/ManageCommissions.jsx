import { useState, useEffect, useRef } from 'react'
import styles from './css/ManageCommissions.module.css'
import Button from '../../../components/Button'
import ContFormInput from '../../../components/ContFormInput'
import Loader from '../../../components/Loader'
import { CONFIG_BACKEND } from '../../../config/config'

function ManageCommissions() {
    const [commissions, setCommissions] = useState([])
    const [cargando, setCargando] = useState(true)
    const [form, setForm] = useState({ id: null, name: '', shift: 'Mañana', status: 'active' })
    const [isEditing, setIsEditing] = useState(false)
    const [isAnimating, setIsAnimating] = useState(false) // 👈 Estado para la animación
    
    const formRef = useRef(null) // 👈 Referencia al formulario de arriba

    const fetchCommissions = async () => {
        try {
            const res = await fetch(`${CONFIG_BACKEND.API_DIR}/getCommissions`, {
                method: 'GET',
                credentials: 'include',
                headers: { 'Accept': 'application/json' }
            })
            const data = await res.json()
            if (data.success) {
                setCommissions(data.result)
            }
        } catch (error) {
            console.error("Error al cargar comisiones:", error)
        } finally {
            setCargando(false)
        }
    }

    useEffect(() => {
        fetchCommissions()
    }, [])

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleEditClick = (comm) => {
        setForm({ id: comm.id, name: comm.name, shift: comm.shift, status: comm.status || 'active' })
        setIsEditing(true)
        window.scrollTo({ top: 0, behavior: 'smooth' })

        // 👈 Activamos la animación de vibración y borde
        setIsAnimating(false)
        setTimeout(() => {
            setIsAnimating(true)
        }, 100); // Pequeño delay para asegurar que termine el scroll
    }

    const handleCancelEdit = () => {
        setForm({ id: null, name: '', shift: 'Mañana', status: 'active' })
        setIsEditing(false)
        setIsAnimating(false)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setCargando(true)

        const endpoint = isEditing ? `${CONFIG_BACKEND.API_DIR}/updateCommission` : `${CONFIG_BACKEND.API_DIR}/createCommission`;

        try {
            const res = await fetch(endpoint, {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            })
            const data = await res.json()

            if (data.success) {
                alert(isEditing ? "Comisión actualizada con éxito." : `Comisión creada con éxito. Código: ${data.code}`)
                handleCancelEdit()
                fetchCommissions()
            } else {
                alert(data.error || "Ocurrió un error")
            }
        } catch (error) {
            console.error(error)
            alert("Error de red al procesar la solicitud")
        } finally {
            setCargando(false)
        }
    }

    if (cargando && commissions.length === 0) return <Loader />

    return (
        <div className={styles.container}>
            <h2>{isEditing ? 'Editar Comisión' : 'Gestión de Comisiones'}</h2>
            
            {/* Formulario de Creación / Edición con referencia y clase condicional */}
            <form 
                ref={formRef}
                onSubmit={handleSubmit} 
                className={`${styles.form} ${isAnimating ? styles.pulseHighlight : ''}`}
            >
                <ContFormInput nameElm="Nombre de la Comisión:">
                    <input 
                        type="text" 
                        name="name" 
                        placeholder="Ej: Comisión A" 
                        value={form.name} 
                        onChange={handleChange} 
                        required 
                    />
                </ContFormInput>

                <ContFormInput nameElm="Turno:">
                    <select name="shift" value={form.shift} onChange={handleChange}>
                        <option value="Mañana">Mañana</option>
                        <option value="Tarde">Tarde</option>
                        <option value="Noche">Noche</option>
                    </select>
                </ContFormInput>

                {isEditing && (
                    <ContFormInput nameElm="Estado:">
                        <select name="status" value={form.status} onChange={handleChange}>
                            <option value="active">Activa</option>
                            <option value="inactive">Inactiva</option>
                        </select>
                    </ContFormInput>
                )}

                <div style={{ display: 'flex', gap: '10px', marginTop: '10px', justifyContent: 'center' }}>
                    <Button typeBtn="submit" styleBtn={2}>
                        {isEditing ? 'Guardar Cambios' : 'Crear Comisión y Generar Código'}
                    </Button>
                    {isEditing && (
                        <button type="button" onClick={handleCancelEdit} className={styles.cancelButton}>
                            Cancelar
                        </button>
                    )}
                </div>
            </form>

            {/* Listado de Comisiones Existentes */}
            <div className={styles.listContainer}>
                <h3>Comisiones Registradas</h3>
                
                <div className={styles.gridHeader}>
                    <div className={styles.colId}>ID</div>
                    <div className={styles.colName}>Nombre</div>
                    <div className={styles.colShift}>Turno</div>
                    <div className={styles.colCode}>Código</div>
                    <div className={styles.colStudents}>Alumnos</div>
                    <div className={styles.colStatus}>Estado</div>
                    <div className={styles.colAction}>Acción</div>
                </div>

                <div className={styles.gridBody}>
                    {cargando ? (
                        <div style={{ padding: '20px', textAlign: 'center' }}>
                            <Loader />
                        </div>
                    ) : commissions.length > 0 ? (
                            commissions.map(comm => (
                                <div key={comm.id} className={styles.gridRow}>
                                    <div className={styles.colId} data-label="ID">{comm.id}</div>
                                    <div className={styles.colName} data-label="Nombre">{comm.name}</div>
                                    <div className={styles.colShift} data-label="Turno">{comm.shift}</div>
                                    <div className={styles.colCode} data-label="Código"><code>{comm.code}</code></div>
                                    <div className={styles.colStudents} data-label="Alumnos">{comm.total_students}</div>
                                    <div className={styles.colStatus} data-label="Estado">{comm.status}</div>
                                    <div className={styles.colAction} data-label="Acción">
                                        <button 
                                            type="button" 
                                            onClick={() => handleEditClick(comm)}
                                            style={{ padding: '5px 10px', background: '#3b82f6', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                                        >
                                            Editar
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className={styles.emptyMessage}>No hay comisiones creadas.</div>
                        )}
                </div>
            </div>
        </div>
    )
}

export default ManageCommissions