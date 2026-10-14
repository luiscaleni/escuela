import { useState, useEffect, useContext } from "react"
import { CONFIG_BACKEND, CONFIG_PATHS } from "../config/config"
import Publication from "../components/Publication"
import styles from './css/Plantations.module.css'
import { useParams } from "react-router-dom"
import pencil from '/icons/utilities/pencil.png'
import Loader from "../components/Loader"
import LeftTopButton from "../components/LeftTopButton"
import RightTopButton from "../components/RightTopButton"
import Modal from "../components/Modal"
import { UserContext } from '../components/UserProvider'
import FormPlantEdit from "../components/FormPlantEdit"
import TopButtons from "../components/TopButtons"

function PlantationDetail() {
    const [plantation, setPlantation] = useState([])
    const [countryDb, setCountryDb] = useState([])
    const {country, id} = useParams()
    const [loading, setLoading] = useState(true)
    const { user } = useContext(UserContext)
    const [showContainer, setShowContainer] = useState(false)

    useEffect(()=>{
        loadPlantDetail()
    },[])

    const loadPlantDetail = async ()=>{
        try {
            const res = await fetch(`${CONFIG_BACKEND.API_DIR}/plantation/detail?country=${country}&id=${id}`)
            const data = await res.json()
            if(data.success){
                setCountryDb(data.countryDb)
                setPlantation(data.result)
            }else{
                location.href = CONFIG_PATHS.PLANTATIONS
            }
        } catch (error) {
            setPlantation(null)
            setLoading(false)
            if (import.meta.env.DEV) { console.error('Error en API: ', error)}
        }finally{
            setLoading(false)
        }
    }

    const fnCloseContainer = () => setShowContainer(false)
    const fnShowContainer = () => {
        setShowContainer(true)
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    function updatePlant(result) {
        setPlantation(result)
        setShowContainer(false)
    }

    if(loading) return <Loader />
    let filePlant = plantation.img_plant ?? 'banner_home.jpg'

    return ( 
        <>
            {showContainer && (
                <Modal
                    id="containerFloat"
                    textElm={`* Formatos permitidos: jpg, jpeg, png y webp.`}
                    onClickElm={fnCloseContainer}
                >
                    <FormPlantEdit countryPlant={country} plantation={plantation} onSuccess={updatePlant}/>
                </Modal>
            )}
            <Publication
                titlePub={`${"Pais"} ${plantation.province_plant}`}
                typeElm="img"
                locationPub={filePlant !== 'banner_home.jpg' ? ("plants/"+ country) : undefined}
                nameAsset={filePlant}
            >
                <TopButtons>
                    <LeftTopButton locationElm={`${CONFIG_PATHS.PLANTATIONS}/${countryDb}`} typeElm='expand' text="Volver" marginLeft={true}/>
                    {user && (plantation.leader_push_plant === user.id || user.id === 1) &&(
                        <RightTopButton onClick={() => {fnShowContainer()}} typeElm='expand' text="Editar" marginRight={true} imgElm={pencil}/>
                    )}
                </TopButtons>

                <div className={styles.plantation}>
                    <p>País: {countryDb}</p>
                    <p>{"h :"} {plantation.province_plant}</p>
                    <p>{"h :"} {plantation.match_plant}</p>
                    <p>{"h :"} {plantation.street_plant}</p>
                    <p>{"h :"} {plantation.members_plant}</p>
                    <p>{"h :"} {plantation.leader_plant}</p>
                    <p>{"h :"} {plantation.start_of_work_plant}</p>
                </div>
            </Publication>
        </>
     )
}

export default PlantationDetail