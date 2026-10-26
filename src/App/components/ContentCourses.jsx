import { useState, useEffect } from 'react'
import styles from './css/Campus.module.css'
import { useParams } from 'react-router-dom'
import { CONFIG_BACKEND, CONFIG_PATHS } from '../config/config'
import Card from './Card'

function ContentCourses() {
    const [cargando, setCargando] = useState(true)
    const [matters, setMatters] = useState(null)
    const [discipline, setDiscipline] = useState(null)
    const { id } = useParams()

    useEffect(() => {
        if (!id) return

        fetch(`${CONFIG_BACKEND.API_DIR}/showMyMatters?id=${id}`, {
            method: 'GET',
            credentials: 'include'
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setDiscipline(data.discipline)
                    setMatters(data.result)
                } else {
                    console.error('El backend reportó un error: ', data.error)
                }
            })
            .catch(error => {
                console.error('Error de red en el fetch: ', error)
            })
            .finally(() => {
                setCargando(false)
            })
    }, [id])

    return ( 
        <>
            <div className={styles.panelCampus}>
                <div className={styles.panelContainer}>
                    <h2>{cargando ? "Cargando ..." : discipline ? discipline.name_discip: "No se encontró"}</h2>
                        {cargando ? (
                            <p>Cargando curso...</p>
                        ) : matters?.length > 0 ? (
                                matters.map(matter => (
                                <Card 
                                    key={matter.id_matter}
                                    link={`/campus/${CONFIG_PATHS.CAMPUS_MY_COURSES_PATH}/detalles/${matter.id_matter}`}
                                    className={styles.matterCard}
                                    cardTitle={matter.name_matter}
                                    descriptCard={matter.descript_matter}
                                />
                            ))
                        ) : (
                            <p>No se encontró el curso o no estás inscrito.</p>
                        )}
                </div>
            </div>
        </>
    )
}

export default ContentCourses