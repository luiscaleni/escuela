import { useState, useEffect } from 'react'
import styles from './css/Campus.module.css'
import { useParams } from 'react-router-dom'
import { CONFIG_BACKEND } from '../config/config'
import Card from './Card'

function ContentCourses() {
    const [cargando, setCargando] = useState(true)
    const [courses, setCourses] = useState(null)
    const [discipline, setDiscipline] = useState(null)
    const { id } = useParams()

    useEffect(() => {
        if (!id) return

        fetch(`${CONFIG_BACKEND.API_DIR}/showMyCourses?id=${id}`, {
            method: 'GET',
            credentials: 'include'
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setDiscipline(data.discipline)
                    setCourses(data.result)
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
                        ) : courses?.length > 0 ? (
                                courses.map(course => (
                                <Card 
                                    key={course.id_course}
                                    link={`/campus/mis-cursos/detalles/${course.id_course}`}
                                    className={styles.courseCard}
                                    cardTitle={course.title_course}
                                    descriptCard={course.descript_course}
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