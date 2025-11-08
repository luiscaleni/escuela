import Template from "../template/Template"
import { useState, useEffect } from "react"
import { CONFIG_BACKEND, CONFIG_PATHS } from "../config/config"
import Publication from "../components/Publication"
import styles from './css/Plantations.module.css'
import { useParams } from "react-router-dom"
import Loader from "../components/Loader"
import LeftTopButton from "../components/LeftTopButton"

function PlantationDetail() {
    const [plantation, setPlantation] = useState([])
    const [countryDb, setCountryDb] = useState([])
    const {country, id} = useParams()
    const [loading, setLoading] = useState(true)

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
            console.error('Error en API: ', error)
        }finally{
            setLoading(false)
        }
    }

    if(loading) return <Loader />

    return ( 
        <>
            <Template>
                <Publication
                    titlePub={`Plantación en ${plantation.province_plant}`}
                    typeElm="img"
                    nameAsset="banner_home.jpg"
                >
                    <LeftTopButton locationElm={`${CONFIG_PATHS.PLANTATIONS}/${countryDb}`} typeElm='expand' text="Volver" marginLeft={true}/>

                    <div className={styles.plantation}>
                       <p>País: {countryDb}</p>
                       <p>Provincia: {plantation.province_plant}</p>
                       <p>Barrio: {plantation.match_plant}</p>
                       <p>Calle: {plantation.street_plant}</p>
                       <p>Cantidad de miembros: {plantation.members_plant}</p>
                       <p>Lider de plantación: {plantation.leader_plant}</p>
                       <p>Fecha de inicio: {plantation.start_of_work_plant}</p>
                    </div>
                </Publication>
            </Template>
        </>
     )
}

export default PlantationDetail