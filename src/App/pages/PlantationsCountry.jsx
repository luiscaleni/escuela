import Template from "../template/Template"
import { useState, useEffect, useContext } from "react"
import { Link, useParams } from 'react-router-dom'
import { CONFIG_BACKEND, CONFIG_PATHS } from "../config/config"
import Publication from "../components/Publication"
import styles from './css/PlantationsCountry.module.css'
import stylesB from '../components/css/Button.module.css'
import LeftTopButton from '../components/LeftTopButton'
import Modal from '../components/Modal'
import stylesButton from '../components/css/Button.module.css'
import { useTranslation } from 'react-i18next'
import RightTopButton from "../components/RightTopButton"
import imgPlus from '../assets/icons/utilities/plus.png'
import imgGraphic from '../assets/icons/utilities/graphic.png'
import ButtonTop from "../components/ButtonTop"
import ChartPie from "../components/ChartPie"
import FormPlantation from '../components/FormPlantation'
import { UserContext } from '../components/UserProvider'
import DownloadChartAsImage from '../utils/DownloadChartAsImage'
import TopButtons from "../components/TopButtons"

function PlantationsCountry() {
    const [plantations, setPlantations] = useState([])
    const {country} = useParams()
    const [showContainerForm, setShowContainerForm] = useState(false)
    const [showContainer, setShowContainer] = useState(false)
    const { user, loadUser } = useContext(UserContext)
    const [t, i18n] = useTranslation()    
    
    useEffect(()=>{
        const lang = localStorage.getItem('lang') || 'es'
        i18n.changeLanguage(lang)
    },[i18n])

    useEffect(() => {
        fetch(`${CONFIG_BACKEND.API_DIR}/plantationsCountry?country=${country}`, {
            method: 'GET'
        })
            .then(res => res.json())
            .then(data=>{
                if (data.success) {
                    setPlantations(data.result)
                }else{
                    if (import.meta.env.DEV) { console.error('Error: ', data.error)}
                }
                
            })
            .catch (error => import.meta.env.DEV ?? console.error('Error en API: ', error))
    },[])

    const fnCloseContainer = () => setShowContainer(false)
    const fnShowContainer = () => {
        setShowContainer(true)
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    const fnCloseContainerForm = () => setShowContainerForm(false)
    const fnShowContainerForm = () => {
        setShowContainerForm(true)
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    const downloadImg = ()=>{
        DownloadChartAsImage(country)
    }
    const load = async ()=>{
        await loadUser()
    }


    return ( 
        <>
            {showContainer && (
                <Modal
                    id="containerFloat"
                    titleElm={country} 
                    textElm={`* ${t('buttons.suppFormats')}: jpg, jpeg, png y webp.`}
                    onClickElm={fnCloseContainer}
                >
                    <div className={styles.contGB}>
                        <ChartPie country={country} />
                        
                        <button onClick={downloadImg} className={stylesB.button}>
                            Descargar gráfico
                        </button>
                    </div>
                </Modal>
            )}
            {showContainerForm && (
                <Modal
                    id="containerFloat"
                    titleElm={t('buttons.newPlantation')} 
                    textElm={`* ${t('buttons.suppFormats')}: jpg, jpeg, png y webp.`}
                    onClickElm={fnCloseContainerForm}
                >
                    <FormPlantation countryPlant={country}/>
                </Modal>
            )}
            
            <Template>
                <Publication
                    titlePub={t('plantations.titleCountry')+country}
                    typeElm="img"
                    locationAlt="coverCountrys"
                    nameAsset={`${country}.jpg`}
                >
                    <TopButtons>
                        <LeftTopButton 
                            typeElm='expand' 
                            text={t('buttons.plantations')} 
                            marginLeft={true}
                            locationElm={CONFIG_PATHS.PLANTATIONS} 
                        />
                        {plantations.length > 0 &&(
                            <ButtonTop 
                                id="seeGraphic"
                                textElm={t('buttons.graphic')} 
                                typeElm='expand'
                                imgElm={imgGraphic}
                                onClick={() => {fnShowContainer()}}
                            />
                        )}
                        {user && (user.rolId === 1 || user.rolId === 2) && (    
                            <RightTopButton 
                                typeElm='expand' 
                                text={t('buttons.newPlantation')} 
                                marginRight={true} 
                                imgElm={imgPlus} 
                                onClick={() => {fnShowContainerForm()}} 
                            />
                        )}
                    </TopButtons>
                        {plantations.length > 0 ? (
                            <div className={styles.contContTable}>
                                <div className={styles.contTable}>
                                    <div className={styles.headerList}>
                                        <div className={styles.mediumSpace}>{t('plantations.province')}</div>
                                        <div className={styles.mediumSpace}>{t('plantations.match')}</div>
                                        <div className={styles.largeSpace}>{t('plantations.street')}</div>
                                        <div className={styles.smallSpace}>{t('plantations.members')}</div>
                                        <div className={styles.mediumSpace}>{t('plantations.planter')}</div>
                                        <div className={styles.mediumSpace}>{t('plantations.start')}</div>
                                        <div className={styles.mediumSpace}>{t('plantations.info')}</div>
                                    </div>
                                    <div className={styles.table}>
                                        { plantations.length > 0 ? (
                                            plantations.map((plant, index) => (
                                                <div 
                                                    key={plant.id_plant} 
                                                    className={`
                                                        ${(plant.id_plant % 2) === 0 ? styles.resultW : styles.resultG}
                                                        ${index === 0 ? styles.firstResult: ''}
                                                    `}
                                                >
                                                    <div className={styles.mediumSpace}>{plant.province_plant}</div>
                                                    <div className={styles.mediumSpace}>{plant.match_plant}</div>
                                                    <div className={styles.largeSpace}>{plant.street_plant}</div>
                                                    <div className={styles.smallSpace}>{plant.members_plant}</div>
                                                    <div className={styles.mediumSpace}>{plant.leader_plant}</div>
                                                    <div className={styles.mediumSpace}>{plant.start_of_work_plant}</div>
                                                    <div className={styles.mediumSpace}>
                                                        <Link 
                                                            to={`/plantaciones/${country}/${plant.id_plant}`}
                                                            className={stylesButton.button}
                                                        >
                                                            {t('buttons.seeMore')}
                                                        </Link>
                                                    </div>
                                                </div>
                                            ))
                                        ):( <br/>)}
                                    </div>
                                </div>
                            </div>
                        ):(
                            <p>{t('alerts.nonePlant')}</p>
                        )}
                </Publication>
            </Template>
        </>
     )
}

export default PlantationsCountry