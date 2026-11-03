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
        if(user.roleId !== 2){
            navigate(CONFIG_PATHS.HOME_PATH)
        }
    },[])

    const consultProf = async () => {
        try {
            const response = await fetch(`${CONFIG_BACKEND.API_DIR}/getProfessor?id=${user.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type':'application/json',
                    'Accept':'application/json'
                },
                credentials: 'include'
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
            // Realizamos la petición por GET enviando los IDs en la URL
            const response = await fetch(`${CONFIG_BACKEND.API_DIR}/loadProfessorsMatters?id=${professor.matters_assigned}`, {
                method: 'GET',
                headers: {
                    'Content-Type':'application/json',
                    'Accept':'application/json'
                },
                credentials: 'include'
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
                    <div key={disciplineName} style={{ marginBottom: '2rem', width:'100%' }}>
                        <h2>
                            <span style={{ color: '#10B981' }}>Disciplina:</span> <strong>{disciplineName}</strong>
                        </h2>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            {disciplineMatters.map(matt => (
                                <Card
                                    key={matt.id_matter}
                                    ubication='disciplines'
                                    cardTitle={matt.name_matter}
                                    imgCard={matt.img_discip}
                                    link={`detalles/${matt.id_matter}`}
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