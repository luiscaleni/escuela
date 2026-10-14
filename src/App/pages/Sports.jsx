import { UserContext } from '../components/UserProvider'
import { useState, useEffect, useContext } from 'react'
import { CONFIG_BACKEND } from '../config/config'
import Publication from '../components/Publication'
import Card from '../components/Card'
import RightTopButton from "../components/RightTopButton"
import TopButtons from "../components/TopButtons"
import Modal from '../components/Modal'
import FormNew from '../components/FormNew'
import imgPlus from '/icons/utilities/plus.png'

function Sports() {
    const [disciplines, setDisciplines] = useState([])
    const [loadingDisciplines, setLoadingDisciplines] = useState(true)
    const { user } = useContext(UserContext)
    const [showContainerForm, setShowContainerForm] = useState(false)
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
                setDisciplines(data.result)
            } else {
                if (import.meta.env.DEV) { console.error('Error en deportes: ', data.message) }
            }
        })
        .catch(error => {
            if (import.meta.env.DEV) console.error('Error en API: ', error)
        })
        .finally(() => {
            setLoadingDisciplines(false) // <-- Apagamos la carga al terminar
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
            <Publication titlePub="Cursos" typeElm='img' nameAsset="banner_news.jpg">
                <TopButtons>
                    {user && (user.rolId === 1 || user.rolId === 2) && (
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
                <h2>Futbol</h2>

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
                    <p>Sin cursos por el momento</p>
                )}
            </Publication>
        </>
     )
}

export default Sports