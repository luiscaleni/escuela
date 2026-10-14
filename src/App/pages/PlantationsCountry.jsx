import { useState, useEffect, useContext } from "react"
import { Link, useParams } from 'react-router-dom'
import { CONFIG_BACKEND, CONFIG_PATHS } from "../config/config"
import Publication from "../components/Publication"
import styles from './css/PlantationsCountry.module.css'
import stylesB from '../components/css/Button.module.css'
import LeftTopButton from '../components/LeftTopButton'
import Modal from '../components/Modal'
import stylesButton from '../components/css/Button.module.css'
import RightTopButton from "../components/RightTopButton"
import imgPlus from '/icons/utilities/plus.png'
import imgGraphic from '/icons/utilities/graphic.png'
import ButtonTop from "../components/ButtonTop"
import ChartPie from "../components/ChartPie"
import FormPlantation from '../components/FormPlantation'
import { UserContext } from '../components/UserProvider'
import DownloadChartAsImage from '../utils/DownloadChartAsImage'
import TopButtons from "../components/TopButtons"

function PlantationsCountry() {
    const [plantations, setPlantations] = useState([])
    const [showContainerForm, setShowContainerForm] = useState(false)
    const [showContainer, setShowContainer] = useState(false)
    const {country} = useParams()
    const { user, loadUser } = useContext(UserContext)

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
                    textElm={`* Formatos permitidos: jpg, jpeg, png y webp.`}
                    onClickElm={fnCloseContainer}
                >
                    <div className={styles.contGB}>
                        <ChartPie country={country} />
                        
                        <button onClick={downloadImg} className={stylesB.button}>
                            Descargar
                        </button>
                    </div>
                </Modal>
            )}
            {showContainerForm && (
                <Modal
                    id="containerFloat"
                    titleElm="Nueva plantación" 
                    textElm={`* Formatos permitidos: jpg, jpeg, png y webp.`}
                    onClickElm={fnCloseContainerForm}
                >
                    <FormPlantation countryPlant={country}/>
                </Modal>
            )}
            
            <Publication
                titlePub={"Plantacion"+country}
                typeElm="img"
                locationAlt="coverCountrys"
                nameAsset={`${country}.jpg`}
            >
                <div style={{width:'96%'}}>
                <TopButtons>
                    <LeftTopButton 
                        typeElm='expand' 
                        text="Plantacion"
                        marginLeft={true}
                        locationElm={CONFIG_PATHS.PLANTATIONS} 
                    />
                    {plantations.length > 0 &&(
                        <ButtonTop 
                            id="seeGraphic"
                            textElm="Gráficos"
                            typeElm='expand'
                            imgElm={imgGraphic}
                            onClick={() => {fnShowContainer()}}
                        />
                    )}
                    {user && (user.rolId === 1 || user.rolId === 2) && (    
                        <RightTopButton 
                            typeElm='expand' 
                            text="Nueva plantación"
                            marginRight={true} 
                            imgElm={imgPlus} 
                            onClick={() => {fnShowContainerForm()}} 
                        />
                    )}
                </TopButtons>
                </div>
                    {plantations.length > 0 ? (
                        <div className={styles.contContTable}>
                            <div className={styles.contTable}>
                                <div className={styles.headerList}>
                                    <div className={styles.mediumSpace}>a</div>
                                    <div className={styles.mediumSpace}>a</div>
                                    <div className={styles.largeSpace}>a</div>
                                    <div className={styles.smallSpace}>a</div>
                                    <div className={styles.mediumSpace}>a</div>
                                    <div className={styles.mediumSpace}>a</div>
                                    <div className={styles.mediumSpace}>a</div>
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
                                                        Ver más...
                                                    </Link>
                                                </div>
                                            </div>
                                        ))
                                    ):( <br/>)}
                                </div>
                            </div>
                        </div>
                    ):(
                        <p>No hay nada</p>
                    )}
            </Publication>
        </>
     )
}

export default PlantationsCountry