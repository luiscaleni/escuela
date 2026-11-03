import { UserContext } from '../components/UserProvider'
import { useState, useEffect, useContext } from 'react'
import { CONFIG_BACKEND, CONFIG_PATHS } from '../config/config'
import Publication from '../components/Publication'
import Card from '../components/Card'
import RightTopButton from "../components/RightTopButton"
import TopButtons from "../components/TopButtons"
import Modal from '../components/Modal'
import FormNew from '../components/FormNew'
import imgPlus from '/icons/utilities/plus.png'
import { useNavigate } from 'react-router-dom'

function Sports() {
    const [disciplines, setDisciplines] = useState([])
    const [loadingDisciplines, setLoadingDisciplines] = useState(true)
    const [showContainerForm, setShowContainerForm] = useState(false)
    const { user } = useContext(UserContext)
    const navigate = useNavigate()

    useEffect(() => {
        if (user) {
            navigate(CONFIG_PATHS.CAMPUS_PATH, { replace: true })
        }
    }, [user, navigate])

    const fnCloseContainerForm = () => setShowContainerForm(false)
    const fnShowContainerForm = () => {
        setShowContainerForm(true)
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    useEffect(() => {
        fetch(`${CONFIG_BACKEND.API_DIR}/disciplines`, {
            method: 'GET'
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                // Filtramos por seguridad en el cliente los que tengan sport_status === 1 (o Number(sport_status) === 1)
                const cursosActivos = (data.result || []).filter(
                    item => Number(item.sport_status) === 1 || item.sport_status === undefined
                );
                setDisciplines(cursosActivos);
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

    return ( 
        <>
            {showContainerForm && (
                <Modal
                    id="containerFloat"
                    onClickElm={fnCloseContainerForm}
                    formats="jpg, jpeg, png y webp."
                >
                    <FormNew />
                </Modal>
            )}
            <Publication titlePub="Nuestros Cursos" typeElm='img' nameAsset="banner_courses.png">
                <TopButtons>
                    {user && (user.roleId === 1) && (
                        <>
                        <br/>
                        <RightTopButton 
                            typeElm='expand' 
                            text="Agregar nuevo curso"
                            imgElm={imgPlus} 
                            onClick={() => {fnShowContainerForm()}} 
                        />
                        <br/>
                        </>
                    )}
                </TopButtons>

                {loadingDisciplines && (
                    <h2>Nuestros cursos</h2>
                )}

                {/* Mostramos un mensaje o indicador sutil mientras carga, evitando el parpadeo vacío */}
                {loadingDisciplines ? (
                    <p>Cargando cursos...</p>
                ) : disciplines.length > 0 ? (
                    disciplines.map(discipline => (
                        <Card key={discipline.id_discip}
                            link={`/deportes/disciplina/${discipline.id_discip}`}
                            cardTitle={discipline.name_discip} 
                            ubication='disciplines'
                            descriptionCard={discipline.descript_discip}
                            imgCard={discipline.img_discip}
                        />
                    ))
                ) : (
                    <p>Estamos trabajando en nuevos cursos para ti.</p>
                )}
            </Publication>
        </>
     )
}

export default Sports