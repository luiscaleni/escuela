import Template from "../template/Template"
import { useState, useEffect } from "react"
import { Link, useParams } from 'react-router-dom'
import { CONFIG_BACKEND, CONFIG_PATHS } from "../config/config"
import Publication from "../components/Publication"
import styles from './css/PlantationsCountry.module.css'
import LeftTopButton from '../components/LeftTopButton'
import stylesButton from '../components/css/Button.module.css'

function PlantationsCountry() {
    const [plantations, setPlantations] = useState([])
    const {country} = useParams()

    useEffect(() => {
        fetch(`${CONFIG_BACKEND.API_DIR}/plantationsCountry?country=${country}`, {
            method: 'GET'
        })
            .then(res => res.json())
            .then(data=>{
                if (data.success) {
                    setPlantations(data.result)
                }else{
                    console.error('Error: ', data.error)
                }
                
            })
            .catch (error => console.error('Error en API: ', error))
    },[])

    return ( 
        <>
            <Template>
                <Publication
                    titlePub={`Plantaciones en ${country}`}
                    typeElm="img"
                    locationAlt="coverCountrys"
                    nameAsset={`${country}.jpg`}
                >
                    <LeftTopButton locationElm={CONFIG_PATHS.PLANTATIONS} typeElm='expand' text="Plantaciones" marginLeft={true}/>
                        {plantations.length > 0 ? (
                            <div className={styles.contContTable}>
                                <div className={styles.contTable}>
                                    <div className={styles.headerList}>
                                        <div className={styles.mediumSpace}>Provincia</div>
                                        <div className={styles.mediumSpace}>Partido</div>
                                        <div className={styles.largeSpace}>Calle</div>
                                        <div className={styles.smallSpace}>Miembros</div>
                                        <div className={styles.mediumSpace}>Plantador</div>
                                        <div className={styles.mediumSpace}>Inició</div>
                                        <div className={styles.smallSpace}>Info</div>
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
                                                    <div className={styles.smallSpace}>
                                                        <Link 
                                                            to={`/plantaciones/${country}/${plant.id_plant}`}
                                                            className={stylesButton.button}
                                                        >
                                                            ver más...
                                                        </Link>
                                                    </div>
                                                </div>
                                            ))
                                        ):( <br/>)}
                                    </div>
                                </div>
                            </div>
                        ):(
                            <p>No hay plantaciones que mostrar</p>
                        )}
                </Publication>
            </Template>
        </>
     )
}

export default PlantationsCountry