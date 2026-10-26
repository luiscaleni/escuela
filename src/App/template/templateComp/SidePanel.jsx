import styles from './css/SidePanel.module.css'
import arrowLeft from '/icons/utilities/arrowLeft.png'
import close from '/icons/responsive/close.png'
import GroupPanel from '../../components/GroupPanel'
import { CONFIG_BACKEND, CONFIG_PATHS } from '../../config/config'
import { UserContext } from '../../components/UserProvider'
import { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import classBtn from '../../components/css/Button.module.css'

function SidePanel() {
    const [cargando, setCargando] = useState(false)
    const [inscript, setInscript] = useState([])
    const { user } = useContext(UserContext)
    
    // Inicia abierto en desktop (> 1280px) y cerrado en tablets/móviles (<= 1280px)
    const [togglePanel, setTogglePanel] = useState(() => window.innerWidth > 1280)

    function toggleMenuPanel(){
        setTogglePanel(!togglePanel)
    }

    // Función para seleccionar dinámicamente el icono según el deporte de la BD
    // Función mejorada que evalúa tanto el deporte como el nombre del curso
    const getSportIcon = (sportName, courseName) => {
        // Normalizamos el texto del curso y del deporte para limpiar acentos y mayúsculas
        const course = (courseName || '').toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        const sport = (sportName || '').toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        
        // 1. Si el nombre del curso o del deporte pertenece al fútbol, usamos siempre el icono de fútbol
        if (course.includes('futbol') || course.includes('futsal') || sport.includes('futbol')) {
            return '/icons/links/sports/football.png'
        }
        
        // 2. Evaluamos el resto de los deportes (cubriendo 'basket', 'basquet' y 'basketball')
        if (course.includes('basket') || course.includes('basquet') || sport.includes('basket')) {
            return '/icons/links/sports/basketball.png' // Cámbialo a '/icons/links/sports/basketball.png' si tu archivo se llama así
        }
        if (course.includes('rugby') || sport.includes('rugby')) {
            return '/icons/links/sports/rugbyBall.png'
        }
        if (course.includes('voley') || sport.includes('voley')) {
            return '/icons/links/sports/voleyball.png'
        }
        if (course.includes('hockey') || sport.includes('hockey')) {
            return '/icons/links/sports/hockey.png'
        }
        if (course.includes('handball') || sport.includes('handball')) {
            return '/icons/links/sports/handball.png'
        }
        
        return '/icons/links/sports/football.png' // Icono por defecto
    }

    const consult = async () => {
        if (!user) {
            setInscript([])
            setCargando(false)
            return
        }

        try {
            const response = await fetch(`${CONFIG_BACKEND.API_DIR}/inscriptions`, {
                method: 'POST',
                credentials: 'include'
            })
            if (!response.ok) {
                throw new Error('Network response was not ok')
            }
            const data = await response.json()
            if (data && data.success) {
                setInscript(data.result)
            } else {
                setInscript([])
            }
        } catch (error) {
            console.log("❌ Error " + error)
            setInscript([])
        } finally {
            setCargando(false)
        }
    }

    useEffect(() => {
        consult()

        const handleInscriptionChange = () => {
            consult()
        }

        window.addEventListener('inscriptionUpdated', handleInscriptionChange)

        return () => {
            window.removeEventListener('inscriptionUpdated', handleInscriptionChange)
        }
    }, [user])

    return ( 
        <>
            <div className={`${styles.sidePanel} ${togglePanel ? styles.panelOpen : styles.panelClosed}`}>
                <div className={styles.buttonPanel} alt='buttonPanel' onClick={toggleMenuPanel}>
                    <img src={togglePanel ? close : arrowLeft} className={styles.imgMenuButtonPanel} alt="Menu Toggle"/>
                </div>
                <h2>Campus</h2>
                {user && (user.rolId === 1) ? (
                    <>
                    <Link to={CONFIG_PATHS.CAMPUS_CREATE_COURSE_PATH} className={classBtn.button}>Gestionar deportes</Link>
                    <Link to={CONFIG_PATHS.CAMPUS_ASSING_PROFESSORS_PATH} className={classBtn.button}>Asignar profesores</Link>
                    </>
                ) : user && (user.rolId === 2) ? (
                    <Link to={CONFIG_PATHS.CAMPUS_COURSES_LIST_PROFESSOR_PATH} className={classBtn.button}>Cursos habilitados</Link>
                ):(
                    <GroupPanel titleElm='Cursos inscriptos'>
                        {inscript?.length > 0 ? (
                            inscript.map(inscp => (
                                <Link 
                                    key={inscp.id_inscript}
                                    to={`/campus/mis-cursos/${inscp.id_course}`}
                                    title={inscp.title_course}
                                >
                                    <img 
                                        src={getSportIcon(inscp.name_sport, inscp.title_course)} 
                                        alt="Sport Icon" 
                                        style={{ objectFit: 'contain' }} 
                                    />&nbsp;
                                    {inscp.title_course}
                                </Link>
                            ))
                        ) : (<span>Ningún curso inscrito</span>)}
                        <Link to={CONFIG_PATHS.CAMPUS_COURSE_INSCRIPTIONS}>Inscribirme a más cursos</Link>
                    </GroupPanel>
                )}
            </div>
        </>
     )
}

export default SidePanel