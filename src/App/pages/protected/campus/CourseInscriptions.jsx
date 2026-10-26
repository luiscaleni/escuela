import Card from "../../../components/Card"
import styles from './css/CourseInscriptions.module.css'
import { useState, useEffect, useContext } from 'react'
import { UserContext } from '../../../components/UserProvider'
import { CONFIG_BACKEND } from "../../../config/config"
import Modal from "../../../components/Modal"
import Button from "../../../components/Button"

function CourseInscriptions() {
    const [disciplines, setDisciplines] = useState([])
    const [loadingDisciplines, setLoadingDisciplines] = useState(true)
    
    // Estado para guardar la disciplina seleccionada y abrir el modal con sus datos
    const [selectedDiscipline, setSelectedDiscipline] = useState(null)
    const [enrollmentCode, setEnrollmentCode] = useState("")
    const [submitting, setSubmitting] = useState(false)
    const { user } = useContext(UserContext)

    const fnShowContainerForm = (discipline) => {
        setSelectedDiscipline(discipline)
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    const fnCloseContainerForm = () => {
        setSelectedDiscipline(null)
        setEnrollmentCode("")
    }

    useEffect(() => {
        fetch(`${CONFIG_BACKEND.API_DIR}/disciplines`, {
            method: 'GET',
            credentials: 'include'
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                setDisciplines(data.result)
            } else {
                if (import.meta.env.DEV) { console.error('Error en deportes: ', data.message) }
            }
        })
        .catch(error => {
            if (import.meta.env.DEV) console.error('Error en API: ', error)
        })
        .finally(() => {
            setLoadingDisciplines(false)
        })
    }, [])

    // Función para manejar el envío del código de matrícula al backend
    const handleEnrollSubmit = (e) => {
        e.preventDefault()
        if (!enrollmentCode.trim()) return

        setSubmitting(true)

        fetch(`${CONFIG_BACKEND.API_DIR}/enroll`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
                id_sport: selectedDiscipline.id_sport,
                id_discipline: selectedDiscipline.id_discip,
                enrollment_code: enrollmentCode
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                alert('¡Inscripción exitosa!')
                window.dispatchEvent(new CustomEvent('inscriptionUpdated'));
                fnCloseContainerForm()
            } else {
                alert(data.message || 'Código de matrícula inválido.')
            }
        })
        .catch(err => console.error('Error al matricularse:', err))
        .finally(() => setSubmitting(false))
    }

    return ( 
        <>
        {selectedDiscipline && (
            <Modal
                titleElm={selectedDiscipline.name_discip}
                onClickElm={fnCloseContainerForm}
            >
                <div className={styles.container}>
                    <div className={styles.contDescript}>
                        <p>{selectedDiscipline.descript_discip || 'Sin descripción disponible.'}</p>
                    </div>

                    <form onSubmit={handleEnrollSubmit}>
                        <div className={styles.contCodeRegisterGrp}>
                            <label>Ingrese el código de matrícula: (pregunte a administración)</label>
                            <input 
                                type="text" 
                                value={enrollmentCode}
                                onChange={(e) => setEnrollmentCode(e.target.value)}
                                placeholder="Ingresa el código..."
                                required
                            />
                        </div>

                        <div className={styles.contBtn}>
                            <Button 
                                type="submit" 
                                disabled={submitting}
                                style={{ padding: '8px 15px', cursor: 'pointer' }}
                            >
                                {submitting ? 'Inscribiendo...' : 'Registrarme'}
                            </Button>
                        </div>
                    </form>
                </div>
            </Modal>
        )}
        <h2>Cursos disponibles:</h2>
        {loadingDisciplines ? (
            <p>Cargando cursos...</p>
        ) : disciplines.length > 0 ? (
            disciplines.map(discipline => (
                <div 
                    key={discipline.id_discip} 
                    onClick={() => fnShowContainerForm(discipline)}
                    style={{ cursor: 'pointer' }}
                >
                    <Card 
                        cardTitle={discipline.name_discip} 
                        ubication='disciplines'
                        descriptionCard={discipline.descript_discip}
                        imgCard={discipline.img_discip}
                    />
                </div>
            ))
        ) : (
            <p>Sin cursos por el momento</p>
        )}
        </>
    )
}

export default CourseInscriptions