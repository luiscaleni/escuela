import Template from "../template/Template"
import Publication from "../components/Publication"
import styles from './css/Plantations.module.css'
import { CONFIG_NAMES_COUNTRYS, CONFIG_BACKEND } from "../config/config"
import { Link } from "react-router-dom"

function Plantations() {

    return ( 
        <>
            <Template>
                <Publication
                    titlePub="Plantaciones en Sudamérica"
                    typeElm="img"
                    nameAsset="banner_plantations.jpg"
                >
                    {
                        CONFIG_NAMES_COUNTRYS.map(country => (
                            <div key={country} className={styles.contCountry}>
                                <Link to={`/plantaciones/${country}`} className={styles.link} title={country}>
                                    <p>{country}</p>
                                    <img src={`${CONFIG_BACKEND.API_DIR}/src/public/assets/images/banderas/${country}.svg`} className={styles.flagCountry}/>
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