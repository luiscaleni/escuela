import { useEffect, useState, useContext } from "react"
import { UserContext } from './UserProvider'
import { CONFIG_BACKEND, CONFIG_PATHS } from "../config/config"
import Card from "./Card"
import { useNavigate } from "react-router-dom"

function MattersListProfessor() {
    const [loading, setLoading] = useState(true)
    const [professor, setProfessor] = useState(null)
    const [matters, setMatters] = useState([])
    const { user } = useContext(UserContext)
    const navigate = useNavigate()

    useEffect(()=>{
        if(user.rolId !== 2){
            navigate(CONFIG_PATHS.HOME_PATH)
        }
    },[])

    const consultProf = async () => {
        try {
            const response = await fetch(`${CONFIG_BACKEND.API_DIR}/consultProfessor?id=${user.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type':'application/json',
                    'Accept':'application/json'
                }
            })
            const data = await response.json()
            if (data.success) {
                setProfessor(data.result)
            } else {
                console.log(data.message)
            }
        } catch (errorCatch) {
            if (import.meta.env.DEV) { console.error(errorCatch.message) }
        } finally {
            setLoading(false)
        }
    }
    
    const consultMatters = async () => {
        if (!professor?.matters_assigned) return;
        try {
            const response = await fetch(`${CONFIG_BACKEND.API_DIR}/loadProfessorsMatters?id=${professor.matters_assigned}`, {
                method: 'POST',
                headers: {
                    'Content-Type':'application/json',
                    'Accept':'application/json'
                }
            })
            const data = await response.json()
            if (data.success) {
                setMatters(data.result)                    
            } else {
                console.log(data.message)
            }
        } catch (errorCatch) {
            if (import.meta.env.DEV) { console.error(errorCatch.message) }
        } finally {
            setLoading(false)
        }
    }
    
    useEffect(() => {
        if (user?.id) {
            consultProf()
        }
    }, [user])

    useEffect(() => {
        if (professor) {
            consultMatters()
        }
    }, [professor])

    // Agrupamos usando el campo name_discip que viene de la tabla matters / disciplines en el PHP
    const groupedMatters = matters.reduce((acc, matt) => {
        const disciplineName = matt.name_discip || matt.discipline || "Sin disciplina";
        if (!acc[disciplineName]) {
            acc[disciplineName] = [];
        }
        acc[disciplineName].push(matt);
        return acc;
    }, {});

    return ( 
        <>
            {Object.keys(groupedMatters).length > 0 ? (
                Object.entries(groupedMatters).map(([disciplineName, disciplineMatters]) => (
                    <div key={disciplineName} style={{ marginBottom: '2rem', backgroundColor:'#333', margin:'0 0.5rem', padding:'1rem', borderRadius:'2.5rem' }}>
                        <h2>
                            Disciplina: <strong>{disciplineName}</strong>
                        </h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            {disciplineMatters.map(matt => (
                                <Card
                                    key={matt.id_matter}
                                    cardTitle={matt.name_matter}
                                    link={`/campus/${CONFIG_PATHS.CAMPUS_MY_COURSES_PATH}/detalles/${matt.id_matter}`}
                                />
                            ))}
                        </div>
                    </div>
                ))
            ) : (
                <p>No hay materias asignadas para mostrar.</p>
            )}
        </>
    );
}

export default MattersListProfessor;