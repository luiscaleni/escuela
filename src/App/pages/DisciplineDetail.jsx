import styles from '../components/css/Section.module.css'
import {  useParams } from 'react-router-dom'
import { useEffect, useState, useContext } from 'react'
import { CONFIG_BACKEND, CONFIG_PATHS } from '../config/config'
import Publication from '../components/Publication'
import LeftTopButton from '../components/LeftTopButton'
import Container from '../components/Container'
import Loader from '../components/Loader'
import pencil from '/icons/utilities/pencil.png'
import RightTopButton from '../components/RightTopButton'
import { UserContext } from '../../App/components/UserProvider'
import TopButtons from '../components/TopButtons'
import Modal from '../components/Modal'
import FormDisciplineEdit from '../components/FormDisciplineEdit'
import CenterContainer from '../components/CenterContainer'
import FormInscriptionCourse from '../components/FormInscriptionCourse'

function DisciplineDetail() {
    const { user } = useContext(UserContext)
    const {id_discipline} = useParams()
    const [discipline, setDiscipline] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [showContainerForm, setShowContainerForm] = useState(false)

    const fnCloseContainerForm = () => setShowContainerForm(false)

    const fnShowContainerForm = () => {
        setShowContainerForm(true)
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    useEffect(()=>{
        if (!id_discipline) return
        loadCourse()
    },[id_discipline])

    const loadCourse = async ()=>{
        try {
            const res = await fetch(`${CONFIG_BACKEND.API_DIR}/discipline/detail?id=${id_discipline}`)
            const data = await res.json()

            if(data.success){
                setDiscipline(data.result)
            }
        }catch (error) {
            setLoading(false)
            setDiscipline(null)
        }finally{
            setLoading(false)
        }
    }

    if(loading) return <Loader />
    if(error) return <p>Error en detalles: {error}</p>

    return (
        <>
        {showContainerForm && (
            <Modal
                id="containerFloat"
                onClickElm={fnCloseContainerForm}
                formats="jpg, jpeg, png y webp."
            >
                <FormDisciplineEdit/>
            </Modal>
        )}
            {discipline && (
                <Publication 
                    titlePub={discipline.name_discip}
                    nameAsset={discipline.img_discip ? discipline.img_discip : null}
                    typeElm="img"
                    locationPub='disciplines'
                >
                    <CenterContainer>
                        <TopButtons>
                            <LeftTopButton
                                locationElm={CONFIG_PATHS.SPORTS_PATH}
                                typeElm='expand'
                                text="Volver"
                            />

                        {user && user.rolId === 1 && (
                            <RightTopButton
                                onClick={()=>{fnShowContainerForm()}}
                                typeElm='expand'
                                text="Editar"
                                imgElm={pencil}
                            />
                        )}
                        </TopButtons>
                    </CenterContainer>

                    <Container widthElm="max" hiddenStyle={true}>
                        <p>{discipline.name_discip}</p>
                    </Container>
                </Publication>
            )}
        </>
    )
}

export default DisciplineDetail