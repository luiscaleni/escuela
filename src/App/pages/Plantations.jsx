import Template from "../template/Template"
import Publication from "../components/Publication"
import styles from './css/Plantations.module.css'
import { CONFIG_NAMES_COUNTRYS } from "../config/config"
import { Link } from "react-router-dom"
import { useTranslation } from 'react-i18next'
import { useEffect } from "react"

function Plantations() {
    const [t, i18n] = useTranslation()

    useEffect(()=>{
        const lang = localStorage.getItem('lang') || 'es'
        i18n.changeLanguage(lang)
    },[i18n])

    return ( 
        <>
            <Template>
                <Publication
                    titlePub={t('plantations.title')}
                    typeElm="img"
                    nameAsset="banner_plantations.jpg"
                >
                    {
                        CONFIG_NAMES_COUNTRYS.map(country => (
                            <div key={country} className={styles.contCountry}>
                                <Link to={`/plantaciones/${country}`} className={styles.link} title={country}>
                                    <p>{country}</p>
                                    <img src={`/icons/flags/${country}.svg`} className={styles.flagCountry}/>
                                </Link>
                                <p>{country}</p>
                            </div>
                        ))
                    }
                </Publication>
            </Template>
        </>
     )
}

export default Plantations