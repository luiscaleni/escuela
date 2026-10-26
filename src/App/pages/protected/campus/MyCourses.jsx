import { useEffect, useState,useContext } from "react"
import { CONFIG_BACKEND } from "../../../config/config"
import { UserContext } from '../../../components/UserProvider'
import Card from '../../../components/Card'
import { Link } from 'react-router-dom'

function MyCourses() {
    const [cargando, setCargando] = useState(false)
    const [inscript, setInscript] = useState([])
    const { user } = useContext(UserContext)
    
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

    useEffect(()=>{
        consult()
    },[])

    return (
            <>
            <h2>Estás inscrito en:</h2>
                {inscript?.length > 0 ? (
                    inscript.map(inscp => (
                        <Card 
                            key={inscp.id_inscript}
                            cardTitle={inscp.title_course}
                            link={`/campus/mis-cursos/${inscp.id_course}`}
                            imgSrc={getSportIcon(inscp.name_sport, inscp.title_course)} 
                        />
                    ))
                ) : (<span>Ningún curso inscrito</span>)}
            </>
    )
}

export default MyCourses