import Template from "../template/Template"
import { useState, useEffect, useContext } from "react"
import { CONFIG_BACKEND, CONFIG_PATHS } from "../config/config"
import Publication from "../components/Publication"
import styles from './css/Plantations.module.css'
import { useParams } from "react-router-dom"
import pencil from '../assets/icons/utilities/pencil.png'
import Loader from "../components/Loader"
import LeftTopButton from "../components/LeftTopButton"
import RightTopButton from "../components/RightTopButton"
import { useTranslation } from 'react-i18next'
import Modal from "../components/Modal"
import { UserContext } from '../components/UserProvider'
import FormPlantEdit from "../components/FormPlantEdit"

function PlantationDetail() {
    const [plantation, setPlantation] = useState([])
    const [countryDb, setCountryDb] = useState([])
    const {country, id} = useParams()
    const [loading, setLoading] = useState(true)
    const { user } = useContext(UserContext)
    const [t, i18n] = useTranslation()    
    const [showContainer, setShowContainer] = useState(false)
        
    useEffect(()=>{
        const lang = localStorage.getItem('lang') || 'es'
        i18n.changeLanguage(lang)
    },[i18n])

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
                    textElm={`* ${t('buttons.suppFormats')}: jpg, jpeg, png y webp.`}
                    onClickElm={fnCloseContainer}
                >
                    <FormPlantEdit countryPlant={country} plantation={plantation} onSuccess={updatePlant}/>
                </Modal>
            )}
            <Template>
                <Publication
                    titlePub={`${t('plantations.titleCountry')} ${plantation.province_plant}`}
                    typeElm="img"
                    locationPub={filePlant !== 'banner_home.jpg' ? ("plants/"+ country) : undefined}
                    nameAsset={filePlant}
                >
                    <LeftTopButton locationElm={`${CONFIG_PATHS.PLANTATIONS}/${countryDb}`} typeElm='expand' text={t('buttons.back')} marginLeft={true}/>
                    {user && (plantation.leader_push_plant === user.id || user.id === 1) &&(
                        <RightTopButton onClick={() => {fnShowContainer()}} typeElm='expand' text={t('buttons.edit')} marginRight={true} imgElm={pencil}/>
                    )}

                    <div className={styles.plantation}>
                       <p>País: {countryDb}</p>
                       <p>{t('plantations.province')+" :"} {plantation.province_plant}</p>
                       <p>{t('plantations.match')+" :"} {plantation.match_plant}</p>
                       <p>{t('plantations.street')+" :"} {plantation.street_plant}</p>
                       <p>{t('plantations.planter')+" :"} {plantation.members_plant}</p>
                       <p>{t('plantations.start')+" :"} {plantation.leader_plant}</p>
                       <p>{t('plantations.info')+" :"} {plantation.start_of_work_plant}</p>
                    </div>
                </Publication>
            </Template>
        </>
     )
}

export default PlantationDetail