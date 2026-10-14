import Publication from "../components/Publication"
import styles from './css/Plantations.module.css'
import { CONFIG_NAMES_COUNTRYS } from "../config/config"
import { Link } from "react-router-dom"

function Plantations() {

    return ( 
        <>
            <Publication
                titlePub="Plantaciones"
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
        </>
     )
}

export default Plantations