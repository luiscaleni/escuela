import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { CONFIG_BACKEND, CONFIG_PATHS } from "../../../config/config" // Asegúrate de importar tu config
import styles from './css/MyCourseDetail.module.css'
import TopButtons from "../../../components/TopButtons"
import LeftTopButton from "../../../components/LeftTopButton"

function MyCourseDetail() {
    const [course, setCourse] = useState(null)
    const [loading, setLoading] = useState(true) // Definimos el estado loading si lo vas a usar
    const { id } = useParams() // Extraemos 'id' tal como está definido en el router

    useEffect(() => {
        if (!id) return
        loadCourse()
    }, [id])

    const loadCourse = async () => {
        try {
            const res = await fetch(`${CONFIG_BACKEND.API_DIR}/course/detail?id=${id}`, {
                method: 'GET',
                credentials: 'include'
            })
            if (!res.ok) throw new Error('Network response was not ok')
            const data = await res.json()
            
            if(data && data.success){
                setCourse(data.result)
            } else {
                setCourse(null)
            }
        } catch (error) {
            if (import.meta.env.DEV) console.error('Error: ', error)
            setCourse(null)
        } finally {
            setLoading(false)
        }
    }

    if (loading) return <p>Cargando detalle...</p>

    return (
        <>
             <TopButtons>
                <LeftTopButton locationElm={CONFIG_PATHS.CAMPUS_MY_COURSES_PATH+"/"+course.id_sport} text="Volver" typeElm="expand" />
            </TopButtons>
            <p className={styles.routes}>Estás en: {location.pathname}</p>
            {course && (
                <h2>{course.title_course}</h2>
            )}
        </>
    )
}

export default MyCourseDetail